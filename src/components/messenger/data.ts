export const CONTACTS = [
  { id: 1, name: "Александра Соколова", username: "@alex_s", avatar: "АС", color: "#0ea5e9", online: true, status: "В сети" },
  { id: 2, name: "Дмитрий Волков", username: "@dm_volkov", avatar: "ДВ", color: "#8b5cf6", online: false, status: "Был(а) час назад" },
  { id: 3, name: "Мария Петрова", username: "@masha_p", avatar: "МП", color: "#ec4899", online: true, status: "В сети" },
  { id: 4, name: "Иван Козлов", username: "@ivan_k", avatar: "ИК", color: "#f59e0b", online: false, status: "Был(а) вчера" },
  { id: 5, name: "Ольга Новикова", username: "@olga_n", avatar: "ОН", color: "#10b981", online: true, status: "В сети" },
  { id: 6, name: "Сергей Морозов", username: "@serg_m", avatar: "СМ", color: "#f97316", online: false, status: "Был(а) 3 дня назад" },
];

export const INITIAL_CHATS = [
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

export const MEDIA = [
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

export const NOTIFICATIONS_DATA = [
  { id: 1, text: "Александра Соколова: Окей, увидимся в 18:00!", time: "14:32", read: false, icon: "MessageCircle", color: "#0ea5e9" },
  { id: 2, text: "Ольга Новикова: Спасибо за информацию!", time: "09:44", read: false, icon: "MessageCircle", color: "#10b981" },
  { id: 3, text: "Иван Козлов добавил вас в контакты", time: "Вчера", read: true, icon: "UserPlus", color: "#f59e0b" },
  { id: 4, text: "Добро пожаловать в Орбиту! Настройте профиль", time: "2 дня назад", read: true, icon: "Sparkles", color: "#8b5cf6" },
];

export type Section = "chats" | "contacts" | "media" | "notifications" | "search" | "profile" | "settings";

export type Contact = (typeof CONTACTS)[0];

export type Chat = (typeof INITIAL_CHATS)[0];

export const getContact = (id: number) => CONTACTS.find(c => c.id === id)!;
