import React from "react";

type Props = {};

const chats = [
  { user: "User", message: "Hello AI" },
  { user: "AI", message: "I am here to assist you with your queries." },
  { user: "User", message: "What is the weather like today?" },
  { user: "AI", message: "The weather is sunny with a high of 25°C." },
];

const ChatWindow = (props: Props) => {
  return (
    <div className="flex-1 overflow-y-auto rounded-lg shadow-md">
      {chats.map((chat, index) => (
        <div key={index}>
          {chat.user === "User" ? (
            <div className="flex justify-end">
              <div className=" bg-blue-600 p-2 rounded-full mb-2">
                <strong>{chat.user}:</strong> {chat.message}
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="bg-green-600 p-2 rounded-full mb-2">
                <strong>{chat.user}:</strong> {chat.message}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
