import { api } from "@/config";

export default async function Home() {

  const res = await fetch(`${api}`, {
    cache: "no-store", 
  }).then((res) => res.json())


  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to Growex</h1>
      <p className="mt-4">Your one-stop solution for all your growth needs.</p>
      <code>{JSON.stringify(res)}</code>
    </div>
  );
}
