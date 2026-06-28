import { ComponentProps, FC } from "react";
import { tv } from "tailwind-variants";
import { withUniwind } from "uniwind";

import { IconName, icons, Icons } from "./icons";

type StyledIcon<T extends IconName> = ReturnType<typeof withUniwind<Icons[T]>>;
type StyledIcons = {
  [K in IconName]: StyledIcon<K>;
};

const styledIcons = Object.fromEntries(
  Object.entries(icons).map(([name, IconComponent]) => [
    name,
    withUniwind(IconComponent),
  ]),
) as StyledIcons;

const iconStyles = tv({
  base: "text-foreground",
});

export type IconProps = ComponentProps<StyledIcons[IconName]> & {
  name: IconName;
};

export const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  const Component = styledIcons[name];

  return <Component {...props} className={iconStyles({ className })} />;
};
