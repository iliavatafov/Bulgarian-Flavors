import type { LinkProps } from "../../../types/editorTypes";

import styles from "./styles.module.css";

export const EditorLink = ({
  contentState,
  entityKey,
  children,
}: LinkProps) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a
      className={styles.link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
