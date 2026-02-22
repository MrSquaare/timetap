import {
  Children,
  cloneElement,
  createContext,
  FC,
  isValidElement,
  useContext,
} from "react";
import { View, ViewProps } from "react-native";
import { tv } from "tailwind-variants";

import { Input } from "./Input";
import { Text, TextProps } from "./Text";

const fieldStyles = tv({
  slots: {
    root: "gap-2",
    inline: "flex-row items-center",
    label: "text-sm font-medium",
    error: "text-sm text-red-500",
  },
  variants: {
    error: {
      true: {
        label: "text-red-500",
      },
      false: {},
    },
  },
  defaultVariants: {
    error: false,
  },
});

type FormError = {
  message: string;
};

type FieldContextValue = {
  errors?: FormError[];
};

const FieldContext = createContext<FieldContextValue | null>(null);

const useFieldContext = () => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error("Field components must be used within Field.Root");
  }

  return context;
};

export type FieldRootProps = ViewProps & {
  errors?: (FormError | undefined)[];
  customizeChildren?: boolean;
};

export const FieldRoot: FC<FieldRootProps> = ({
  errors,
  className,
  children,
  customizeChildren = true,
  ...props
}) => {
  const filteredErrors = errors?.filter(Boolean) as FormError[] | undefined;
  const error = !!filteredErrors?.length;
  const styles = fieldStyles({ error });

  const processedChildren = !customizeChildren
    ? children
    : Children.map(children, (child) => {
        if (isValidElement<{ error?: boolean }>(child)) {
          if (child.type === Input) {
            return cloneElement(child, {
              error,
            });
          }
        }

        return child;
      });

  return (
    <FieldContext.Provider value={{ errors: filteredErrors }}>
      <View className={styles.root({ className })} {...props}>
        {processedChildren}
      </View>
    </FieldContext.Provider>
  );
};

export type FieldInlineProps = ViewProps;

export const FieldInline: FC<FieldInlineProps> = ({ className, ...props }) => {
  const styles = fieldStyles();

  return <View {...props} className={styles.inline({ className })} />;
};

export type FieldLabelProps = TextProps;

export const FieldLabel: FC<FieldLabelProps> = ({
  children,
  className,
  ...props
}) => {
  const { errors } = useFieldContext();
  const error = !!errors?.length;
  const styles = fieldStyles({ error });

  return (
    <Text {...props} className={styles.label({ className })}>
      {children}
    </Text>
  );
};

export type FieldErrorProps = TextProps;

export const FieldError: FC<FieldErrorProps> = ({
  children,
  className,
  ...props
}) => {
  const { errors } = useFieldContext();
  const error = !!errors?.length;
  const styles = fieldStyles({ error });

  if (!error) {
    return null;
  }

  return (
    <Text {...props} className={styles.error({ className })}>
      {errors.map(({ message }) => message).join(", ")}
    </Text>
  );
};

export const Field = {
  Root: FieldRoot,
  Inline: FieldInline,
  Label: FieldLabel,
  Error: FieldError,
};
