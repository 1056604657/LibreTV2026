'use client';

/**
 * 全站统一页脚。
 *
 * 本地部署按需求隐藏整行「LibreTV vX.Y.Z · AGPL-3.0 License」（含分割线），
 * 因此组件不渲染任何内容。首页 / 与关于页 /about 的引用保持不变，便于日后恢复。
 *
 * 恢复原页脚：git checkout HEAD -- src/components/site-footer.tsx
 */
export function SiteFooter() {
  return null;
}
