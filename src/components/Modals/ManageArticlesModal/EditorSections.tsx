import { FC } from "react";

import { ErrorMessage } from "formik";
import { Editor } from "draft-js";

import type { EditorSectionProps } from "../../../types/articlesTypes";

import styles from "./styles.module.css";

const EditorSection: FC<EditorSectionProps> = ({
  editorState,
  setEditorState,
  handleKeyCommand,
  textAlignment,
  blockRendererFn,
  editorRef,
  setFieldValue,
}) => {
  return (
    <>
      <div className={styles["editor-container"]}>
        <Editor
          className={styles["editor"]}
          textAlignment={textAlignment}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={(newState: any) => {
            setEditorState(newState);
            setFieldValue("content", newState);
          }}
          blockRendererFn={blockRendererFn}
          ref={editorRef}
          placeholder="Започни статия..."
        />
      </div>
      <ErrorMessage
        name="content"
        component="p"
        className={styles["error-message-content"]}
      />
    </>
  );
};

export default EditorSection;
