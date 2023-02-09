import type { GetServerSideProps } from "next";
import React from "react";
import cookie from "js-cookie";
import Cookies from "cookies";
import querystring from "querystring";

import axiosClient from "../../src/axiosInterceptor";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import TrackCard from "../../src/Components/TrackCard.d";
import { addSpotifyAlbums } from "../../src/routes/apiFunctions";
import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

const playlistSelection = ({ Tracks, Images, Description }: any) => {
  const handleHeart = async () => {
    let data = localStorage.getItem("playlists");
    if (data) {
      const parsedDta = JSON.parse(data);
      const plData = [...parsedDta, Description.id];
      localStorage.setItem("playlists", JSON.stringify(plData));
    } else {
      const plData: any = [];
      plData.push(Description.id);
      localStorage.setItem("playlists", JSON.stringify(plData));
    }
  };

  console.log(Description.id);
  return (
    <GroovyLayout source="/">
      <div
        style={{
          height: "100vh",
          border: "0px solid red",
          position: "absolute",
          top: "0",
          background:
            "linear-gradient(180deg, rgba(56,89,196,1) 23%, rgba(51,60,171,0.01724439775910369) 56%)",
          paddingTop: "5%",
          right: "0",
          left: "14.4%",
        }}
      >
        <PlaylistBanner data={Images[0].url} descp={Description} />
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
            onClick={handleHeart}
          />
          <AiOutlineEllipsis style={{ color: "gray", fontSize: "37px" }} />
        </div>
        <div
          style={{
            border: "0px solid red",
            display: "grid",
            marginTop: "3%",
            gridTemplateColumns: "2% 50% 35%  10%",
            alignItems: "center",
            paddingLeft: "2%",
            rowGap: "12px",
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

          <p className="text-right" style={{ marginLeft: "91%" }}>
            <BsClockHistory style={{ color: "white" }} />
          </p>
        </div>
        <div
          className="mt-2"
          style={{ width: "100%", height: "2px", backgroundColor: "black" }}
        ></div>
        {Tracks.items.map((val: any, key: any) => {
          return (
            <TrackCard key={key} trackData={val} ind={key} type="playlist" />
          );
        })}
      </div>
    </GroovyLayout>
  );
};

export default playlistSelection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params?.id);
  const cookieInst = Cookies(context.req, context.res);

  //@ts-ignore
  const getTracks = await axiosClient({
    method: "get",
    url: `/v1/playlists/${context.params?.id}/tracks`,
    extraParams: {
      cook: cookieInst,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });

  //@ts-ignore
  const getImage = await axiosClient({
    method: "get",
    url: `/v1/playlists/${context.params?.id}/images`,
    extraParams: {
      cook: cookieInst,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });

  //@ts-ignore
  const getDescription = await axiosClient({
    method: "get",
    url:
      `/v1/playlists/${context.params?.id}?` +
      querystring.stringify({
        fields: "description%2Cname",
      }),
    extraParams: {
      cook: cookieInst,
      aToken: cookieInst.get("access_tkn"),
    },
  });

  return {
    props: {
      Tracks: getTracks.data,
      Images: getImage.data,
      Description: getDescription.data,
    },
  };
};
