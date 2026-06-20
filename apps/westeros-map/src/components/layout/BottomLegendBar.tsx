import { Castle, Diamond, Flag, Mountain, Waves } from "lucide-react";

const legendItems = [
  { label: "城堡", icon: Castle, tone: "text-burnished-gold" },
  { label: "城市", icon: Diamond, tone: "text-parchment" },
  { label: "家族控制", icon: Flag, tone: "text-blood-rust" },
  { label: "山脉", icon: Mountain, tone: "text-fog" },
  { label: "海域", icon: Waves, tone: "text-sea-muted" },
];

const sourceItems = [
  { label: "原著线", color: "bg-burnished-gold" },
  { label: "剧集线", color: "bg-winter-blue" },
  { label: "混合线", color: "bg-forest-deep" },
  { label: "二创注释", color: "bg-blood-rust" },
];

const houseSigilButtons = [
  {
    label: "史塔克",
    image: "/assets/westeros/generated/v16/houses/house-stark-material-v2.png",
    ring: "#9ca3af",
  },
  {
    label: "拜拉席恩",
    image: "/assets/westeros/generated/v16/houses/house-baratheon-material-v2.png",
    ring: "#d4a84d",
  },
  {
    label: "兰尼斯特",
    image: "/assets/westeros/generated/v16/houses/house-lannister-material-v2.png",
    ring: "#d4a84d",
  },
  {
    label: "葛雷乔伊",
    image: "/assets/westeros/generated/v16/houses/house-greyjoy-material-v2.png",
    ring: "#c7a64b",
  },
  {
    label: "波顿",
    image: "/assets/westeros/generated/v16/houses/house-bolton-material-v2.png",
    ring: "#f1d1bf",
  },
] as const;

export function BottomLegendBar() {
  return (
    <footer
      className="flex h-[74px] shrink-0 items-center justify-between gap-4 border-t border-dark-gold/30 bg-panel/82 px-5"
      data-bottom-legend
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
          图例
        </span>
        <div className="flex items-center gap-2">
          {legendItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                className="flex h-9 items-center gap-2 rounded border border-dark-gold/20 bg-ink/32 px-3 text-xs text-fog"
                key={item.label}
              >
                <Icon className={item.tone} size={15} strokeWidth={1.8} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        aria-label="家族旗帜按钮"
        className="flex shrink-0 items-center gap-2"
        data-house-sigil-buttons
      >
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
          家族
        </span>
        {houseSigilButtons.map((house) => (
          <button
            aria-label={`${house.label}家族旗帜`}
            className="group grid h-12 w-12 place-items-center rounded border border-dark-gold/30 bg-ink/45 p-[3px] shadow-[inset_0_1px_0_rgba(245,211,107,0.10),0_7px_18px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-burnished-gold/70 hover:bg-ink/62 focus:outline-none focus:ring-2 focus:ring-burnished-gold/70"
            data-house-sigil-button={house.label}
            key={house.label}
            title={`${house.label}家族旗帜`}
            type="button"
          >
            <span
              className="block h-full w-full rounded-sm bg-cover bg-center ring-1 ring-black/45 transition group-hover:brightness-110"
              style={{
                backgroundImage: `url(${house.image})`,
                boxShadow: `0 0 0 1px ${house.ring}66`,
              }}
            />
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
          Source
        </span>
        {sourceItems.map((item) => (
          <div
            className="flex h-9 items-center gap-2 rounded border border-dark-gold/20 bg-ink/32 px-3 text-xs text-fog"
            key={item.label}
          >
            <span className={`h-2 w-2 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
