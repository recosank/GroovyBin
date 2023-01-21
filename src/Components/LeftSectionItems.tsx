import React from "react";

type props = {
  title: string;
  children: React.ReactNode;
};

const LeftSectionItems = ({ title, children }: props) => {
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
        {title}
      </p>
    </div>
  );
};

export default LeftSectionItems;
