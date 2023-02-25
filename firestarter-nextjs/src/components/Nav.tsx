import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {

  const [expandedNav, setExpandedNav] = useState(false);

  return <nav className="shadow-md py-2 bg-white relative flex items-center w-full justify-between">
    <div className="px-6 w-full flex flex-wrap items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => { setExpandedNav(x => !x) }}
          className="border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
          type="button"
          aria-controls="navigationItems"
          aria-expanded={expandedNav}
          aria-label="Toggle navigation">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        </button>
        <Link className="text-blue-600 mr-2" href="/">
          <Image src="/logo.png" alt="Logo" height={24} width={24} />
        </Link>
      </div>
      <div className={`${expandedNav ? '' : 'hidden'} lg:block grow items-center basis-full lg:basis-0`}  id="navigationItems">
        <ul className="mr-auto lg:flex lg:flex-row">
          <li className="nav-item">
            <Link href="/" className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link href="/" className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out">Team</Link>
          </li>
          <li className="nav-item mb-2 lg:mb-0">
            <Link href="/" className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out">Projects</Link>
          </li>
        </ul>
      </div>
      <div className={`${expandedNav ? '' : 'hidden'} lg:block flex items-center lg:ml-auto`}>
        <button type="button" className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out">Login</button>

        <Link href="/signup" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up for free</Link>
      </div>
    </div>
  </nav>;
}
