import {
  EDITOR_VIDEO_ALLOW,
  EDITOR_VIDEO_TITLE,
} from "../../../constants/myEditor";
import type { VideoComponentProps } from "../../../types/editorTypes";

import styles from "./styles.module.css";

export const EditorVideo = ({ block, contentState }: VideoComponentProps) => {
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  return (
    <div className={styles["video-wrapper"]}>
      <iframe
        className={styles.video}
        src={src}
        title={EDITOR_VIDEO_TITLE}
        allow={EDITOR_VIDEO_ALLOW}
        allowFullScreen
      />
    </div>
  );
};
