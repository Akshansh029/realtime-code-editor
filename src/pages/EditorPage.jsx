import React, { useState } from "react";
import Logo from "../components/Logo";
import Client from "../components/Client";
import CodeEditor from "../components/Editor";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../constants";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Akshansh S" },
    { socketId: 2, username: "Kanizah B" },
    { socketId: 2, username: "Aditya K" },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [value, setValue] = useState("");

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage]);
  };

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
      <div className="editor w-full">
        <div className="w-full h-fit py-3 px-4 bg-primBg flex gap-2 items-center ">
          <h2 className="text-base text-slate-400 font-medium ">Languages: </h2>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
        <CodeEditor
          selectedLanguage={selectedLanguage}
          value={value}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

export default EditorPage;
