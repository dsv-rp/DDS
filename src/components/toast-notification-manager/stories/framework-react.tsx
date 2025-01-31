import { DaikinToastNotificationManager } from "#package/components/toast-notification-manager/daikin-toast-notification-manager";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React, { useCallback, useState } from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import { ReactDaikinToastNotification } from "../../toast-notification/stories/framework-react";
import type {
  DaikinToastNotificationManagerStoryArgs,
  ToastCloseEvent,
} from "./common";

const ReactDaikinToastNotificationManager = createComponent({
  tagName: "daikin-toast-notification-manager",
  elementClass: DaikinToastNotificationManager,
  react: React,
  events: {
    onClose: "close" as EventName<ToastCloseEvent>,
  },
});

const VRT_ITEMS = Array.from(
  new Array(3),
  (_, index): [name: string, index: number] => [`toast ${index + 1}`, index + 1]
).reverse();

export const metadata: Meta<DaikinToastNotificationManagerStoryArgs> = {
  parameters: {
    docs: {
      source: {
        code: "/* See example above. */",
      },
    },
  },
  component: ({
    itemDuration,
    isVrt,
    onClose,
    ...props
  }: DaikinToastNotificationManagerStoryArgs) => {
    const [items, setItems] = useState<[name: string, index: number][]>(
      isVrt ? VRT_ITEMS : []
    );

    const handleClick = useCallback((): void => {
      setItems((items) => {
        const largestIndex = items[0]?.[1] ?? 0;
        // Prepend new item.
        return [[`toast ${largestIndex + 1}`, largestIndex + 1], ...items];
      });
    }, []);

    const handleClose = useCallback((event: ToastCloseEvent): void => {
      const name = event.detail.target.name;

      setItems((items) => items.filter(([itemName]) => itemName != name));
      onClose();
    }, []);

    return (
      <div
        data-testid="toast-notification-container"
        {...(isVrt && {
          style: {
            height: "688px",
          },
        })}
      >
        <ReactDaikinButton onClick={handleClick}>
          View new toast
        </ReactDaikinButton>
        <ReactDaikinToastNotificationManager {...props} onClose={handleClose}>
          {items.map(([itemName]) => (
            <ReactDaikinToastNotification
              key={itemName}
              name={itemName}
              status="positive"
              duration={itemDuration ?? null}
              closable
            >
              <span slot="title">{`New ${itemName}`}</span>
            </ReactDaikinToastNotification>
          ))}
        </ReactDaikinToastNotificationManager>
      </div>
    );
  },
};
