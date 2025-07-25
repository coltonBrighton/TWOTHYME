import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import MealPlanner from "./mealplanner/MealPlanner.tsx";
import Recipes from "./recipes/Recipes.tsx";
import Home from "./Home.tsx";

let router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "meal-planner",
        Component: MealPlanner,
      },
      {
        path: "recipes",
        Component: Recipes,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
