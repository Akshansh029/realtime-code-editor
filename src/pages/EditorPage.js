import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import Client from "../components/Client";
import LanguageSelector from "../components/LanguageSelector";
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
import Editor from "../components/Editor";
import ThemeSelector from "../components/ThemeSelector";

const EditorPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState("dracula");
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (!socketRef.current) {
        // Initialize the socket connection
        socketRef.current = await initSocket();

        // Handle errors
        const handleErrors = (e) => {
          console.error("Socket error:", e);
          toast.error("Socket connection failed. Please try again later.");
          reactNavigator("/");
        };

        socketRef.current.on("connect_error", handleErrors);
        socketRef.current.on("connect_failed", handleErrors);

        // Emit JOIN event
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        // Listen for JOINED event
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== location.state?.username) {
              toast.info(`${username} joined the room.`);
            }
            setClients(clients);

            // Sync code
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
              code: codeRef.current,
              socketId,
            });
          }
        );

        // Listen for DISCONNECTED event
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.info(`${username} left the room.`);
          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        });
      }
    };

    init();

    return () => {
      // Cleanup on component unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current = null;
      }
    };
  }, [roomId, location.state?.username, reactNavigator]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  const leaveRoom = () => {
    reactNavigator("/");
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  // Language update
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
  };

  // Font update
  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  // Theme update
  const handleThemeUpdate = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
  };

  console.log(clients);

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
          onClick={copyRoomId}
        >
          Copy Room Id
        </button>
        <button
          type="button"
          className="border-none p-2 rounded-md text-sm cursor-pointer transition-all ease-in-out duration-200 bg-sky-400 text-black font-bold mb-2 hover:bg-sky-500"
          onClick={leaveRoom}
        >
          Leave
        </button>
      </aside>
      <div className="editor w-full">
        <div className="w-full h-[62px] py-3 px-4 bg-primBg flex gap-2 items-center ">
          <h2 className="text-sm text-slate-400 font-medium ">Languages: </h2>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
          />
          <h2 className="text-sm text-slate-400 font-medium ">Font size: </h2>
          <FontSelector
            fontSize={fontSize}
            handleFontSizeChange={handleFontSizeChange}
          />
          <h2 className="text-sm text-slate-400 font-medium ">Theme: </h2>
          <ThemeSelector theme={theme} handleThemeChange={handleThemeUpdate} />
        </div>
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
          language={selectedLanguage}
          fontSize={fontSize}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default EditorPage;
