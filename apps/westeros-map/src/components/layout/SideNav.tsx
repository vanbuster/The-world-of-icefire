import {
  Castle,
  GitBranch,
  Landmark,
  Map,
  Shield,
  Swords,
  Users,
} from "lucide-react";

const primaryViews = [
  {
    label: "全境地图",
    description: "维斯特洛大陆节点总览",
    icon: Map,
    active: true,
  },
  {
    label: "家族势力",
    description: "纹章、领地与政治归属",
    icon: Shield,
    active: false,
  },
  {
    label: "人物图谱",
    description: "角色关系与地点关联",
    icon: Users,
    active: false,
  },
  {
    label: "历史年表",
    description: "按阶段回看关键事件",
    icon: Landmark,
    active: false,
  },
  {
    label: "故事主线",
    description: "北境、王权与战争线",
    icon: GitBranch,
    active: false,
  },
];

const quickFilters = [
  { label: "城堡", icon: Castle },
  { label: "战争", icon: Swords },
  { label: "史塔克", icon: Shield },
];

export function SideNav() {
  return (
    <aside className="flex min-h-0 w-[272px] shrink-0 flex-col border-r border-dark-gold/30 bg-panel/72">
      <div className="border-b border-dark-gold/25 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-burnished-gold">
          Map Console
        </p>
        <h2 className="mt-2 text-base font-semibold text-panel-foreground">
          世界观浏览器
        </h2>
        <p className="mt-2 text-xs leading-5 text-fog/75">
          地图是入口，故事、人物、家族和素材围绕地点展开。
        </p>
      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {primaryViews.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={[
                "group flex w-full items-start gap-3 rounded border px-3 py-3 text-left transition",
                item.active
                  ? "border-burnished-gold/55 bg-dark-gold/18 text-panel-foreground shadow-[inset_3px_0_0_var(--burnished-gold)]"
                  : "border-dark-gold/18 bg-ink/20 text-fog hover:border-dark-gold/45 hover:bg-ink/35 hover:text-panel-foreground",
              ].join(" ")}
              key={item.label}
              type="button"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded border border-dark-gold/30 bg-ink/45 text-burnished-gold">
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="mt-1 block text-xs leading-5 text-fog/64">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-dark-gold/25 p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-burnished-gold">
          快速筛选
        </p>
        <div className="grid grid-cols-3 gap-2">
          {quickFilters.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className="flex h-16 flex-col items-center justify-center gap-1 rounded border border-dark-gold/20 bg-ink/25 text-xs text-fog transition hover:border-burnished-gold/45 hover:text-burnished-gold"
                key={item.label}
                type="button"
              >
                <Icon size={15} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
