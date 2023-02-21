//@ts-nocheck
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import tracks from "../../public/assests/images/tracks.jpg";
import cookie from "js-cookie";
import { millisToMinutesAndSeconds } from "../utility/helper";
import {
  addSpotifyTracks,
  checkUserSavedTracks,
  deleteUserSavedTracks,
} from "../routes/apiFunctions";

import { FaPlay } from "react-icons/fa";
import { TfiHeart } from "react-icons/tfi";
import { IoMdHeart } from "react-icons/io";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useSWRConfig } from "swr";

const TrackCard = ({ trackData, ind, type }: any) => {
  const [hover, setHover] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const { mutate } = useSWRConfig();
  const data = type == "album" ? trackData : trackData.track;

  const nestedPlaylistData =
    type === "album" ? trackData : trackData.track.album;

  let timee = millisToMinutesAndSeconds(data.duration_ms);

  const handleHeart = async () => {
    if (isLiked) {
      const data = await deleteUserSavedTracks({
        cook: cookie,
        tokens: cookie.get("access_tkn"),
        ids: trackData.track.id,
      });
    } else {
      const data = await addSpotifyTracks({
        cook: cookie,
        tokens: cookie.get("access_tkn"),
        ids: trackData.track.id,
      });
    }
    const data2 = await checkUserSavedTracks({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
      ids: trackData.track.id,
    });
    setisLiked(data2.data[0]);
    mutate("api/localTracks");
  };
  useEffect(() => {
    async function fetchData() {
      const data = await checkUserSavedTracks({
        cook: cookie,
        tokens: cookie.get("access_tkn"),
        ids: trackData.track.id,
      });
      setisLiked(data.data[0]);
    }
    fetchData();
  }, []);

  return (
    <div
      className="grid mb-4 hover:bg-gray-800 xxs:grid-cols-[9%_55%_36%] lg:grid-cols-[2%_50%_30%_15%]"
      style={{
        marginTop: "1%",
        width: "100%",
        alignItems: "center",
        paddingLeft: "2%",
        rowGap: "12px",
      }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      {hover ? (
        <FaPlay
          style={{
            fill: "white",
            color: "white",
            fontSize: "12px",
          }}
        />
      ) : (
        <p
          className="text-center lg:text-right"
          style={{ color: "white", fontSize: "14px" }}
        >
          {ind + 1}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          border: "0px solid red",
          paddingLeft: "1.5%",
        }}
      >
        <div
          className="sm:w-10"
          style={{
            position: "relative",
            height: "49px",
            borderRadius: "9px",
          }}
        >
          <Image
            src={type == "album" ? tracks : nestedPlaylistData.images[0].url}
            alt="korn album"
            fill
            style={{
              borderRadius: "9px",
            }}
          />
        </div>
        <div style={{ marginLeft: "9px" }}>
          <p
            className="lg:text-base xxs:text-xs"
            style={{
              margin: "0px",
              padding: "0px",
              paddingBottom: "7px",
              color: "gray",
            }}
          >
            {data.name}
          </p>
          <p
            className="lg:text-base xxs:text-sm"
            style={{
              margin: "0px",
              padding: "0px",
              color: "gray",
            }}
          >
            {nestedPlaylistData.artists[0].name}
          </p>
        </div>
      </div>
      <p
        className="lg:text-base sm:text-xs xxs:hidden lg:block"
        style={{
          textAlign: "left",
          color: "lightgray",
          paddingRight: "20px",
          lineHeight: "25px",
        }}
      >
        {nestedPlaylistData.name}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "0px solid red",
        }}
      >
        {hover ? (
          <>
            {isLiked ? (
              <IoMdHeart
                className=""
                style={{
                  marginRight: "0px",
                  color: "green",
                  fontSize: "19px",
                }}
                onClick={handleHeart}
              />
            ) : (
              <TfiHeart
                className=""
                style={{
                  marginRight: "0px",
                  color: "white",
                  fontSize: "16px",
                }}
                onClick={handleHeart}
              />
            )}

            <p
              className="lg:text-base sm:text-sm xxs:pr-2 xxs:pl-4 sm:pr-2.5 sm:pl-10"
              style={{
                textAlign: "center",
                color: "lightgray",
              }}
            >
              {timee}
            </p>
            <AiOutlineEllipsis
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: "24px",
                marginLeft: "0%",
              }}
            />
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "lightgray",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {timee}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
