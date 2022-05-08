import { lazy } from "react";
const router = [
  {
    path: "/",
    element: lazy(() => import("@/views/home")),
  },
  {
    path: "/categories",
    element: lazy(() => import("@/views/categories")),
  },
  {
    path: "/about",
    element: lazy(() => import("@/views/about")),
  },
  {
    path: "*",
    element: lazy(() => import("@/views/404")),
  },
];
export default router;
