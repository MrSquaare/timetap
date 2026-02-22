import RNDateTimePicker, {
  DateTimePickerEvent,
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
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate && onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <RNDateTimePicker
        disabled={disabled}
        mode={mode}
        onChange={handleChange}
        value={value}
        {...props}
      />
    </View>
  );
};
