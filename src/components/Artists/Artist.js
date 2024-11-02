import React from "react";

const Artist = ({ artists, category, inline = false }) => {
  let artistType = null;
  const artistsToDisplay = inline ? (
    <div>
      {artists &&
        artists.map((art, idx) => (
          <span key={idx}>{`${art}${
            idx !== artists.length - 1 ? ", " : ""
          }`}</span>
        ))}
    </div>
  ) : (
    <ul style={{ textAlign: "left" }}>
      {artists && artists.map((artist, idx) => <li key={idx}>{artist}</li>)}
    </ul>
  );

  switch (category) {
    case "friday_party":
      artistType = "DJs:";
      break;
    case "saturday_concert":
      artistType = "Bands:";
      break;
    case "learning_session":
      artistType = "Host:";
      break;

    // no default
  }

  return (
    <>
      <span
        style={{
          display: "block",
          fontWeight: "bold",
          color: "#16878c",
        }}
      >
        {" "}
        {artistType}
      </span>
      {artistsToDisplay}
    </>
  );
};

export default Artist;
