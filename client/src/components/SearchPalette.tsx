import React, { Profiler, useContext } from "react";
import { Stack } from "react-bootstrap";
import { ChatContext } from "../context/chat.context";

export default function SearchPalette() {
  const data = [{ name: "Test1" }, { name: "Test2" }, { name: "Test2" }];
  const { potentialChats, createChat } = useContext(ChatContext);
  return (
    <>
      <div className="main-search-palette">
        <div className="search-chat">
          {potentialChats?.map((user: any, index: number) => (
            <Stack
              direction="horizontal"
              className={`user-search-card align-items-center p-2 justify-content-between ${
                index === 0 ? "first-search-chat" : ""
              }`}
              role="button"
            >
              <div className="d-flex">
                <div className="me-2 avatar-search-container">
                  <img
                    src={
                      "https://avatar.iran.liara.run/public/boy?username=Ash"
                    }
                    alt="Avatar"
                    height="35px"
                  />
                </div>
                <div className="text-search-content detail-search-container">
                  <div className="search-name">{user.name}</div>
                  <div className="search-text">Start chat</div>
                </div>
              </div>
              {/* <div className="d-flex flex-column align-items-end">
              <div className="date">12/12/2023</div>
              <div className="this-user-notifications">2</div>
            </div> */}
            </Stack>
          ))}
        </div>
      </div>
    </>
  );
}
