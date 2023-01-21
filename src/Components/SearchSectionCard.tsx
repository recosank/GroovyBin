import Image from "next/image";
import React from "react";
import korn from "../../public/assests/images/korn.jpg";

const SearchSectionCard = () => {
  return (
    <div
      style={{
        width: "90%",
        height: "24vh",
        borderRadius: "9px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "9px",
        }}
      >
        <Image
          src={korn}
          alt="korn album"
          fill
          style={{
            borderRadius: "9px",
          }}
        />
        <p
          style={{
            position: "absolute",
            color: "white",
            fontSize: "22px",
            padding: "0px",
            fontWeight: "800",
            margin: "20px 0px 12px 19px",
            letterSpacing: "0.5px",
          }}
        >
          Punk
        </p>
      </div>
    </div>
  );
};

export default SearchSectionCard;
