import React from "react";
import type { GetServerSideProps } from "next";

import Cookies from "cookies";
import querystring from "querystring";

import GroovyLayout from "../../src/Layout/GroovyLayout";
import CenterSectionItems from "../../src/Components/CenterSectionItems";
import CenterSectionCard from "../../src/Components/CenterSectionCard";
import axiosClient from "../../src/axiosInterceptor";

const genreSelection = ({ PlaylistIN, PlaylistDescription }: any) => {
  console.log(PlaylistIN);
  console.log(PlaylistDescription);
  return (
    <GroovyLayout source="/">
      <div
        style={{
          marginTop: "8%",
          height: "80vh",
        }}
      >
        <h1 style={{ color: "white", fontSize: "95px", fontWeight: "900" }}>
          {PlaylistDescription.name}
        </h1>
        <div>
          {/* <CenterSectionItems title="Popular Punk playlists" /> */}
          {/* <CenterSectionItems title="Felt Emo Might Delete" />
          <CenterSectionItems title="Punk Rock honchos" /> */}
          <div
            style={{
              display: "grid",
              rowGap: "20px",
              columnGap: "20px",
              grid: "auto / 11% 11% 11% 11% 11% 11% 11% 11% ",
            }}
          >
            {PlaylistIN.items.map((val: any, key: any) => (
              <CenterSectionCard val={val} key={key} type="playlist" />
            ))}
          </div>
        </div>
      </div>
    </GroovyLayout>
  );
};

export default genreSelection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params?.id);
  const cookieInst = Cookies(context.req, context.res);

  let CId = context.params?.id;

  //@ts-ignore
  const CPlaylistIN = await axiosClient({
    method: "get",
    url:
      `/v1/browse/categories/${CId}/playlists?` +
      querystring.stringify({
        country: "IN",
        limit: 50,
      }),
    extraParams: {
      cook: cookieInst,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });

  //@ts-ignore
  const CPlaylistDescription = await axiosClient({
    method: "get",
    url:
      `/v1/browse/categories/${CId}?` +
      querystring.stringify({
        country: "IN",
        limit: 8,
      }),
    extraParams: { cook: cookieInst, aToken: cookieInst.get("access_tkn") },
    withCredentials: true,
  });

  return {
    props: {
      PlaylistIN: CPlaylistIN.data.playlists,
      PlaylistDescription: CPlaylistDescription.data,
    },
  };
};
