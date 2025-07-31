import TopNav from "./TopNav";
import SidebarTimeline from "./SidebarTimeline";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopNav />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex gap-6 pt-6">
          <aside className="hidden w-64 shrink-0 md:block">
            <SidebarTimeline />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
