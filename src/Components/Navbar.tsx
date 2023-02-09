import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePreviousRoute from "../customHook/usePreviousRoute";

import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { TfiUser } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";

type props = {
  source: string;
  chgBg?: boolean;
};

const Navbar = ({ source }: props) => {
  const router = useRouter();
  const prevRoute = usePreviousRoute();
  const [toggleProfile, setToggleProfille] = useState(false);
  console.log(prevRoute);

  return (
    <div
      className="2xl:w-5/6 xl:w-4/5 lg:w-9/12 md:w-2/3 sm:w-3/5 hidden sm:block"
      style={{
        position: "fixed",
        zIndex: "20",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
              onClick={() => setToggleProfille((p) => !p)}
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
              >
                Reco
              </p>

              <RiArrowDownSFill style={{ color: "white", fontSize: "24px" }} />
            </div>
            {toggleProfile && (
              <div
                className="bg-zinc-700"
                style={{
                  position: "absolute",
                  top: "114%",
                  right: "10px",
                  borderRadius: "10px",
                  width: "13.5%",

                  // transition: "2s all",
                }}
              >
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4 cursor-pointer font-medium"
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
                  className="hover:bg-slate-800 text-white py-3.5 px-4 cursor-pointer font-medium"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Upgrade to Premium
                </p>
                <p
                  className="hover:bg-slate-800 text-white py-3.5 px-4 cursor-pointer font-medium"
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
};

export default Navbar;
