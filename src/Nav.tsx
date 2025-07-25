import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function () {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 shadow-lg max-w-full">
      <nav className="flex items-center justify-between flex-wrap bg-purple-950 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">TWOTHYME</span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-300 hover:border-blue-300"
            aria-label="Toggle menu"
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
        {/* Nav links */}
        <ul
          className={`flex flex-col lg:flex-row lg:items-center absolute lg:static top-16 right-0 w-full lg:w-auto bg-purple-950 lg:bg-transparent transition-all duration-200 ease-in z-40 ${
            menuOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <li className="mr-0 lg:mr-3">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "inline-block bg-blue-700 rounded-2xl text-white hover:bg-blue-500 py-1 px-3 text-decoration-none"
                  : "inline-block bg-purple-950 rounded-2xl text-white hover:bg-blue-500 py-1 px-3 text-decoration-none"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="mr-0 lg:mr-3">
            <NavLink
              to="/meal-planner"
              className={({ isActive }) =>
                isActive
                  ? "inline-block bg-blue-700 rounded-2xl text-white hover:bg-blue-500 py-1 px-3 text-decoration-none"
                  : "inline-block bg-purple-950 rounded-2xl text-white hover:bg-blue-500 py-1 px-3 text-decoration-none"
              }
              onClick={() => setMenuOpen(false)}
            >
              Meal Planner
            </NavLink>
          </li>
          <li className="mr-0 lg:mr-3">
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? "inline-block bg-blue-700 rounded-2xl text-white hover:bg-blue-500 py-1 px-3 text-decoration-none"
                  : "inline-block bg-purple-950 rounded-2xl text-white hover:bg-blue-500 py-1 px-3 text-decoration-none"
              }
              onClick={() => setMenuOpen(false)}
            >
              Recipes
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
