export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Drive Manager</h1>

      <a
        href="/api/google/auth"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Thêm tài khoản Google Drive
      </a>

      <a
        href="/dashboard"
        className="px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        Dashboard
      </a>
    </main>
  );
}
