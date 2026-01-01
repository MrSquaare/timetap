import { FC } from "react";
import { tv } from "tailwind-variants";

import { Button, ButtonProps } from "./Button";

const fabStyles = tv({
  base: "absolute right-8 bottom-8 rounded-full p-4 shadow-lg",
});

export type FABProps = ButtonProps;

export const FAB: FC<FABProps> = ({ className, ...props }) => {
  return <Button {...props} className={fabStyles({ className })} />;
};
