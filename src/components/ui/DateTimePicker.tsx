import RNDateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { FC, useState } from "react";
import { Pressable, View } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

import { formatDate, formatDateTime, formatTime } from "../../utilities/date";

import { Text } from "./Text";

const dateTimePickerStyles = tv({
  slots: {
    root: "text-foreground border-border focus:border-foreground w-full rounded-lg border px-4 py-2.5 text-sm",
    placeholder: "accent-muted",
  },
  variants: {
    error: {
      true: {
        root: "border-red-500",
      },
      false: {},
    },
    disabled: {
      true: {
        root: "opacity-50",
      },
      false: {},
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type DateTimePickerProps = Omit<
  AndroidNativeProps & IOSNativeProps,
  "onChange" | "value" | "mode"
> & {
  mode: "date" | "time" | "datetime";
  value: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
} & VariantProps<typeof dateTimePickerStyles>;

export const DateTimePicker: FC<DateTimePickerProps> = ({
  mode,
  placeholder,
  value,
  onChange,
  disabled,
  error,
  className,
  ...props
}) => {
  const styles = dateTimePickerStyles({ error, disabled });
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);

    if (selectedDate && onChange) {
      onChange(selectedDate);
    }
  };

  const displayValue = () => {
    if (!value) return placeholder || "";
    if (mode === "date") return formatDate(value);
    if (mode === "time") return formatTime(value);

    return formatDateTime(value);
  };

  return (
    <View>
      <Pressable
        className={styles.root({ className })}
        disabled={disabled}
        onPress={() => setShow(true)}
      >
        <Text className={value ? "" : styles.placeholder()}>
          {displayValue()}
        </Text>
      </Pressable>
      {show && (
        <RNDateTimePicker
          design={"material"}
          disabled={disabled}
          mode={mode === "datetime" ? "date" : mode}
          onChange={handleChange}
          value={value || new Date()}
          {...props}
        />
      )}
    </View>
  );
};
