import React from "react";
import type { GetServerSideProps } from "next";

import Cookies from "cookies";
import querystring from "querystring";

import SearchSectionCard from "../src/Components/SearchSectionCard";
import GroovyLayout from "../src/Layout/GroovyLayout";
import axiosClient from "../src/axiosInterceptor";

const search = ({ Catogaries }: any) => {
  // console.log(Catogaries);

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

  //@ts-ignore
  let getCatogaries = await axiosClient({
    method: "get",
    url:
      "/v1/browse/categories?" +
      querystring.stringify({
        country: "IN",
        limit: 50,
      }),
    extraParams: {
      reqq: context.req,
      ress: context.res,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });

  console.log("data chk", getCatogaries);

  return {
    props: {
      Catogaries: getCatogaries.data.categories,
    },
  };
};
