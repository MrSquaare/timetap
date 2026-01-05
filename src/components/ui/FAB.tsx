import { FC } from "react";
import { tv } from "tailwind-variants";

import { Button, ButtonProps } from "./Button";

const fabStyles = tv({
  slots: {
    root: "absolute right-8 bottom-8 rounded-full p-4 shadow-lg",
    text: "text-md",
  },
});

export type FABProps = ButtonProps;

export const FAB: FC<FABProps> = ({
  className,
  childrenClassName,
  ...props
}) => {
  const styles = fabStyles();

  return (
    <Button
      {...props}
      childrenClassName={styles.text({ className: childrenClassName })}
      className={styles.root({ className })}
    />
  );
};
