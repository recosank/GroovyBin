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
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "0px",
      }}
    >
      {children}
      <p
        style={{
          letterSpacing: "0.3px",
          fontWeight: "600",
          color: "lightgray",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        <Link href={link}>{title}</Link>
      </p>
    </div>
  );
};

export default LeftSectionItems;
