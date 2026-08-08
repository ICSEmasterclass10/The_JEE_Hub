"use client";

import React from "react";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface BottomNavProps {
  tabs: Tab[];
  activeTab: string;
}

export default function BottomNav({ tabs, activeTab }: BottomNavProps) {
  return (
    <nav className="bg-gradient-to-r from-primary to-primary/80 border-t border-primary/20 shadow-2xl">
      <div className="flex overflow-x-auto gap-1 px-2 py-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/${tab.id}`}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              activeTab === tab.id
                ? "bg-primary-foreground text-primary shadow-md"
                : "text-primary-foreground opacity-70 hover:opacity-90"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
