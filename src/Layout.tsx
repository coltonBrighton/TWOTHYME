import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/home": "Home - TWOTHYME",
      "/meal-planner": "Meal Planner - TWOTHYME",
      "/recipes": "Recipes - TWOTHYME",
    };

    document.title = pageTitles[location.pathname] || "TWOTHYME";
  }, [location.pathname]);
  return (
    <div className="max-w-screen min-h-screen">
        <Nav />
        <div className="min-h-screen">
        <Outlet />
        </div>
    </div>
  )
}
