import React, { useState } from "react";
import Logo from "../components/Logo";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Akshansh S" },
    { socketId: 2, username: "Kanizah B" },
    { socketId: 2, username: "Aditya K" },
  ]);

  return (
    <div className="w-full flex h-[100vh] ">
      <aside className="bar w-[25%] bg-primBg p-4 text-white flex flex-col">
        <div className="barInner flex-1">
          <Logo className="border-b-[1px] border-gray-600" />
          <h3 className="text-semibold text-white text-lg font-semibold mb-2">
            Connected
          </h3>
          <div className="clientList flex items-center flex-wrap gap-5 font-semibold">
            {clients.map((client) => (
              <Client username={client.username} key={client.socketId} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="border-none p-2 rounded-md text-sm cursor-pointer transition-all ease-in-out duration-200 bg-neutral-100 text-black font-bold mb-2 hover:bg-neutral-300"
        >
          Copy Room Id
        </button>
        <button
          type="button"
          className="border-none p-2 rounded-md text-sm cursor-pointer transition-all ease-in-out duration-200 bg-sky-400 text-black font-bold mb-2 hover:bg-sky-500"
        >
          Leave
        </button>
      </aside>
      <div className="editor bg-red-500 w-full">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
