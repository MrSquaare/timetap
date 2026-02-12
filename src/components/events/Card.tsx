import { FC } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";

import { Event } from "../../schemas/event";
import { formatDateTime } from "../../utilities/date";
import { Text } from "../ui/Text";

const eventCardStyles = tv({
  slots: {
    root: "bg-surface border-border rounded-lg border p-4 shadow-xs",
    datetime: "text-base font-medium",
    description: "text-muted mt-1 text-sm",
  },
});

export type EventCardProps = {
  event: Event;
  className?: string;
  textClassName?: string;
};

export const EventCard: FC<EventCardProps> = ({
  event,
  className,
  textClassName,
}) => {
  const styles = eventCardStyles();
  const date = new Date(event.datetime);

  return (
    <View className={styles.root({ className })}>
      <Text className={styles.datetime({ className: textClassName })}>
        {formatDateTime(date)}
      </Text>
      {event.description ? (
        <Text className={styles.description()} numberOfLines={1}>
          {event.description}
        </Text>
      ) : null}
    </View>
  );
};
