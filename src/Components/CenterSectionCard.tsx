import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const CenterSectionCard = ({ val, type, layoutType }: any) => {
  const routeer = useRouter();
  let handleClick: (e: any) => void = (e) => {
    e.preventDefault();
    type == "artist"
      ? ""
      : type == "album"
      ? routeer.push(`/album/${val.id}`)
      : routeer.push(`/playlist/${val.id}`);
  };

  return (
    <div className={styles.song__Card} onClick={handleClick}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "57%",
          borderRadius: "9px",
        }}
      >
        <Image
          src={val.images[0].url}
          alt="korn album"
          fill
          style={{
            borderRadius: type == "artist" ? "100px" : "9px",
          }}
        />
      </div>
      <p
        style={{
          color: "white",
          fontSize: "14px",
          padding: "0px",
          fontWeight: "800",
          margin: "20px 0px 7px 0px",
          letterSpacing: "0.5px",
        }}
      >
        {val.name.slice(0, 18)}
      </p>
      <p
        style={{
          color: "lightgray",
          fontSize: "11px",
          margin: "0px",
          lineHeight: "17px",
          padding: "0px",
          paddingBottom: "12px",
        }}
      >
        {val.description
          ? `${
              val.description.length <= 40
                ? val.description
                : `${val.description.slice(0, 40)}...`
            }`
          : val.type.toUpperCase()}
      </p>
    </div>
  );
};

export default CenterSectionCard;
