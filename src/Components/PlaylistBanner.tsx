import React from "react";
import Image from "next/image";

import { RiHeartFill } from "react-icons/ri";
import { SiSpotify } from "react-icons/si";

const PlaylistBanner = ({ data, descp }: any) => {
  return (
    <div
      className="drop-shadow-2xl  xl:mt-0 sm:mt-9"
      style={{
        boxShadow: "50px 7px 80px 10px rgb(56,89,196)",
        paddingLeft: "2%",
        display: "flex",
        justifyContent: "start",
        height: "290px",
        alignItems: "center",
        paddingBottom: "1.8%",
        borderBottom: "0px solid white",
      }}
    >
      <div
        className="sm:h-4/5"
        style={{
          position: "relative",
          width: "200px",
          background:
            data == ""
              ? `linear-gradient(145deg, rgba(95,73,218,1) 28%, rgba(133,120,194,1) 49%, rgba(154,142,180,1) 55%, rgba(121,149,181,0.9108018207282913) 73%, rgba(182,166,215,1) 84%, rgba(118,44,209,1) 100%, rgba(46,48,48,1) 100%, rgba(255,255,255,0.9836309523809523) 100%)`
              : "",
        }}
      >
        {data !== "" ? (
          <Image src={data} fill alt="korn album" />
        ) : (
          <RiHeartFill
            style={{
              position: "absolute",
              color: "white",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "5rem",
            }}
          />
        )}
      </div>
      <div
        style={{
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          justifyItems: "end",
          alignContent: "end",
        }}
      >
        <p
          className="text-white sm:text-xs md:text-sm"
          style={{ marginBottom: "10px", padding: "0px" }}
        >
          PLAYLIST
        </p>
        <p
          className="text-white mb-2 2xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl"
          style={{
            margin: "0px",
            padding: "0px",
            fontWeight: "600",
          }}
        >
          {descp.name}
        </p>
        <p
          className="2xl:text-lg lg:text-lg md:text-base sm:text-sm"
          style={{
            margin: "0px",
            padding: "0px",
            color: "lightgray",
            marginBottom: "28px",
          }}
        >
          {descp.description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SiSpotify
            className="sm:text-xl md:text-2xl lg:text-3xl"
            style={{
              color: "green",
              fill: "green",

              marginRight: "5px",
            }}
          />
          <p
            className="text-white font-bold sm:text-xs md:text-sm lg:text-base"
            style={{}}
          >
            Spotify
          </p>
          <span
            className="mx-2"
            style={{
              height: "4px",
              width: "4px",
              borderRadius: "100px",
              backgroundColor: "white",
            }}
          ></span>

          <p className="text-white p-0 m-0 sm:text-xs md:text-sm">50 songs</p>
          <p
            className="md:text-sm sm:text-xs sm:hidden md:block"
            style={{
              padding: "0px",
              margin: "0px",
              color: "lightgray",
            }}
          >
            ,&nbsp;about 2 hr 15 min
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistBanner;
