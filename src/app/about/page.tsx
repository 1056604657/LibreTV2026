'use client';

import { Header } from '@/components/header';
import { SiteFooter } from '@/components/site-footer';
import { HomeMotion } from '@/components/home-motion';

const SHORTCUTS = [
  { keys: '空格', desc: '播放 / 暂停' },
  { keys: '← / →', desc: '快退 / 快进 5 秒' },
  { keys: '↑ / ↓', desc: '音量调节' },
  { keys: 'F', desc: '切换全屏' },
  { keys: 'Alt + ←/→', desc: '上一集 / 下一集' },
  { keys: '长按', desc: '移动端 3 倍速播放' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HomeMotion />

      <main className="relative isolate flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-20">
        {/* 与首页同一套氛围层 */}
        <div className="home-atmosphere" aria-hidden>
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>
        <div className="pointer-glow" aria-hidden />

        <div className="relative z-10">
          <section className="pt-14 sm:pt-20 pb-12" aria-labelledby="about-title">
            <div className="flex items-center gap-3 mb-6 fact-item" style={{ animationDelay: '0.04s' }}>
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs text-accent">关于本站</span>
            </div>
            <h1
              id="about-title"
              className="display text-[clamp(3rem,9vw,7rem)] leading-[0.9] font-medium text-content"
            >
              {'关于 LibreTV'.split('').map((ch, i) => (
                <span key={i} className="char-in" style={{ animationDelay: `${i * 55}ms` }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </h1>
            <div className="mt-8 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16" data-split>
              <p className="max-w-xl text-base sm:text-lg text-muted leading-relaxed">
                免费的在线视频搜索与观看平台。输入片名即可在多个点播源中聚合搜索，
                无需注册、无内嵌广告、不存储任何视频文件。所有播放内容均来自第三方公开接口。
              </p>
              <div className="flex flex-wrap gap-x-7 gap-y-2 pb-1">
                {['聚合搜索', 'HLS 播放', '本地进度'].map((fact, i) => (
                  <span
                    key={fact}
                    className="fact-item text-xs text-faint"
                    style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                  >
                    <span className="text-accent mr-1.5">/</span>
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-14" data-reveal>
            <h2 className="display text-2xl sm:text-3xl font-medium text-content mb-6">快捷键</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
              {SHORTCUTS.map((item) => (
                <div key={item.keys} className="card p-4 flex items-center gap-3">
                  <kbd className="shrink-0 bg-chip border border-line rounded-md px-2.5 py-1 font-mono text-xs text-accent">
                    {item.keys}
                  </kbd>
                  <span className="text-sm text-muted">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14" data-reveal>
            <h2 className="display text-2xl sm:text-3xl font-medium text-content mb-4">隐私与数据</h2>
            <p className="max-w-2xl text-sm sm:text-base text-muted leading-relaxed">
              你的搜索历史、观看进度等数据仅保存在本设备浏览器中（IndexedDB），不会上传到服务器。
              聚合搜索请求由服务端代理转发，第三方数据源不会看到你的 IP 地址。
            </p>
          </section>

          <section className="mb-14" data-reveal>
            <h2 className="display text-2xl sm:text-3xl font-medium text-content mb-4">免责声明</h2>
            <p className="max-w-2xl text-sm sm:text-base text-faint leading-relaxed">
              本项目不存储、不制作任何视频内容，仅提供第三方公开接口的聚合与播放能力。
              请尊重版权，所有内容的合法性由对应数据源负责。
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
