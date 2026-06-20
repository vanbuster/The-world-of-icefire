import type { CharacterCardViewModel } from "@/types";

import { HouseBadge } from "@/components/house/HouseBadge";
import { SourceBadge } from "@/components/source/SourceBadge";

type CharacterCardProps = {
  character: CharacterCardViewModel;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article
      className="rounded border border-dark-gold/22 bg-ink/26 p-3"
      data-character-id={character.id}
    >
      <div className="flex gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded border border-dark-gold/26 bg-parchment/12 text-lg font-semibold text-burnished-gold">
          {character.nameEn.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-panel-foreground">
            {character.nameZh}
          </h4>
          <p className="mt-0.5 truncate text-xs text-fog/68">
            {character.nameEn}
          </p>
          <div className="mt-2">
            <SourceBadge
              canon={character.canonLabel}
              source={character.sourceLabel}
            />
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-xs leading-5 text-fog">
        {character.shortBio}
      </p>
      {character.house ? (
        <div className="mt-3">
          <HouseBadge house={character.house} />
        </div>
      ) : null}
    </article>
  );
}
