/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { id: 1, name: "Александра Соколова", username: "@alex_s", avatar: "АС", color: "#0ea5e9", online: true, status: "В сети" },
  { id: 2, name: "Дмитрий Волков", username: "@dm_volkov", avatar: "ДВ", color: "#8b5cf6", online: false, status: "Был(а) час назад" },
  { id: 3, name: "Мария Петрова", username: "@masha_p", avatar: "МП", color: "#ec4899", online: true, status: "В сети" },
  { id: 4, name: "Иван Козлов", username: "@ivan_k", avatar: "ИК", color: "#f59e0b", online: false, status: "Был(а) вчера" },
  { id: 5, name: "Ольга Новикова", username: "@olga_n", avatar: "ОН", color: "#10b981", online: true, status: "В сети" },
  { id: 6, name: "Сергей Морозов", username: "@serg_m", avatar: "СМ", color: "#f97316", online: false, status: "Был(а) 3 дня назад" },
];

const INITIAL_CHATS = [
  {
    id: 1, contactId: 1, lastMessage: "Окей, увидимся в 18:00!", time: "14:32", unread: 2,
    messages: [
      { id: 1, text: "Привет! Как дела?", out: false, time: "14:10" },
      { id: 2, text: "Всё отлично, спасибо! А у тебя?", out: true, time: "14:12" },
      { id: 3, text: "Тоже хорошо. Встретимся сегодня?", out: false, time: "14:20" },
      { id: 4, text: "Да, во сколько тебе удобно?", out: true, time: "14:25" },
      { id: 5, text: "Часов в 18, подходит?", out: false, time: "14:28" },
      { id: 6, text: "Окей, увидимся в 18:00!", out: false, time: "14:32" },
    ]
  },
  {
    id: 2, contactId: 3, lastMessage: "Посмотри файл, который я отправила", time: "12:15", unread: 0,
    messages: [
      { id: 1, text: "Маша, привет!", out: true, time: "12:00" },
      { id: 2, text: "О, привет! Давно не общались", out: false, time: "12:02" },
      { id: 3, text: "Да, всё в делах. Нужна помощь с презентацией", out: true, time: "12:08" },
      { id: 4, text: "Конечно помогу! Посмотри файл, который я отправила", out: false, time: "12:15" },
    ]
  },
  {
    id: 3, contactId: 5, lastMessage: "Спасибо за информацию!", time: "09:44", unread: 1,
    messages: [
      { id: 1, text: "Доброе утро!", out: false, time: "09:30" },
      { id: 2, text: "Доброе! Что-то случилось?", out: true, time: "09:35" },
      { id: 3, text: "Нет, просто хотела уточнить детали по проекту", out: false, time: "09:40" },
      { id: 4, text: "Спасибо за информацию!", out: false, time: "09:44" },
    ]
  },
  {
    id: 4, contactId: 2, lastMessage: "Хорошо, договорились", time: "Вчера", unread: 0,
    messages: [
      { id: 1, text: "Дмитрий, можешь помочь с задачей?", out: true, time: "Вчера" },
      { id: 2, text: "Да, конечно. Что нужно?", out: false, time: "Вчера" },
      { id: 3, text: "Нужно проверить отчёт до пятницы", out: true, time: "Вчера" },
      { id: 4, text: "Хорошо, договорились", out: false, time: "Вчера" },
    ]
  },
];

const MEDIA = [
  { id: 1, url: "https://picsum.photos/seed/a1/300/300" },
  { id: 2, url: "https://picsum.photos/seed/b2/300/300" },
  { id: 3, url: "https://picsum.photos/seed/c3/300/300" },
  { id: 4, url: "https://picsum.photos/seed/d4/300/300" },
  { id: 5, url: "https://picsum.photos/seed/e5/300/300" },
  { id: 6, url: "https://picsum.photos/seed/f6/300/300" },
  { id: 7, url: "https://picsum.photos/seed/g7/300/300" },
  { id: 8, url: "https://picsum.photos/seed/h8/300/300" },
  { id: 9, url: "https://picsum.photos/seed/i9/300/300" },
];

const NOTIFICATIONS_DATA = [
  { id: 1, text: "Александра Соколова: Окей, увидимся в 18:00!", time: "14:32", read: false, icon: "MessageCircle", color: "#0ea5e9" },
  { id: 2, text: "Ольга Новикова: Спасибо за информацию!", time: "09:44", read: false, icon: "MessageCircle", color: "#10b981" },
  { id: 3, text: "Иван Козлов добавил вас в контакты", time: "Вчера", read: true, icon: "UserPlus", color: "#f59e0b" },
  { id: 4, text: "Добро пожаловать в Орбиту! Настройте профиль", time: "2 дня назад", read: true, icon: "Sparkles", color: "#8b5cf6" },
];

type Section = "chats" | "contacts" | "media" | "notifications" | "search" | "profile" | "settings";

const getContact = (id: number) => CONTACTS.find(c => c.id === id)!;

