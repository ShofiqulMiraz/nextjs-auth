import nookies from "nookies";

export default function checkUserAuthState(context) {
  // Get User Auth State from cookies
  const cookies = nookies.get(context) || null;
  const jwt = cookies.jwt || null;
  const user = cookies.user || null;

  return { jwt, user };
}
