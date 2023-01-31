import { Link } from "react-router-dom";
import logoBlog from "../assets/logo-blog.jpg";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { auth, updateAuth } = useAuth();

  return (
    <nav className="border-gray-200 py-2.5 rounded">
      <div className="container justify-between flex flex-wrap items-center mx-auto mt-3 px-4">
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex items-center">
            <img src={logoBlog} className="h-6 mr-3 sm:h-9" alt="Blog Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Blog
            </span>
          </Link>

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

              {auth && (
                <li>
                  <Link
                    to="/my-posts"
                    className=" py-2 pl-3 pr-4 text-neutral-600 text-lg hover:text-neutral-900"
                    aria-current="page"
                  >
                    Minhas postagens
                  </Link>
                </li>
              )}
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
