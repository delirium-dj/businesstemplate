import { createQwikCity } from "@builder.io/qwik-city/middleware/vercel-edge";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

/** Vercel Edge entry — renders Qwik City on the edge runtime. */
export default createQwikCity({ render, qwikCityPlan });
