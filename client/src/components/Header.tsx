import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='sticky top-0 z-50 px-8 lg:px-12'>
  <nav
    className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-sm hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
    data-te-navbar-ref>
    <div className="flex w-full flex-wrap items-center justify-between px-6">
      <div className="flex items-center">
        <button
          className="mr-2 border-0 bg-transparent py-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContentX"
          aria-controls="navbarSupportedContentX"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="[&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </span>
        </button>
      </div>
      <div
        className="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto"
        id="navbarSupportedContentX"
        data-te-collapse-item>
        <ul
          className="mr-auto flex flex-col lg:flex-row"
          data-te-navbar-nav-ref>
          <li data-te-nav-item-ref>
            <Link
              className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              to="/"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light">Home</Link>
          </li>
          <li data-te-nav-item-ref>
            <Link
              className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              to="/features"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light">Features</Link>
          </li>
          <li data-te-nav-item-ref>
            <Link
              className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              to="/pricing"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light">Pricing</Link>
          </li>
          <li data-te-nav-item-ref>
            <Link
              className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              to="/about"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light">About</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
  )
}

export default Header