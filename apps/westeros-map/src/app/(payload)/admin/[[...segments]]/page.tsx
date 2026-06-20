import configPromise from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";

import { importMap } from "./importMap";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({ params, searchParams }: AdminPageProps) =>
  generatePageMetadata({ config: configPromise, params, searchParams });

export default function AdminPage(props: AdminPageProps) {
  return RootPage({
    config: configPromise,
    importMap,
    params: props.params,
    searchParams: props.searchParams,
  });
}
