import { notification } from "../context/chat.context";

const unReadNotifications = (notifications: notification[]) => {
   return notifications.filter((n) => n.isRead === false);

};

export default unReadNotifications;
