import {
  BookOpen,
  Database,
  Eye,
  Settings,
  Sparkles,
} from "lucide-react";

import { SearchBox } from "@/components/search/SearchBox";

const statusItems = [
  { label: "桌面端", value: "1920x1080+" },
  { label: "内容线", value: "Mixed Canon" },
  { label: "样板", value: "Winterfell" },
];

export function TopNav() {
  return (
    <header className="relative z-50 flex h-16 shrink-0 items-center justify-between border-b border-dark-gold/35 bg-panel/86 px-6 shadow-[0_1px_0_rgba(212,168,77,0.16)] backdrop-blur">
      <div className="flex min-w-[360px] items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded border border-burnished-gold/45 bg-ink/65 text-burnished-gold shadow-map-glow">
          <Sparkles size={18} strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-burnished-gold">
            Westeros Atlas
          </p>
          <h1 className="text-lg font-semibold text-panel-foreground">
            维斯特洛互动世界地图
          </h1>
        </div>
      </div>

      <SearchBox />

      <div className="flex items-center gap-3">
        {statusItems.map((item) => (
          <div
            className="hidden rounded border border-dark-gold/25 bg-ink/35 px-3 py-1.5 text-xs text-fog xl:block"
            key={item.label}
          >
            <span className="mr-2 text-fog/55">{item.label}</span>
            <span className="text-panel-foreground">{item.value}</span>
          </div>
        ))}

        <div className="flex items-center rounded border border-dark-gold/25 bg-ink/45 p-1">
          <button
            aria-label="图鉴视图"
            className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/20 hover:text-burnished-gold"
            type="button"
          >
            <BookOpen size={16} strokeWidth={1.8} />
          </button>
          <button
            aria-label="预览模式"
            className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/20 hover:text-burnished-gold"
            type="button"
          >
            <Eye size={16} strokeWidth={1.8} />
          </button>
          <button
            aria-label="内容后台入口"
            className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/20 hover:text-burnished-gold"
            type="button"
          >
            <Database size={16} strokeWidth={1.8} />
          </button>
          <button
            aria-label="地图设置"
            className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/20 hover:text-burnished-gold"
            type="button"
          >
            <Settings size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
