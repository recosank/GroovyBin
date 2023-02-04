import Link from "next/link";
import React from "react";

type props = {
  title: string;
  children: React.ReactNode;
  link: string;
};

const LeftSectionItems = ({ title, children, link }: props) => {
  return (
    <div
      className="mb-4"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
      <p
        className="lg:text-sm sm:text-xs text-xs"
        style={{
          letterSpacing: "0.3px",
          fontWeight: "600",
          color: "lightgray",

          cursor: "pointer",
        }}
      >
        <Link href={link}>{title}</Link>
      </p>
    </div>
  );
};

export default LeftSectionItems;
