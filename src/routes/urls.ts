import querystring from "querystring";

export const localhost = "http://localhost:3000/";

export const vercel = "https://groovy-bin-recosank.vercel.app/";

export const featuredUrl = (limit: number) =>
  "/v1/browse/featured-playlists?" +
  querystring.stringify({ country: "IN", limit: limit });

export const newReleaseUrl = (limit: number) =>
  "/v1/browse/new-releases?" +
  querystring.stringify({
    country: "IN",
    limit: limit,
  });

export const categoryPlaylistUrl = (
  limit: number | undefined,
  Cid: string | undefined | string[]
) =>
  `/v1/browse/categories/${Cid}/playlists?` +
  querystring.stringify({
    country: "IN",
    limit: limit,
  });

export const categoriesUrl = (limit: number) =>
  "/v1/browse/categories?" +
  querystring.stringify({
    country: "IN",
    limit: limit,
  });

export const albumDescriptionUrl = (Cid: string | undefined | string[]) =>
  `/v1/albums/${Cid}`;

export const albumTracksDescriptionUrl = (
  Cid: string | undefined | string[],
  limit: number | undefined
) =>
  `/v1/albums/${Cid}/tracks?` +
  querystring.stringify({
    country: "IN",
    limit: limit,
  });

export const addTrackUrl = (ids: string) =>
  "/v1/me/tracks?" +
  querystring.stringify({
    ids: ids,
  });

export const getTracksUrl = () => "/v1/me/tracks";

export const addAlbumUrl = (ids: string) =>
  "/v1/me/albums?" +
  querystring.stringify({
    ids: ids,
  });

export const getAlbumsUrl = () => "/v1/me/albums";
