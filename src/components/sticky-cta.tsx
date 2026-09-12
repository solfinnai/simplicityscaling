"use client";

import { useEffect, useState } from "react";

import { CtaArrow } from "@/components/cta-arrow";
import { copy } from "@/lib/copy";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const session = document.getElementById("strategy-session");
      const sessionTop = session?.getBoundingClientRect().top ?? 9999;
      const pastHero = window.scrollY > 420;
      const overForm = sessionTop < window.innerHeight * 0.72;
      setVisible(pastHero && !overForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-md transition-all duration-300 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a href="#strategy-session" className="btn-primary w-full">
        {copy.nav.book}
        <CtaArrow />
      </a>
    </div>
  );
}
