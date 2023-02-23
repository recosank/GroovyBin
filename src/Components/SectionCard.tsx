import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const SectionCard = ({ val, type }: any) => {
  const routeer = useRouter();

  let handleClick: (e: any) => void = (e) => {
    e.preventDefault();
    type == "album"
      ? routeer.push(`/album/${val.id}`)
      : routeer.push(`/playlist/${val.id}`);
  };

  return (
    <div
      className={`${styles.section__song__Card} h-4/5 sm:h-full`}
      onClick={handleClick}
    >
      <div
        className="h-2/3"
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "9px",
        }}
      >
        <Image
          src={val.images[0].url}
          alt="korn album"
          fill
          style={{
            borderRadius: "9px",
          }}
        />
      </div>
      <p
        className="sm:text-sm xxs:text-xs"
        style={{
          color: "white",
          padding: "0px",
          fontWeight: "800",
          margin: "20px 0px 7px 0px",
          letterSpacing: "0.5px",
        }}
      >
        {val.name.length <= 17 ? val.name : `${val.name.slice(0, 16)}...`}
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

export default SectionCard;
