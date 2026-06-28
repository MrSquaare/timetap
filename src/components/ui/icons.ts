import {
  ArrowLeft,
  CirclePlus,
  Edit,
  Plus,
  Settings,
  Trash,
} from "lucide-react-native";

export const icons = {
  "arrow-left": ArrowLeft,
  "circle-plus": CirclePlus,
  edit: Edit,
  plus: Plus,
  settings: Settings,
  trash: Trash,
};

export type Icons = typeof icons;
export type IconName = keyof Icons;
