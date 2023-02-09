import React from "react";
import type { GetServerSideProps } from "next";

import Cookies from "cookies";

import SearchSectionCard from "../src/Components/SearchSectionCard";
import GroovyLayout from "../src/Layout/GroovyLayout";
import { getSpotifyCategories } from "../src/routes/apiFunctions";

const search = ({ Catogaries }: any) => {
  return (
    <GroovyLayout source="search">
      <div
        className="sm:mt-20"
        style={{
          height: "80vh",
        }}
      >
        <p
          className="mb-9 lg:text-3xl text-2xl"
          style={{
            color: "white",
            fontWeight: "600",
          }}
        >
          Browse all
        </p>
        <div className="grid gap-y-6 lg:gap-y-8 2xl:grid-cols-8 md:grid-cols-5 lg:grid-cols-6 sm:grid-cols-3 xl:grid-cols-7 grid-cols-4">
          {Catogaries.items.map((val: any, key: any) => (
            <SearchSectionCard key={key} data={val} />
          ))}
        </div>
      </div>
    </GroovyLayout>
  );
};

export default search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const cookAccessToken = cookieInst.get("access_tkn");

  //@ts-ignore
  const GetCategories = await getSpotifyCategories({
    tokens: cookAccessToken,
    cook: cookieInst,
    limit: 50,
  });

  return {
    props: {
      Catogaries: GetCategories.data.categories,
    },
  };
};
