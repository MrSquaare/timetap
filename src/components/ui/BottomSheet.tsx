import * as BS from "@gorhom/bottom-sheet";
import { ComponentProps, FC } from "react";
import { View, ViewProps } from "react-native";
import { tv } from "tailwind-variants";
import { withUniwind } from "uniwind";

import { KeyboardAvoidingView } from "../utilities/KeyboardAvoidingView";

const bottomSheetStyles = tv({
  slots: {
    backdrop: "bg-foreground/50",
    background: "bg-background",
    indicator: "bg-foreground/50",
  },
});

const RootComponent = withUniwind(BS.default, {
  style: {
    fromClassName: "className",
  },
  containerStyle: {
    fromClassName: "containerClassName",
  },
  backgroundStyle: {
    fromClassName: "backgroundClassName",
  },
  handleStyle: {
    fromClassName: "handleClassName",
  },
  handleIndicatorStyle: {
    fromClassName: "handleIndicatorClassName",
  },
});

export type BottomSheetProps = ComponentProps<typeof RootComponent>;
export const BottomSheet: FC<BottomSheetProps> = ({
  className,
  handleIndicatorClassName,
  ...props
}) => {
  const styles = bottomSheetStyles();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <RootComponent
        {...props}
        animateOnMount={true}
        backgroundClassName={styles.background({ className })}
        enablePanDownToClose={true}
        handleIndicatorClassName={styles.indicator({
          className: handleIndicatorClassName,
        })}
        index={0}
      />
    </KeyboardAvoidingView>
  );
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type BottomSheet = BS.default;

const BackdropComponent = withUniwind(BS.BottomSheetBackdrop);

export type BottomSheetBackdropProps = ComponentProps<typeof BackdropComponent>;
export const BottomSheetBackdrop: FC<BottomSheetBackdropProps> = ({
  className,
  ...props
}) => {
  const styles = bottomSheetStyles();

  return (
    <BackdropComponent
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
      className={styles.backdrop({ className })}
    />
  );
};

export type BackgroundComponentProps = ViewProps;
export const BottomSheetBackground: FC<BackgroundComponentProps> = ({
  className,
  ...props
}) => {
  const styles = bottomSheetStyles();

  return <View {...props} className={styles.background({ className })} />;
};

const ViewComponent = withUniwind(BS.BottomSheetView);

export type BottomSheetViewProps = ComponentProps<typeof ViewComponent>;
export const BottomSheetView: FC<BottomSheetViewProps> = ViewComponent;

const HandleComponent = withUniwind(BS.BottomSheetHandle, {
  style: {
    fromClassName: "className",
  },
  indicatorStyle: {
    fromClassName: "indicatorClassName",
  },
});

export type BottomSheetHandleProps = ComponentProps<typeof HandleComponent>;
export const BottomSheetHandle: FC<BottomSheetHandleProps> = ({
  className,
  indicatorClassName,
  ...props
}) => {
  const styles = bottomSheetStyles();

  return (
    <HandleComponent
      {...props}
      className={className}
      indicatorClassName={styles.indicator({
        className: indicatorClassName,
      })}
    />
  );
};
