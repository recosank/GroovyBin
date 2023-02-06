import querystring from "querystring";

export const featuredUrl = (limit: number) =>
  "/v1/browse/featured-playlists?" +
  querystring.stringify({ country: "IN", limit: limit });

export const newReleaseUrl = (limit: number) =>
  "/v1/browse/new-releases?" +
  querystring.stringify({
    country: "IN",
    limit: limit,
  });

export const categoryPlaylistUrl = (limit: number, Cid: string) =>
  `/v1/browse/categories/${Cid}/playlists?` +
  querystring.stringify({
    country: "IN",
    limit: limit,
  });
