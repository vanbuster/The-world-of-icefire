import type {
  AssetLicenseStatus,
  AssetSourceType,
  CanonLevel,
  SourceType,
} from "@/types";
import type { CanonLabelViewModel, SourceLabelViewModel } from "@/types";

const sourceLabels = {
  novel: {
    label: "原著线",
    description: "以《冰与火之歌》小说已有内容为主。",
  },
  show: {
    label: "剧集线",
    description: "来自剧集叙事或剧集补充内容。",
  },
  "show-canon": {
    label: "剧集正典",
    description: "原著尚未覆盖或差异较大的剧集线事件。",
  },
  mixed: {
    label: "混合线",
    description: "原著优先，并结合剧集补充。",
  },
  "original-note": {
    label: "二创注释",
    description: "创作者整理、推断或视觉化说明。",
  },
} satisfies Record<SourceType, Omit<SourceLabelViewModel, "sourceType">>;

const canonLabels = {
  "book-canon": {
    label: "原著正典",
    description: "原著明确出现或可直接确认的内容。",
  },
  "show-canon": {
    label: "剧集正典",
    description: "剧集明确出现或推动的内容。",
  },
  "mixed-canon": {
    label: "混合正典",
    description: "原著与剧集均相关，或采用混合整理口径。",
  },
  "fan-interpretation": {
    label: "二创解释",
    description: "用于辅助浏览的创作者整理，不等同官方文本。",
  },
} satisfies Record<CanonLevel, Omit<CanonLabelViewModel, "canonLevel">>;

const assetSourceLabels = {
  original: "原创绘制",
  "ai-generated": "AI 生成",
  "redrawn-reference": "参考重绘",
  "open-license": "开源授权",
  "public-reference": "公开资料参考",
  other: "其他来源",
} satisfies Record<AssetSourceType, string>;

const licenseLabels = {
  original: "原创",
  "open-license": "开放授权",
  "ai-generated": "AI 生成",
  "reference-only": "仅作参考",
  unknown: "待确认",
} satisfies Record<AssetLicenseStatus, string>;

export function getSourceTypeLabel(sourceType: SourceType): SourceLabelViewModel {
  return {
    sourceType,
    ...sourceLabels[sourceType],
  };
}

export function getCanonLevelLabel(canonLevel: CanonLevel): CanonLabelViewModel {
  return {
    canonLevel,
    ...canonLabels[canonLevel],
  };
}

export function getAssetSourceLabel(sourceType: AssetSourceType) {
  return assetSourceLabels[sourceType];
}

export function getAssetLicenseLabel(status: AssetLicenseStatus) {
  return licenseLabels[status];
}
