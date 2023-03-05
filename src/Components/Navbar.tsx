import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import usePreviousRoute from "../customHook/usePreviousRoute";
import cookie from "js-cookie";
import useSWR from "swr";
import querystring from "querystring";

import { getSpotifyMe } from "../routes/apiFunctions";

import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { TfiUser } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";

type props = {
  source: string;
  chgBg?: boolean;
};

const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";

const Navbar = React.memo(({ source }: props) => {
  const router = useRouter();
  const prevRoute = usePreviousRoute();
  const [toggleProfile, setToggleProfille] = useState(false);
  const [srQuery, setsrQuery] = useState(
    router.route == "/search/[id]" ? router.query.id : ""
  );
  const profileRef = useRef(null);

  const handleLogout = (e: any) => {
    e.preventDefault();
    cookie.remove("access_tkn");
    router.push(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: clientId,
          scope:
            "user-read-private user-read-email user-library-modify user-library-read",
          state: "asdfasdfa4asfsdvragadasdtasetatasadfasdfs",
          redirect_uri: "http://localhost:3000",
        })
    );
  };

  const handleSrQuery = (e: any) => {
    setsrQuery(e.target.value);
  };

  const fetcher = async () => {
    return getSpotifyMe({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
    }).then((res) => res.data);
  };

  const { data, error } = useSWR(`api/me`, fetcher);

  {
    source == "search" &&
      useEffect(() => {
        const timeoutNavigate = setTimeout(() => {
          router.push(`/search/${srQuery}`, undefined, { shallow: true });
        }, 500);
        return () => {
          clearTimeout(timeoutNavigate);
        };
      }, [srQuery]);
  }

  useEffect(() => {
    const handleProfileToggle = (e: any) => {
      if (
        profileRef.current !== null &&
        //@ts-ignore
        !profileRef.current.contains(e.target)
      ) {
        setToggleProfille(false);
      }
    };

    document.addEventListener("mousedown", handleProfileToggle);
    return () => {
      document.removeEventListener("mousedown", handleProfileToggle);
    };
  }, [toggleProfile]);

  return (
    <div
      className="2xl:w-5/6 xl:w-4/5 lg:w-9/12 md:w-2/3 sm:w-3/5 hidden sm:block"
      style={{
        width: "100%",
        zIndex: "200",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: "200",
        }}
      >
        <div
          className={`${
            source === "search"
              ? "2xl:w-1/3 xl:w-2/5 lg:w-2/4 md:w-3/5 sm:w-4/4"
              : "w-1/3"
          } `}
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              borderRadius: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "0px",
              padding: "17px 8px",
              marginRight: "14px",
            }}
          >
            <MdOutlineArrowBackIos
              style={{ color: "white", fontSize: "19px" }}
            />
          </div>
          <div
            style={{
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100px",
              height: "0px",
              padding: "17px 8px",
            }}
          >
            <MdOutlineArrowForwardIos
              style={{ color: "white", fontSize: "19px", fontWeight: "200" }}
            />
          </div>

          {source === "search" && (
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                padding: "6px",
                marginLeft: "20px",
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
                name="srQuery"
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
          )}
        </div>

        {source !== "search" && (
          <div style={{ display: "flex" }}>
            <button
              style={{
                padding: "7px 15px",
                fontSize: "13px",
                backgroundColor: "transparent",
                borderRadius: "20px",
                marginRight: "12px",
                border: "0.4px solid gray",
                outline: "none",
                color: "white",
                fontWeight: "700",
              }}
            >
              Upgrade
            </button>

            <div
              onClick={(e) => {
                e.preventDefault();
                setToggleProfille(true);
              }}
              ref={profileRef}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "gray",
                  borderRadius: "100px",
                  padding: "6px",
                }}
                ref={profileRef}
              >
                <TfiUser style={{ color: "white" }} />
              </div>
              <p
                style={{
                  margin: "0px 7px",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
                ref={profileRef}
              >
                {data?.display_name.slice(0, 4).toUpperCase()}
              </p>

              <RiArrowDownSFill
                onClick={(e) => {
                  e.preventDefault();
                  setToggleProfille(true);
                }}
                style={{ color: "white", fontSize: "24px" }}
              />
            </div>
            {toggleProfile && (
              <div
                className="bg-zinc-700 xl:w-60"
                onClick={(e) => {
                  e.preventDefault();
                  setToggleProfille(true);
                }}
                ref={profileRef}
                style={{
                  position: "absolute",
                  top: "7%",
                  right: "37px",
                  borderRadius: "10px",

                  zIndex: "20",
                  // transition: "2s all",
                }}
              >
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4  font-medium cursor-not-allowed"
                  onClick={() => router.push("/collection/playlists")}
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Account
                </p>
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4 cursor-pointer font-medium"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Profile
                </p>
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4  font-medium cursor-not-allowed"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Upgrade to Premium
                </p>
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4  font-medium cursor-not-allowed"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Settings
                </p>
                <p
                  style={{
                    backgroundColor: "black",
                    width: "100%",
                    height: "1px",
                  }}
                ></p>
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4 cursor-pointer font-medium"
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
