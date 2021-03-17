import Link from "next/link";
import Head from "next/head";
import checkUserAuthState from "../lib/user";
import NavBar from "../component/NavBar/NavBar";

const test = ({ user }) => {
  return (
    <>
      <Head>
        <title>test</title>
      </Head>
      <NavBar user={user} />
      <h1>test page</h1>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { jwt, user } = checkUserAuthState(ctx);
  return {
    props: {
      jwt,
      user,
    },
  };
};

export default test;
