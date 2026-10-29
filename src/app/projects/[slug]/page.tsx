import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailShell } from "@/components/detail/DetailShell";
import { projectDetails, getProjectDetail } from "@/data/detailPages";

export function generateStaticParams() {
  return projectDetails.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.blurb,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) notFound();

  return <DetailShell kind="projects" slug={slug} />;
}
