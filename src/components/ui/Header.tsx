import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { tv } from "tailwind-variants";

import { Button } from "./Button";
import { Icon } from "./Icon";
import { Text } from "./Text";

const headerStyles = tv({
  slots: {
    root: "flex-row items-center gap-3 px-4 py-3",
    title: "text-lg font-semibold",
    backButton: "gap-1",
    backButtonText: "text-sm",
  },
  variants: {
    shadow: { true: { root: "border-b border-border" }, false: {} },
    transparent: { true: {}, false: { root: "bg-background" } },
  },
  defaultVariants: {
    shadow: true,
    transparent: false,
  },
});

export const Header: FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  if (options.headerShown === false) {
    return null;
  }

  const tintColor = options.headerTintColor;
  const style = StyleSheet.flatten(options.headerStyle) || {};
  const backTitleStyle = StyleSheet.flatten(options.headerBackTitleStyle) || {};
  const titleStyle = StyleSheet.flatten(options.headerTitleStyle) || {};
  const canGoBack = Boolean(back);
  const transparent = options.headerTransparent === true;
  const shadowVisible = options.headerShadowVisible !== false;
  const styles = headerStyles({
    transparent: transparent,
    shadow: shadowVisible && !transparent,
  });
  const backVisible = options.headerBackVisible !== false;
  const titleAlign = options.headerTitleAlign;
  const defaultTitle = options.title ?? route.name;

  const renderBackground = () => {
    if (!options.headerBackground) {
      return null;
    }

    return (
      <View pointerEvents={"box-none"} style={StyleSheet.absoluteFill}>
        {options.headerBackground()}
      </View>
    );
  };

  const renderLeft = () => {
    if (options.headerLeft) {
      return options.headerLeft({
        tintColor,
        canGoBack,
        label: options.headerBackTitle,
        href: back?.href,
      });
    }

    if (!backVisible || !canGoBack) {
      return null;
    }

    const color = tintColor;

    return (
      <Button
        accessibilityLabel={options.headerBackTitle ?? "Go back"}
        className={styles.backButton()}
        hitSlop={8}
        onPress={() => navigation.goBack()}
        variant={"action"}
      >
        <Icon color={color} name={"arrow-back"} size={24} />
        {options.headerBackTitle ? (
          <Text
            className={styles.backButtonText()}
            numberOfLines={1}
            style={[backTitleStyle, color ? { color } : null]}
          >
            {options.headerBackTitle}
          </Text>
        ) : null}
      </Button>
    );
  };

  const renderTitle = () => {
    if (typeof options.headerTitle === "function") {
      return options.headerTitle({ children: defaultTitle, tintColor });
    }

    if (options.headerTitle === "") {
      return null;
    }

    const color = titleStyle.color ?? tintColor;
    const textAlign = titleAlign;

    return (
      <Text
        className={styles.title()}
        numberOfLines={1}
        style={[
          titleStyle,
          color ? { color } : null,
          textAlign ? { textAlign } : null,
        ]}
      >
        {options.headerTitle ?? defaultTitle}
      </Text>
    );
  };

  const renderRight = () => {
    if (!options.headerRight) {
      return null;
    }

    return options.headerRight({ tintColor, canGoBack });
  };

  const left = renderLeft();
  const title = renderTitle();
  const right = renderRight();

  return (
    <View className={styles.root()} style={style}>
      {renderBackground()}
      {left ? <View>{left}</View> : null}
      {title ? <View className={"flex-1"}>{title}</View> : null}
      {right ? <View className={"justify-end"}>{right}</View> : null}
    </View>
  );
};
