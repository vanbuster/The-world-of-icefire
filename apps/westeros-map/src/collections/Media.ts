import type { CollectionConfig, Field } from "payload";

const statusField = {
  name: "status",
  type: "select",
  required: true,
  defaultValue: "draft",
  options: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
  ],
  admin: {
    position: "sidebar",
    description: "前台只读取 published 内容；draft 用于后台编辑。",
  },
} satisfies Field;

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "title",
    group: "Content Library",
    defaultColumns: ["title", "assetType", "licenseStatus", "riskLevel"],
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "素材名称，用于前台图集和后台列表。",
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "前台图片替代文本。",
      },
    },
    {
      name: "assetType",
      type: "select",
      required: true,
      defaultValue: "reference",
      options: [
        { label: "Map Base", value: "map-base" },
        { label: "Local Map", value: "local-map" },
        { label: "Event Art", value: "event-art" },
        { label: "Character Art", value: "character-art" },
        { label: "House Sigil", value: "house-sigil" },
        { label: "Texture", value: "texture" },
        { label: "Weather", value: "weather" },
        { label: "UI", value: "ui" },
        { label: "Reference", value: "reference" },
      ],
    },
    {
      name: "sourceType",
      type: "select",
      required: true,
      defaultValue: "original",
      options: [
        { label: "Original", value: "original" },
        { label: "AI Generated", value: "ai-generated" },
        { label: "Redrawn Reference", value: "redrawn-reference" },
        { label: "Open License", value: "open-license" },
        { label: "Public Reference", value: "public-reference" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: {
        description: "原始来源链接或参考链接。",
      },
    },
    {
      name: "author",
      type: "text",
      admin: {
        description: "作者、画师、模型来源或素材提供方。",
      },
    },
    {
      name: "sourceParty",
      type: "text",
      admin: {
        description: "来源方、站点或授权主体。",
      },
    },
    {
      name: "isAIGenerated",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "isDerivative",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "是否参考既有视觉素材进行二次创作或重绘。",
      },
    },
    {
      name: "licenseStatus",
      type: "select",
      required: true,
      defaultValue: "unknown",
      options: [
        { label: "Original", value: "original" },
        { label: "Open License", value: "open-license" },
        { label: "AI Generated", value: "ai-generated" },
        { label: "Reference Only", value: "reference-only" },
        { label: "Unknown", value: "unknown" },
      ],
    },
    {
      name: "riskLevel",
      type: "select",
      required: true,
      defaultValue: "low",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
    {
      name: "usageScope",
      type: "select",
      required: true,
      defaultValue: "private-prototype",
      options: [
        { label: "Private Prototype", value: "private-prototype" },
        { label: "Public Ready Candidate", value: "public-ready-candidate" },
        { label: "Blocked", value: "blocked" },
      ],
      admin: {
        description:
          "素材使用范围：本地私有原型、可进入公开候选、或上线前必须阻断。",
      },
    },
    {
      name: "generationPromptSummary",
      type: "textarea",
      admin: {
        description: "AI 生成素材时记录简要 prompt，不保存敏感密钥。",
      },
    },
    {
      name: "referenceNotes",
      type: "textarea",
    },
    {
      name: "notes",
      type: "textarea",
    },
    statusField,
  ],
  versions: {
    drafts: true,
  },
};
