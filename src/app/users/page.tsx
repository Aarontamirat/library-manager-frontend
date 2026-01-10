import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default async function Users() {
  const token = getToken();
  const res = await fetch("http://localhost:3000/books", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
