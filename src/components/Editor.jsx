import React, { useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ selectedLanguage, value, setValue, fontSize }) => {
  const editorRef = useRef(null);

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
        onChange={(value) => setValue(value)}
        language={selectedLanguage}
        defaultValue="// Write your code here"
        onMount={onMount}
        options={{
          fontSize,
          minimap: { enabled: true },
        }}
      />
    </div>
  );
};

export default CodeEditor;
