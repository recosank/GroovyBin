import React from "react";
import LeftSectionItems from "./LeftSectionItems";

import { SiSpotify } from "react-icons/si";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { GrFormAdd } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";

let iconStyle = {
  fill: "lightgray",
  borderRadius: "00px",
  fontSize: "26px",
  marginRight: "12px",
};

const LeftSection = () => {
  return (
    <div
      className="pl-7 pt-7 2xl:w-1/6 xl:w-1/5 lg:w-3/12 md:w-4/12 sm:w-2/5 hidden sm:block"
      style={{
        height: "100vh",
        color: "white",
        border: "0px solid white",

        backgroundColor: "black",
      }}
    >
      <div
        className="mb-7"
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <SiSpotify
          style={{
            color: "black",
            fill: "white",
            fontSize: "39px",
            marginRight: "5px",
          }}
        />
        <p
          className="lg:text-2xl sm:text-xl"
          style={{
            letterSpacing: "0.3px",
            fontWeight: "600",
          }}
        >
          Spotify
        </p>
      </div>
      <LeftSectionItems title="Home" link="/">
        <GrHomeRounded style={iconStyle} />
      </LeftSectionItems>
      <LeftSectionItems title="Search" link="/search">
        <FiSearch
          style={{
            borderRadius: "00px",
            fontSize: "26px",
            color: "lightgray",
            marginRight: "12px",
          }}
        />
      </LeftSectionItems>
      <LeftSectionItems title="Your Library" link="/collection/playlists">
        <VscLibrary
          style={{
            fill: "lightGray",
            borderRadius: "00px",
            fontSize: "26px",
            marginRight: "12px",
          }}
        />
      </LeftSectionItems>
      <div
        style={{
          marginTop: "25px",
          paddingBottom: "12px",
          borderBottom: "0.5px solid #453e3e",
        }}
      >
        <LeftSectionItems title="Create Playlist" link="collection/playlists">
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
        <LeftSectionItems title="Liked Songs" link="collection/playlists">
          <div
            style={{
              background: `linear-gradient(145deg, rgba(95,73,218,1) 28%, rgba(133,120,194,1) 49%, rgba(154,142,180,1) 55%, rgba(121,149,181,0.9108018207282913) 73%, rgba(182,166,215,1) 84%, rgba(118,44,209,1) 100%, rgba(46,48,48,1) 100%, rgba(255,255,255,0.9836309523809523) 100%)`,
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
