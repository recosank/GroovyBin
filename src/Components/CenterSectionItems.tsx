import React from "react";
import CenterSectionCard from "./CenterSectionCard";
import { useRouter } from "next/router";

type props = {
  title: string;
  data?: any;
};

const CenterSectionItems = ({ title, data }: props) => {
  const router = useRouter();
  console.log(data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        <p style={{ color: "white", fontSize: "24px", fontWeight: "900" }}>
          {title}
        </p>
        <p
          onClick={() =>
            router.push(`http://localhost:3000/section/${data.href}`)
          }
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
          height: "260px",
        }}
      >
        <div
          // className="grid grid-rows-1 2xl:grid-cols-8 gap-x-4"
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: "30px",
            overflowX: "scroll",
            boxSizing: "content-box",
            overflowY: "hidden",
            display: "flex",
          }}
        >
          {data.items.map((val: any, ind: number) => {
            return <CenterSectionCard key={ind} val={val} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CenterSectionItems;
