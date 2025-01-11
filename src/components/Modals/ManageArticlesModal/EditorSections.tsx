import { FC } from "react";

import { ErrorMessage } from "formik";
import { Editor } from "draft-js";

import { START_ARTICLE_TEXT } from "../../../constants/createArticle";
import type { EditorSectionProps } from "../../../types/articlesTypes";

import styles from "./styles.module.css";

export const EditorSection: FC<EditorSectionProps> = ({
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
        <div className={styles["editor"]}>
          <Editor
            textAlignment={textAlignment}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={(newState: any) => {
              setEditorState(newState);
              setFieldValue("content", newState);
            }}
            blockRendererFn={blockRendererFn}
            ref={editorRef}
            placeholder={START_ARTICLE_TEXT}
          />
        </div>
      </div>
      <ErrorMessage
        name="content"
        component="p"
        className={styles["error-message-content"]}
      />
    </>
  );
};
