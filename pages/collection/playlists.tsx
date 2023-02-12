import React, { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import CenterSectionCard from "../../src/Components/CenterSectionCard";
import Cookies from "cookies";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import { getSpotifyPlaylistFields } from "../../src/routes/apiFunctions";
import cookie from "js-cookie";
import {
  getSpotifyTracks,
  getSpotifyAlbums,
} from "../../src/routes/apiFunctions";

const Playlists = ({ Tracks, Albums }: any) => {
  const router = useRouter();
  const [savedPlaylist, setsavedPlaylist] = useState([]);

  const handleHeart = async (id: string) => {
    const data = await getSpotifyPlaylistFields({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
      ids: id,
      fields: "images,name,id,description",
    });
    return data.data;
  };

  useEffect(() => {
    const savedPlaylistData: string[] | null | string =
      localStorage.getItem("playlists");
    if (savedPlaylistData) {
      const playData = JSON.parse(savedPlaylistData);
      const fetchData = async () => {
        const data = playData.map(async (val: string) => {
          const playlistData = await handleHeart(val);
          //@ts-ignore
          setsavedPlaylist((p) => [...p, playlistData]);
        });
      };
      fetchData();
    }
  }, []);

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
        style={{ display: "flex" }}
        onClick={() => router.push("/collection/tracks")}
      >
        <div
          style={{
            width: "35%",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            borderRadius: "10px",
            height: "35vh",
            background: `linear-gradient(145deg, rgba(95,73,218,1) 28%, rgba(133,120,194,1) 49%, rgba(154,142,180,1) 55%, rgba(121,149,181,0.9108018207282913) 73%, rgba(182,166,215,1) 84%, rgba(118,44,209,1) 100%, rgba(46,48,48,1) 100%, rgba(255,255,255,0.9836309523809523) 100%)`,
          }}
        >
          <div
            className="text-white pl-7 mb-7"
            style={{
              width: "100%",
            }}
          >
            {Tracks.items.slice(0, 5).map((val: any, key: any) => {
              let n = val.track.artists[0].name;

              return (
                <React.Fragment key={key}>
                  <span //@ts-ignore
                    before={`${n}`}
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
            {Tracks.items.length} liked songs
          </p>
        </div>
        <div className="grid grid-cols-5 gap-x-6 ml-9 ">
          {savedPlaylist.map((val: any, ind: number) => {
            return <CenterSectionCard key={ind} val={val} />;
          })}
        </div>
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
