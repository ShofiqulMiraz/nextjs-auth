import Head from "next/head";
import NavBar from "../component/NavBar/NavBar";
import axios from "axios";
import checkUserAuthState from "../lib/user";

export default function Home({ user, posts }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar user={user} />
      <h1>homepage</h1>
      <p> {user ? "logged in" : "not logged in"} </p>
      {posts.map((post, index) => (
        <div key={index}>
          <p> {post.title} </p>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  // // Get User Auth State
  const { jwt, user } = checkUserAuthState(context);

  // get data for show
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=20"
  );
  const posts = res.data;

  // return all props
  return { props: { jwt, user, posts } };
}
