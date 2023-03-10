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

const AlbumTrackCard = ({ trackData, ind, type }: any) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const { mutate } = useSWRConfig();
  const searchCardLayout = router.route == "/search/[id]" ? true : false;

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
      className="grid mb-4 hover:bg-gray-800 xxs:grid-cols-[9%_55%_36%] lg:grid-cols-[2%_80%_18%]"
      style={{
        marginTop: "1%",
        width: "100%",
        alignItems: "center",
        paddingLeft: searchCardLayout ? "1%" : "2%",
        paddingRight: searchCardLayout ? "0%" : "2%",
      }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      {hover ? (
        <FaPlay style={{ fill: "white", color: "white", fontSize: "12px" }} />
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
        {searchCardLayout && (
          <div
            className="xs:w-10"
            style={{
              position: "relative",
              height: "49px",
              borderRadius: "9px",
              marginRight: "9px",
            }}
          >
            <Image
              src={trackData.album.images[0].url}
              alt="korn album"
              fill
              style={{
                borderRadius: "9px",
              }}
            />
          </div>
        )}
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
            {trackData.name}
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

export default AlbumTrackCard;
