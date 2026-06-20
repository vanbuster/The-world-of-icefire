import type { CharacterCardViewModel } from "@/types";

import { CharacterCard } from "./CharacterCard";

type CharacterGridProps = {
  characters: CharacterCardViewModel[];
};

export function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <section className="space-y-3" data-winterfell-characters>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-panel-foreground">关联人物</h3>
        <span className="text-xs text-fog/58">{characters.length} 位</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
    </section>
  );
}
