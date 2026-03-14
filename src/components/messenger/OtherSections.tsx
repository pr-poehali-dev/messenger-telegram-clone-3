/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/icon";
import { CONTACTS, MEDIA, NOTIFICATIONS_DATA, Chat, getContact, Section } from "./data";
import { UserAvatar } from "./ChatSection";

// ── Toggle ──────────────────────────────────────────────────────────────────

const Toggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="w-11 h-6 rounded-full relative transition-all duration-200 flex-shrink-0"
    style={{ background: value ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
  >
    <span
      className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
      style={{ left: value ? "calc(100% - 22px)" : "2px" }}
    />
  </button>
);

// ── Contacts ─────────────────────────────────────────────────────────────────

export function ContactsSection() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Контакты</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <Icon name="UserPlus" size={15} />
            Добавить
          </button>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary">
          <Icon name="Search" size={15} className="text-muted-foreground" />
          <input
            placeholder="Поиск контактов..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Онлайн — {CONTACTS.filter((c) => c.online).length}
        </p>
        <div className="flex flex-col gap-1">
          {CONTACTS.map((contact, i) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-secondary transition-all duration-200 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <UserAvatar contact={contact} />
              <div className="flex-1">
                <div className="font-medium text-sm">{contact.name}</div>
                <div className="text-xs text-muted-foreground">{contact.username}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {["MessageCircle", "Phone"].map((ic) => (
                    <button
                      key={ic}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-border transition-all"
                    >
                      <Icon name={ic as any} size={15} />
                    </button>
                  ))}
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-border transition-all">
                    <Icon name="MoreHorizontal" size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Media ─────────────────────────────────────────────────────────────────────

export function MediaSection() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4">Медиа-галерея</h2>
        <div className="flex gap-2">
          {["Все", "Фото", "Видео", "Файлы"].map((tab, i) => (
            <button
              key={tab}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                i === 0
                  ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                  : { color: "hsl(var(--muted-foreground))" }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-3 gap-2">
          {MEDIA.map((item, i) => (
            <div
              key={item.id}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative animate-scale-in"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <Icon
                  name="ZoomIn"
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────────────────────

export function NotificationsSection() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border flex items-center justify-between flex-shrink-0">
        <h2 className="text-xl font-semibold">Уведомления</h2>
        <button className="text-sm text-primary hover:underline">Прочитать все</button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
        {NOTIFICATIONS_DATA.map((notif, i) => (
          <div
            key={notif.id}
            className="flex items-start gap-4 px-4 py-4 rounded-xl transition-all animate-slide-up"
            style={{
              background: notif.read ? "hsl(var(--card))" : notif.color + "12",
              border: notif.read ? "1px solid transparent" : `1px solid ${notif.color}25`,
              animationDelay: `${i * 60}ms`,
              opacity: notif.read ? 0.65 : 1,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: notif.color + "20", color: notif.color }}
            >
              <Icon name={notif.icon as any} size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed">{notif.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
            </div>
            {!notif.read && (
              <span
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: "hsl(var(--primary))" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Search ────────────────────────────────────────────────────────────────────

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  chats: Chat[];
  setSection: (s: Section) => void;
  setActiveChat: (id: number | null) => void;
}

export function SearchSection({ searchQuery, setSearchQuery, chats, setSection, setActiveChat }: SearchSectionProps) {
  const searchResults = searchQuery.trim()
    ? {
        contacts: CONTACTS.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.username.includes(searchQuery.toLowerCase())
        ),
        chats: chats.filter((c) => {
          const contact = getContact(c.contactId);
          return (
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }),
      }
    : null;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4">Поиск</h2>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary"
          style={{ outline: "1px solid hsl(var(--primary) / 0.3)" }}
        >
          <Icon name="Search" size={16} className="text-primary flex-shrink-0" />
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по контактам, чатам и сообщениям..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {!searchQuery && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
            <Icon name="Search" size={48} className="opacity-15" />
            <p className="text-sm">Начните вводить запрос</p>
          </div>
        )}
        {searchResults && (
          <>
            {searchResults.contacts.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Контакты ({searchResults.contacts.length})
                </p>
                {searchResults.contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary cursor-pointer transition-all"
                  >
                    <UserAvatar contact={contact} />
                    <div>
                      <div className="font-medium text-sm">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchResults.chats.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Чаты ({searchResults.chats.length})
                </p>
                {searchResults.chats.map((chat) => {
                  const contact = getContact(chat.contactId);
                  return (
                    <div
                      key={chat.id}
                      onClick={() => { setSection("chats"); setActiveChat(chat.id); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary cursor-pointer transition-all"
                    >
                      <UserAvatar contact={contact} />
                      <div>
                        <div className="font-medium text-sm">{contact.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{chat.lastMessage}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {searchResults.contacts.length === 0 && searchResults.chats.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                <Icon name="SearchX" size={48} className="opacity-15" />
                <p className="text-sm">Ничего не найдено по запросу «{searchQuery}»</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────────────────────

export function ProfileSection() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-md mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-8">Мой профиль</h2>
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ background: "#0ea5e920", color: "#0ea5e9" }}
            >
              ЮА
            </div>
            <button
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              <Icon name="Camera" size={14} />
            </button>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Юрий Астронавтов</h3>
            <p className="text-sm text-muted-foreground">@yura_astronaut</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { label: "Имя", value: "Юрий Астронавтов", icon: "User" },
            { label: "Статус", value: "На связи из открытого космоса 🚀", icon: "Smile" },
            { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
            { label: "Email", value: "yura@orbit.app", icon: "Mail" },
            { label: "Имя пользователя", value: "@yura_astronaut", icon: "AtSign" },
          ].map((field) => (
            <div
              key={field.label}
              className="flex items-center gap-4 px-4 py-4 rounded-xl bg-card hover:bg-secondary cursor-pointer transition-all group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
              >
                <Icon name={field.icon as any} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{field.label}</div>
                <div className="text-sm font-medium mt-0.5 truncate">{field.value}</div>
              </div>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────────

interface SettingsSectionProps {
  notifPush: boolean;
  setNotifPush: (v: boolean) => void;
  notifSound: boolean;
  setNotifSound: (v: boolean) => void;
}

export function SettingsSection({ notifPush, setNotifPush, notifSound, setNotifSound }: SettingsSectionProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-lg mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-6">Настройки</h2>

        {/* Уведомления */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Уведомления</p>
          <div className="bg-card rounded-xl overflow-hidden">
            {[
              { label: "Push-уведомления", desc: "Уведомления о новых сообщениях", value: notifPush, toggle: () => setNotifPush(!notifPush), icon: "Bell" },
              { label: "Звуки", desc: "Звук при получении сообщений", value: notifSound, toggle: () => setNotifSound(!notifSound), icon: "Volume2" },
            ].map((item, i) => (
              <div key={item.label} className={`flex items-center gap-4 px-4 py-4 ${i > 0 ? "border-t border-border" : ""}`}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
                >
                  <Icon name={item.icon as any} size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <Toggle value={item.value} onToggle={item.toggle} />
              </div>
            ))}
          </div>
        </div>

        {/* Приватность */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Приватность</p>
          <div className="bg-card rounded-xl overflow-hidden">
            {[
              { label: "Кто видит мой статус", value: "Все контакты", icon: "Eye" },
              { label: "Кто видит мой аватар", value: "Все", icon: "Image" },
              { label: "Кто может писать мне", value: "Все пользователи", icon: "MessageSquare" },
              { label: "Кто видит мой номер", value: "Никто", icon: "Phone" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-secondary transition-all group ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
                >
                  <Icon name={item.icon as any} size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.value}</div>
                </div>
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Внешний вид */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Внешний вид</p>
          <div className="bg-card rounded-xl overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
              >
                <Icon name="Moon" size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Тёмная тема</div>
                <div className="text-xs text-muted-foreground">Комфортная работа в любое время</div>
              </div>
              <Toggle value={true} onToggle={() => {}} />
            </div>
            <div className="flex items-center gap-4 px-4 py-4 border-t border-border cursor-pointer hover:bg-secondary transition-all">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
              >
                <Icon name="Palette" size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Акцентный цвет</div>
                <div className="flex items-center gap-2 mt-1.5">
                  {["#0ea5e9", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"].map((c) => (
                    <span
                      key={c}
                      className="w-5 h-5 rounded-full cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        background: c,
                        outline: c === "#0ea5e9" ? `2px solid ${c}` : undefined,
                        outlineOffset: "2px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left hover:bg-secondary transition-all text-muted-foreground">
          <Icon name="LogOut" size={16} />
          <span className="text-sm">Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
}
