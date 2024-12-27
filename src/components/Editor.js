import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/php/php";
import "codemirror/mode/go/go";
import "codemirror/mode/xml/xml";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import CodeMirror from "codemirror";
import ACTIONS from "../Action";

function Editor({ socketRef, roomId, onCodeChange, language, fontSize }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: language, json: true }, // Ensure the language passed is supported
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current = editor;

      editor.setSize(null, "100%");
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
    };
  }, [language]); // Reinitialize editor when language changes

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return (
    <div style={{ height: "600px", fontSize: fontSize }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;
