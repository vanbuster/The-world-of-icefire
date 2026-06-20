import type { CollectionConfig, Field } from "payload";

const sourceTypeField = {
  name: "sourceType",
  type: "select",
  required: true,
  defaultValue: "mixed",
  options: [
    { label: "Novel", value: "novel" },
    { label: "Show", value: "show" },
    { label: "Show Canon", value: "show-canon" },
    { label: "Mixed", value: "mixed" },
    { label: "Original Note", value: "original-note" },
  ],
  admin: {
    description: "内容来源线：原著 / 剧集 / 混合 / 二创注释。",
  },
} satisfies Field;

const canonLevelField = {
  name: "canonLevel",
  type: "select",
  required: true,
  defaultValue: "mixed-canon",
  options: [
    { label: "Book Canon", value: "book-canon" },
    { label: "Show Canon", value: "show-canon" },
    { label: "Mixed Canon", value: "mixed-canon" },
    { label: "Fan Interpretation", value: "fan-interpretation" },
  ],
  admin: {
    description: "正典层级标记，前台用于显示来源标签。",
  },
} satisfies Field;

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

export const Houses: CollectionConfig = {
  slug: "houses",
  admin: {
    useAsTitle: "nameZh",
    group: "World Model",
    defaultColumns: ["nameZh", "seatLocation", "status"],
  },
  fields: [
    { name: "nameZh", type: "text", required: true },
    { name: "nameEn", type: "text", required: true },
    { name: "motto", type: "text" },
    { name: "sigilDescription", type: "textarea", required: true },
    {
      name: "sigil",
      type: "relationship",
      relationTo: "media",
    },
    { name: "primaryColor", type: "text", defaultValue: "#222222" },
    { name: "secondaryColor", type: "text", defaultValue: "#d4a84d" },
    {
      name: "seatLocation",
      type: "relationship",
      relationTo: "locations",
    },
    {
      name: "controlledRegions",
      type: "relationship",
      relationTo: "regions",
      hasMany: true,
    },
    sourceTypeField,
    canonLevelField,
    statusField,
  ],
  versions: {
    drafts: true,
  },
};
