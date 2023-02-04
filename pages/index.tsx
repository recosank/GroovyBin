import type {
  NextApiRequest,
  NextApiResponse,
  NextPage,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Cookies from "cookies";
import querystring from "querystring";
import axios from "axios";

import CenterSection from "../src/Components/CenterSection";
import LeftSection from "../src/Components/LeftSection";
import CenterSectionItems from "../src/Components/CenterSectionItems";
import GroovyLayout from "../src/Layout/GroovyLayout";
import axiosClient from "../src/axiosInterceptor";
import styles from "../styles/Home.module.css";

import { BsCheckLg } from "react-icons/bs";
import { getToken } from "../src/utility/helper";

const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";
const clientSecret: string = "0cf34294b189487aa01d0665841697d2";
let scopes = "user-read-private user-read-email";

const Home: NextPage = (props: any) => {
  const router = useRouter();
  useEffect(() => {
    {
      props.navigate &&
        router.push(
          "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
              response_type: "code",
              client_id: clientId,
              state: "asdfasdfa4asfsdvragadasdtasetatasadfasdfs",
              redirect_uri: "http://localhost:3000",
            })
        );
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!props.navigate && (
        <GroovyLayout source="/">
          {/* <CenterSectionItems
          title="Spotify original & exclusive shows"
          data={dat}
        />
        <CenterSectionItems title="Trending now" data={dat} /> */}
          <CenterSectionItems
            title="Try something else"
            data={props.Albums.items}
          />
          <CenterSectionItems
            title="Featured Charts"
            data={props.Playlists.items}
          />
          {/* <CenterSectionItems title="Shows to try" data={Catogaries.items} /> */}
        </GroovyLayout>
      )}
      );
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  console.log("param", context.query?.code);
  const acs_tkn = cookieInst.get("access_tkn");
  console.log("param", acs_tkn);
  if (acs_tkn == undefined && context.query.code == undefined) {
    console.log("in if");
    return {
      props: {
        navigate: true,
      },
    };
  }
  if (acs_tkn == undefined && context.query.code) {
    console.log("data in if");
    const tokens = await getToken(context.query?.code);
    cookieInst.set("access_tkn", tokens.access_token);
    cookieInst.set("refresh_tkn", tokens.refresh_token);
    console.log("data in if", tokens);

    //@ts-ignore
    const getNewRelease = await axiosClient({
      method: "get",
      url:
        "/v1/browse/new-releases?" +
        querystring.stringify({
          country: "IN",
          limit: 8,
        }),
      extraParams: {
        aToken: tokens.access_token,
      },
      withCredentials: true,
    });
    console.log("data in ssr", getNewRelease);

    //@ts-ignore
    let getFeaturedPlaylist = await axiosClient({
      method: "get",
      url:
        "/v1/browse/featured-playlists?" +
        querystring.stringify({
          country: "IN",
          limit: 8,
        }),
      extraParams: { aToken: tokens.access_token },
      withCredentials: true,
    });
    return {
      props: {
        Playlists: getFeaturedPlaylist.data.playlists,
        Albums: getNewRelease.data.albums,
        navigate: false,
      },
    };
  }
  // const getMee = () =>
  //   //@ts-ignore
  //   axiosClient({
  //     method: "get",
  //     url: "/v1/me",
  //     extraParams: { reqq: context.req, ress: context.res },
  //     withCredentials: true,
  //   });
  //@ts-ignore
  const getNewRelease = await axiosClient({
    method: "get",
    url:
      "/v1/browse/new-releases?" +
      querystring.stringify({
        country: "IN",
        limit: 8,
      }),
    extraParams: {
      reqq: context.req,
      ress: context.res,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });
  //@ts-ignore
  cookieInst.set("access_tkn", getNewRelease.config.extraParams.aToken);

  // console.log("data in ssr", getNewRelease);

  //@ts-ignore
  let getFeaturedPlaylist = await axiosClient({
    method: "get",
    url:
      "/v1/browse/featured-playlists?" +
      querystring.stringify({
        country: "IN",
        limit: 8,
      }),
    extraParams: {
      reqq: context.req,
      ress: context.res,
      aToken: cookieInst.get("access_tkn"),
    },
    withCredentials: true,
  });

  //@ts-ignore
  // let getCatogaries = await axiosClient({
  //   method: "get",
  //   url:
  //     "/v1/browse/categories?" +
  //     querystring.stringify({
  //       country: "IN",
  //       limit: 3,
  //     }),
  //   extraParams: { reqq: context.req, ress: context.res },
  //   withCredentials: true,
  // }).then(async (resp) => {
  //   let CId = resp.data.categories.items[0].id;
  //   //@ts-ignore
  //   const CPlaylist = await axiosClient({
  //     method: "get",
  //     url:
  //       `/v1/browse/categories/${CId}/playlists?` +
  //       querystring.stringify({
  //         country: "IN",
  //         limit: 8,
  //       }),
  //     extraParams: { reqq: context.req, ress: context.res },
  //     withCredentials: true,
  //   });

  //   return CPlaylist;
  // });

  // console.log("data chk", getCatogaries);
  // Playlists: getFeaturedPlaylist.data.playlists,
  //     Albums: getNewRelease.data.albums,

  return {
    props: {
      Playlists: getFeaturedPlaylist.data.playlists,
      Albums: getNewRelease.data.albums,
      navigate: false,
    },
  };
};
