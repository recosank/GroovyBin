import React from "react";
import CenterSectionCard from "./CenterSectionCard";

const CenterSectionItems = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white", fontSize: "24px", fontWeight: "900" }}>
          Spotify original & exclusive shows
        </p>
        <p
          style={{
            color: "lightgray",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          SHOW ALL
        </p>
      </div>
      <div>
        <CenterSectionCard />
      </div>
    </div>
  );
};

export default CenterSectionItems;
