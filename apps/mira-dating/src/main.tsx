import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./App";
import "./styles.css";

// A refresh should replay the hero from the top, not resume mid-page or at a #section.
// "instant" matters: html has scroll-behavior: smooth, and a smooth scroll can be interrupted.
history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
toTop();
window.addEventListener("load", toTop);
window.addEventListener("pageshow", (e) => e.persisted && toTop());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
