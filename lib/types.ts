export enum UserRole {
  RENTER = "renter",
  LANDLORD = "landlord",
  AGENT = "agent",
  ADMIN = "admin",
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  phone: string;
  name: string;
  avatar: string;
  kycStatus: "pending" | "verified" | "rejected";
  verified: boolean;
  createdAt: string;
  creditScore: number;
  savedProperties: string[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  pricePeriod: "year" | "month" | "sale";
  type: "house" | "flat" | "duplex" | "bungalow" | "commercial" | "warehouse" | "short-let";
  listingType: "rent" | "buy";
  location: {
    address: string;
    city: string;
    state: string;
    lga: string;
    coordinates: { lat: number; lng: number };
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    toilets: number;
    parking: number;
    yearBuilt: number;
    totalRooms: number;
    furnishing: "furnished" | "semi-furnished" | "unfurnished";
  };
  amenities: string[];
  images: string[];
  videoTour: string | null;
  verification: {
    status: "verified" | "pending" | "expired" | "rejected";
    verifiedAt: string | null;
    verifierId: string | null;
    notes: string;
  };
  ownerId: string;
  status: "active" | "rented" | "sold" | "pending" | "paused";
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  date: string;
  time: string;
  type: "physical" | "virtual";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export interface Application {
  id: string;
  propertyId: string;
  renterId: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  data: any;
  createdAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  propertyId: string;
  senderId: string;
  receiverId: string;
  amount: number;
  type: "rent" | "sale" | "deposit" | "caution";
  status: "escrow" | "released" | "refunded" | "failed";
  createdAt: string;
}
