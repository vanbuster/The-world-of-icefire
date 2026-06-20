type MapBackgroundProps = {
  imageUrl?: string;
};

export function MapBackground({ imageUrl }: MapBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" data-map-background>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- V1.6 needs naturalWidth checks for sandtable source-resolution acceptance.
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          data-map-background-image
          draggable={false}
          src={imageUrl}
        />
      ) : (
        <div className="parchment-surface map-grain absolute inset-0">
          <div className="absolute inset-[7%] rounded-[50%] border border-aged-paper/24" />
          <div className="absolute left-[12%] top-[8%] h-[28%] w-[22%] rounded-[48%] border border-faded-ink/22 bg-winter-blue/7" />
          <div className="absolute bottom-[12%] right-[11%] h-[28%] w-[24%] rounded-[52%] border border-faded-ink/18 bg-sea-muted/10" />
          <div className="absolute left-[36%] top-[20%] h-[52%] w-[18%] rotate-[-8deg] rounded-[48%] border border-faded-ink/20 bg-forest-deep/8" />
          <div className="absolute left-[45%] top-[13%] h-[62%] w-[22%] rotate-[7deg] rounded-[50%] border border-faded-ink/20 bg-aged-paper/12" />
          <div className="absolute bottom-[10%] left-[43%] h-[18%] w-[27%] rounded-[50%] border border-faded-ink/18 bg-blood-rust/7" />
          <div className="absolute left-[7%] top-[10%] h-[10rem] w-[14rem] rounded-full bg-snow-mist/20 blur-3xl" />
          <div className="absolute bottom-[18%] right-[11%] h-[11rem] w-[16rem] rounded-full bg-war-smoke/18 blur-3xl" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0,rgba(32,22,15,0.16)_78%)]" />
    </div>
  );
}
