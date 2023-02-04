import React from "react";
import CenterSectionCard from "./CenterSectionCard";

type props = {
  title: string;
  data?: any;
};

const CenterSectionItems = ({ title, data }: props) => {
  console.log(data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "80px",
          marginBottom: "10px",
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
      <div
        style={{
          display: "flex",
          scrollBehavior: "smooth",
          overflow: "hidden",

          width: "100%",
          height: "30vh",
          // rowGap: "20px",
          // columnGap: "20px",
          // grid: "auto / 11% 11% 11% 11% 11% 11% 11% 11% ",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: "20px",
            overflowX: "scroll",
            boxSizing: "content-box",
            overflowY: "hidden",
            display: "flex",
          }}
        >
          {data.map((val: any, ind: number) => {
            return <CenterSectionCard key={ind} val={val} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CenterSectionItems;
