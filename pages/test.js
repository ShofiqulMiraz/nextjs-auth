import Head from "next/head";
import checkUserAuthState from "../lib/user";
import NavBar from "../component/NavBar/NavBar";
import fetchData from "../lib/fetchData";

const test = ({ jwt, user }) => {
  const { loading, data } = fetchData("/scams", jwt);

  return (
    <>
      <Head>
        <title>test</title>
      </Head>
      <NavBar user={user} />
      <h1>test page</h1>
      {loading && <p>loading...</p>}
      {data.map((post, index) => (
        <div key={index}>
          <p> {post.title} </p>
        </div>
      ))}
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
