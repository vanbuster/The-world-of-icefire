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

export const Storylines: CollectionConfig = {
  slug: "storylines",
  admin: {
    useAsTitle: "title",
    group: "World Model",
    defaultColumns: ["title", "sourceType", "status"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "relatedEvents",
      type: "relationship",
      relationTo: "events",
      hasMany: true,
    },
    {
      name: "relatedLocations",
      type: "relationship",
      relationTo: "locations",
      hasMany: true,
    },
    {
      name: "relatedCharacters",
      type: "relationship",
      relationTo: "characters",
      hasMany: true,
    },
    {
      name: "relatedHouses",
      type: "relationship",
      relationTo: "houses",
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
