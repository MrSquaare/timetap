import { Link } from "expo-router";
import { FC } from "react";
import { Pressable, View } from "react-native";
import { tv } from "tailwind-variants";

import { Category } from "../../schemas/category";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Text } from "../ui/Text";

const categoryCardStyles = tv({
  slots: {
    root: "flex-row justify-between rounded-lg border border-border bg-surface shadow-xs",
    details: "flex-1 justify-center py-4 pr-2 pl-4",
    text: "text-base font-medium",
    quickAdd: "justify-center px-4",
  },
});

export type CategoryCardProps = {
  category: Category;
  className?: string;
  detailsClassName?: string;
  textClassName?: string;
  quickAddClassName?: string;
  onQuickAdd?: () => void;
  quickAddDisabled?: boolean;
};

export const CategoryCard: FC<CategoryCardProps> = ({
  category,
  className,
  detailsClassName,
  textClassName,
  quickAddClassName,
  onQuickAdd,
  quickAddDisabled,
}) => {
  const styles = categoryCardStyles();

  return (
    <View className={styles.root({ className })}>
      <Link asChild href={`/categories/${category.id}`}>
        <Pressable className={styles.details({ className: detailsClassName })}>
          <Text className={styles.text({ className: textClassName })}>
            {category.name}
          </Text>
        </Pressable>
      </Link>
      {onQuickAdd ? (
        <Button
          accessibilityLabel={`Quick add event to ${category.name}`}
          className={styles.quickAdd({ className: quickAddClassName })}
          disabled={quickAddDisabled}
          hitSlop={8}
          onPress={() => onQuickAdd()}
          variant={"action"}
        >
          <Icon name={"circle-plus"} size={22} />
        </Button>
      ) : null}
    </View>
  );
};
