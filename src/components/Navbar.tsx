import { Link } from "react-router-dom";
import logoBlog from "../assets/logo-blog.jpg";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { auth, updateAuth } = useAuth();

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container justify-between flex flex-wrap items-center mx-auto mt-3">
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex items-center">
            <img src={logoBlog} className="h-6 mr-3 sm:h-9" alt="Blog Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Blog
            </span>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex p-4 items-center md:flex-row md:text-sm md:font-medium md:border-0 ">
              <li>
                <Link
                  to="/"
                  className=" py-2 pl-3 pr-4 text-neutral-600 text-lg hover:text-neutral-900"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/new-post"
                  className=" py-2 pl-3 pr-4 text-neutral-600 text-lg hover:text-neutral-900"
                  aria-current="page"
                >
                  Suas postagens
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          {auth ? (
            <>
              <p>{auth.user.name}</p>
              <button className="underline" onClick={() => updateAuth(null)}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-bold text-center">
                Login
              </Link>
              <Link to="/register" className="underline">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
