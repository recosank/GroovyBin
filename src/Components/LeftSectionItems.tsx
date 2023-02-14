import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";

type props = {
  title: string;
  children: React.ReactNode;
  link: string;
  isActive?: boolean;
  disabled?: boolean;
};

const LeftSectionItems = ({
  title,
  children,
  link,
  isActive,
  disabled,
}: props) => {
  return (
    <div
      className={`mb-6 ${styles.leftSection__item} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
      <p
        className={` ${
          isActive && "text-white"
        } lg:text-sm sm:text-xs text-xs ${styles.leftSection__text}`}
        style={{
          letterSpacing: "0.3px",
          fontWeight: "600",
        }}
      >
        <Link
          className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          href={link}
        >
          {title}
        </Link>
      </p>
    </div>
  );
};

export default LeftSectionItems;
