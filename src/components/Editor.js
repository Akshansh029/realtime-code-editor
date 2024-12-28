import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/material.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/moxer.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/zenburn.css";
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

function Editor({
  socketRef,
  roomId,
  onCodeChange,
  language,
  fontSize,
  theme,
}) {
  const editorRef = useRef(null);

  console.log(theme);

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
    <div style={{ height: "calc(100% - 58px)", fontSize: fontSize }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;
