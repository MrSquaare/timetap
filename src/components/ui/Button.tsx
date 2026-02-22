import { Children, FC, cloneElement, isValidElement } from "react";
import { Pressable, PressableProps } from "react-native";
import { cn, tv, VariantProps } from "tailwind-variants";

import { Icon } from "./Icon";
import { Text } from "./Text";

const buttonStyles = tv({
  slots: {
    root: "flex-row items-center active:opacity-70",
    text: "",
  },
  variants: {
    variant: {
      filled: {
        root: "bg-foreground",
        text: "text-background",
      },
      action: {},
    },
    size: {
      sm: {
        text: "text-sm",
      },
      md: {},
      lg: {
        text: "text-lg",
      },
    },
    disabled: {
      true: {
        root: "opacity-50",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      size: "sm",
      class: {
        root: "rounded-md px-2.5 py-1.5",
      },
    },
    {
      variant: "filled",
      size: "md",
      class: {
        root: "rounded-lg px-4 py-2",
      },
    },
    {
      variant: "filled",
      size: "lg",
      class: {
        root: "rounded-xl px-6 py-3",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "md",
  },
});

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonStyles> & {
    customizeChildren?: boolean;
    childrenClassName?: string;
  };

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  size,
  disabled,
  className,
  customizeChildren = true,
  childrenClassName,
  ...props
}) => {
  const styles = buttonStyles({ variant, size, disabled });

  const processedChildren =
    !customizeChildren || typeof children === "function"
      ? children
      : Children.map(children, (child) => {
          if (isValidElement<{ className?: string }>(child)) {
            if (child.type === Text || child.type === Icon) {
              return cloneElement(child, {
                className: styles.text({
                  className: cn(childrenClassName, child.props.className),
                }),
              });
            }
          }

          return child;
        });

  return (
    <Pressable
      accessibilityRole={"button"}
      {...props}
      className={styles.root({ className })}
      disabled={disabled}
    >
      {processedChildren}
    </Pressable>
  );
};
