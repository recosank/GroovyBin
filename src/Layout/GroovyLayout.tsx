import React from "react";
import LeftSection from "../Components/LeftSection";
import Navbar from "../Components/Navbar";
import styles from "../../styles/Home.module.css";
import NavbarMob from "../Components/NavbarMob";

type props = {
  children: React.ReactNode;
  source: string;
  chgBg?: boolean;
};

const GroovyLayout = React.memo(({ children, source }: props) => {
  return (
    <div className="flex overflow-hidden flex-col sm:flex-row">
      <LeftSection />
      {source !== "/hidden" && <NavbarMob source={source} />}
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
});

export default GroovyLayout;
