/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/icon";
import { Section } from "./data";

interface SidebarProps {
  section: Section;
  setSection: (s: Section) => void;
  setActiveChat: (id: number | null) => void;
  unreadTotal: number;
  notifUnread: number;
}

export default function Sidebar({ section, setSection, setActiveChat, unreadTotal, notifUnread }: SidebarProps) {
  const navItems = [
    { id: "chats" as Section, icon: "MessageCircle", label: "Чаты", badge: unreadTotal },
    { id: "contacts" as Section, icon: "Users", label: "Контакты" },
    { id: "media" as Section, icon: "Image", label: "Медиа" },
    { id: "notifications" as Section, icon: "Bell", label: "Уведомл.", badge: notifUnread },
    { id: "search" as Section, icon: "Search", label: "Поиск" },
  ];

  return (
    <aside
      className="flex flex-col items-center w-16 py-4 gap-1 border-r border-border flex-shrink-0"
      style={{ background: "hsl(220 16% 6.5%)" }}
    >
      <div
        className="mb-4 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs"
        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
      >
        <Icon name="Orbit" size={18} fallback="Radio" />
      </div>

      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => { setSection(item.id); setActiveChat(null); }}
          className={`nav-item w-12 relative ${section === item.id ? "active" : "text-muted-foreground"}`}
        >
          <Icon name={item.icon as any} size={20} />
          <span className="text-[9px] leading-none">{item.label}</span>
          {item.badge ? (
            <span
              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              {item.badge > 9 ? "9+" : item.badge}
            </span>
          ) : null}
        </button>
      ))}

      <div className="flex-1" />

      <button
        onClick={() => setSection("settings")}
        className={`nav-item w-12 ${section === "settings" ? "active" : "text-muted-foreground"}`}
      >
        <Icon name="Settings" size={20} />
        <span className="text-[9px] leading-none">Настройки</span>
      </button>

      <button
        onClick={() => setSection("profile")}
        className="w-9 h-9 rounded-full flex items-center justify-center mt-1 font-semibold text-sm ring-2 ring-transparent hover:ring-primary transition-all duration-200"
        style={{ background: "#0ea5e920", color: "#0ea5e9" }}
      >
        ЮА
      </button>
    </aside>
  );
}
