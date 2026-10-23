import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";

const C = 400, R = 300;
const P = (deg: number): [number, number] => [C + R * Math.cos((deg * Math.PI) / 180), C + R * Math.sin((deg * Math.PI) / 180)];
const ring: [number, number][] = [P(190), P(300), P(10), P(115), P(245)];
const inner: [number, number][] = [[330, 470], [470, 262], [565, 430], [420, 595], [248, 330]];
const nodes = [...ring, ...inner];
// arêtes : indices dans nodes (0-4 anneau, 5-9 intérieur)
const edges: [number, number][] = [[0, 5], [5, 6], [6, 2], [6, 1], [5, 8], [8, 3], [7, 2], [6, 7], [9, 4], [9, 6], [9, 0], [8, 7]];
const signalPath = [nodes[0], nodes[5], nodes[6], nodes[2]];

/** Constellation animée inspirée des nœuds du symbole NEO 7COMM (élément original, pas le logo). */
export function NodeField({ progress, className = "" }: { progress?: MotionValue<number>; className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const fx = useTransform(sx, (v) => v * 18), fy = useTransform(sy, (v) => v * 18);
  const bx = useTransform(sx, (v) => v * -10), by = useTransform(sy, (v) => v * -10);
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  const scale = useTransform(p, [0, 1], [1, reduce ? 1 : 1.45]);
  const op = useTransform(p, [0, 0.8], [1, reduce ? 1 : 0.15]);
  useEffect(() => {
    if (reduce) return;
    const on = (e: PointerEvent) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [reduce, mx, my]);
  const draw = (i: number) => reduce ? {} : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.1, delay: 0.5 + i * 0.09, ease: [0.6, 0, 0.2, 1] } };

  return (
    <motion.div aria-hidden className={className} style={{ scale, opacity: op }}>
      <svg viewBox="0 0 800 800" className="h-full w-full overflow-visible">
        {/* calque arrière : anneaux de plan */}
        <motion.g style={{ x: bx, y: by }}>
          <g style={{ transformOrigin: "400px 400px", animation: reduce ? undefined : "spin-slow 140s linear infinite" }}>
            <circle cx={C} cy={C} r={372} fill="none" stroke="rgba(255,255,255,.12)" strokeDasharray="2 10" />
            <circle cx={C} cy={C} r={392} fill="none" stroke="rgba(255,255,255,.06)" />
            {Array.from({ length: 72 }).map((_, i) => {
              const a = (i * 5 * Math.PI) / 180, r1 = 392, r2 = i % 6 === 0 ? 404 : 398;
              return <line key={i} x1={C + r1 * Math.cos(a)} y1={C + r1 * Math.sin(a)} x2={C + r2 * Math.cos(a)} y2={C + r2 * Math.sin(a)} stroke="rgba(255,255,255,.18)" />;
            })}
          </g>
        </motion.g>
        {/* calque avant : réseau */}
        <motion.g style={{ x: fx, y: fy }}>
          <motion.circle cx={C} cy={C} r={R} fill="none" stroke="#FF9900" strokeWidth={10} strokeLinecap="round"
            {...(reduce ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.8, ease: [0.6, 0, 0.2, 1] } })}
            style={{ rotate: -100, transformOrigin: "400px 400px" }} />
          {edges.map(([a, b], i) => (
            <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
              stroke={i < 4 ? "#FF9900" : "rgba(255,255,255,.28)"} strokeWidth={i < 4 ? 8 : 2} strokeLinecap="round" {...draw(i)} />
          ))}
          {nodes.map(([x, y], i) => {
            const big = i < 5 || i === 5 || i === 6;
            return (
              <motion.g key={i} {...(reduce ? {} : { initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", stiffness: 260, damping: 16, delay: 0.9 + i * 0.07 } })}
                style={{ transformOrigin: `${x}px ${y}px` }}>
                <circle cx={x} cy={y} r={big ? 30 : 11} fill="#080808" stroke={big ? "#FF9900" : "rgba(255,255,255,.55)"} strokeWidth={big ? 9 : 3} />
                {!big && <circle cx={x} cy={y} r={3} fill="#fff" style={{ animation: reduce ? undefined : `pulse-node ${2.4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite` }} />}
              </motion.g>
            );
          })}
          {/* signal qui circule */}
          {!reduce && (
            <motion.circle r={7} fill="#fff"
              animate={{ cx: signalPath.map((p) => p[0]), cy: signalPath.map((p) => p[1]), opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut", delay: 2.6 }} />
          )}
          <circle cx={nodes[6][0]} cy={nodes[6][1]} r={30} fill="none" stroke="#FF9900" strokeWidth={2}
            style={{ transformOrigin: `${nodes[6][0]}px ${nodes[6][1]}px`, animation: reduce ? undefined : "ping-ring 2.8s ease-out 3s infinite", opacity: reduce ? 0 : undefined }} />
        </motion.g>
      </svg>
    </motion.div>
  );
}
