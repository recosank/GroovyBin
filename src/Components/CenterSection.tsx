import React from "react";
import CenterSectionItems from "./CenterSectionItems";
import Navbar from "./Navbar";

const CenterSection = () => {
  return (
    <div style={{ width: "100%", padding: "13px 19px" }}>
      <Navbar />
      <div
        style={{
          border: "2px solid blue",
          marginTop: "40px",
          minHeight: "91vh",
        }}
      >
        <CenterSectionItems />
      </div>
    </div>
  );
};

export default CenterSection;
