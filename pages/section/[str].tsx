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
        className="grid grid-rows-[repeat(50,_minmax(300px,_1fr))] gap-y-0 sm:gap-y-6 gap-x-3 auto-rows-min lg:gap-y-8 2xl:grid-cols-7 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xl:grid-cols-6 xs:grid-cols-3 xxs:grid-cols-2"
        style={{
          marginTop: "8%",
          height: "80vh",
        }}
      >
        {data.items.map((val: any, ind: number) => {
          return (
            <SectionCard
              key={ind}
              val={val}
              type={Albums.albums ? "album" : "playlist"}
            />
          );
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
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      Albums: GetNewReleaseAlbums.data,
    },
  };
};
