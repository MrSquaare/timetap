import { FC } from "react";
import * as RN from "react-native";
import { tv } from "tailwind-variants";

const textStyles = tv({
  base: "text-foreground text-base",
});

export type TextProps = RN.TextProps;

export const Text: FC<TextProps> = ({ children, className, ...props }) => {
  return (
    <RN.Text {...props} className={textStyles({ className })}>
      {children}
    </RN.Text>
  );
};
