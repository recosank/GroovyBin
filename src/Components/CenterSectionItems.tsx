import React from "react";
import CenterSectionCard from "./CenterSectionCard";
import { useRouter } from "next/router";

type props = {
  title: string;
  data?: any;
  type?: string;
  layoutType?: string;
};

const CenterSectionItems = ({ title, data, type, layoutType }: props) => {
  const router = useRouter();
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
        <p
          className="sm:text-xl lg:text-2xl"
          style={{ color: "white", fontWeight: "900" }}
        >
          {title}
        </p>
        {layoutType !== "searchLayout" && (
          <p
            className="text-xs"
            onClick={() => router.push(`/section/${data.href}`)}
            style={{
              color: "lightgray",

              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            SHOW ALL
          </p>
        )}
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
            paddingBottom: "15px",
            overflowX: "scroll",
            boxSizing: "content-box",
            overflowY: "hidden",
            display: "flex",
          }}
        >
          {data.items.map((val: any, ind: number) => {
            return (
              <CenterSectionCard
                key={ind}
                val={val}
                type={type}
                layoutType={layoutType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CenterSectionItems;
