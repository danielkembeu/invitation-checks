import { AdminLoginForm } from "@/components/forms/AdminLoginForm";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Connexion Admin</h1>

        <AdminLoginForm />
      </div>
    </div>
  );
}
