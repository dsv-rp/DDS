import { DaikinToastNotificationManager } from "#package/components/toast-notification-manager/daikin-toast-notification-manager";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React, { useState } from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import { ReactDaikinToastNotification } from "../../toast-notification/stories/framework-react";
import {
  type DaikinToastNotificationManagerStoryArgs,
  type ToastCloseEvent,
} from "./common";

const ReactDaikinToastNotificationManager = createComponent({
  tagName: "daikin-toast-notification-manager",
  elementClass: DaikinToastNotificationManager,
  react: React,
  events: {
    onClose: "close" as EventName<ToastCloseEvent>,
  },
});

const vrtItems = [...Array(3).keys()].map((item) => `toast ${item + 1}`);

export const metadata: Meta<DaikinToastNotificationManagerStoryArgs> = {
  component: ({
    isVrt,
    onClose,
    ...props
  }: DaikinToastNotificationManagerStoryArgs) => {
    const positionY: "top" | "bottom" = props.position.startsWith("top")
      ? "top"
      : "bottom";

    const [index, setIndex] = useState<number>(0);
    const [items, setItems] = useState<string[]>([]);

    const resultItems = isVrt
      ? positionY === "top"
        ? vrtItems.reverse()
        : vrtItems
      : items;

    const handleClick = () => {
      const newIndex = index + 1;

      setItems(
        positionY === "top"
          ? [`toast ${newIndex}`, ...items]
          : [...items, `toast ${newIndex}`]
      );
      setIndex(newIndex);
    };

    const handleClose = (event: ToastCloseEvent) => {
      const name = event.detail.target.name;

      setItems(items.filter((item) => item != name));
      onClose();
    };

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
          {resultItems.map((item) => (
            <ReactDaikinToastNotification
              key={item}
              name={item}
              status="positive"
              closable
              style={{ width: "max-content" }}
            >
              <span slot="title">{`New ${item}`}</span>
            </ReactDaikinToastNotification>
          ))}
        </ReactDaikinToastNotificationManager>
      </div>
    );
  },
};
