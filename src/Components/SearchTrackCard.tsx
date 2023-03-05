import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useSWRConfig } from "swr";

import { millisToMinutesAndSeconds } from "../utility/helper";
import {
  addSpotifyTracks,
  checkUserSavedTracks,
  deleteUserSavedTracks,
} from "../routes/apiFunctions";

import { FaPlay } from "react-icons/fa";
import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";

const SearchTrackCard = ({ trackData }: any) => {
  const [hover, setHover] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const { mutate } = useSWRConfig();

  let timee = millisToMinutesAndSeconds(trackData.duration_ms);

  const handleHeart = async () => {
    if (isLiked) {
      const data = await deleteUserSavedTracks({
        cook: cookie,
        tokens: cookie.get("access_tkn"),
        ids: trackData.id,
      });
    } else {
      const data = await addSpotifyTracks({
        cook: cookie,
        tokens: cookie.get("access_tkn"),
        ids: trackData.id,
      });
    }

    const data2 = await checkUserSavedTracks({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
      ids: trackData.id,
    });
    setisLiked(data2.data[0]);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await checkUserSavedTracks({
        cook: cookie,
        tokens: cookie.get("access_tkn"),
        ids: trackData.id,
      });
      setisLiked(data.data[0]);
    }
    fetchData();
  }, [trackData]);

  return (
    <div
      className="grid mb-4 hover:bg-gray-800 xxs:grid-cols-[65%_35%]"
      style={{
        marginTop: "1%",
        width: "100%",
        alignItems: "center",
        paddingLeft: "2%",
        borderRadius: "8px",
      }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
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
          className="xxs:w-10"
          style={{
            position: "relative",
            height: "49px",
            borderRadius: "9px",
            marginRight: "9px",
            backgroundColor: "black",
          }}
        >
          <Image
            src={trackData.album.images[0].url}
            alt="korn album"
            fill
            style={{
              borderRadius: "9px",
              opacity: hover ? "0.5" : "1",
            }}
          />
          {hover && (
            <FaPlay
              style={{
                fill: "white",
                color: "white",
                fontSize: "12px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: "400",
                position: "absolute",
              }}
            />
          )}
        </div>

        <div>
          <p
            style={{
              margin: "0px",
              padding: "0px",
              paddingBottom: "3px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            {trackData.name.length > 30
              ? `${trackData.name.slice(0, 30)}...`
              : trackData.name}
          </p>
          <p
            style={{
              margin: "0px",
              padding: "0px",
              color: "gray",
              fontSize: "15px",
            }}
          >
            {trackData.artists[0].name}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hover ? (
          <>
            {isLiked ? (
              <IoMdHeart
                className=""
                style={{
                  marginRight: "10px",
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
                marginLeft: "3%",
              }}
            />
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "lightgray",

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

export default SearchTrackCard;
