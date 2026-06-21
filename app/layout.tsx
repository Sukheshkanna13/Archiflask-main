import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArchiFlask — Run your firm on a system",
  description:
    "The operating platform for design, construction & PMC firms — projects, drawings, teams, site activity, approvals and profitability, in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
