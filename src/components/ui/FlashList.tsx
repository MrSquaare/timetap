import * as FL from "@shopify/flash-list";
import { ComponentProps, FC } from "react";
import { withUniwind } from "uniwind";

export const Component = withUniwind(FL.FlashList, {
  style: {
    fromClassName: "className",
  },
  contentContainerStyle: {
    fromClassName: "contentContainerClassName",
  },
  ListHeaderComponentStyle: {
    fromClassName: "ListHeaderComponentClassName",
  },
  ListFooterComponentStyle: {
    fromClassName: "ListFooterComponentStyleClassName",
  },
  endFillColor: {
    fromClassName: "endFillColorClassName",
    styleProperty: "accentColor",
  },
});

export type FlashListProps = ComponentProps<typeof Component>;
export const FlashList: FC<FlashListProps> = Component;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FlashList = typeof FL.FlashList & FC<FlashListProps>;
