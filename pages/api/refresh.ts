// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import querystring from "querystring";
// import axios from "axios";
// import axiosClient from "../../src/axiosInterceptor";

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {};
//   const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";
//   const clientSecret: string = "0cf34294b189487aa01d0665841697d2";
//   let scopes = "user-read-private user-read-email";
//   //let state = "aaaaaaaaaaaaaaaa";

//   const result = await axiosClient
//     .get(
//       "v1/recommendations/available-genre-seeds",

//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer BQAHryH4nxHIrKtHi9EhA5V0dZRGvwFbsxU_7gkH0Jxz192RTijMNlz8hD7td32i9C2_-0V2R1DqtCF4NsKM60DMpDXR1wufQgoJag_g-gv4KVNJ9mROUFpj-E7hUu4_xEmRJy5MXs51-adwO1C7OPNMYokY1Uj-pR5s4kIQ2MrXUFsc48MD1R8R9mMu28hgB27rAIA ",
//         },
//       }
//     )
//     .then((res) => console.log("ress", res))
//     .catch((err) => console.log(err));

//   //   const data = "s";
//   //   res.status(200).json(data);
// };

// // const APIController = (function () {
// //   const clientId = "ADD YOUR CLIENT ID";
// //   const clientSecret = "ADD YOUR CLIENT SECRET";

// //   // private methods
// //   const _getToken = async () => {
// //     const result = await fetch("https://accounts.spotify.com/api/token", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/x-www-form-urlencoded",
// //         Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
// //       },
// //       body: "grant_type=client_credentials",
// //     });

// //     const data = await result.json();
// //     return data.access_token;
// //   };

// //   // const _getGenres = async (token) => {
// //   //   const result = await fetch(
// //   //     `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
// //   //     {
// //   //       method: "GET",
// //   //       headers: { Authorization: "Bearer " + token },
// //   //     }
// //   //   );

// //   //   const data = await result.json();
// //   //   return data.categories.items;
// //   // };

// //   // const _getPlaylistByGenre = async (token, genreId) => {
// //   //   const limit = 10;

// //   //   const result = await fetch(
// //   //     `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
// //   //     {
// //   //       method: "GET",
// //   //       headers: { Authorization: "Bearer " + token },
// //   //     }
// //   //   );

// //   //   const data = await result.json();
// //   //   return data.playlists.items;
// //   // };

// //   // const _getTracks = async (token, tracksEndPoint) => {
// //   //   const limit = 10;

// //   //   const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
// //   //     method: "GET",
// //   //     headers: { Authorization: "Bearer " + token },
// //   //   });

// //   //   const data = await result.json();
// //   //   return data.items;
// //   // };

// //   // const _getTrack = async (token, trackEndPoint) => {
// //   //   const result = await fetch(`${trackEndPoint}`, {
// //   //     method: "GET",
// //   //     headers: { Authorization: "Bearer " + token },
// //   //   });

// //   //   const data = await result.json();
// //   //   return data;
// //   // };

// //   return {
// //     getToken() {
// //       return _getToken();
// //     },
// //     // getGenres(token) {
// //     //   return _getGenres(token);
// //     // },
// //     // getPlaylistByGenre(token, genreId) {
// //     //   return _getPlaylistByGenre(token, genreId);
// //     // },
// //     // getTracks(token, tracksEndPoint) {
// //     //   return _getTracks(token, tracksEndPoint);
// //     // },
// //     // getTrack(token, trackEndPoint) {
// //     //   return _getTrack(token, trackEndPoint);
// //     // },
// //   };
// // })();
