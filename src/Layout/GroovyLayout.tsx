import React from "react";
import LeftSection from "../Components/LeftSection";
import Navbar from "../Components/Navbar";
import styles from "../../styles/Home.module.css";

type props = {
  children: React.ReactNode;
  source: string;
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
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        <Navbar source={source} />
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
