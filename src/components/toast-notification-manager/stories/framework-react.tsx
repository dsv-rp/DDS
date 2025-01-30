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
    itemDuration,
    isVrt,
    onClose,
    ...props
  }: DaikinToastNotificationManagerStoryArgs) => {
    const [index, setIndex] = useState<number>(0);
    const [items, setItems] = useState<string[]>(isVrt ? vrtItems : []);

    const handleClick = () => {
      const newIndex = index + 1;

      setItems((items) => [`toast ${newIndex}`, ...items]);
      setIndex(() => newIndex);
    };

    const handleClose = (event: ToastCloseEvent) => {
      const name = event.detail.target.name;

      setItems((items) => items.filter((item) => item != name));
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
          {items.map((item: string) => (
            <ReactDaikinToastNotification
              key={item}
              name={item}
              status="positive"
              duration={itemDuration ?? null}
              closable
            >
              <span slot="title">{`New ${item}`}</span>
            </ReactDaikinToastNotification>
          ))}
        </ReactDaikinToastNotificationManager>
      </div>
    );
  },
};
