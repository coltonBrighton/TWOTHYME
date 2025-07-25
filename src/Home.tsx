import { Link } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <div className="bg-purple-950 bg-opacity-95 rounded-3xl shadow-2xl p-16 max-w-3xl w-full text-center border-slate-700">
        <h1 className="text-white text-8xl font-extrabold mb-10 drop-shadow-lg">
          TWOTHYME
        </h1>
        <h2 className="text-blue-300 text-4xl font-semibold mb-8">
          Recipe Management & Meal Planner
        </h2>
        <p className="text-white text-3xl mb-8">Welcome to TWOTHYME!</p>
        <p className="text-white text-3xl mb-8">
          Your one stop shop for meal planning and Recipe Management.
        </p>
        <p className="text-blue-200 text-2xl">
          Simply select{" "}
          <span>
            <Link
              to="/meal-planner"
              className="text-blue-400 underline hover:text-blue-600 font-bold"
            >
              Meal Planner
            </Link>
          </span>{" "}
          to view your planned meals for the week, or select{" "}
          <span>
            <Link
              to="/recipes"
              className="text-blue-400 underline hover:text-blue-600 font-bold"
            >
              My Recipies
            </Link>
          </span>{" "}
          to see all of your recipes.
        </p>
      </div>
    </div>
  );
}
