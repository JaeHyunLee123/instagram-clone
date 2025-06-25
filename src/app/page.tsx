import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  return <div>hi{session ? session.email : ""}</div>;
}
