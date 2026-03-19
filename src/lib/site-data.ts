export const siteConfig = {
  name: "BNI MASTER",
  shortName: "MASTER",
  contactEmail: "trunghuynh@pamperme.com.vn",
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
  { label: "Member Resources", href: "/member-resources" },
  {
    label: "Leadership Teams",
    href: "/leadership-teams",
    children: [
      { label: "President", href: "/leadership-teams/president" },
      { label: "Vice President", href: "/leadership-teams/vice-president" },
      {
        label: "Treasurer / Secretary",
        href: "/leadership-teams/treasurer-secretary",
      },
      { label: "MC Engagement", href: "/leadership-teams/mc-engagement" },
      { label: "Go4Green", href: "/leadership-teams/go4green" },
      {
        label: "MC Community Builder",
        href: "/leadership-teams/mc-community-builder",
      },
      { label: "Growth & Events", href: "/leadership-teams/growth-events" },
      {
        label: "MC Quality Assurance",
        href: "/leadership-teams/mc-quality-assurance",
      },
      { label: "MC Relations", href: "/leadership-teams/mc-relations" },
      {
        label: "Mentor Coordinator",
        href: "/leadership-teams/mentor-coordinator",
      },
      { label: "Visitor Hosts", href: "/leadership-teams/visitor-hosts" },
      {
        label: "Education Coordinator",
        href: "/leadership-teams/education-coordinator",
      },
    ],
  },
  { label: "Traffic Lights", href: "/traffic-lights" },
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
