import { useState } from "react";
import { INITIAL_CHATS, NOTIFICATIONS_DATA, Section } from "@/components/messenger/data";
import Sidebar from "@/components/messenger/Sidebar";
import ChatSection from "@/components/messenger/ChatSection";
import {
  ContactsSection,
  MediaSection,
  NotificationsSection,
  SearchSection,
  ProfileSection,
  SettingsSection,
} from "@/components/messenger/OtherSections";

export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifPush, setNotifPush] = useState(true);
  const [notifSound, setNotifSound] = useState(true);

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

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar
        section={section}
        setSection={setSection}
        setActiveChat={setActiveChat}
        unreadTotal={unreadTotal}
        notifUnread={notifUnread}
      />

      <div className="flex flex-1 overflow-hidden">
        {section === "chats" && (
          <ChatSection
            chats={chats}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        )}
        {section === "contacts" && <ContactsSection />}
        {section === "media" && <MediaSection />}
        {section === "notifications" && <NotificationsSection />}
        {section === "search" && (
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            chats={chats}
            setSection={setSection}
            setActiveChat={setActiveChat}
          />
        )}
        {section === "profile" && <ProfileSection />}
        {section === "settings" && (
          <SettingsSection
            notifPush={notifPush}
            setNotifPush={setNotifPush}
            notifSound={notifSound}
            setNotifSound={setNotifSound}
          />
        )}
      </div>
    </div>
  );
}
