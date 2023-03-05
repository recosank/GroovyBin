import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import LeftSectionItems from "./LeftSectionItems";
import {
  getSpotifyPlaylistFields,
  getSpotifyAlbums,
} from "../routes/apiFunctions";
import cookie from "js-cookie";
import useSWR from "swr";

import { SiSpotify } from "react-icons/si";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { GrFormAdd } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

let iconStyle = {
  fill: "lightgray",
  borderRadius: "00px",
  fontSize: "26px",
  marginRight: "12px",
};
type props = {
  source: string;
};
const NavbarMob = React.memo(({ source }: props) => {
  const searchRef = useRef(null);
  const router = useRouter();
  const [srQuery, setsrQuery] = useState(
    router.route == "/search/[id]" ? router.query.id : ""
  );
  const [toggleHam, setToggleHam] = useState(false);
  const [openInput, setopenInput] = useState(false);

  const handleSrQuery = (e: any) => {
    setsrQuery(e.target.value);
  };

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
  const { data, error } = useSWR(`api/localPlaylist`, fetcher);

  useEffect(() => {
    const timeoutNavigate = setTimeout(() => {
      source == "search" &&
        router.push(`/search/${srQuery}`, undefined, { shallow: true });
    }, 500);
    return () => {
      clearTimeout(timeoutNavigate);
    };
  }, [srQuery]);

  useEffect(() => {
    const handleSearchToggle = (e: any) => {
      if (
        searchRef.current !== null &&
        //@ts-ignore
        !searchRef.current.contains(e.target)
      ) {
        setopenInput(false);
      }
    };

    document.addEventListener("mousedown", handleSearchToggle);
    return () => {
      document.removeEventListener("mousedown", handleSearchToggle);
    };
  }, []);

  return (
    <div className="flex p-3 sm:hidden justify-end items-center bg-black">
      <div
        className={`flex-1 ${openInput ? "hidden" : "block"}`}
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <SiSpotify
          className={`${openInput ? "hidden" : "block"}`}
          style={{
            color: "black",
            fill: "white",
            fontSize: "39px",
            marginRight: "5px",
          }}
        />
        <p
          className={`${openInput ? "hidden" : "block"} lg:text-2xl sm:text-xl`}
          style={{
            letterSpacing: "0.3px",
            fontWeight: "600",
            color: "gray",
          }}
        >
          GroovyBin
        </p>
      </div>
      {source === "search" &&
        (openInput ? (
          <div
            ref={searchRef}
            className="flex-none"
            style={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              padding: "5px",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          >
            <FiSearch
              style={{
                fontSize: "29px",
                fontWeight: "900",
                color: "black",
                marginLeft: "4px",
                marginRight: "18px",
              }}
            />
            <input
              placeholder="What do you want to listen to?"
              type="text"
              value={srQuery}
              onChange={(e) => handleSrQuery(e)}
              style={{
                border: "none",
                width: "100%",
                outline: "none",
                textTransform: "none",
                textDecoration: "none",
              }}
            />
          </div>
        ) : (
          <div className="flex-none" onClick={() => setopenInput(true)}>
            <FiSearch
              style={{
                fontSize: "29px",
                fontWeight: "900",
                color: "lightgray",
                marginLeft: "4px",
                marginRight: "18px",
              }}
            />
          </div>
        ))}
      <div className={`${openInput ? "hidden" : "block"} flex-none`}>
        <RxHamburgerMenu
          style={{ color: "white", fontSize: "30px" }}
          onClick={(e) => setToggleHam((p) => !p)}
        />
      </div>
      {toggleHam && (
        <div
          className="w-full"
          style={{
            position: "absolute",
            height: "100vh",
            backgroundColor: "white",
            left: "0",
            top: "0",
            zIndex: "200",
          }}
        >
          <div
            className=" flex flex-col justify-items-center pl-5 pt-7"
            style={{
              height: "100vh",
              color: "white",
              backgroundColor: "black",
            }}
          >
            <div
              className="mb-7"
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
                GroovyBin
              </p>
            </div>
            <LeftSectionItems title="Home" link="/">
              <GrHomeRounded style={iconStyle} />
            </LeftSectionItems>
            <LeftSectionItems title="Search" link="/search">
              <FiSearch
                style={{
                  borderRadius: "00px",
                  fontSize: "26px",
                  color: "lightgray",
                  marginRight: "12px",
                }}
              />
            </LeftSectionItems>
            <LeftSectionItems title="Your Library" link="/collection/playlists">
              <VscLibrary
                style={{
                  fill: "lightGray",
                  borderRadius: "00px",
                  fontSize: "26px",
                  marginRight: "12px",
                }}
              />
            </LeftSectionItems>
            <div
              style={{
                marginTop: "25px",
                paddingBottom: "12px",
                borderBottom: "0.5px solid #453e3e",
              }}
            >
              <LeftSectionItems
                title="Create Playlist"
                link="/collection/playlists"
              >
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
              <div className="mt-5">
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
                {albumsData?.items.map((val: any, key: any) => {
                  return (
                    <p
                      key={key}
                      className="mt-2"
                      style={{ fontSize: "13px", color: "lightgray" }}
                      onClick={() => router.push(`/album/${val.album.id}`)}
                    >
                      {val.album.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <p
            className="text-white absolute top-0 right-0 p-7 pt-7"
            onClick={() => setToggleHam(false)}
          >
            <RxCross1 className="text-xl color-white" />
          </p>
        </div>
      )}
    </div>
  );
});

NavbarMob.displayName = "NavbarMob";

export default NavbarMob;
