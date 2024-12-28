import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "../imports";
import CodeMirror from "codemirror";
import ACTIONS from "../Action";

function Editor({
  socketRef,
  roomId,
  onCodeChange,
  language,
  fontSize,
  theme,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: language, json: true },
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current = editor;

      editor.setSize(null, "100%");
      if (editor) {
        editor.setOption("theme", theme);
      }
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
  }, [language, theme]); // Reinitialize if language/theme changes

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
    <div style={{ height: "calc(100% - 62px)", fontSize: fontSize }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;
