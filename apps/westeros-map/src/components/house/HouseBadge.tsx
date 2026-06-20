import type { HouseBadgeViewModel } from "@/types";

type HouseBadgeProps = {
  house: HouseBadgeViewModel;
};

export function HouseBadge({ house }: HouseBadgeProps) {
  return (
    <div
      className="group flex items-center gap-3 rounded border border-dark-gold/24 bg-ink/30 p-3 shadow-[inset_0_1px_0_rgba(245,211,107,0.08)] transition-colors hover:border-burnished-gold/42 hover:bg-ink/42"
      data-house-id={house.id}
    >
      <span
        aria-label={`${house.nameZh} redrawn house sigil`}
        className="grid h-14 w-14 shrink-0 place-items-center rounded border border-burnished-gold/50 bg-ink p-[3px] shadow-[0_9px_22px_rgba(0,0,0,0.34)]"
        role="img"
        style={{
          borderColor: house.secondaryColor,
          color: house.secondaryColor,
        }}
      >
        <span
          className="grid h-full w-full place-items-center rounded-sm bg-cover bg-center text-[10px] font-semibold uppercase ring-1 ring-black/35"
          style={{
            backgroundColor: house.primaryColor,
            backgroundImage: house.sigilAssetPath
              ? `url(${house.sigilAssetPath})`
              : undefined,
          }}
        >
          {!house.sigilAssetPath ? house.nameEn.slice(6, 8) : null}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-panel-foreground">
          {house.nameZh}
        </span>
        <span className="mt-1 block truncate text-xs text-fog/68">
          {house.sigilDescription}
        </span>
      </span>
    </div>
  );
}
