"use client";

import { useState } from "react";
import { Home, ServerCog, Binary, Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => setExpanded(!expanded);

  const menuItems = [
    { label: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
    { label: "APIs", icon: <ServerCog size={20} />, href: "/dashboard/apis" },
    { label: "b64", icon: <Binary size={20} />, href: "/dashboard/herramientas" },
  ];

  return (
    <aside
      className={clsx(
        "bg-grey-700 text-white shadow-lg min-h-screen transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div
        className={clsx(
          "flex items-center transition-all duration-300 p-4",
          expanded ? "justify-between" : "justify-center"
        )}
      >
        {expanded && <span className="text-2xl font-bold">Panel</span>}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="p-1 rounded hover:bg-blue-600"
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="mt-4 space-y-1">
        {menuItems.map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 hover:bg-blue-600 transition",
              expanded ? "justify-start" : "justify-center"
            )}
          >
            {icon}
            {expanded && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
