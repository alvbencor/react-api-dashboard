import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-700">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
