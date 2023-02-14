import React, { useState, useEffect } from "react";

import LeftSection from "../Components/LeftSection";
import Navbar from "../Components/Navbar";
import styles from "../../styles/Home.module.css";
import NavbarMob from "../Components/NavbarMob";

type props = {
  children: React.ReactNode;
  source: string;
  chgBg?: boolean;
};

const GroovyLayout = ({ children, source }: props) => {
  return (
    <div className={styles.main}>
      <LeftSection />
      <div
        style={{
          width: "100%",
          padding: "17px 19px 17px 25px",
          scrollBehavior: "smooth",
          height: "100vh",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        <Navbar source={source} />
        <NavbarMob />
        <div
          style={{
            marginTop: "50px",
            maxHeight: "89vh",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default GroovyLayout;
