import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "./Link";

type Variant = "orange" | "dark" | "outline-light" | "outline-dark";
type Common = { variant?: Variant; children: ReactNode; className?: string; icon?: "arrow" | "whatsapp" | "external" | "none" };
const Icon = ({ icon }: { icon: Common["icon"] }) =>
  icon === "whatsapp" ? <MessageCircle aria-hidden size={19} /> :
  icon === "external" ? <ArrowUpRight aria-hidden size={19} className="arrow" /> :
  icon === "none" ? null : <ArrowRight aria-hidden size={19} className="arrow" />;

export function ButtonLink({ to, variant = "orange", children, className = "", icon = "arrow" }: Common & { to: string }) {
  return <Link to={to} className={`btn btn-${variant} ${className}`}>{children}<Icon icon={icon} /></Link>;
}
export function ButtonExternal({ href, variant = "orange", children, className = "", icon = "whatsapp", label }: Common & { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`btn btn-${variant} ${className}`}>
      {icon === "whatsapp" && <Icon icon="whatsapp" />}{children}{icon !== "whatsapp" && <Icon icon={icon} />}
    </a>
  );
}
