import type {
  NextApiRequest,
  NextApiResponse,
  NextPage,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Cookies from "cookies";
import querystring from "querystring";

import {
  getSpotifyFeaturedPlaylist,
  getSpotifyNewRelease,
  getSpotifyCategoryPlaylist,
} from "../src/routes/apiFunctions";
import CenterSectionItems from "../src/Components/CenterSectionItems";
import GroovyLayout from "../src/Layout/GroovyLayout";
import styles from "../styles/Home.module.css";
import { changeBackground, selectAuthState } from "../src/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../src/utility/helper";

const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";
const clientSecret: string = "0cf34294b189487aa01d0665841697d2";
let scopes = "user-read-private user-read-email";

const Home: NextPage = (props: any) => {
  const { chgBg } = useSelector(selectAuthState);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!props.navigate) {
    props.Albums.href = "new-releases";
    props.Playlists.href = "featured-playlists";
    props.TopList.href = "trending-now";
    props.KPop.href = "K-Pop";
    props.Folk.href = "Folk-&-Acoustic";
  }

  useEffect(() => {
    {
      props.navigate &&
        router.push(
          "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
              response_type: "code",
              client_id: clientId,
              scope:
                "user-read-private user-read-email user-library-modify user-library-read",
              state: "asdfasdfa4asfsdvragadasdtasetatasadfasdfs",
              redirect_uri: "https://groovy-bin-recosank.vercel.app",
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
          <CenterSectionItems
            title="Try something else"
            data={props.Albums}
            type="album"
          />
          <CenterSectionItems
            title="Featured Playlists"
            data={props.Playlists}
          />
          <CenterSectionItems title="Trending now" data={props.TopList} />
          <CenterSectionItems title="K-Pop" data={props.KPop} />
          <CenterSectionItems title="Folk & Acoustic" data={props.Folk} />
        </GroovyLayout>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieInst = Cookies(context.req, context.res);
  const acs_tkn = cookieInst.get("access_tkn");

  if (acs_tkn == undefined && context.query.code == undefined) {
    return {
      props: {
        navigate: true,
      },
    };
  }

  if (acs_tkn == undefined && context.query.code) {
    const tokens = await getToken(context.query?.code);
    cookieInst.set("access_tkn", tokens.access_token, { httpOnly: false });
    cookieInst.set("refresh_tkn", tokens.refresh_token, { httpOnly: false });

    const GetNewReleaseAlbums = await getSpotifyNewRelease({
      tokens: tokens.access_token,
      cook: cookieInst,
      limit: 9,
    });

    const GetFeaturedPlaylists = await getSpotifyFeaturedPlaylist({
      tokens: tokens.access_token,
      cook: cookieInst,
      limit: 9,
    });
    const CIDs = [
      "toplists",
      "0JQ5DAqbMKFGvOw3O4nLAf",
      "0JQ5DAqbMKFy78wprEpAjl",
    ];

    const GetTopCategoriesPlaylist = await getSpotifyCategoryPlaylist({
      tokens: tokens.access_token,
      cook: cookieInst,
      limit: 9,
      Cid: CIDs[0],
    });

    const GetKpopCategoriesPlaylist = await getSpotifyCategoryPlaylist({
      tokens: tokens.access_token,
      cook: cookieInst,
      limit: 9,
      Cid: CIDs[1],
    });

    const GetAcousticCategoriesPlaylist = await getSpotifyCategoryPlaylist({
      tokens: tokens.access_token,
      cook: cookieInst,
      limit: 9,
      Cid: CIDs[2],
    });

    return {
      props: {
        Playlists: GetFeaturedPlaylists.data.playlists,
        Albums: GetNewReleaseAlbums.data.albums,
        navigate: false,
        TopList: GetTopCategoriesPlaylist.data.playlists,
        KPop: GetKpopCategoriesPlaylist.data.playlists,
        Folk: GetAcousticCategoriesPlaylist.data.playlists,
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

  const cookAccessToken = cookieInst.get("access_tkn");

  const GetNewReleaseAlbums = await getSpotifyNewRelease({
    tokens: cookAccessToken,
    cook: cookieInst,
    limit: 9,
  });

  cookieInst.set(
    "access_tkn", //@ts-ignore
    GetNewReleaseAlbums.config.extraParams.aToken,
    { httpOnly: false }
  );

  const GetFeaturedPlaylists = await getSpotifyFeaturedPlaylist({
    tokens: cookAccessToken,
    cook: cookieInst,
    limit: 9,
  });

  const CIDs = ["toplists", "0JQ5DAqbMKFGvOw3O4nLAf", "0JQ5DAqbMKFy78wprEpAjl"];

  const GetTopCategoriesPlaylist = await getSpotifyCategoryPlaylist({
    tokens: cookAccessToken,
    cook: cookieInst,
    limit: 9,
    Cid: CIDs[0],
  });

  const GetKpopCategoriesPlaylist = await getSpotifyCategoryPlaylist({
    tokens: cookAccessToken,
    cook: cookieInst,
    limit: 9,
    Cid: CIDs[1],
  });

  const GetAcousticCategoriesPlaylist = await getSpotifyCategoryPlaylist({
    tokens: cookAccessToken,
    cook: cookieInst,
    limit: 9,
    Cid: CIDs[2],
  });

  return {
    props: {
      Playlists: GetFeaturedPlaylists.data.playlists,
      Albums: GetNewReleaseAlbums.data.albums,
      navigate: false,
      TopList: GetTopCategoriesPlaylist.data.playlists,
      KPop: GetKpopCategoriesPlaylist.data.playlists,
      Folk: GetAcousticCategoriesPlaylist.data.playlists,
    },
  };
};
