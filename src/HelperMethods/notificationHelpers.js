import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

//Failure Notification
export const failureNotification = () => {
  notifications.show({
    title: "Error",
    icon: <IconX />,
    color: "red",
    message: "Your to do could'nt be added due to the following reason",
  });
};

//Success Notification
export const successNotification = () => {
  notifications.show({
    title: "Success",
    icon: <IconCheck />,
    color: "green",
    message: "Your to do has been added!",
  });
};
