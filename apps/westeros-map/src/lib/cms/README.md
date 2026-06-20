# CMS Data Boundary

The frontend currently uses `mock-fallback` content through `getFrontendContentSnapshot()`.

This boundary exists so the app can switch to Payload published data without rewriting UI components.

## Current MVP Behavior

- `NEXT_PUBLIC_CONTENT_SOURCE` unset: read published mock data.
- `NEXT_PUBLIC_CONTENT_SOURCE=payload`: currently still falls back to mock data until a database is explicitly configured, migrated, seeded, and approved for local use.
- No database writes happen from the frontend data boundary.
- Payload admin uses PostgreSQL when `DATABASE_URI` is set; otherwise it uses a local SQLite fallback at `SQLITE_DATABASE_URI` / `file:./payload-dev.db` so the creator backend can open during local acceptance.

## Future Payload Query Requirements

When database use is approved:

- Read only `status = published` content.
- Query `locations` for map nodes.
- Use `locations.detailLevel` to decide frontend behavior:
  - `full`: render the complete detail panel, currently Winterfell.
  - `preview`: render a publishable preview panel, currently King's Landing and Castle Black in V1.
  - `node-only`: render map node + pending detail affordance.
- Query location detail by slug/id and populate related events, characters, houses, storylines, and media.
- Keep mock fallback active for local demo stability.
- Never expose `PAYLOAD_SECRET` to the browser.
