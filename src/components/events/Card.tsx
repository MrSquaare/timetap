import { FC } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";

import { Event } from "../../schemas/event";
import { formatDateTime } from "../../utilities/date";
import { Text } from "../ui/Text";

const eventCardStyles = tv({
  slots: {
    root: "rounded-lg border border-border bg-surface p-4 shadow-xs",
    text: "text-base font-medium",
    description: "mt-1 text-sm text-muted",
  },
});

export type EventCardProps = {
  event: Event;
  className?: string;
  textClassName?: string;
  descriptionClassName?: string;
};

export const EventCard: FC<EventCardProps> = ({
  event,
  className,
  textClassName,
  descriptionClassName,
}) => {
  const styles = eventCardStyles();
  const date = new Date(event.datetime);

  return (
    <View className={styles.root({ className })}>
      <Text className={styles.text({ className: textClassName })}>
        {formatDateTime(date)}
      </Text>
      {event.description ? (
        <Text
          className={styles.description({ className: descriptionClassName })}
          numberOfLines={1}
        >
          {event.description}
        </Text>
      ) : null}
    </View>
  );
};
