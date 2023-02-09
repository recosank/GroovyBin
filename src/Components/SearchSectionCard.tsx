import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const SearchSectionCard = ({ data }: any) => {
  let router = useRouter();
  console.log(data);

  return (
    <div
      style={{
        width: "90%",
        height: "20vh",
        borderRadius: "9px",
      }}
      onClick={() =>
        router.push(`https://groovy-bin-recosank.vercel.app/genre/${data.id}`)
      }
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
          src={data.icons[0].url}
          alt="korn album"
          fill
          style={{
            borderRadius: "9px",
          }}
        />
        <p
          className="2xl:text-xl lg:text-lg md:text-sm"
          style={{
            position: "absolute",
            color: "white",
            padding: "0px",
            fontWeight: "800",
            margin: "20px 0px 12px 19px",
            letterSpacing: "0.5px",
          }}
        >
          {data.name.length > 9 ? `${data.name.slice(0, 9)}-` : data.name}{" "}
          <br />
          {data.name.length > 9 && `-${data.name.slice(9, data.name.length)}`}
        </p>
      </div>
    </div>
  );
};

export default SearchSectionCard;
