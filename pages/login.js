import NavBar from "../component/NavBar/NavBar";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import checkUserAuthState from "../lib/user";

export default function Login({ user }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [, setloading] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setloading(true);
      const res = await axios.post(
        "https://cs-alert-api.herokuapp.com/api/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { user, token } = res.data;
      setCookie(null, "jwt", token, {
        maxAge: 30 * 24 * 60 * 60,
        secure: true,
      });
      setCookie(null, "user", JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        secure: true,
      });
      setloading(false);
      router.push("/");
    } catch (error) {
      const err = error.response.data;
      console.log(err);
      setloading(false);
    }
  };
  return (
    <>
      <NavBar user={user} />
      <h1>login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          ref={register}
          defaultValue="shofiqul2@gmail.com"
          required
        />
        <input
          type="password"
          name="password"
          ref={register}
          defaultValue="test1234"
          required
        />
        <input type="submit" />
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  // Get User Auth State
  const { jwt, user } = checkUserAuthState(context);

  if (jwt && user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // return all props
  return { props: { jwt, user } };
}
