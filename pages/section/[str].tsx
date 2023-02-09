import type { GetServerSideProps } from "next";
import React from "react";
import Cookies from "cookies";

import SectionCard from "../../src/Components/SectionCard";
import CenterSectionCard from "../../src/Components/CenterSectionCard";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import {
  getSpotifyFeaturedPlaylist,
  getSpotifyNewRelease,
  getSpotifyCategoryPlaylist,
} from "../../src/routes/apiFunctions";

const sectionSelection = ({ Albums }: any) => {
  const data = Albums.albums ? Albums.albums : Albums.playlists;

  return (
    <GroovyLayout source="/">
      <div
        className="grid gap-y-6 gap-x-3 auto-rows-min lg:gap-y-8 2xl:grid-cols-8 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xl:grid-cols-6 grid-cols-4"
        style={{
          marginTop: "8%",
          height: "80vh",
          border: "0px solid red",
        }}
      >
        {data.items.map((val: any, ind: number) => {
          return <SectionCard key={ind} val={val} />;
        })}
      </div>
    </GroovyLayout>
  );
};

export default sectionSelection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const cookAccessToken = cookieInst.get("access_tkn");

  const CIDs = ["toplists", "0JQ5DAqbMKFGvOw3O4nLAf", "0JQ5DAqbMKFy78wprEpAjl"];

  let GetNewReleaseAlbums: any;

  switch (context.params?.str) {
    case "new-releases":
      GetNewReleaseAlbums = await getSpotifyNewRelease({
        tokens: cookAccessToken,
        cook: cookieInst,
        limit: 50,
      });
      break;

    case "featured-playlists":
      GetNewReleaseAlbums = await getSpotifyFeaturedPlaylist({
        tokens: cookAccessToken,
        cook: cookieInst,
        limit: 50,
      });
      break;

    case "trending-now":
      GetNewReleaseAlbums = await getSpotifyCategoryPlaylist({
        tokens: cookAccessToken,
        cook: cookieInst,
        limit: 50,
        Cid: CIDs[0],
      });
      break;
    case "K-Pop":
      GetNewReleaseAlbums = await getSpotifyCategoryPlaylist({
        tokens: cookAccessToken,
        cook: cookieInst,
        limit: 9,
        Cid: CIDs[1],
      });
    case "Folk-&-Acoustic":
      GetNewReleaseAlbums = await getSpotifyCategoryPlaylist({
        tokens: cookAccessToken,
        cook: cookieInst,
        limit: 9,
        Cid: CIDs[2],
      });
    default:
      GetNewReleaseAlbums = await getSpotifyNewRelease({
        tokens: cookAccessToken,
        cook: cookieInst,
        limit: 50,
      });
      break;
  }

  return {
    props: {
      Albums: GetNewReleaseAlbums.data,
    },
  };
};