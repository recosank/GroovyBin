import React from "react";
import Image from "next/image";

import { SiSpotify } from "react-icons/si";

const PlaylistBanner = ({ data, descp }: any) => {
  return (
    <div
      className="drop-shadow-2xl"
      style={{
        height: "30vh",
        boxShadow: "50px 7px 80px 10px rgb(56,89,196)",
        paddingLeft: "2%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        paddingBottom: "1.8%",
        borderBottom: "0px solid white",
      }}
    >
      <div style={{ position: "relative", width: "15%", height: "100%" }}>
        <Image src={data} fill alt="korn album" />
      </div>
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <p
          className="text-white"
          style={{ margin: "0px", padding: "0px", fontSize: "13px" }}
        >
          PLAYLIST
        </p>
        <p
          className="text-white"
          style={{
            margin: "0px",
            padding: "0px",
            lineHeight: "100px",
            fontSize: "60px",
            marginBottom: "19px",
            fontWeight: "600",
          }}
        >
          {descp.name}
        </p>
        <p
          style={{
            margin: "0px",
            padding: "0px",
            color: "lightgray",
            fontSize: "17px",
            marginBottom: "8px",
          }}
        >
          {descp.description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SiSpotify
            style={{
              color: "green",
              fill: "green",
              fontSize: "27px",
              marginRight: "5px",
            }}
          />
          <p
            className="text-white font-bold"
            style={{
              fontSize: "15px",
            }}
          >
            Spotify
          </p>
          <span
            className="mx-2"
            style={{
              height: "4px",
              width: "4px",
              borderRadius: "100px",
              backgroundColor: "white",
            }}
          ></span>

          <p
            className="text-white p-0 m-0"
            style={{
              fontSize: "15.5px",
            }}
          >
            50 songs,
          </p>
          <p
            style={{
              fontSize: "15.5px",
              padding: "0px",
              margin: "0px",
              color: "lightgray",
            }}
          >
            &nbsp;about 2 hr 15 min
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistBanner;
