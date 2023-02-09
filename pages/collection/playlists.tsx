import React from "react";
import type {
  NextApiRequest,
  NextApiResponse,
  NextPage,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import Cookies from "cookies";
import querystring from "querystring";
import GroovyLayout from "../../src/Layout/GroovyLayout";

import styles from "../styles/Home.module.css";
import {
  getSpotifyTracks,
  getSpotifyAlbums,
} from "../../src/routes/apiFunctions";

const playlists = ({ Tracks, Albums }: any) => {
  console.log(Albums);
  return (
    <GroovyLayout source="/">
      <p
        className="mb-9 lg:text-2xl text-2xl"
        style={{
          color: "white",
          fontWeight: "600",
          letterSpacing: "2px",
        }}
      >
        Playlists
      </p>
      <div>
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            height: "35vh",
            background: `linear-gradient(145deg, rgba(95,73,218,1) 28%, rgba(133,120,194,1) 49%, rgba(154,142,180,1) 55%, rgba(121,149,181,0.9108018207282913) 73%, rgba(182,166,215,1) 84%, rgba(118,44,209,1) 100%, rgba(46,48,48,1) 100%, rgba(255,255,255,0.9836309523809523) 100%)`,
          }}
        >
          <p className="text-white pl-7 mb-7">
            asdfasddfsfffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffff
          </p>
          <p className="text-white pl-7 text-4xl font-semibold tracking-wide">
            Liked Songs
          </p>
          <p className="text-white pl-7 my-5">14 liked songs</p>
        </div>
      </div>
    </GroovyLayout>
  );
};

export default playlists;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const acs_tkn = cookieInst.get("access_tkn");

  const GetLibraryTracks = await getSpotifyTracks({
    tokens: acs_tkn,
    cook: cookieInst,
  });
  const GetLibraryAlbums = await getSpotifyAlbums({
    tokens: acs_tkn,
    cook: cookieInst,
  });

  return {
    props: {
      Tracks: GetLibraryTracks.data,
      Albums: GetLibraryAlbums.data,
    },
  };
};
