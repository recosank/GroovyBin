import type { GetServerSideProps } from "next";
import React from "react";

import Cookies from "cookies";
import querystring from "querystring";

import axiosClient from "../../src/axiosInterceptor";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import TrackCard from "../../src/Components/TrackCard.d";

import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";
import {
  getSpotifyAlbumDescription,
  getSpotifyAlbumTracks,
} from "../../src/routes/apiFunctions";

const albumSelection = ({ Description, Tracks }: any) => {
  console.log(Tracks);
  return (
    <GroovyLayout source="/">
      <div
        style={{
          //marginTop: "8%",
          height: "100vh",
          border: "0px solid red",
          position: "absolute",
          top: "0",
          background:
            "linear-gradient(180deg, rgba(56,89,196,1) 23%, rgba(51,60,171,0.01724439775910369) 56%)",
          paddingTop: "5%",

          right: "0",
          left: "14%",
        }}
      >
        <PlaylistBanner data={Description.images[0].url} descp={Description} />
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "3%",
            paddingLeft: "2%",
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
        <div
          style={{
            border: "0px solid red",
            display: "grid",
            marginTop: "3%",
            gridTemplateColumns: "2% 50% 35% 10%",
            gridTemplateRows: "auto",
            alignItems: "center",
            rowGap: "12px",
            paddingLeft: "2%",
          }}
        >
          <p
            style={{ color: "whitesmoke", fontWeight: "300", fontSize: "16px" }}
          >
            #
          </p>
          <p
            style={{ color: "whitesmoke", fontWeight: "300", fontSize: "16px" }}
          >
            TITLE
          </p>
          <p
            style={{ color: "whitesmoke", fontWeight: "300", fontSize: "16px" }}
          >
            ALBUM
          </p>

          <p style={{ textAlign: "right" }}>
            <BsClockHistory style={{ color: "white" }} />
          </p>
          {Tracks.items.map((val: any, key: any) => {
            return (
              <TrackCard key={key} trackData={val} ind={key} type="album" />
            );
          })}
        </div>
      </div>
    </GroovyLayout>
  );
};

export default albumSelection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const cookAccessToken = cookieInst.get("access_tkn");

  const GetAlbumTracks = await getSpotifyAlbumTracks({
    tokens: cookAccessToken,
    cook: cookieInst,
    Cid: context.params?.str,
    limit: 50,
  });

  const GetAlbumsDescription = await getSpotifyAlbumDescription({
    tokens: cookAccessToken,
    cook: cookieInst,
    Cid: context.params?.str,
  });

  return {
    props: {
      Description: GetAlbumsDescription.data,
      Tracks: GetAlbumTracks.data,
    },
  };
};
