import React from 'react';

type AppShellProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
};

export const AppShell: React.FC<AppShellProps> = ({ sidebar, header, children }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 border-r border-border bg-card">{sidebar}</aside>
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card">{header}</header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};
