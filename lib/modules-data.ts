/**
 * SPEAR Module Story — Data definitions for all 6 horizontal panels.
 */

export interface ModuleData {
  id: string;
  numeral: string; // "01" through "06"
  title: string;
  tagline: string;
  body: string;
  layout: "text-left" | "text-right"; // alternates for visual rhythm
  isLast?: boolean; // marks the final panel
}

export const modules: ModuleData[] = [
  {
    id: "direct-booking",
    numeral: "01",
    title: "Direct Booking Engine",
    tagline: "Own your reservations, not just your rooms.",
    body: "Take direct hotel bookings without OTA commissions. Staff can place manual holds and phone reservations, guests can book online — all protected by real-time overbooking prevention.",
    layout: "text-left",
  },
  {
    id: "hotel-pms",
    numeral: "02",
    title: "Hotel PMS & Room Management",
    tagline: "One source of truth for every room, rate, and reservation.",
    body: "Extend stays, change rooms, and manage your full property without double-booking risk, even under concurrent demand. Your entire inventory, always accurate.",
    layout: "text-right",
  },
  {
    id: "restaurant-floor",
    numeral: "03",
    title: "Restaurant Floor Plans & Reservations",
    tagline: "Let guests pick their table, not just a time slot.",
    body: "Design your actual dining room layout and let guests choose their table visually. Real-time table status, zone management, and conflict-free seating from one interactive floor plan.",
    layout: "text-left",
  },
  {
    id: "point-of-sale",
    numeral: "04",
    title: "Point of Sale",
    tagline: "Fast, offline-capable POS built for the floor.",
    body: "Orders sync automatically to the kitchen and inventory the moment a table is seated — no manual re-entry, ever. Works even when the WiFi doesn't.",
    layout: "text-right",
  },
  {
    id: "kitchen-inventory",
    numeral: "05",
    title: "Kitchen Inventory",
    tagline: "Know what's running low before it hits the pass.",
    body: "Recipe-level stock deduction happens automatically as orders are placed. Stop counting by hand — SPEAR tells you what you need before it becomes a problem on the floor.",
    layout: "text-left",
  },
  {
    id: "channel-manager",
    numeral: "06",
    title: "Channel Manager",
    tagline: "That's SPEAR.",
    body: "Sync availability and rates across every OTA you list on, from one dashboard — no more manually updating five different booking sites after every reservation. You're done here. Your entire operation, unified.",
    layout: "text-right",
    isLast: true,
  },
];
