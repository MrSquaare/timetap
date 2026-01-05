import { FC } from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { tv } from "tailwind-variants";

const spinnerStyles = tv({
  slots: {
    color: "accent-foreground",
  },
});

export type SpinnerProps = ActivityIndicatorProps;

export const Spinner: FC<SpinnerProps> = ({ colorClassName, ...props }) => {
  const styles = spinnerStyles();

  return (
    <ActivityIndicator
      {...props}
      colorClassName={styles.color({ className: colorClassName })}
    />
  );
};
