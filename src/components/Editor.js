import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import ACTIONS from "../Action";

const CodeEditor = ({
  socketRef,
  roomId,
  selectedLanguage,
  value,
  setValue,
  fontSize,
}) => {
  const editorRef = useRef(null);

  // Store if the change is from the server to avoid loops
  const skipBroadcast = useRef(false);

  // Handle editor mount
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Handle changes in the editor
  const handleEditorChange = (newValue) => {
    if (skipBroadcast.current) {
      console.log("Local change detected, broadcasting:", newValue);
      skipBroadcast.current = false;
      return; // Skip broadcasting changes received from the server
    }

    setValue(newValue); // Update the local state
    socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: newValue });
    console.log("Emitted code change:", newValue);
  };

  useEffect(() => {
    if (socketRef.current) {
      // Listen for incoming code changes
      const handleCodeChange = ({ code }) => {
        console.log("Received code change:", code);
        if (editorRef.current) {
          skipBroadcast.current = true;
          editorRef.current.setValue(code);
        }
      };

      socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

      // Cleanup listener on component unmount
      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      };
    }
  }, [socketRef]);

  useEffect(() => {
    console.log("Current editor value:", value);
  }, [value]);

  return (
    <Editor
      height="100vh"
      theme="vs-dark"
      value={value}
      onChange={handleEditorChange}
      language={selectedLanguage}
      defaultValue="// Write your code here"
      onMount={onMount}
      options={{
        fontSize,
        minimap: { enabled: true },
      }}
    />
  );
};

export default CodeEditor;

// import React, { useEffect, useRef } from "react";
// import Codemirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import ACTIONS from "../Actions";

// const Editor = ({ socketRef, roomId, onCodeChange }) => {
//   const editorRef = useRef(null);
//   useEffect(() => {
//     async function init() {
//       editorRef.current = Codemirror.fromTextArea(
//         document.getElementById("realtimeEditor"),
//         {
//           mode: { name: "javascript", json: true },
//           theme: "dracula",
//           autoCloseTags: true,
//           autoCloseBrackets: true,
//           lineNumbers: true,
//         }
//       );

//       editorRef.current.on("change", (instance, changes) => {
//         const { origin } = changes;
//         const code = instance.getValue();
//         onCodeChange(code);
//         if (origin !== "setValue") {
//           socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//             roomId,
//             code,
//           });
//         }
//       });
//     }
//     init();
//   }, []);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
//         if (code !== null) {
//           editorRef.current.setValue(code);
//         }
//       });
//     }

//     return () => {
//       socketRef.current.off(ACTIONS.CODE_CHANGE);
//     };
//   }, [socketRef.current]);

//   return <textarea id="realtimeEditor"></textarea>;
// };

// export default Editor;
