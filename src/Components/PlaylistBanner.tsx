import React from "react";
import Image from "next/image";
import korn from "../../public/assests/images/korn.jpg";
import { SiSpotify } from "react-icons/si";

const PlaylistBanner = () => {
  return (
    <div
      style={{
        height: "27vh",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: "15%", height: "100%" }}>
        <Image src={korn} fill alt="korn album" />
      </div>
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <p style={{ margin: "0px", padding: "0px" }}>PLAYLIST</p>
        <h1 style={{ margin: "0px", padding: "0px" }}>This Is Anti-Flag</h1>
        <p style={{ margin: "0px", padding: "0px" }}>
          This is Anti-Flag. The essential tracks, all in one playlist.
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SiSpotify
            style={{
              color: "green",
              fill: "green",
              fontSize: "19px",
              marginRight: "5px",
            }}
          />
          <p>Spotify</p>
          <span
            style={{
              height: "7px",
              width: "7px",
              borderRadius: "100px",
              backgroundColor: "white",
            }}
          ></span>
          <p>13,698 likes</p>
          <span
            style={{
              height: "7px",
              width: "7px",
              borderRadius: "100px",
              backgroundColor: "white",
            }}
          ></span>
          <p>50 songs,</p>
          <p>about 2 hr 15 min</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistBanner;
