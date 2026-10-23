import type { AnchorHTMLAttributes, ReactNode } from "react";
import { usePathname } from "../lib/router";
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children: ReactNode };
/** Lien interne. (Version Next.js : next/link.) */
export function Link({ to, children, ...rest }: Props) {
  return <a href={`#${to}`} {...rest}>{children}</a>;
}
export { usePathname };
