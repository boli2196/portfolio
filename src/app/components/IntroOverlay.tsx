import { useEffect, useState, useSyncExternalStore } from "react";
import { StandardIntro } from "./intro/StandardIntro";
import { PlannerIntro } from "./intro/PlannerIntro";

// ── 사이트에 쓸 인트로 선택 ──
//  "standard": One Standard. — 글로벌 표준 모델 중심
//  "planner" : Plan → Launch. — 기획자의 일하는 방식 중심
// 주소 뒤에 ?intro=standard 또는 ?intro=planner 를 붙이면 바꿔서 미리 볼 수 있다
type Variant = "standard" | "planner";
const INTRO_VARIANT: Variant = "standard";

function pickVariant(): Variant {
  try {
    const q = new URLSearchParams(window.location.search).get("intro");
    if (q === "standard" || q === "planner") return q;
  } catch {}
  return INTRO_VARIANT;
}

// ── 인트로 종료 상태 (HomePage 타자 효과가 인트로 이후에 시작되도록 공유) ──
let introDone = false;
const listeners = new Set<() => void>();
function markIntroDone() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((l) => l());
}
export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => introDone,
  );
}

function shouldPlay() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  } catch {}
  // 메인 주소로 들어올 때마다 재생 (프로젝트 상세 등 딥링크는 바로 보여줌)
  const hash = window.location.hash.replace(/^#/, "");
  return hash === "" || hash === "/";
}

export function IntroOverlay() {
  const [visible, setVisible] = useState(() => shouldPlay());
  const [variant] = useState(pickVariant);

  useEffect(() => {
    if (!visible) { markIntroDone(); return; }
    document.documentElement.style.overflow = "hidden";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    document.documentElement.style.overflow = "";
    setVisible(false);
    markIntroDone();
  }

  if (!visible) return null;
  return variant === "planner" ? <PlannerIntro onFinish={finish} /> : <StandardIntro onFinish={finish} />;
}
