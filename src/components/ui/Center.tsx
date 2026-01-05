import { FC } from "react";
import { View, ViewProps } from "react-native";
import { tv } from "tailwind-variants";

const centerStyles = tv({
  base: "flex-1 items-center justify-center",
});

export type CenterProps = ViewProps;

export const Center: FC<CenterProps> = ({ className, ...props }) => {
  return <View {...props} className={centerStyles({ className })} />;
};
