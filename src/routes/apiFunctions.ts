import { featuredUrl, newReleaseUrl, categoryPlaylistUrl } from "./urls";
import axiosClient from "../axiosInterceptor";
import type { NextApiRequest, NextApiResponse } from "next";

type afterAuthData = {
  tokens?: string | undefined;
  cook?: any | undefined;
  limit: number;
};

type categoryPlaylistData = {
  tokens?: string | undefined;
  cook?: any | undefined;
  limit: number;
  Cid: string;
};

export const getSpotifyNewRelease = async (argu: afterAuthData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: newReleaseUrl(argu.limit),
    extraParams: {
      cook: argu.cook,
      aToken: argu.tokens,
    },
    withCredentials: true,
  });

export const getSpotifyFeaturedPlaylist = async (argu: afterAuthData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: featuredUrl(argu.limit),
    extraParams: {
      cook: argu.cook,
      aToken: argu.tokens,
    },
    withCredentials: true,
  });

export const getSpotifyCategoryPlaylist = async (argu: categoryPlaylistData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: categoryPlaylistUrl(argu.limit, argu.Cid),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
    withCredentials: true,
  });
