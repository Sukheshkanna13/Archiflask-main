"use client";
import dynamic from "next/dynamic";

const PencilRail = dynamic(() => import("./PencilRail").then((m) => m.PencilRail), { ssr: false });

export function PencilRailClient() {
  return <PencilRail />;
}
