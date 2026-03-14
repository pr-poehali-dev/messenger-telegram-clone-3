/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/icon";
import { Chat, Contact, CONTACTS, getContact } from "./data";

const UserAvatar = ({ contact, size = "md" }: { contact: Contact; size?: "sm" | "md" | "lg" }) => {
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

interface ChatSectionProps {
  chats: Chat[];
  activeChat: number | null;
  setActiveChat: (id: number | null) => void;
  message: string;
  setMessage: (v: string) => void;
  sendMessage: () => void;
}

export default function ChatSection({ chats, activeChat, setActiveChat, message, setMessage, sendMessage }: ChatSectionProps) {
  const currentChat = chats.find((c) => c.id === activeChat);
  const currentContact = currentChat ? getContact(currentChat.contactId) : null;

  return (
    <>
      {/* Chat list */}
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

      {/* Chat window */}
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
  );
}

export { UserAvatar };
export type { Contact };
