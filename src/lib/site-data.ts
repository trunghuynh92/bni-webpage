export const siteConfig = {
  name: "BNI MASTER",
  shortName: "MASTER",
  contactEmail: "contact@bnimaster.com",
  ltForumLink: "#",
  chapterOpsManualLink: "#",
};

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Members", href: "/members" },
  { label: "Leadership Teams", href: "/leadership-teams" },
  { label: "Calendar & Events", href: "/calendar-events" },
];

export interface ResourceButton {
  label: string;
  href: string;
}

export interface HeroButton {
  label: string;
  href: string;
  variant?: "outlined" | "wide";
}
