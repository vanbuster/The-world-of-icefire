import configPromise from "@payload-config";
import {
  handleServerFunctions,
  RootLayout,
} from "@payloadcms/next/layouts";
import type { ServerFunctionClientArgs } from "payload";
import type { ReactNode } from "react";

import { importMap } from "./admin/[[...segments]]/importMap";

async function serverFunction(args: ServerFunctionClientArgs) {
  "use server";

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
