import type { CanonLabelViewModel, SourceLabelViewModel } from "@/types";

type SourceBadgeProps = {
  source?: SourceLabelViewModel;
  canon?: CanonLabelViewModel;
};

export function SourceBadge({ source, canon }: SourceBadgeProps) {
  if (!source && !canon) {
    return null;
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {source ? (
        <span
          className="rounded border border-burnished-gold/36 bg-dark-gold/14 px-2 py-0.5 text-[10px] font-medium text-burnished-gold"
          data-source-type={source.sourceType}
          title={source.description}
        >
          {source.label}
        </span>
      ) : null}
      {canon ? (
        <span
          className="rounded border border-winter-blue/28 bg-winter-blue/12 px-2 py-0.5 text-[10px] font-medium text-snow-mist"
          data-canon-level={canon.canonLevel}
          title={canon.description}
        >
          {canon.label}
        </span>
      ) : null}
    </span>
  );
}
