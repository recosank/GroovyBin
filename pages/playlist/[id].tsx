import type { GetServerSideProps } from "next";
import React from "react";

import Cookies from "cookies";
import querystring from "querystring";

import axiosClient from "../../src/axiosInterceptor";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import TrackCard from "../../src/Components/TrackCard";

import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

const playlistSelection = ({ Tracks, Images, Description }: any) => {
  console.log(Description);
  return (
    <GroovyLayout source="/">
      <div
        style={{
          marginTop: "8%",
          height: "80vh",
          border: "0px solid red",
        }}
      >
        <PlaylistBanner data={Images[0].url} descp={Description} />
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
        <div
          style={{
            border: "0px solid red",
            display: "grid",
            marginTop: "3%",
            gridTemplateColumns: "2% 40% 25% 25% 5%",
            gridTemplateRows: "auto",
            alignItems: "center",
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
          <p
            style={{ color: "whitesmoke", fontWeight: "300", fontSize: "16px" }}
          >
            DATE ADDED
          </p>
          <p style={{ textAlign: "right" }}>
            <BsClockHistory style={{ color: "white" }} />
          </p>
          {Tracks.items.map((val: any, key: any) => {
            return <TrackCard key={key} data={val} ind={key} />;
          })}
        </div>
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
      reqq: context.req,
      ress: context.res,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });

  //@ts-ignore
  const getImage = await axiosClient({
    method: "get",
    url: `/v1/playlists/${context.params?.id}/images`,
    extraParams: {
      reqq: context.req,
      ress: context.res,
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
      reqq: context.req,
      ress: context.res,
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
