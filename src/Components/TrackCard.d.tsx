//@ts-nocheck
import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import tracks from "../../public/assests/images/tracks.jpg";
import cookie from "js-cookie";

import { FaPlay } from "react-icons/fa";
import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { addSpotifyTracks } from "../routes/apiFunctions";

const millisToMinutesAndSeconds = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const TrackCard = ({ trackData, ind, type }: any) => {
  const data = type == "album" ? trackData : trackData.track;
  const [hover, setHover] = useState(false);
  const nestedPlaylistData =
    type === "album" ? trackData : trackData.track.album;

  let timee = millisToMinutesAndSeconds(data.duration_ms);
  const handleHeart = async () => {
    const data = await addSpotifyTracks({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
      ids: trackData.track.id,
    });
  };

  return (
    <div
      className="hover:bg-gray-800"
      style={{
        border: "0px solid red",
        display: "grid",
        marginTop: "1%",
        width: "100%",
        gridTemplateColumns: "2% 50% 35%  10%",
        alignItems: "center",
        paddingLeft: "2%",
        rowGap: "12px",
      }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      {hover ? (
        <FaPlay style={{ fill: "white", color: "white" }} />
      ) : (
        <p style={{ color: "white" }}>{ind + 1}</p>
      )}
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
            src={type == "album" ? tracks : nestedPlaylistData.images[0].url}
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
            {data.name}
          </p>
          <p style={{ margin: "0px", padding: "0px", color: "gray" }}>
            {nestedPlaylistData.artists[0].name}
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
        {nestedPlaylistData.name}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {hover ? (
          <>
            <TfiHeart
              className={styles.heart}
              style={{ marginRight: "15px", fontSize: "19px" }}
              onClick={handleHeart}
            />

            <p
              className="mx-2"
              style={{ textAlign: "right", color: "lightgray" }}
            >
              {timee}
            </p>
            <AiOutlineEllipsis style={{ fontSize: "19px" }} />
          </>
        ) : (
          <p style={{ textAlign: "right", color: "lightgray" }}>{timee}</p>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
