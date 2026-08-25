import type { GeoPlace } from "../types";
import { TIDEGLASS } from "./intel";

function pin(label: string, dLat: number, dLng: number): GeoPlace {
  return {
    label,
    lat: TIDEGLASS.lat + dLat,
    lng: TIDEGLASS.lng + dLng,
    online: false,
  };
}

export interface Membership {
  id: string;
  merchant: string;
  name: string;
  memberNumber: string;
  perk: string;
  couponIds: string[];
  place: GeoPlace;
  color: string;
}

export const MEMBERSHIPS: Membership[] = [
  {
    id: "club-harbor-pantry",
    merchant: "Harbor Pantry",
    name: "Harbor Pantry Club",
    memberNumber: "HP-482910",
    perk: "Club 10% plus the aisle punch card at the Tideglass store.",
    couponIds: ["harbor-pantry-10", "harbor-pantry-circuit"],
    place: pin("Harbor Pantry · Tideglass", 0.008, -0.004),
    color: "#2F6A4A",
  },
  {
    id: "club-driftwood",
    merchant: "Driftwood Cafe",
    name: "Driftwood Rewards",
    memberNumber: "DW-119304",
    perk: "Stamp drips toward a free cup. 15% off the pastry case.",
    couponIds: ["driftwood-cafe-15", "driftwood-cafe-punch"],
    place: pin("Driftwood Cafe", 0.002, -0.006),
    color: "#6A3A24",
  },
  {
    id: "club-sable-oak",
    merchant: "Sable & Oak Clothiers",
    name: "Sable & Oak Cloth",
    memberNumber: "SO-774221",
    perk: "Member shirting events. Show the card before they ring alterations.",
    couponIds: ["sable-oak-30"],
    place: pin("Sable & Oak · Clothiers row", 0.004, 0.006),
    color: "#5C3A2E",
  },
  {
    id: "club-willow",
    merchant: "Willow Table",
    name: "Willow Neighbors",
    memberNumber: "WT-330018",
    perk: "20% off dinner for two after 5. Mention the club, don't stack alcohol.",
    couponIds: ["willow-table-20"],
    place: pin("Willow Table", -0.006, -0.002),
    color: "#8C3A2F",
  },
  {
    id: "club-pixel",
    merchant: "Pixel Harbor",
    name: "Pixel Harbor Care",
    memberNumber: "PX-901155",
    perk: "$40 refurbished-display clip. Scan at the service alley register.",
    couponIds: ["pixel-harbor-40"],
    place: pin("Pixel Harbor · Service alley", 0.01, -0.008),
    color: "#1C5A6E",
  },
  {
    id: "club-velvet-reel",
    merchant: "Velvet Reel Cinema",
    name: "Velvet Reel Members",
    memberNumber: "VR-556700",
    perk: "Ticket pairs and the three-night punch. Scan at the box office.",
    couponIds: ["velvet-reel-8", "velvet-reel-loyalty"],
    place: pin("Velvet Reel Cinema", -0.008, 0.008),
    color: "#6A2438",
  },
];
