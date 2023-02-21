import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LeftSectionItems from "./LeftSectionItems";
import styles from "../../styles/Home.module.css";
import { getSpotifyPlaylistFields } from "../routes/apiFunctions";
import cookie from "js-cookie";
import useSWR from "swr";

import { SiSpotify } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { GrFormAdd } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { SlHome } from "react-icons/sl";
import { BiLibrary } from "react-icons/bi";

const LeftSection = () => {
  const router = useRouter();

  const fetcher = async () => {
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
              fields: "id,name",
            }).then((res) => res);
          })
        );

      return await mapData();
    }
  };
  const { data, error } = useSWR(`api/localPlaylist`, fetcher);

  return (
    <div
      className="pl-7 pt-7 2xl:w-1/6 xl:w-1/5 lg:w-3/12 md:w-4/12 sm:w-2/5 hidden sm:block"
      style={{
        height: "100vh",
        color: "white",
        backgroundColor: "black",
      }}
    >
      <div
        className="mb-9"
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <SiSpotify
          style={{
            color: "black",
            fill: "white",
            fontSize: "39px",
            marginRight: "5px",
          }}
        />
        <p
          className="lg:text-2xl sm:text-xl"
          style={{
            letterSpacing: "0.3px",
            fontWeight: "600",
          }}
        >
          Spotify
        </p>
      </div>
      <LeftSectionItems
        title="Home"
        link="/"
        isActive={router.pathname == "/" && true}
      >
        {router.pathname == "/" ? (
          <GrHomeRounded
            className={`${styles.leftSection__icon}`}
            style={{
              borderRadius: "00px",
              fill: "white",
              color: "blue",
              marginRight: "12px",
            }}
          />
        ) : (
          <SlHome
            className={`${styles.leftSection__icon}`}
            style={{
              borderRadius: "00px",
              marginRight: "12px",
            }}
          />
        )}
      </LeftSectionItems>
      <LeftSectionItems
        title="Search"
        link="/search"
        isActive={router.pathname == "/search" && true}
      >
        <FiSearch
          className={`${router.pathname == "/search" && "fill-white"} `}
          style={{
            borderRadius: "00px",
            fontSize: "26px",
            marginRight: "12px",
          }}
        />
      </LeftSectionItems>
      <LeftSectionItems
        title="Your Library"
        link="/collection/playlists"
        isActive={router.pathname == "/collection/playlists" && true}
      >
        {router.pathname == "/collection/playlists" ? (
          <BiLibrary
            style={{
              borderRadius: "00px",
              fontSize: "28px",
              color: "white",
              marginRight: "12px",
            }}
          />
        ) : (
          <VscLibrary
            style={{
              borderRadius: "00px",
              fontSize: "26px",
              marginRight: "12px",
            }}
          />
        )}
      </LeftSectionItems>
      <div
        style={{
          marginTop: "45px",
          paddingBottom: "12px",
          borderBottom: "0.5px solid #453e3e",
        }}
      >
        <LeftSectionItems title="Create Playlist" link="" disabled={true}>
          <div
            style={{
              backgroundColor: "lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "12px",
            }}
          >
            <GrFormAdd
              style={{
                borderRadius: "00px",
                fontSize: "24px",
              }}
            />
          </div>
        </LeftSectionItems>
        <LeftSectionItems title="Liked Songs" link="/collection/tracks">
          <div
            style={{
              background: `linear-gradient(145deg, rgba(95,73,218,1) 28%, rgba(133,120,194,1) 49%, rgba(154,142,180,1) 55%, rgba(121,149,181,0.9108018207282913) 73%, rgba(182,166,215,1) 84%, rgba(118,44,209,1) 100%, rgba(46,48,48,1) 100%, rgba(255,255,255,0.9836309523809523) 100%)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "12px",
              padding: "6px",
            }}
          >
            <FaHeart
              style={{
                borderRadius: "00px",
                fontSize: "12px",
                color: "white",
                fill: "white",
              }}
            />
          </div>
        </LeftSectionItems>
      </div>
      <div className="mt-3">
        {data?.map((val: any, key: any) => {
          return (
            <p
              key={key}
              className="mt-2"
              style={{ fontSize: "13px", color: "lightgray" }}
              onClick={() => router.push(`/playlist/${val.id}`)}
            >
              {val.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSection;
