import styles from "./NavBar.module.css";
import Link from "next/Link";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

export default function NavBar({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "jwt");
    destroyCookie(null, "user");
    router.reload();
  };

  return (
    <>
      <nav className={styles.navblack}>
        <div className={styles.logo}>abcd</div>
        <ul>
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="/test">
              <a>test</a>
            </Link>
          </li>

          {user ? (
            <div>
              <li onClick={handleLogout}> logout </li>
            </div>
          ) : (
            <li>
              <Link href="/login">
                <a>login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
