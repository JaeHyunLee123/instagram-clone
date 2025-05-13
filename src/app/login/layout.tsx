import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Clone Login",
  description: "Instagram Clone Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
