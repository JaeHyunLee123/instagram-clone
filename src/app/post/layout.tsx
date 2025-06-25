import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Clone Post",
  description: "Instagram Clone Post",
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
