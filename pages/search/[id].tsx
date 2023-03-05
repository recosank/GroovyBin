import React, { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import SearchTrackCard from "../../src/Components/SearchTrackCard";
import { getSpotifySearchQuery } from "../../src/routes/apiFunctions";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import CenterSectionItems from "../../src/Components/CenterSectionItems";

import { GrPlayFill } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

const SearchQuery = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    return getSpotifySearchQuery({
      cook: cookie,
      tokens: cookie.get("access_tkn"),
      type: "album,track,playlist,show,artist",
      userQuery: `${router.query.id}`,
    }).then((res) => {
      console.log(res);
      return res;
    });
  };

  const { data, error } = useSWR(`api/searchQuery`, fetcher);

  useEffect(() => {
    mutate("api/searchQuery");
  }, [router.query.id]);

  if (data) {
    return (
      <GroovyLayout source="search">
        <div
          className="xxs:-mt-7 sm:mt-10"
          style={{
            height: "80vh",
          }}
        >
          {data.tracks.items.slice(0, 4).map((val: any, key: any) => {
            return <SearchTrackCard key={key} trackData={val} ind={key} />;
          })}
          {data.artists.items.length > 0 && (
            <CenterSectionItems
              title="Artists"
              data={data.artists}
              type="artist"
              layoutType="searchLayout"
            />
          )}
          {data.albums.items.length > 0 && (
            <CenterSectionItems
              title="Albums"
              data={data.albums}
              type="album"
              layoutType="searchLayout"
            />
          )}
          {data.playlists.items.length > 0 && (
            <CenterSectionItems
              title="Playlists"
              data={data.playlists}
              layoutType="searchLayout"
            />
          )}
          {data.shows.items.length > 0 && (
            <CenterSectionItems
              title="Shows"
              data={data.shows}
              layoutType="searchLayout"
            />
          )}
        </div>
      </GroovyLayout>
    );
  }
};

export default SearchQuery;
