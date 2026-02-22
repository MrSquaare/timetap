import { FC, useEffect, useId } from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { tv } from "tailwind-variants";

import { Portal } from "./Portal";
import { Text } from "./Text";

const toastStyles = tv({
  slots: {
    root: "absolute inset-x-0 bottom-10 items-center px-4 pb-safe",
    content: "max-w-md rounded-lg bg-foreground px-4 py-2",
    text: "text-sm text-background",
  },
});

const EXIT_DURATION = 150;
const TOAST_ENTERING = FadeInDown.duration(180).easing(
  Easing.out(Easing.cubic),
);
const TOAST_EXITING = FadeOutDown.duration(EXIT_DURATION).easing(
  Easing.in(Easing.cubic),
);

export type ToastProps = ViewProps & {
  open: boolean;
  message: string;
  onOpenChange: (open: boolean) => void;
  duration?: number;
};

export const Toast: FC<ToastProps> = ({
  open,
  message,
  onOpenChange,
  duration = 1500,
  className,
  ...props
}) => {
  const styles = toastStyles();
  const id = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = setTimeout(() => {
      onOpenChange(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onOpenChange, open]);

  if (!open || !message) {
    return null;
  }

  return (
    <Portal name={`toast-${id}`}>
      <View className={styles.root({ className })} pointerEvents={"none"}>
        <Animated.View
          {...props}
          className={styles.content()}
          entering={TOAST_ENTERING}
          exiting={TOAST_EXITING}
        >
          <Text className={styles.text()}>{message}</Text>
        </Animated.View>
      </View>
    </Portal>
  );
};
