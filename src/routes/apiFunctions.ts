import {
  featuredUrl,
  newReleaseUrl,
  categoryPlaylistUrl,
  categoriesUrl,
  albumDescriptionUrl,
  albumTracksDescriptionUrl,
  addTrackUrl,
  getTracksUrl,
  addAlbumUrl,
  getAlbumsUrl,
} from "./urls";
import axiosClient from "../axiosInterceptor";

type afterAuthData = {
  tokens?: string | undefined;
  cook?: any | undefined;
  limit: number;
};

type librarytype = {
  tokens?: string | undefined;
  cook?: any | undefined;
  ids: string;
};
type categoryPlaylistData = {
  tokens?: string | undefined;
  cook?: any | undefined;
  limit?: number;
  Cid?: string | undefined | string[];
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

export const getSpotifyCategories = async (argu: afterAuthData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: categoriesUrl(argu.limit),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
    withCredentials: true,
  });

export const getSpotifyAlbumDescription = async (argu: categoryPlaylistData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: albumDescriptionUrl(argu.Cid),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
    withCredentials: true,
  });

export const getSpotifyAlbumTracks = async (argu: categoryPlaylistData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: albumTracksDescriptionUrl(argu.Cid, argu.limit),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
    withCredentials: true,
  });

export const addSpotifyTracks = async (argu: librarytype) =>
  //@ts-ignore
  await axiosClient({
    method: "put",
    url: addTrackUrl(argu.ids),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
  });

export const getSpotifyTracks = async (argu: categoryPlaylistData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: getTracksUrl(),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
  });

export const addSpotifyAlbums = async (argu: librarytype) =>
  //@ts-ignore
  await axiosClient({
    method: "put",
    url: addAlbumUrl(argu.ids),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
  });
export const getSpotifyAlbums = async (argu: categoryPlaylistData) =>
  //@ts-ignore
  await axiosClient({
    method: "get",
    url: getAlbumsUrl(),
    extraParams: { cook: argu.cook, aToken: argu.tokens },
  });
