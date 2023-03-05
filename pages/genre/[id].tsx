import React from "react";
import type { GetServerSideProps } from "next";

import Cookies from "cookies";
import querystring from "querystring";

import GroovyLayout from "../../src/Layout/GroovyLayout";
import SectionCard from "../../src/Components/SectionCard";
import axiosClient from "../../src/axiosInterceptor";

const genreSelection = ({ PlaylistIN, PlaylistDescription }: any) => {
  return (
    <GroovyLayout source="/">
      <div
        style={{
          marginTop: "5%",
          height: "80vh",
        }}
      >
        <h1
          className="lg:text-6xl md:text-5xl sm:text-4xl xs:text-4xl text-3xl mb-3"
          style={{ color: "white", fontWeight: "900" }}
        >
          {PlaylistDescription.name}
        </h1>
        <div>
          <div className="grid grid-rows-[repeat(10,_minmax(300px,_1fr))] gap-y-0 sm:gap-y-6 gap-x-3 auto-rows-min lg:gap-y-8 2xl:grid-cols-7 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xl:grid-cols-6 xs:grid-cols-3 xxs:grid-cols-2">
            {PlaylistIN.items.map((val: any, key: any) => {
              return val && <SectionCard val={val} key={key} type="playlist" />;
            })}
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

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      PlaylistIN: CPlaylistIN.data.playlists,
      PlaylistDescription: CPlaylistDescription.data,
    },
  };
};
