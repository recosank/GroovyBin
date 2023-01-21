import React from "react";
import CenterSectionItems from "./CenterSectionItems";
import Navbar from "./Navbar";

const CenterSection = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "17px 19px 17px 25px",
        scrollBehavior: "smooth",
        overflow: "scroll",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <div
        style={{
          marginTop: "50px",
          maxHeight: "89vh",
        }}
      >
        <CenterSectionItems title="Spotify original & exclusive shows" />
        <CenterSectionItems title="Trending now" />
        <CenterSectionItems title="Try something else" />
        <CenterSectionItems title="Featured Charts" />
        <CenterSectionItems title="Shows to try" />
      </div>
    </div>
  );
};

export default CenterSection;
