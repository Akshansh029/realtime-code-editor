import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import Client from "../components/Client";
import CodeEditor from "../components/Editor";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import FontSelector from "../components/FontSelector";
import { initSocket } from "../socket";
import ACTIONS from "../Action";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";

const EditorPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [value, setValue] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigate = useNavigate();
  const [clients, setClients] = useState([]);
  const shownToasts = useRef(new Set());

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connected failed, try again later.");
        reactNavigate("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listen for JOINED event
      const onJoined = ({ clients, username, socketId }) => {
        if (
          username !== location.state?.username &&
          !shownToasts.current.has(username)
        ) {
          toast.success(`${username} joined the room.`);
          shownToasts.current.add(username);
        }

        // Ensure clients list has unique entries
        const uniqueClients = clients.filter(
          (client, index, self) =>
            index === self.findIndex((c) => c.username === client.username)
        );

        setClients(uniqueClients); // Update state with unique clients
      };

      socketRef.current.on(ACTIONS.JOINED, onJoined);

      // Cleanup event listeners on unmount
      return () => {
        socketRef.current.off(ACTIONS.JOINED, onJoined);
        socketRef.current.disconnect();
      };
    };
    init();
  }, []);

  console.log(clients);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  // Language update
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage]);
  };

  // Font update
  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
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
          <h2 className="text-base text-slate-400 font-medium ">Font size: </h2>
          <FontSelector
            fontSize={fontSize}
            handleFontSizeChange={handleFontSizeChange}
          />
        </div>
        <CodeEditor
          fontSize={fontSize}
          selectedLanguage={selectedLanguage}
          value={value}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

export default EditorPage;
