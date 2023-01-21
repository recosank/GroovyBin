import React from "react";
import { SiSpotify } from "react-icons/si";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { GrFormAdd } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import LeftSectionItems from "./LeftSectionItems";

let iconStyle = {
  fill: "lightgray",
  borderRadius: "00px",
  fontSize: "26px",
  marginRight: "12px",
};

const LeftSection = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        border: "0px solid white",
        width: "15%",
        padding: "10px 26px",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <SiSpotify
          style={{
            color: "black",
            fill: "white",
            fontSize: "42px",
            marginRight: "5px",
          }}
        />
        <p
          style={{
            letterSpacing: "0.3px",
            fontWeight: "600",
            fontSize: "23px",
          }}
        >
          Spotify
        </p>
      </div>
      <LeftSectionItems title="Home">
        <GrHomeRounded style={iconStyle} />
      </LeftSectionItems>
      <LeftSectionItems title="Search">
        <FiSearch
          style={{
            borderRadius: "00px",
            fontSize: "26px",
            color: "lightgray",
            marginRight: "12px",
          }}
        />
      </LeftSectionItems>
      <LeftSectionItems title="Your Library">
        <VscLibrary
          style={{
            fill: "lightGray",
            borderRadius: "00px",
            fontSize: "26px",
            marginRight: "12px",
          }}
        />
      </LeftSectionItems>
      <div style={{ marginTop: "25px" }}>
        <LeftSectionItems title="Create Playlist">
          <div
            style={{
              backgroundColor: "lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "12px",
            }}
          >
            <GrFormAdd
              style={{
                borderRadius: "00px",
                fontSize: "24px",
              }}
            />
          </div>
        </LeftSectionItems>
        <LeftSectionItems title="Liked Songs">
          <div
            style={{
              backgroundColor: "blue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "12px",
              padding: "6px",
            }}
          >
            <FaHeart
              style={{
                borderRadius: "00px",
                fontSize: "12px",
                color: "white",
                fill: "white",
              }}
            />
          </div>
        </LeftSectionItems>
      </div>
    </div>
  );
};

export default LeftSection;
