import ExpoDateTimePicker, {
  DateTimePickerChangeEvent,
} from "@expo/ui/community/datetime-picker";
import { FC } from "react";
import { View } from "react-native";

import { DateTimePickerProps } from "./DateTimePicker";

export const DateTimePicker: FC<DateTimePickerProps> = ({
  mode,
  placeholder,
  value,
  onChange,
  disabled,
  error,
  ...props
}) => {
  const handleValueChange = (
    event: DateTimePickerChangeEvent,
    selectedDate: Date,
  ) => {
    if (onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <ExpoDateTimePicker
        disabled={disabled}
        mode={mode}
        onValueChange={handleValueChange}
        value={value}
        {...props}
      />
    </View>
  );
};
