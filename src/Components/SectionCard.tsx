import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const SectionCard = ({ val, type }: any) => {
  const routeer = useRouter();
  let handleClick: (e: any) => void = (e) => {
    e.preventDefault();
    type == "album"
      ? routeer.push(`https://groovy-bin-recosank.vercel.app/album/${val.id}`)
      : routeer.push(
          `https://groovy-bin-recosank.vercel.app/playlist/${val.id}`
        );
  };

  return (
    <div className={styles.section__song__Card} onClick={handleClick}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "67%",
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
        style={{
          color: "white",
          fontSize: "14px",
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