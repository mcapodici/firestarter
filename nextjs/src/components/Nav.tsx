import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { Context } from "@/context/Context";
import router from "next/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav() {
  const [expandedNav, setExpandedNav] = useState(false);
  const [expandedUser, setExpandedUser] = useState(false);
  const { user, backend, addToast, authLoading } = useContext(Context);

  const logout = async () => {
    setExpandedUser(false);
    await backend.logout();
    await router.push("/login");
    addToast("You are now logged out.", "success");
  };

  return (
    <nav className="relative z-50">
      <div className="relative shadow-md py-2 px-6 w-full flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => {
              setExpandedNav((x) => !x);
            }}
            className="py-3 lg:hidden mr-2"
            type="button"
            aria-controls="navigationItems"
            aria-expanded={expandedNav}
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </button>
          <Link className="text-blue-600 mr-2" href="/">
            <Image src="/logo.png" alt="Logo" height={62 / 2} width={278 / 2} />
          </Link>
        </div>

        <div
          className={`${
            expandedNav ? "" : "hidden"
          } lg:block grow items-center basis-full lg:basis-0`}
          id="navigationItems"
        >
          <ul className="mr-auto lg:flex lg:flex-row">
            <li className="nav-item">
              <Link href="/todos" className="menu-item">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="menu-item">
                Team
              </Link>
            </li>
            <li className="nav-item mb-2 lg:mb-0">
              <Link href="/" className="menu-item">
                Projects
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center lg:ml-auto">
          {authLoading && (
            <div className="w-8 rounded-full h-8 content-placeholder"></div>
          )}
          {!authLoading && !user && (
            <>
              <Link href="/login" type="button" className="button flatwhite">
                Login
              </Link>
              <Link href="/signup" className="button blue">
                Sign up for free
              </Link>
            </>
          )}

          {!authLoading && user && (
            <>
              <button
                title="User Menu"
                className="relative w-10 h-10"
                onClick={() => {
                  setExpandedUser((x) => !x);
                }}
              >
                <Image
                  className="border-blue-600 border-2 border-solid rounded-full overflow-hidden"
                  src="/example-profile-image.jpg"
                  alt="123"
                  fill
                />
              </button>
            </>
          )}
        </div>
        {expandedUser && (
          <div
            className="right-0 top-full w-full md:w-auto p-1 absolute bg-transparent"
            id="navigationItems"
          >
            <ul className="flex flex-col items-end bg-white p-1 pl-4 rounded border-2 border-solid border-grey-400">
              <li className="nav-item">
                <Link href="/profile" className="menu-item">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="menu-item" onClick={logout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
