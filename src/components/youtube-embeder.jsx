import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbeder = ({ youtubeId }) => (
  <div
    style={{
        padding: "2% 5% 5% 5%"
    }}
  >
    <h2>Video mô tả</h2>
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4%"
        }}
    >
        <iframe
            width="80%"
            height="500"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
  </div>
);

YoutubeEmbeder.propTypes = {
  youtubeId: PropTypes.string.isRequired
};

export default YoutubeEmbeder;