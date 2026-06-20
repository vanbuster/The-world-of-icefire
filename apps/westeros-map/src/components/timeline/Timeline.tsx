import type { TimelineItemViewModel } from "@/types";

import { SourceBadge } from "@/components/source/SourceBadge";

type TimelineProps = {
  items: TimelineItemViewModel[];
  locationId?: string;
};

export function Timeline({ items, locationId }: TimelineProps) {
  return (
    <section
      className="space-y-3"
      data-location-timeline={locationId}
      data-winterfell-timeline={locationId === "winterfell" ? true : undefined}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-panel-foreground">事件时间线</h3>
        <span className="text-xs text-fog/58">{items.length} 个事件</span>
      </div>
      <div className="relative space-y-3 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-dark-gold/30">
        {items.map((item) => (
          <article
            className="relative ml-7 rounded border border-dark-gold/22 bg-ink/28 p-3"
            data-event-id={item.id}
            key={item.id}
          >
            <span className="absolute -left-[1.55rem] top-4 h-3 w-3 rounded-full border border-burnished-gold bg-panel" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-burnished-gold/82">
                  {item.displayDate ?? `Order ${item.order}`}
                </p>
                <h4 className="mt-1 text-sm font-semibold text-panel-foreground">
                  {item.title}
                </h4>
              </div>
              <SourceBadge canon={item.canonLabel} source={item.sourceLabel} />
            </div>
            <p className="mt-2 text-xs leading-5 text-fog">{item.summary}</p>
            {item.asset ? (
              <div
                aria-label={item.asset.alt}
                className="mt-3 flex min-h-24 items-end overflow-hidden rounded border border-dark-gold/18 bg-parchment/8 bg-cover bg-center p-2"
                data-event-art={item.asset.id}
                role="img"
                style={{
                  backgroundImage: `linear-gradient(rgba(19,12,8,0.08), rgba(19,12,8,0.62)), url(${item.asset.src})`,
                }}
              >
                <span className="rounded bg-ink/70 px-2 py-1 text-[10px] leading-4 text-fog/76">
                  {item.asset.title}
                </span>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
