import { FC, ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { tv } from "tailwind-variants";

import { Button, ButtonProps } from "./Button";
import { Text, TextProps } from "./Text";

const sheetStyles = tv({
  slots: {
    root: "bg-background py-4",
    header: "flex-row items-center border-b border-border px-4 pb-4",
    title: "text-lg font-semibold",
    actionText: "font-medium",
    body: "p-4",
  },
});

export const SheetView: FC<ViewProps> = ({ className, ...props }) => {
  const styles = sheetStyles();

  return <View {...props} className={styles.root({ className })} />;
};

export type SheetHeaderProps = ViewProps & {
  left?: ReactNode;
  right?: ReactNode;
};

export const SheetHeader: FC<SheetHeaderProps> = ({
  left,
  right,
  children,
  className,
  ...props
}) => {
  const styles = sheetStyles();

  return (
    <View {...props} className={styles.header({ className })}>
      <View className={"flex-1 items-start"}>{left}</View>
      <View className={"flex-4 items-center"}>{children}</View>
      <View className={"flex-1 items-end"}>{right}</View>
    </View>
  );
};

export type SheetTitleProps = TextProps;

export const SheetTitle: FC<SheetTitleProps> = ({ className, ...props }) => {
  const styles = sheetStyles();

  return <Text {...props} className={styles.title({ className })} />;
};

export type SheetActionProps = Omit<ButtonProps, "children"> &
  Pick<TextProps, "children"> & {
    textClassName?: string;
  };

export const SheetAction: FC<SheetActionProps> = ({
  children,
  textClassName,
  ...props
}) => {
  const styles = sheetStyles();

  return (
    <Button variant={"action"} {...props}>
      <Text className={styles.actionText({ className: textClassName })}>
        {children}
      </Text>
    </Button>
  );
};

export type SheetBodyProps = ViewProps;

export const SheetBody: FC<SheetBodyProps> = ({ className, ...props }) => {
  const styles = sheetStyles();

  return <View {...props} className={styles.body({ className })} />;
};
