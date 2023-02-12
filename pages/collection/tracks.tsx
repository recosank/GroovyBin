import type { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";

import Cookies from "cookies";
import { getSpotifyTracks } from "../../src/routes/apiFunctions";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import TrackCard from "../../src/Components/TrackCard.d";

import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

const Tracks = ({ Tracks }: any) => {
  return (
    <GroovyLayout source="/">
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100vh",
            border: "0px solid red",
            position: "absolute",
            top: "-142px",
            background:
              "linear-gradient(180deg, rgba(56,89,196,1) 23%, rgba(51,60,171,0.01724439775910369) 56%)",
            paddingTop: "5%",
            right: "-2%",
            left: "-2%",
          }}
        >
          <PlaylistBanner
            data={""}
            descp={{ name: "Liked Songs", description: "" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginTop: "2%",
              paddingLeft: "2%",
            }}
          >
            <div
              className="bg-green-400"
              style={{
                padding: "20px",

                borderRadius: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GrPlayFill style={{ fontSize: "20px" }} />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              marginTop: "3%",
              gridTemplateColumns: "2% 50% 35%  10%",
              alignItems: "center",
              paddingLeft: "2%",
              rowGap: "12px",
            }}
          >
            <p
              style={{
                color: "whitesmoke",
                fontWeight: "300",
                textAlign: "right",
                fontSize: "13px",
              }}
            >
              #
            </p>
            <p
              style={{
                color: "whitesmoke",
                fontWeight: "300",
                fontSize: "12px",
                paddingLeft: "1.5%",
              }}
            >
              TITLE
            </p>
            <p
              style={{
                color: "whitesmoke",
                fontWeight: "300",
                fontSize: "12px",
              }}
            >
              ALBUM
            </p>

            <p className="text-right" style={{ paddingLeft: "50%" }}>
              <BsClockHistory style={{ color: "white", fontSize: "13px" }} />
            </p>
          </div>
          <div
            className="mt-2"
            style={{
              width: "95%",
              height: "2px",
              backgroundColor: "lightgray",
              marginLeft: "2%",
              marginRight: "2%",
            }}
          ></div>
          {Tracks.items.map((val: any, key: any) => {
            return (
              <TrackCard key={key} trackData={val} ind={key} type="playlist" />
            );
          })}
        </div>
      </div>
    </GroovyLayout>
  );
};

export default Tracks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const acs_tkn = cookieInst.get("access_tkn");

  const GetLibraryTracks = await getSpotifyTracks({
    tokens: acs_tkn,
    cook: cookieInst,
  });

  return {
    props: {
      Tracks: GetLibraryTracks.data,
    },
  };
};
