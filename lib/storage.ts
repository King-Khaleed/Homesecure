import { User, Property, Booking, Application, Message, Transaction } from "./types";
import { MOCK_USERS, MOCK_PROPERTIES } from "./mock-data";

const KEYS = {
  USERS: "homesure_users",
  CURRENT_USER: "homesure_currentUser",
  PROPERTIES: "homesure_properties",
  BOOKINGS: "homesure_bookings",
  APPLICATIONS: "homesure_applications",
  MESSAGES: "homesure_messages",
  TRANSACTIONS: "homesure_transactions",
  VERIFICATIONS: "homesure_verifications",
  SETTINGS: "homesure_settings",
};

export const storage = {
  init: () => {
    if (typeof window === "undefined") return;
    
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(MOCK_USERS));
    }
    if (!localStorage.getItem(KEYS.PROPERTIES)) {
      localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(MOCK_PROPERTIES));
    }
    if (!localStorage.getItem(KEYS.BOOKINGS)) {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.MESSAGES)) {
      localStorage.setItem(KEYS.MESSAGES, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
      localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify([]));
    }
  },

  getUsers: (): User[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEYS.USERS) || "[]");
  },
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER) || "null");
  },
  setCurrentUser: (user: User | null) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  },
  
  getProperties: (): Property[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEYS.PROPERTIES) || "[]");
  },
  getProperty: (id: string): Property | null => {
    const properties = storage.getProperties();
    return properties.find(p => p.id === id) || null;
  },
  
  saveProperty: (property: Property) => {
    if (typeof window === "undefined") return;
    const properties = storage.getProperties();
    const index = properties.findIndex(p => p.id === property.id);
    if (index > -1) {
      properties[index] = property;
    } else {
      properties.push(property);
    }
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(properties));
    window.dispatchEvent(new Event('storage'));
  },

  getBookings: (): Booking[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEYS.BOOKINGS) || "[]");
  },
  saveBooking: (booking: Booking) => {
    if (typeof window === "undefined") return;
    const bookings = storage.getBookings();
    bookings.push(booking);
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new Event('storage'));
  },

  getApplications: (): Application[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEYS.APPLICATIONS) || "[]");
  },
  saveApplication: (application: Application) => {
    if (typeof window === "undefined") return;
    const applications = storage.getApplications();
    applications.push(application);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(applications));
    window.dispatchEvent(new Event('storage'));
  },

  getMessages: (): Message[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEYS.MESSAGES) || "[]");
  },
  saveMessage: (message: Message) => {
    if (typeof window === "undefined") return;
    const messages = storage.getMessages();
    messages.push(message);
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
    window.dispatchEvent(new Event('storage'));
  },

  getTransactions: (): Transaction[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || "[]");
  },
  saveTransaction: (transaction: Transaction) => {
    if (typeof window === "undefined") return;
    const transactions = storage.getTransactions();
    transactions.push(transaction);
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
    window.dispatchEvent(new Event('storage'));
  },
  
  updateUser: (user: User) => {
    if (typeof window === "undefined") return;
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) {
      users[index] = user;
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
      // If updating current user
      const currentUser = storage.getCurrentUser();
      if (currentUser && currentUser.id === user.id) {
        storage.setCurrentUser(user);
      }
      window.dispatchEvent(new Event('storage'));
    }
  }
};
