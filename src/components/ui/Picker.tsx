import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Pressable, Text, View } from "react-native";
import { tv } from "tailwind-variants";

export type PickerOrientation = "horizontal" | "vertical";

export type PickerRootProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: PickerOrientation;
  className?: string;
}>;

export type PickerListProps = PropsWithChildren<{
  className?: string;
  segmentClassName?: string;
}>;

export type PickerItemProps = {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
};

const pickerStyles = tv({
  slots: {
    root: "flex",
    segment:
      "relative overflow-hidden rounded-lg border border-border bg-surface p-1",
    list: "relative flex overflow-hidden",
    item: "relative z-10 inline-flex items-center gap-x-2 rounded-sm bg-transparent px-4 py-3 text-sm font-medium text-muted transition-colors duration-150",
    label: "text-sm font-medium",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "flex-col",
        list: "flex-row gap-x-1",
      },
      vertical: {
        root: "flex-row gap-x-3",
        list: "flex-col gap-y-1",
        content: "flex-1",
      },
    },
    active: {
      true: {
        item: "bg-background text-foreground",
        label: "text-foreground",
      },
      false: {
        item: "text-muted",
        label: "text-muted",
      },
    },
    disabled: {
      true: {
        item: "opacity-50",
      },
      false: {
        item: "",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    active: false,
    disabled: false,
  },
});

type PickerContextValue = {
  orientation: PickerOrientation;
  selectedValue?: string;
  selectValue: (value: string) => void;
};

const PickerContext = createContext<PickerContextValue | null>(null);

const usePickerContext = () => {
  const ctx = useContext(PickerContext);

  if (!ctx) {
    throw new Error("Picker components must be used within Picker.Root");
  }

  return ctx;
};

export const PickerRoot: FC<PickerRootProps> = ({
  children,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(
    value ?? defaultValue,
  );

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  const selectedValue = internalValue;

  const selectValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const styles = pickerStyles({ orientation });

  return (
    <PickerContext.Provider
      value={{
        orientation,
        selectedValue,
        selectValue,
      }}
    >
      <View className={styles.root({ className })}>{children}</View>
    </PickerContext.Provider>
  );
};

export const PickerList: FC<PickerListProps> = ({
  children,
  className,
  segmentClassName,
}) => {
  const { orientation } = usePickerContext();
  const styles = pickerStyles({ orientation });

  return (
    <View className={styles.segment({ className: segmentClassName })}>
      <View className={styles.list({ className })}>{children}</View>
    </View>
  );
};

export const PickerItem: FC<PickerItemProps> = ({
  value,
  label,
  disabled,
  className,
  labelClassName,
}) => {
  const { selectedValue, selectValue } = usePickerContext();
  const isActive = selectedValue === value;
  const styles = pickerStyles({ active: isActive, disabled });

  return (
    <Pressable
      accessibilityRole={"button"}
      accessibilityState={{ selected: isActive, disabled }}
      className={styles.item({ className })}
      disabled={disabled}
      onPress={() => selectValue(value)}
    >
      <Text className={styles.label({ className: labelClassName })}>
        {label}
      </Text>
    </Pressable>
  );
};

export const Picker = {
  Root: PickerRoot,
  List: PickerList,
  Item: PickerItem,
};
