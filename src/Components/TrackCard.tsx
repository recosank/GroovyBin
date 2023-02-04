import React from "react";
import Image from "next/image";

const millisToMinutesAndSeconds = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const TrackCard = ({ data, ind }: any) => {
  let timee = millisToMinutesAndSeconds(data.track.duration_ms);
  return (
    <>
      <p style={{ color: "white" }}>{ind + 1}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          border: "0px solid red",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "7%",
            height: "49px",
            borderRadius: "9px",
          }}
        >
          <Image
            src={data.track.album.images[0].url}
            alt="korn album"
            fill
            style={{
              borderRadius: "9px",
            }}
          />
        </div>
        <div style={{ marginLeft: "9px" }}>
          <p
            style={{
              margin: "0px",
              padding: "0px",
              paddingBottom: "7px",
              color: "gray",
            }}
          >
            {data.track.name}
          </p>
          <p style={{ margin: "0px", padding: "0px", color: "gray" }}>
            {data.track.album.artists[0].name}
          </p>
        </div>
      </div>
      <p
        style={{
          textAlign: "left",
          color: "lightgray",
          paddingRight: "20px",
          lineHeight: "25px",
        }}
      >
        {data.track.album.name}
      </p>
      <p style={{ color: "lightgray" }}>{data.added_at}</p>
      <p style={{ textAlign: "right", color: "lightgray" }}>{timee}</p>
    </>
  );
};

export default TrackCard;
