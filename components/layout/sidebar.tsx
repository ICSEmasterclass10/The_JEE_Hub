"use client";

import React from "react";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
}

export default function Sidebar({ tabs, activeTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-gradient-to-b from-primary to-primary/80 text-primary-foreground border-r border-primary/20 flex flex-col h-screen shadow-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-primary/20">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">📚</span> JEE Hub
        </h1>
        <p className="text-xs mt-2 opacity-80">Complete preparation platform</p>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 overflow-y-auto py-4">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/${tab.id}`}
            className={`block w-full px-6 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary-foreground text-primary font-semibold border-l-4 border-accent"
                : "hover:bg-primary/50 opacity-80 hover:opacity-100"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary/20 text-xs opacity-70">
        <p>JEE Hub v1.0</p>
        <p>ICSE Masterclass</p>
      </div>
    </aside>
  );
}
