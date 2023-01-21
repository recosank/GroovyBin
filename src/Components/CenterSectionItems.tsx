import React from "react";
import CenterSectionCard from "./CenterSectionCard";

type props = {
  title: string;
};

const CenterSectionItems = ({ title }: props) => {
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
          {title}
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <CenterSectionCard />
        <CenterSectionCard />
        <CenterSectionCard />
        <CenterSectionCard />
        <CenterSectionCard />
        <CenterSectionCard />
        <CenterSectionCard />
        <CenterSectionCard />
      </div>
    </div>
  );
};

export default CenterSectionItems;
