import Head from "next/head";
import { Landing } from "../../components/Landing";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home2: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Artsts</title>
        <meta name="description" content="Generated by Fannie for ETH Global" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div>Here @ page  {router.query.number} </div>
    </div>
  );
};

export default Home2;