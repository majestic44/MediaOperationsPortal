
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black p-4">
      <h2 className="text-xl mb-4">MCMP Portal</h2>
      <nav className="flex flex-col gap-2">
        <a href="/dashboard">Dashboard</a>
        <a href="/clients">Clients</a>
        <a href="/posts">Posts</a>
        <a href="/calendar">Calendar</a>
        <a href="/settings">Settings</a>
      </nav>
    </aside>
  );
}
