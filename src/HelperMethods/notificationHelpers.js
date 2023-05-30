import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

//Failure Notification
export const failureNotification = (message) => {
  notifications.show({
    title: "Error",
    icon: <IconX />,
    color: "red",
    message: message,
  });
};

//Success Notification
export const successNotification = (message) => {
  notifications.show({
    title: "Success",
    icon: <IconCheck />,
    color: "green",
    message: message,
  });
};
