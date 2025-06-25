import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Clone Register",
  description: "Instagram Clone Register",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
