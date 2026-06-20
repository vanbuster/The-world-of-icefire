"use client";

import { X } from "lucide-react";

import {
  getLocationById,
} from "@/lib/content/selectors";
import { getFrontendContentSnapshot } from "@/lib/cms/dataSource";
import { useMapStore } from "@/stores/mapStore";

import { LocationPanel } from "./LocationPanel";

function EmptyPanel() {
  return (
    <div className="flex min-h-0 flex-1 flex-col" data-detail-panel-state="closed">
      <div className="border-b border-dark-gold/28 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
          Detail Panel
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-panel-foreground">
          选择地图地点
        </h2>
        <p className="mt-4 text-sm leading-7 text-fog">
          点击临冬城可展开完整地点档案；其他地点作为沙盘节点保留，后续可逐步扩展为完整条目。
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        {["地点基础介绍", "局部地图", "关键事件时间线", "人物与家族卡片"].map(
          (item) => (
            <div
              className="rounded border border-dark-gold/22 bg-ink/28 p-4"
              key={item}
            >
              <p className="text-sm font-medium text-panel-foreground">{item}</p>
              <div className="mt-3 h-2 rounded bg-dark-gold/16" />
              <div className="mt-2 h-2 w-2/3 rounded bg-dark-gold/12" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function DetailPanelHost() {
  const selectedLocationId = useMapStore((state) => state.selectedLocationId);
  const pendingLocationId = useMapStore((state) => state.pendingLocationId);
  const closePanel = useMapStore((state) => state.closePanel);

  const selectedLocation = selectedLocationId
    ? getLocationById(selectedLocationId)
    : undefined;
  const selectedLocationDetail = selectedLocationId
    ? getFrontendContentSnapshot().getLocationDetail(selectedLocationId)
    : undefined;
  const pendingLocation = pendingLocationId
    ? getLocationById(pendingLocationId)
    : undefined;

  if (!selectedLocation && !pendingLocation) {
    return <EmptyPanel />;
  }

  if (pendingLocation) {
    return (
      <div
        className="flex min-h-0 flex-1 flex-col"
        data-detail-panel-state="pending"
      >
        <div className="border-b border-dark-gold/28 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
                Pending Detail
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-panel-foreground">
                {pendingLocation.nameZh}
              </h2>
              <p className="mt-1 text-sm text-fog/72">
                {pendingLocation.nameEn}
              </p>
            </div>
            <button
              aria-label="关闭详情面板"
              className="grid h-8 w-8 shrink-0 place-items-center rounded border border-dark-gold/30 text-fog transition hover:bg-dark-gold/20 hover:text-burnished-gold"
              onClick={closePanel}
              type="button"
            >
              <X size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 p-5">
          <div className="rounded border border-dark-gold/24 bg-ink/30 p-4">
            <p className="text-sm font-semibold text-panel-foreground">
              详情待扩展
            </p>
            <p className="mt-3 text-sm leading-7 text-fog">
              {pendingLocation.shortDescription}
            </p>
            <p className="mt-4 text-xs leading-6 text-fog/70">
              此地点已作为地图节点入库，后续可在 CMS 中补充事件、人物、素材和故事线。
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedLocationDetail) {
    return <EmptyPanel />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-detail-panel-state="open">
      <div className="border-b border-dark-gold/28 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
              Location Detail
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-panel-foreground">
              {selectedLocation?.nameZh}
            </h2>
            <p className="mt-1 text-sm text-fog/72">
              {selectedLocation?.nameEn}
            </p>
          </div>
          <button
            aria-label="关闭详情面板"
            className="grid h-8 w-8 shrink-0 place-items-center rounded border border-dark-gold/30 text-fog transition hover:bg-dark-gold/20 hover:text-burnished-gold"
            onClick={closePanel}
            type="button"
          >
            <X size={15} strokeWidth={1.8} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-7 text-fog">
          {selectedLocation?.shortDescription}
        </p>
      </div>
      <LocationPanel location={selectedLocationDetail} />
    </div>
  );
}
