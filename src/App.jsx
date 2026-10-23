import { RouterProvider, usePathname } from "./lib/router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Expertises, Realisations, APropos, Contact, Legal } from "./pages/Inner";
import { MessageCircle } from "lucide-react";
import { ProjectPage } from "./pages/ProjectPage";
import { motion, useScroll, useSpring } from "framer-motion";
import { waFrom } from "./lib/whatsapp";
import "./styles.css";

const routes = {
  "/": Home,
  "/expertises": Expertises,
  "/realisations": Realisations,
  "/a-propos": APropos,
  "/contact": Contact,
  "/mentions-legales": () => <Legal kind="mentions" />,
  "/confidentialite": () => <Legal kind="confidentialite" />,
};

function Shell() {
  const path = usePathname();
  const detail = path.startsWith("/realisations/") ? path.slice("/realisations/".length) : null;
  const Page = detail !== null ? () => <ProjectPage id={detail} /> : (routes[path] ?? routes["/"]);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div className="min-h-screen">
      <motion.div aria-hidden style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#FF9900]" />
      <a href="#contenu" className="skip">Aller au contenu</a>
      <Header />
      <Page key={path} />
      <Footer />
      <a href={waFrom("bouton flottant")} target="_blank" rel="noopener noreferrer" aria-label="Discuter sur WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF9900] text-[#080808] shadow-[0_8px_40px_rgba(0,0,0,.25)] transition-transform hover:scale-105 md:bottom-7 md:right-7">
        <MessageCircle aria-hidden size={24} />
      </a>
    </div>
  );
}

export default function App() {
  return <RouterProvider><Shell /></RouterProvider>;
}
