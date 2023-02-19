import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import cookie from "js-cookie";
import { millisToMinutesAndSeconds } from "../utility/helper";

import { FaPlay } from "react-icons/fa";
import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { addSpotifyTracks } from "../routes/apiFunctions";

const AlbumTrackCard = ({ trackData, ind, type }: any) => {
  const [hover, setHover] = useState(false);

  let timee = millisToMinutesAndSeconds(trackData.duration_ms);

  const handleHeart = async () => {
    const data = await addSpotifyTracks({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
      ids: trackData.id,
    });
  };

  return (
    <div
      className="grid mb-4 hover:bg-gray-800 xxs:grid-cols-[9%_55%_36%] lg:grid-cols-[2%_80%_18%]"
      style={{
        marginTop: "1%",
        width: "100%",
        alignItems: "center",
        paddingLeft: "2%",
        paddingRight: "2%",
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
            <TfiHeart
              className={styles.heart}
              style={{ marginRight: "0px", color: "white", fontSize: "17px" }}
              onClick={handleHeart}
            />

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
