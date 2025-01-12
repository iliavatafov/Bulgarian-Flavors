import type { ImageComponentProps } from "../../../types/editorTypes";

import styles from "./styles.module.css";

export const EditorImage = ({ block, contentState }: ImageComponentProps) => {
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  return (
    <div className={styles["image-wrapper"]}>
      <img src={src} alt="DraftJS" className={styles.image} />
    </div>
  );
};
