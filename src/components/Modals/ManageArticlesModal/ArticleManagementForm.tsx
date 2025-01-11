import { FC, useRef } from "react";
import useEditorActions from "../../../hooks/useEditor";
import { useArticleManagementForm } from "../../../hooks/useArticleManagementForm";

import { Form, Formik } from "formik";

import {
  articleManagementValidationSchema,
  CREATE_ARTICLE_FORM_SCHEMA,
} from "../../../constants/schemas/createArticleSchemas";
import {
  CREATE_BUTTON_TEXT,
  UPDATE_BUTTON_TEXT,
} from "../../../constants/createArticle";
import type { ArticleManagementFormProps } from "../../../types/articlesTypes";

import { Button } from "../../Button";
import { FormField } from "./FormField";
import { ActionBar } from "./ActionBar";

import styles from "./styles.module.css";
import "draft-js/dist/Draft.css";
import { EditorSection } from "./EditorSections";

export const ArticleManagementForm: FC<ArticleManagementFormProps> = ({
  isEdit,
  articleId,
  section,
}) => {
  const editor = useRef<any>(null);

  const {
    editorState,
    handleKeyCommand,
    textAlignment,
    actions,
    setEditorState,
    blockRendererFn,
    decorator,
  } = useEditorActions();

  const { inputValues, handleSubmit } = useArticleManagementForm({
    articleId,
    section,
    isEdit,
    editor,
    editorState,
    setEditorState,
    decorator,
  });

  return (
    <Formik
      initialValues={inputValues}
      validationSchema={articleManagementValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
      context={{ editorState }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles["form-container"]}>
          <div className={styles["inner-form-container"]}>
            {CREATE_ARTICLE_FORM_SCHEMA.map((field) => (
              <div key={field.name} className={styles[field.class]}>
                <FormField
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  label={field.label}
                  options={field.options}
                  className="form-input"
                />
              </div>
            ))}
          </div>
          <ActionBar actions={actions} />
          <EditorSection
            editorState={editorState}
            setEditorState={setEditorState}
            handleKeyCommand={handleKeyCommand}
            textAlignment={textAlignment}
            blockRendererFn={blockRendererFn}
            editorRef={editor}
            setFieldValue={setFieldValue}
          />
          <Button
            type="submit"
            value={isEdit ? UPDATE_BUTTON_TEXT : CREATE_BUTTON_TEXT}
            color="green-cyan"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
