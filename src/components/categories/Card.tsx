import { FC } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";

import { Category } from "../../schemas/category";
import { Text } from "../ui/Text";

const categoryCardStyles = tv({
  slots: {
    root: "bg-surface border-border rounded-lg border p-4 shadow-xs",
    text: "text-base font-medium",
  },
});

export type CategoryCardProps = {
  category: Category;
  className?: string;
  textClassName?: string;
};

export const CategoryCard: FC<CategoryCardProps> = ({
  category,
  className,
  textClassName,
}) => {
  const styles = categoryCardStyles();

  return (
    <View className={styles.root({ className })}>
      <Text className={styles.text({ className: textClassName })}>
        {category.name}
      </Text>
    </View>
  );
};
