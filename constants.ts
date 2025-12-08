import { NavLink, CarouselImage } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Our Service", href: "#service" },
  { label: "Professionals", href: "#professionals" },
  { label: "Organizations", href: "#organizations" },
  { label: "Contact Us", href: "#contact" },
];

export const HERO_IMAGES: CarouselImage[] = [
  {
    id: 1,
    url: "/image1.png", 
    alt: "Nurse assisting elderly patient"
  },
  {
    id: 2,
    url: "/image2.png",
    alt: "Medical professional smiling"
  },
  {
    id: 3,
    url: "/image3.png",
    alt: "Doctor discussing with patient"
  }
];