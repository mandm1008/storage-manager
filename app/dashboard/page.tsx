"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/drives/list")
      .then((r) => r.json())
      .then(setFiles);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tất cả file từ mọi Google Drive</h1>

      <form
        action="/api/drives/upload"
        method="post"
        encType="multipart/form-data"
        className="mb-6"
      >
        <input type="file" name="file" className="mb-2" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Upload thông minh
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b bg-gray-100 text-left">
            <th className="p-3">Tên file</th>
            <th className="p-3">Kích thước</th>
            <th className="p-3">Chủ tài khoản</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id} className="border-b">
              <td className="p-3">{f.name}</td>
              <td className="p-3">{f.size}</td>
              <td className="p-3">{f.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
