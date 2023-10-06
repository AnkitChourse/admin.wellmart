import React, { useState } from "react";
import PropTypes from "prop-types";
import SkLoading from "components/SkLoading";
import MDBox from "components/MDBox";
const VideoPlayer = ({ value }) => {
  const [isVideoError, setIsVideoError] = useState(false);
  const getYouTubeEmbedUrl = (videoLink) => {
    if (videoLink?.includes("youtu.be")) {
      // Convert youtu.be link to embed link
      const videoId = videoLink?.split("/").pop();
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
    return videoLink;
  };

  const embedUrl = getYouTubeEmbedUrl(value);
  // console.log(embedUrl, "embedUrl");
  // console.log(value, "value");
  return (
    <div>
      {isVideoError ? (
        <MDBox
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "auto",
            maxHeight: "250px",
          }}
        >
          <img
            src={require("./no-result.gif")}
            style={{ height: "100%", width: "100%" }}
            alt="error"
          />
        </MDBox>
      ) : (
        <iframe
          src={embedUrl}
          title="Video Player"
          style={{ width: "100%", height: "250px" }}
          frameBorder="5"
          allowFullScreen
          onError={(e) => {
            setIsVideoError(true);
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
VideoPlayer.propTypes = {
  value: PropTypes.string.isRequired,
};

// <iframe
//   width={200}
//   height={200}
//   // src={youtubeEmbedUrl}
//   title="YouTube Video"
//   allowFullScreen
// ></iframe>;

// {
//   /* Instagram Post */
// }
// <iframe
//   // src={instagramEmbedUrl}
//   width={200}
//   height={200}
//   frameBorder="0"
//   scrolling="no"
//   // allowtransparency="true"
//   allow="encrypted-media"
// ></iframe>;
{
  /* <iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/ZdwNdlKnWS4"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>; */
}
