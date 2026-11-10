'use client';

import { useEffect } from 'react';

/**
 * 首页动效引擎（无 UI）：
 * 1. 把指针位置写进 --mx / --my，供首屏光晕层跟随（rAF 节流）；
 * 2. 用 IntersectionObserver 给 [data-reveal] 元素加 .in-view，实现交错入场；
 *    MutationObserver 负责给搜索后新挂载的卡片补注册。
 *
 * 只有在 html.motion-ready 存在时 [data-reveal] 才会隐藏，JS 未执行时内容照常可见。
 * prefers-reduced-motion 下不注册任何动效。
 */
export function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('motion-ready');

    let raf = 0;
    const onPointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
      });
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    const observe = () => {
      document.querySelectorAll('[data-reveal]:not(.in-view)').forEach((el) => io.observe(el));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    // 兜底：首屏附近的显现元素即使观察器未触发，1.8s 后也强制可见
    const fallback = window.setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.in-view)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.4) {
          el.classList.add('in-view');
        }
      });
    }, 1800);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);

  return null;
}
