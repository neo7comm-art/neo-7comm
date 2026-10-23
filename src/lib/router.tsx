import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Route = { path: string; anchor: string };
const parse = (): Route => {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [p, a = ""] = raw.split("#");
  const path = (p || "/").replace(/\/+$/, "") || "/";
  return { path, anchor: a };
};
const Ctx = createContext<Route>({ path: "/", anchor: "" });
export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parse());
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  useEffect(() => {
    const id = route.anchor;
    const t = window.setTimeout(() => {
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0 });
    }, 30);
    return () => window.clearTimeout(t);
  }, [route.path, route.anchor]);
  return <Ctx.Provider value={route}>{children}</Ctx.Provider>;
}
export const usePathname = () => useContext(Ctx).path;
