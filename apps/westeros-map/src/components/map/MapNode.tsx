import { virtualCoordinateToCss } from "@/lib/map/coordinates";
import type { LocationType, MapLocationViewModel } from "@/types";

const typeLabelMap = {
  castle: "城堡",
  city: "城市",
  region: "地区",
  fortress: "要塞",
  port: "港口",
  sea: "海域",
  road: "道路",
  river: "河流",
  mountain: "山脉",
  forest: "森林",
  wall: "长城",
  other: "地点",
} satisfies Record<LocationType, string>;

const nodeTypeArtMap = {
  castle: "/assets/westeros/generated/v16/nodes/map-node-castle-v2.png",
  city: "/assets/westeros/generated/v16/nodes/map-node-city-v2.png",
  region: "/assets/westeros/generated/v16/nodes/map-node-forest-v2.png",
  fortress: "/assets/westeros/generated/v16/nodes/map-node-mountain-v2.png",
  port: "/assets/westeros/generated/v16/nodes/map-node-port-v2.png",
  sea: "/assets/westeros/generated/v16/nodes/map-node-port-v2.png",
  road: "/assets/westeros/generated/v16/nodes/map-node-forest-v2.png",
  river: "/assets/westeros/generated/v16/nodes/map-node-port-v2.png",
  mountain: "/assets/westeros/generated/v16/nodes/map-node-mountain-v2.png",
  forest: "/assets/westeros/generated/v16/nodes/map-node-forest-v2.png",
  wall: "/assets/westeros/generated/v16/nodes/map-node-wall-v2.png",
  other: "/assets/westeros/generated/v16/nodes/map-node-castle-v2.png",
} satisfies Record<LocationType, string>;

const locationNodeArtMap: Record<string, string> = {
  winterfell: "/assets/westeros/generated/v17/nodes/map-node-winterfell-v1.png",
  "kings-landing":
    "/assets/westeros/generated/v17/nodes/map-node-kings-landing-v1.png",
  "the-wall": "/assets/westeros/generated/v17/nodes/map-node-the-wall-v1.png",
  "castle-black":
    "/assets/westeros/generated/v17/nodes/map-node-castle-black-v1.png",
  "the-eyrie":
    "/assets/westeros/generated/v17/nodes/map-node-the-eyrie-v1.png",
  riverrun: "/assets/westeros/generated/v17/nodes/map-node-riverrun-v1.png",
  harrenhal: "/assets/westeros/generated/v17/nodes/map-node-harrenhal-v1.png",
  "casterly-rock":
    "/assets/westeros/generated/v17/nodes/map-node-casterly-rock-v1.png",
  highgarden:
    "/assets/westeros/generated/v17/nodes/map-node-highgarden-v1.png",
  "storms-end":
    "/assets/westeros/generated/v17/nodes/map-node-storms-end-v1.png",
  pyke: "/assets/westeros/generated/v17/nodes/map-node-pyke-v1.png",
  sunspear: "/assets/westeros/generated/v17/nodes/map-node-sunspear-v1.png",
};

type MapNodeProps = {
  location: MapLocationViewModel;
  isHovered?: boolean;
  isSelected?: boolean;
  onHoverChange?: (locationId: string | null) => void;
  onSelect?: (location: MapLocationViewModel) => void;
};

export function MapNode({
  location,
  isHovered = false,
  isSelected = false,
  onHoverChange,
  onSelect,
}: MapNodeProps) {
  const isWinterfell = location.id === "winterfell";
  const shouldShowLabel = location.nodeLevel <= 2 || isWinterfell;
  const activateHover = () => onHoverChange?.(location.id);
  const deactivateHover = () => onHoverChange?.(null);
  const locationNodeArt = locationNodeArtMap[location.id];
  const nodeArt = locationNodeArt ?? nodeTypeArtMap[location.type];
  const nodeArtKey = locationNodeArt ? location.id : location.type;

  return (
    <button
      className={[
        "pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-left transition",
        location.nodeLevel > 2 ? "z-10" : "z-20",
        isHovered ? "scale-[1.04]" : "scale-100",
      ].join(" ")}
      data-location-id={location.id}
      data-location-clickable={location.isClickable}
      data-location-detail-level={location.detailLevel}
      onBlur={deactivateHover}
      onClick={() => onSelect?.(location)}
      onFocus={activateHover}
      onMouseEnter={activateHover}
      onMouseLeave={deactivateHover}
      style={virtualCoordinateToCss(location)}
      type="button"
    >
      <span
        className={[
          "grid place-items-center rounded-full border bg-ink/76 p-[2px] shadow-[0_10px_24px_rgba(0,0,0,0.34)]",
          isSelected || isHovered || isWinterfell
            ? "h-[52px] w-[52px] border-burnished-gold text-burnished-gold shadow-[0_0_24px_rgba(212,168,77,0.36)]"
            : location.isClickable
              ? "h-11 w-11 border-burnished-gold/80 text-burnished-gold"
              : "h-9 w-9 border-aged-paper/55 text-faded-ink",
        ].join(" ")}
        data-map-node-art={nodeArt}
        data-map-node-art-key={nodeArtKey}
        title={`${location.nameZh} / ${typeLabelMap[location.type]}`}
      >
        <span
          className="block h-full w-full rounded-full bg-cover bg-center"
          data-map-node-art-image={nodeArtKey}
          style={{ backgroundImage: `url(${nodeArt})` }}
        />
      </span>

      {shouldShowLabel || isHovered ? (
        <span
          className={[
            "max-w-36 rounded border bg-parchment/76 px-2 py-1 text-xs font-medium leading-none shadow-sm",
            isSelected || isHovered || isWinterfell
              ? "border-burnished-gold text-ink"
              : "border-aged-paper/35 text-faded-ink",
          ].join(" ")}
        >
          {location.nameZh}
        </span>
      ) : null}
    </button>
  );
}
