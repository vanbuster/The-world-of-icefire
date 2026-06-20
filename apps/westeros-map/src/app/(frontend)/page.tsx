import { AppShell } from "@/components/layout/AppShell";
import { WorldMap } from "@/components/map/WorldMap";
import { DetailPanelHost } from "@/components/panel/DetailPanelHost";

export default function Home() {
  return <AppShell map={<WorldMap />} panel={<DetailPanelHost />} />;
}
