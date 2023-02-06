import type { GetServerSideProps } from "next";
import React from "react";
import CenterSectionCard from "../../src/Components/CenterSectionCard";
import Cookies from "cookies";
import querystring from "querystring";

import axiosClient from "../../src/axiosInterceptor";
import GroovyLayout from "../../src/Layout/GroovyLayout";

import { getSpotifyNewRelease } from "../../src/routes/apiFunctions";

const sectionSelection = ({ Albums }: any) => {
  console.log(Albums);
  return (
    <GroovyLayout source="/">
      <div
        className="grid gap-y-6 gap-x-3 lg:gap-y-8 2xl:grid-cols-8 md:grid-cols-5 lg:grid-cols-6 sm:grid-cols-3 xl:grid-cols-7 grid-cols-4"
        style={{
          marginTop: "8%",
          height: "80vh",
          border: "0px solid red",
        }}
      >
        {Albums.albums.items.map((val: any, ind: number) => {
          return <CenterSectionCard key={ind} val={val} />;
        })}
      </div>
    </GroovyLayout>
  );
};

export default sectionSelection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params?.id);
  const cookieInst = Cookies(context.req, context.res);

  const GetNewReleaseAlbums = await getSpotifyNewRelease({
    tokens: cookieInst.get("access_tkn"),
    cook: cookieInst,
    limit: 50,
  });

  return {
    props: {
      Albums: GetNewReleaseAlbums.data,
    },
  };
};
