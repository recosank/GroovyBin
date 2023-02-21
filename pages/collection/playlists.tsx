import React, { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import cookie from "js-cookie";

import SectionCard from "../../src/Components/SectionCard";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import { getSpotifyPlaylistFields } from "../../src/routes/apiFunctions";
import {
  getSpotifyTracks,
  getSpotifyAlbums,
} from "../../src/routes/apiFunctions";

const Playlists = () => {
  const router = useRouter();

  const playlistFetcher = async () => {
    const savedPlaylistData: any = localStorage.getItem("playlists");
    const playData = JSON.parse(savedPlaylistData);
    if (playData.length >= 1) {
      const mapData = async () =>
        Promise.all(
          playData.map((val: any) => {
            return getSpotifyPlaylistFields({
              cook: cookie,
              tokens: cookie.get("access_tkn"),
              ids: val,
              fields: "images,name,id,description",
            }).then((res) => res);
          })
        );

      return await mapData();
    }
  };

  const tracksFetcher = async () => {
    return getSpotifyTracks({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
    }).then((res) => res.data);
  };

  const albumsFetcher = async () => {
    return getSpotifyAlbums({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
    }).then((res) => res.data);
  };

  const { data: albumsData, error: albumsError } = useSWR(
    `api/localAlbums`,
    albumsFetcher
  );

  const { data: tracksData, error: tracksError } = useSWR(
    `api/localNameTracks`,
    tracksFetcher
  );

  const { data: playlistData, error: playlistError } = useSWR(
    `api/localPlaylists`,
    playlistFetcher
  );

  return (
    <GroovyLayout source="/">
      <p
        className="mb-7 lg:text-2xl text-2xl font-bold"
        style={{
          color: "white",
          fontWeight: "600",
          letterSpacing: "2px",
        }}
      >
        Playlists
      </p>
      <div
        className="grid  2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 gap-x-4 gap-y-5 grid-rows-[repeat(25,_minmax(300px,_1fr))]"
        // style={{ display: "flex" }}
        onClick={() => router.push("/collection/tracks")}
      >
        <div
          className="col-span-2"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            borderRadius: "10px",
            background: `linear-gradient(145deg, rgba(95,73,218,1) 28%, rgba(133,120,194,1) 49%, rgba(154,142,180,1) 55%, rgba(121,149,181,0.9108018207282913) 73%, rgba(182,166,215,1) 84%, rgba(118,44,209,1) 100%, rgba(46,48,48,1) 100%, rgba(255,255,255,0.9836309523809523) 100%)`,
          }}
        >
          <div
            className="text-white pl-7 mb-7"
            style={{
              width: "100%",
            }}
          >
            {tracksData?.items.slice(0, 5).map((val: any, key: any) => {
              let artistName = val.track.artists[0].name;

              return (
                <React.Fragment key={key}>
                  <span //@ts-ignore
                    before={`${artistName}`}
                    className={`before:content-[attr(before)]`}
                    style={{ margin: "0px", padding: "0px", fontSize: "16px" }}
                  ></span>
                  &nbsp;
                  <span
                    style={{ margin: "0px", padding: "0px", fontSize: "16px" }}
                  >
                    {val.track.name}
                  </span>
                  &nbsp;
                  <span
                    className={`before:content-['•']`}
                    style={{ margin: "0px", padding: "0px" }}
                  ></span>
                  &nbsp;
                </React.Fragment>
              );
            })}
            ...
          </div>
          <p className="text-white pl-7 text-4xl font-semibold tracking-wide">
            Liked Songs
          </p>
          <p className="text-white pl-7 my-5">
            {tracksData?.items.length} liked songs
          </p>
        </div>
        {playlistData?.map((val: any, ind: number) => {
          return <SectionCard key={ind} val={val} />;
        })}
      </div>
      <div
        style={{
          backgroundColor: "gray",
          width: "100%",
          marginTop: "3%",
          height: "1px",
        }}
      ></div>
    </GroovyLayout>
  );
};

export default Playlists;
