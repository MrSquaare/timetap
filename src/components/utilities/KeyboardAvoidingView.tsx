import { ComponentProps, FC } from "react";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type KeyboardAvoidingViewProps = ComponentProps<typeof Animated.View>;

export const KeyboardAvoidingView: FC<KeyboardAvoidingViewProps> = ({
  style,
  ...props
}) => {
  const keyboard = useReanimatedKeyboardAnimation();
  const insets = useSafeAreaInsets();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: Math.max(-keyboard.height.value - insets.bottom, 0),
    };
  }, [insets.bottom]);

  return <Animated.View {...props} style={[animatedStyle, style]} />;
};
