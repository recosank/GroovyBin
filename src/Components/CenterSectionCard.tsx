import Image from "next/image";
import React from "react";
import korn from "../../public/assests/images/korn.jpg";
import styles from "../../styles/Home.module.css";
const CenterSectionCard = () => {
  return (
    <div className={styles.song__Card}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "67%",
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
      </div>
      <p
        style={{
          color: "white",
          fontSize: "15px",
          padding: "0px",
          fontWeight: "800",
          margin: "20px 0px 12px 0px",
          letterSpacing: "0.5px",
        }}
      >
        Thoughtless
      </p>
      <p
        style={{
          color: "lightgray",
          fontSize: "12px",
          margin: "0px",
          padding: "0px",
        }}
      >
        KORN
      </p>
    </div>
  );
};

export default CenterSectionCard;
