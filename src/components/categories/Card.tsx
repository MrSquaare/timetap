import { FC } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";

import { Category } from "../../schemas/category";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

const categoryCardStyles = tv({
  slots: {
    root: "bg-surface border-border flex-row items-center justify-between rounded-lg border p-4 shadow-xs",
    text: "text-base font-medium",
  },
});

export type CategoryCardProps = {
  category: Category;
  className?: string;
  textClassName?: string;
  onQuickAdd?: () => void;
  quickAddDisabled?: boolean;
};

export const CategoryCard: FC<CategoryCardProps> = ({
  category,
  className,
  textClassName,
  onQuickAdd,
  quickAddDisabled,
}) => {
  const styles = categoryCardStyles();

  return (
    <View className={styles.root({ className })}>
      <Text className={styles.text({ className: textClassName })}>
        {category.name}
      </Text>
      {onQuickAdd ? (
        <Button
          accessibilityLabel={`Quick add event to ${category.name}`}
          disabled={quickAddDisabled}
          hitSlop={8}
          onPress={() => onQuickAdd()}
          variant={"action"}
        >
          <Icon name={"add-circle-outline"} size={22} />
        </Button>
      ) : null}
    </View>
  );
};
