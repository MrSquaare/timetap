import { Children, FC, cloneElement, isValidElement } from "react";
import { Pressable, PressableProps } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

import { Icon } from "./Icon";
import { Text } from "./Text";

const buttonStyles = tv({
  slots: {
    root: "flew-row items-center active:opacity-70",
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
  },
  defaultVariants: {
    variant: "filled",
  },
});

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonStyles> & {
    styleChildren?: boolean;
  };

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  styleChildren = true,
  ...props
}) => {
  const styles = buttonStyles({ variant });
  const processedChildren =
    !styleChildren || typeof children === "function"
      ? children
      : Children.map(children, (child) => {
          if (["number", "boolean", "string"].includes(typeof child)) {
            return <Text className={styles.text()}>{child}</Text>;
          }

          if (isValidElement<{ className?: string }>(child)) {
            if (child.type === Text || child.type === Icon) {
              return cloneElement(child, {
                className: styles.text({
                  className: child.props.className,
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
    >
      {processedChildren}
    </Pressable>
  );
};
