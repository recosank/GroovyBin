import React from "react";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrPlayFill } from "react-icons/gr";

const playlistSelection = () => {
  return (
    <GroovyLayout source="/">
      <div
        style={{
          marginTop: "8%",
          height: "80vh",
          border: "0px solid red",
        }}
      >
        <PlaylistBanner />
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "3%",
          }}
        >
          <div
            style={{
              padding: "22px",
              backgroundColor: "green",
              borderRadius: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GrPlayFill style={{ fontSize: "20px" }} />
          </div>
          <TfiHeart
            style={{ color: "gray", fontSize: "33px", margin: "0px 40px" }}
          />
          <AiOutlineEllipsis style={{ color: "gray", fontSize: "37px" }} />
        </div>
      </div>
    </GroovyLayout>
  );
};

export default playlistSelection;
