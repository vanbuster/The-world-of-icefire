import type { ReactNode } from "react";

import { BottomLegendBar } from "./BottomLegendBar";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

type AppShellProps = {
  map: ReactNode;
  panel: ReactNode;
};

export function AppShell({ map, panel }: AppShellProps) {
  return (
    <main className="flex h-screen min-h-[760px] min-w-[1280px] flex-col overflow-hidden bg-background text-foreground">
      <TopNav />
      <div className="flex min-h-0 flex-1">
        <SideNav />
        <section className="relative min-w-0 flex-1 overflow-hidden bg-ink">
          <div className="weather-haze pointer-events-none absolute inset-0 opacity-80" />
          <div className="absolute inset-4 overflow-hidden rounded border border-burnished-gold/35 bg-ink/80 shadow-map-glow">
            {map}
          </div>
        </section>
        <aside className="flex min-h-0 w-[396px] shrink-0 flex-col border-l border-dark-gold/32 bg-panel/78">
          {panel}
        </aside>
      </div>
      <BottomLegendBar />
    </main>
  );
}
