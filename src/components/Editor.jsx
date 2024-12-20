import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [value, setvalue] = useState("");
  const editorRef = useRef(null);
  useEffect(() => {}, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="">
      <Editor
        height="100vh"
        theme="vs-dark"
        value={value}
        onChange={(value) => setvalue(value)}
        defaultLanguage="javascript"
        defaultValue="// Write your code here..."
        onMount={onMount}
      />
    </div>
  );
};

export default CodeEditor;