const UserAvatar = ({ contact, size = "md" }: { contact: (typeof CONTACTS)[0]; size?: "sm" | "md" | "lg" }) => {
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-16 h-16 text-xl" : "w-11 h-11 text-sm";
  return (
    <div
      className={`relative flex-shrink-0 ${sizeClass} rounded-full flex items-center justify-center font-semibold`}
      style={{ background: contact.color + "25", color: contact.color }}
    >
      {contact.avatar}
      {contact.online && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2"
          style={{ borderColor: "hsl(var(--background))" }}
        />
      )}
    </div>
  );
};

export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifPush, setNotifPush] = useState(true);
  const [notifSound, setNotifSound] = useState(true);

  const currentChat = chats.find((c) => c.id === activeChat);
  const currentContact = currentChat ? getContact(currentChat.contactId) : null;
  const unreadTotal = chats.reduce((acc, c) => acc + c.unread, 0);
  const notifUnread = NOTIFICATIONS_DATA.filter((n) => !n.read).length;

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;
    const now = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChat) return chat;
        return {
          ...chat,
          lastMessage: message.trim(),
          time: now,
          messages: [...chat.messages, { id: chat.messages.length + 1, text: message.trim(), out: true, time: now }],
        };
      })
    );
    setMessage("");
  };

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

  const navItems = [
    { id: "chats" as Section, icon: "MessageCircle", label: "Чаты", badge: unreadTotal },
    { id: "contacts" as Section, icon: "Users", label: "Контакты" },
    { id: "media" as Section, icon: "Image", label: "Медиа" },
    { id: "notifications" as Section, icon: "Bell", label: "Уведомл.", badge: notifUnread },
    { id: "search" as Section, icon: "Search", label: "Поиск" },
  ];

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

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
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

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── CHATS ── */}
        {section === "chats" && (
          <>
            <div className="w-72 flex-shrink-0 flex flex-col border-r border-border">
              <div className="px-4 pt-5 pb-3">
                <h2 className="text-lg font-semibold mb-3">Чаты</h2>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary">
                  <Icon name="Search" size={14} className="text-muted-foreground" />
                  <input
                    placeholder="Поиск в чатах..."
                    className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-2 pb-2">
                {chats.map((chat) => {
                  const contact = getContact(chat.contactId);
                  return (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-0.5 text-left transition-all duration-200 ${activeChat === chat.id ? "bg-primary/10" : "hover:bg-secondary"}`}
                    >
                      <UserAvatar contact={contact} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-medium text-sm truncate">{contact.name}</span>
                          <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-1">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground truncate pr-2">{chat.lastMessage}</span>
                          {chat.unread > 0 && (
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold"
                              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                            >
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {currentChat && currentContact ? (
                <>
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border flex-shrink-0">
                    <UserAvatar contact={currentContact} />
                    <div className="flex-1">
                      <div className="font-semibold">{currentContact.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        {currentContact.online && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                        {currentContact.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {["Phone", "Video", "MoreVertical"].map((ic) => (
                        <button
                          key={ic}
                          className="w-9 h-9 rounded-xl hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors"
                        >
                          <Icon name={ic as any} size={18} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-2">
                    {currentChat.messages.map((msg, i) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.out ? "justify-end" : "justify-start"} animate-slide-up`}
                        style={{ animationDelay: `${i * 25}ms` }}
                      >
                        <div className={`max-w-[68%] px-4 py-2.5 text-sm ${msg.out ? "msg-bubble-out" : "msg-bubble-in"}`}>
                          <p className="leading-relaxed">{msg.text}</p>
                          <p
                            className={`text-[10px] mt-1 ${msg.out ? "text-right" : ""}`}
                            style={{ color: msg.out ? "hsl(var(--primary) / 0.6)" : "hsl(var(--muted-foreground))" }}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 py-4 border-t border-border flex-shrink-0">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary">
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Icon name="Paperclip" size={18} />
                      </button>
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Написать сообщение..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Icon name="Smile" size={18} />
                      </button>
                      <button
                        onClick={sendMessage}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{
                          background: message.trim() ? "hsl(var(--primary))" : "hsl(var(--muted))",
                          color: message.trim() ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                        }}
                      >
                        <Icon name="Send" size={14} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: "hsl(var(--primary) / 0.08)" }}
                  >
                    <Icon name="MessageCircle" size={36} className="text-primary opacity-60" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">Выберите чат</p>
                    <p className="text-sm mt-1">Нажмите на контакт слева, чтобы начать общение</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── CONTACTS ── */}
        {section === "contacts" && (
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
                      <span className="text-xs text-muted-foreground hidden group-hover:hidden">{contact.status}</span>
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
        )}

        {/* ── MEDIA ── */}
        {section === "media" && (
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
        )}

        {/* ── NOTIFICATIONS ── */}
        {section === "notifications" && (
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
        )}

        {/* ── SEARCH ── */}
        {section === "search" && (
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
        )}

        {/* ── PROFILE ── */}
        {section === "profile" && (
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
        )}

        {/* ── SETTINGS ── */}
        {section === "settings" && (
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
                    <div
                      key={item.label}
                      className={`flex items-center gap-4 px-4 py-4 ${i > 0 ? "border-t border-border" : ""}`}
                    >
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
        )}

      </div>
    </div>
  );
}