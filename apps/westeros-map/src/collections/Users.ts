import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "System",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      admin: {
        description: "Single-admin MVP can use this as the creator display name.",
      },
    },
  ],
};
