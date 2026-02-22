import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const textAreaStyles = tv({
  slots: {
    root: "w-full rounded-lg border border-border px-4 py-2.5 text-sm text-foreground focus:border-foreground",
    cursor: "accent-foreground",
    placeholder: "accent-muted",
    selection: "accent-foreground/25",
    selectionHandle: "accent-foreground",
  },
  variants: {
    error: {
      true: {
        root: "border-red-500",
      },
      false: {},
    },
    disabled: {
      true: {
        root: "opacity-50",
      },
      false: {},
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type TextAreaProps = TextInputProps &
  VariantProps<typeof textAreaStyles>;

export const TextArea: FC<TextAreaProps> = ({
  error,
  disabled,
  className,
  cursorColorClassName,
  selectionColorClassName,
  selectionHandleColorClassName,
  placeholderTextColorClassName,
  ...props
}) => {
  const styles = textAreaStyles({ error, disabled });

  return (
    <TextInput
      editable={!disabled}
      multiline
      textAlignVertical={"top"}
      {...props}
      className={styles.root({ className })}
      cursorColorClassName={styles.cursor({
        className: cursorColorClassName,
      })}
      placeholderTextColorClassName={styles.placeholder({
        className: placeholderTextColorClassName,
      })}
      selectionColorClassName={styles.selection({
        className: selectionColorClassName,
      })}
      selectionHandleColorClassName={styles.selectionHandle({
        className: selectionHandleColorClassName,
      })}
    />
  );
};
