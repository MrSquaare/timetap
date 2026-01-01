import { FC } from "react";
import { View } from "react-native";

import { Theme } from "../../schemas/theme";
import { Picker } from "../ui/Picker";

type SettingsThemeOption = {
  label: string;
  value: Theme;
};

const settingsThemeOptions: SettingsThemeOption[] = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export type SettingsThemePickerProps = {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export const SettingsThemePicker: FC<SettingsThemePickerProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  return (
    <View>
      <Picker.Root
        onValueChange={(value) => onThemeChange(value as Theme)}
        value={selectedTheme}
      >
        <Picker.List>
          {settingsThemeOptions.map((option) => (
            <Picker.Item
              className={"flex-1"}
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker.List>
      </Picker.Root>
    </View>
  );
};
