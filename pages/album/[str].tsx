import type { GetServerSideProps } from "next";
import React from "react";

import Cookies from "cookies";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import PlaylistBanner from "../../src/Components/PlaylistBanner";
import AlbumTrackCard from "../../src/Components/AlbumTrackCard";
import {
  getSpotifyAlbumDescription,
  getSpotifyAlbumTracks,
} from "../../src/routes/apiFunctions";

import { TfiHeart } from "react-icons/tfi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

const albumSelection = ({ Description, Tracks }: any) => {
  const handleHeart = async () => {};

  console.log(Description.id);
  return (
    <GroovyLayout source="/">
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          className="-inset-x-6"
          style={{
            height: "100vh",
            position: "absolute",
            top: "-142px",
            background:
              "linear-gradient(180deg, rgba(56,89,196,1) 23%, rgba(51,60,171,0.01724439775910369) 56%)",
            paddingTop: "5%",
          }}
        >
          <PlaylistBanner
            data={Description.images[0].url}
            descp={Description}
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
              className="lg:p-5 sm:p-4 lg:m-0 sm:my-2"
              style={{
                backgroundColor: "green",
                borderRadius: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GrPlayFill className="lg:text-xl md:text-base" />
            </div>
            <TfiHeart
              className="text-2xl sm:mx-3 lg:text-3xl lg:mx-5 xl:mx-6"
              style={{
                color: "gray",
                fontWeight: "600",
              }}
              onClick={handleHeart}
            />
            <AiOutlineEllipsis
              className="text-2xl lg:text-3xl"
              style={{ color: "gray" }}
            />
          </div>
          <div
            className="grid mb-3 sm:grid-cols-[9%_55%_36%] lg:grid-cols-[2%_80%_18%]"
            style={{
              marginTop: "3%",
              alignItems: "center",
              paddingLeft: "2%",
              paddingRight: "2%",
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
              className=""
              style={{ paddingLeft: "50%", border: "0px solid white" }}
            >
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
          {Tracks.items.map((val: any, key: any) => {
            return (
              <AlbumTrackCard
                key={key}
                trackData={val}
                ind={key}
                type="playlist"
              />
            );
          })}
        </div>
      </div>
    </GroovyLayout>
  );
};

export default albumSelection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const cookAccessToken = cookieInst.get("access_tkn");

  const GetAlbumTracks = await getSpotifyAlbumTracks({
    tokens: cookAccessToken,
    cook: cookieInst,
    Cid: context.params?.str,
    limit: 50,
  });

  const GetAlbumsDescription = await getSpotifyAlbumDescription({
    tokens: cookAccessToken,
    cook: cookieInst,
    Cid: context.params?.str,
  });

  return {
    props: {
      Description: GetAlbumsDescription.data,
      Tracks: GetAlbumTracks.data,
    },
  };
};
