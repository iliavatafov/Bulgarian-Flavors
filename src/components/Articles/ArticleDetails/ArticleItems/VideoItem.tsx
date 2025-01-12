import { FC } from "react";

import { isYouTubeVideo } from "../../../../utils/validations";
import type { RenderVideoProps } from "../../../../types/articlesTypes";

export const VideoItem: FC<RenderVideoProps> = ({ src, key }) => {
  if (isYouTubeVideo(src)) {
    const youtubeEmbedUrl = src.replace(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/,
      "youtube.com/embed/$1"
    );

    return (
      <div key={key} style={{ textAlign: "center", margin: "1em 0" }}>
        <iframe
          width="560"
          height="315"
          src={youtubeEmbedUrl}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ maxWidth: "100%" }}
        ></iframe>
      </div>
    );
  }

  // Render regular videos for non-YouTube URLs
  return (
    <div key={key} style={{ textAlign: "center", margin: "1em 0" }}>
      <video controls style={{ maxWidth: "100%" }}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
