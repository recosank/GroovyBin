import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { TfiUser } from "react-icons/tfi";
const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
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
            padding: "7px 7px",
            marginRight: "13px",
          }}
        >
          <MdOutlineArrowBackIos style={{ color: "white" }} />
        </div>
        <div
          style={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100px",
            padding: "7px 7px",
          }}
        >
          <MdOutlineArrowForwardIos style={{ color: "white" }} />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button
          style={{
            padding: "7px 17px",
            fontSize: "14px",
            backgroundColor: "black",
            borderRadius: "20px",
            marginRight: "12px",
            border: "0.4px solid lightgray",
            outline: "none",
            color: "white",
          }}
        >
          Upgrade
        </button>
        <div
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
          <p style={{ margin: "0px 7px", color: "white", fontSize: "14px" }}>
            Account
          </p>
          <div>
            <RiArrowDownSFill style={{ color: "white", fontSize: "24px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
