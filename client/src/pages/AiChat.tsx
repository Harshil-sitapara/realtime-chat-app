import { Stack } from "react-bootstrap";
import Profile from "../assets/profile.svg";
import AiProfile from "../assets/AiProfile.png";
import moment from "moment";

function AiChat() {
  return (
    <>
      <Stack
        direction="horizontal"
        className={`ai-card align-items-center p-2 justify-content-between`}
        role="button"
        data-aos="fade-up"
      >
        <div className="d-flex">
          <div className="me-2 avatar-container">
            <img src={AiProfile} alt="Avatar" height="45px" width="45px" />
          </div>
          <div className="text-content detail-container">
            <div className="name">My AI</div>
            {/* <div className="text">{latestMessage?.text}</div> */}
            <div className="text">Hey AI</div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">
            {moment(new Date()).calendar()}
          </div>
          {/* {particularUserUnreadNotifications.length !== 0 && (
            <div
              className={
                particularUserUnreadNotifications.length !== 0
                  ? "this-user-notifications"
                  : ""
              }
            >
              {particularUserUnreadNotifications &&
                particularUserUnreadNotifications.length}
            </div>
          )} */}
        </div>
      </Stack>
    </>
  );
}

export default AiChat;
