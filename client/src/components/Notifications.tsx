import { Badge } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext, notification } from "../context/chat.context";
import { AuthContext } from "../context/auth.context";
import unReadNotifications from "../utils/unReadNotifications";
import moment from "moment";

export default function Notifications() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const {
    notifications,
    allUsers,
    userChats,
    markAllNotificationAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const unReadNotification = unReadNotifications(notifications);
  const modifiedUnReadNotification = notifications.map((n: notification) => {
    const sender = allUsers.find((user: any) => user._id == n.senderId);

    return {
      ...n,
      senderName: sender.name,
    };
  });

  return (
    <>
      <a
        className="text-light text-decoration-none d-flex align-items-center me-1 position-relative"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        style={{ cursor: "pointer" }}
      >
        {unReadNotification?.length !== 0 ? (
          <Badge badgeContent={unReadNotification?.length} color="primary">
            <span className="material-symbols-outlined">chat</span>
          </Badge>
        ) : (
          <span className="material-symbols-outlined">chat</span>
        )}

        {/* <Badge
          bg="danger"
          className="ms-1 position-absolute top-0 start-50 end-0 translate-middle-x p-0 notification_badge"
        >
          {2}
        </Badge> */}
      </a>
      {isNotificationOpen && (
        <div className="notifications-box" data-aos="zoom-in">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationAsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>
          <hr />
          {modifiedUnReadNotification.length == 0 ? (
            <span className="notification text-center">
              No new notification
            </span>
          ) : null}
          {modifiedUnReadNotification &&
            modifiedUnReadNotification.map(
              (notification: any, index: number) => (
                <>
                  <div
                    key={index}
                    className={
                      notification.isRead
                        ? "notification"
                        : "notification not-read"
                    }
                    // style={{
                    //   marginBottom:
                    //     index === modifiedUnReadNotification.length - 1 ? 0 : 0,
                    // }}
                    onClick={() => {
                      markNotificationAsRead(
                        notification,
                        user,
                        userChats,
                        notifications
                      );
                      setIsNotificationOpen(false);
                    }}
                  >
                    <span>
                      <strong>{notification.senderName}</strong>
                      {` sent you a new message`}
                    </span>
                    <span className="notification-time">
                      {moment(notification.date).calendar()}
                    </span>
                  </div>
                  <hr />
                </>
              )
            )}
        </div>
      )}
    </>
  );
}
