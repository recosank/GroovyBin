import React, { useState, useEffect } from "react";
import useSWR from "swr";
import cookie from "js-cookie";

import { getSpotifyTracks } from "../../src/routes/apiFunctions";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import TrackCard from "../../src/Components/TrackCard.d";

import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

const Tracks = () => {
  const fetcher = async () => {
    return getSpotifyTracks({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
    }).then((res) => res.data);
  };

  const { data, error } = useSWR(`api/localTracks`, fetcher);

  return (
    <GroovyLayout source="/">
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          className="-inset-x-6 sm:-top-36 xxs:-top-16 "
          style={{
            height: "100vh",
            position: "absolute",
            background:
              "linear-gradient(180deg, rgba(56,89,196,1) 23%, rgba(51,60,171,0.01724439775910369) 56%)",
            paddingTop: "5%",
          }}
        >
          <PlaylistBanner
            data={""}
            len={data?.items.length}
            descp={{ name: "Liked Songs", description: "" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginTop: "2%",
              paddingLeft: "2%",
            }}
          >
            <div
              className="lg:p-5 sm:p-4 xxs:p-3 lg:m-0 xxs:my-2 bg-green-400"
              style={{
                borderRadius: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GrPlayFill className="lg:text-xl sm:text-base xxs:text-sm" />
            </div>
          </div>
          <div
            className="grid mb-3 xxs:grid-cols-[9%_55%_36%] lg:grid-cols-[2%_50%_30%_15%]"
            style={{
              marginTop: "3%",
              alignItems: "center",
              paddingLeft: "2%",
            }}
          >
            <p
              className="text-center lg:text-right"
              style={{
                color: "whitesmoke",
                fontWeight: "300",
                fontSize: "13px",
              }}
            >
              #
            </p>
            <p
              style={{
                color: "whitesmoke",
                fontWeight: "300",
                fontSize: "12px",
                paddingLeft: "1.5%",
              }}
            >
              TITLE
            </p>
            <p
              className="xxs:hidden lg:block"
              style={{
                color: "whitesmoke",
                fontWeight: "300",
                fontSize: "12px",
              }}
            >
              ALBUM
            </p>

            <p className="text-right" style={{ paddingLeft: "50%" }}>
              <BsClockHistory style={{ color: "white", fontSize: "13px" }} />
            </p>
          </div>
          <div
            className="mt-2"
            style={{
              width: "95%",
              height: "2px",
              backgroundColor: "lightgray",
              marginLeft: "2%",
              marginRight: "2%",
            }}
          ></div>
          {data?.items.map((val: any, key: any) => {
            return (
              <TrackCard key={key} trackData={val} ind={key} type="playlist" />
            );
          })}
        </div>
      </div>
    </GroovyLayout>
  );
};

export default Tracks;
