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

export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "nameZh",
    group: "World Model",
    defaultColumns: ["nameZh", "type", "detailLevel", "nodeLevel", "status"],
  },
  fields: [
    { name: "nameZh", type: "text", required: true },
    { name: "nameEn", type: "text", required: true },
    {
      name: "aliases",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Castle", value: "castle" },
        { label: "City", value: "city" },
        { label: "Region", value: "region" },
        { label: "Fortress", value: "fortress" },
        { label: "Port", value: "port" },
        { label: "Sea", value: "sea" },
        { label: "Road", value: "road" },
        { label: "River", value: "river" },
        { label: "Mountain", value: "mountain" },
        { label: "Forest", value: "forest" },
        { label: "Wall", value: "wall" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "region",
      type: "relationship",
      relationTo: "regions",
    },
    {
      name: "relatedHouses",
      type: "relationship",
      relationTo: "houses",
      hasMany: true,
    },
    { name: "shortDescription", type: "textarea", required: true },
    { name: "longDescription", type: "textarea" },
    { name: "politicalStatus", type: "text" },
    { name: "geography", type: "textarea" },
    {
      name: "mapPosition",
      type: "group",
      admin: {
        description:
          "MVP uses manual coordinates. Future drag editing can write into these fields.",
      },
      fields: [
        { name: "xPercent", type: "number", min: 0, max: 100, required: true },
        { name: "yPercent", type: "number", min: 0, max: 100, required: true },
        { name: "virtualX", type: "number", min: 0, max: 10000, required: true },
        { name: "virtualY", type: "number", min: 0, max: 10000, required: true },
      ],
    },
    { name: "iconType", type: "text", required: true, defaultValue: "castle" },
    { name: "nodeLevel", type: "number", required: true, defaultValue: 2 },
    {
      name: "visibleZoomRange",
      type: "group",
      fields: [
        { name: "min", type: "number", defaultValue: 0.6 },
        { name: "max", type: "number", defaultValue: 3 },
      ],
    },
    {
      name: "isMvpClickable",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Legacy MVP flag. Prefer detailLevel for V1 click behavior.",
      },
    },
    {
      name: "detailLevel",
      type: "select",
      defaultValue: "node-only",
      required: true,
      admin: {
        description:
          "Controls frontend click behavior: full detail, preview panel, or map node only.",
      },
      options: [
        { label: "Full detail", value: "full" },
        { label: "Preview detail", value: "preview" },
        { label: "Node only", value: "node-only" },
      ],
    },
    {
      name: "detailSections",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        {
          name: "assets",
          type: "relationship",
          relationTo: "media",
          hasMany: true,
        },
      ],
    },
    {
      name: "relatedCharacters",
      type: "relationship",
      relationTo: "characters",
      hasMany: true,
    },
    {
      name: "relatedEvents",
      type: "relationship",
      relationTo: "events",
      hasMany: true,
    },
    {
      name: "relatedAssets",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "localMap",
      type: "relationship",
      relationTo: "media",
    },
    sourceTypeField,
    canonLevelField,
    statusField,
  ],
  versions: {
    drafts: true,
  },
};
