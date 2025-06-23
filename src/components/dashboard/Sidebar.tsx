export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Panel</h2>
      <nav className="space-y-2">
        <a
          href="/dashboard"
          className="block px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          Inicio
        </a>
        <a
          href="/dashboard/apis"
          className="block px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          APIs
        </a>
        <a
          href="/dashboard/kvm"
          className="block px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          KVMs
        </a>
      </nav>
    </aside>
  );
}
