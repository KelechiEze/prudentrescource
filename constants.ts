import { NavLink, CarouselImage } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Our Service", href: "#service" },
  { label: "Professionals", href: "#professionals" },
  { label: "Organizations", href: "#organizations" },
];

// Change this URL to update the Hero background video
export const HERO_VIDEO_URL = "/womanAI.mp4";

export const HERO_IMAGES: CarouselImage[] = [
  {
    id: 1,
    url: "https://picsum.photos/seed/healthcare1/1920/1080", 
    alt: "Nurse assisting elderly patient"
  },
  {
    id: 2,
    url: "https://picsum.photos/seed/healthcare2/1920/1080",
    alt: "Medical professional smiling"
  },
  {
    id: 3,
    url: "https://picsum.photos/seed/healthcare3/1920/1080",
    alt: "Doctor discussing with patient"
  }
];