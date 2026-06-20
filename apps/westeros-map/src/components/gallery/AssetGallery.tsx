import type { AssetViewModel } from "@/types";

type AssetGalleryProps = {
  assets: AssetViewModel[];
};

export function AssetGallery({ assets }: AssetGalleryProps) {
  return (
    <section className="space-y-3" data-winterfell-gallery>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-panel-foreground">素材图集</h3>
        <span className="text-xs text-fog/58">{assets.length} 张</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {assets.map((asset) => (
          <article
            className="rounded border border-dark-gold/22 bg-ink/26 p-2"
            key={asset.id}
          >
            <div
              aria-label={asset.alt}
              className="grid aspect-[4/3] place-items-end rounded border border-dark-gold/16 bg-parchment/10 bg-cover bg-center p-2 text-center text-[10px] leading-4 text-fog/68"
              role="img"
              style={{
                backgroundImage: `linear-gradient(rgba(19,12,8,0.08), rgba(19,12,8,0.48)), url(${asset.src})`,
              }}
            >
              <span className="rounded bg-ink/64 px-2 py-1 text-[9px] uppercase tracking-[0.18em]">
                {asset.assetType}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs font-medium text-panel-foreground">
              {asset.title}
            </p>
            <p className="mt-1 text-[10px] text-fog/58">{asset.sourceLabel}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
