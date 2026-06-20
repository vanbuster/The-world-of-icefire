const databaseUri = process.env.DATABASE_URI;
const sqliteDatabaseUri =
  process.env.SQLITE_DATABASE_URI ?? "file:./payload-dev.db";

const configPromise = (async () => {
  const [
    { Characters },
    { Events },
    { Houses },
    { Locations },
    { Media },
    { Regions },
    { Storylines },
    { Users },
    { postgresAdapter },
    { sqliteAdapter },
    { lexicalEditor },
    { buildConfig },
    { default: sharp },
  ] = await Promise.all([
    import("./src/collections/Characters"),
    import("./src/collections/Events"),
    import("./src/collections/Houses"),
    import("./src/collections/Locations"),
    import("./src/collections/Media"),
    import("./src/collections/Regions"),
    import("./src/collections/Storylines"),
    import("./src/collections/Users"),
    import("@payloadcms/db-postgres"),
    import("@payloadcms/db-sqlite"),
    import("@payloadcms/richtext-lexical"),
    import("payload"),
    import("sharp"),
  ]);

  const db = databaseUri
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
        },
      })
    : sqliteAdapter({
        client: {
          url: sqliteDatabaseUri,
        },
      });

  return buildConfig({
    admin: {
      user: Users.slug,
      meta: {
        titleSuffix: "- Westeros Atlas CMS",
      },
    },
    collections: [
      Users,
      Media,
      Regions,
      Houses,
      Characters,
      Events,
      Storylines,
      Locations,
    ],
    db,
    editor: lexicalEditor(),
    graphQL: {
      schemaOutputFile: "./src/generated-schema.graphql",
    },
    secret: process.env.PAYLOAD_SECRET ?? "dev-secret-change-me-before-deploy",
    sharp,
    typescript: {
      outputFile: "./src/payload-types.ts",
    },
  });
})();

export default configPromise;
