import { AlertCircle } from "lucide-react";

export default function Unauthorized() {
  return (
    <menu className="flex items-center justify-center min-h-screen text-2xl font-bold space-x-2">
      <AlertCircle className="text-red-600 " />
      <h2>Unauthorized</h2>
    </menu>
  );
}
