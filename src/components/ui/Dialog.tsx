import { FC, PropsWithChildren, useId } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";
import { tv } from "tailwind-variants";

import { Button, ButtonProps } from "./Button";
import { Portal } from "./Portal";
import { Text, TextProps } from "./Text";

const dialogStyles = tv({
  slots: {
    root: "absolute inset-0",
    backdrop: "absolute inset-0 bg-foreground/33",
    contentContainer: "flex-1 items-center justify-center p-4",
    contentWrapper: "w-full max-w-md",
    content: "w-full gap-4 rounded-xl border border-border bg-background p-4",
    header: "gap-1",
    title: "text-lg font-semibold",
    description: "text-sm text-muted",
    footer: "flex-row justify-end gap-2",
  },
});

const EXIT_DURATION = 150;
const DIALOG_BACKDROP_ENTERING = FadeIn.duration(180).easing(
  Easing.out(Easing.cubic),
);
const DIALOG_BACKDROP_EXITING = FadeOut.duration(EXIT_DURATION).easing(
  Easing.in(Easing.cubic),
);
const DIALOG_CONTENT_ENTERING = FadeIn.duration(180).easing(
  Easing.out(Easing.cubic),
);
const DIALOG_CONTENT_EXITING = FadeOut.duration(EXIT_DURATION).easing(
  Easing.in(Easing.cubic),
);

export type DialogProps = PressableProps &
  PropsWithChildren<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    name?: string;
  }>;

export const Dialog: FC<DialogProps> = ({
  children,
  open,
  onOpenChange,
  name,
  ...props
}) => {
  const id = useId();
  const styles = dialogStyles();

  if (!open) {
    return null;
  }

  return (
    <Portal name={name ?? `dialog-${id}`}>
      <View className={styles.root()} pointerEvents={"box-none"}>
        <Animated.View
          entering={DIALOG_BACKDROP_ENTERING}
          exiting={DIALOG_BACKDROP_EXITING}
          style={StyleSheet.absoluteFill}
        >
          <Pressable
            {...props}
            className={styles.backdrop()}
            onPress={() => onOpenChange(false)}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View className={styles.contentContainer()} pointerEvents={"box-none"}>
          <View className={styles.contentWrapper()}>
            <Animated.View
              className={styles.content()}
              entering={DIALOG_CONTENT_ENTERING}
              exiting={DIALOG_CONTENT_EXITING}
            >
              {children}
            </Animated.View>
          </View>
        </View>
      </View>
    </Portal>
  );
};

export type DialogHeaderProps = ViewProps;

export const DialogHeader: FC<DialogHeaderProps> = ({
  className,
  ...props
}) => {
  const styles = dialogStyles();

  return <View {...props} className={styles.header({ className })} />;
};

export type DialogTitleProps = TextProps;

export const DialogTitle: FC<DialogTitleProps> = ({ className, ...props }) => {
  const styles = dialogStyles();

  return <Text {...props} className={styles.title({ className })} />;
};

export type DialogDescriptionProps = TextProps;

export const DialogDescription: FC<DialogDescriptionProps> = ({
  className,
  ...props
}) => {
  const styles = dialogStyles();

  return <Text {...props} className={styles.description({ className })} />;
};

export type DialogFooterProps = ViewProps;

export const DialogFooter: FC<DialogFooterProps> = ({
  className,
  ...props
}) => {
  const styles = dialogStyles();

  return <View {...props} className={styles.footer({ className })} />;
};

export type DialogActionProps = ButtonProps;

export const DialogAction: FC<DialogActionProps> = (props) => {
  return <Button {...props} />;
};
