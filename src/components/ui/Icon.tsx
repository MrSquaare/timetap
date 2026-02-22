import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps, FC } from "react";
import { tv } from "tailwind-variants";
import { withUniwind } from "uniwind";

const iconStyles = tv({
  base: "text-foreground",
});

const Component = withUniwind(Ionicons);

export type IconProps = ComponentProps<typeof Component>;

export const Icon: FC<IconProps> = ({ className, ...props }) => {
  return <Component {...props} className={iconStyles({ className })} />;
};
