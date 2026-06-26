import RNDateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
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
  className,
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
      <RNDateTimePicker
        disabled={disabled}
        mode={mode}
        onValueChange={handleValueChange}
        value={value}
        {...props}
      />
    </View>
  );
};
