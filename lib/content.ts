// All marketing copy/data extracted verbatim from drafts/ArchiFlask Site.dc.html.

export type NavLink = { label: string; href: string };
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Blog", href: "/blog" },
];

export const LOGOS = [
  "Design Infinity",
  "EM3RGE",
  "Monks Palette",
  "Space Play Design Studio",
  "Guru Design Studio",
  "The Storey Collective",
  "White Edge Architects",
  "BLJ + Partners",
  "Box Black Internationals",
  "WEARCH Studio",
  "Future Group Distributors",
  "Adithya Groups",
  "JeganathJB Architects",
  "Inspace Design Studio",
];

// ---------- Home: About / Numbers ----------
export type Stat = {
  to: number | null;
  display: string;
  suffix?: string;
  label: string;
  shape: "octa" | "box" | "tetra" | "ico";
  dark?: boolean;
};
export const STATS: Stat[] = [
  { to: 100, display: "100+", suffix: "+", label: "Firms & teams running on ArchiFlask across India.", shape: "octa" },
  { to: 30, display: "30+", suffix: "+", label: "Live projects a single firm runs at once.", shape: "box" },
  { to: 15, display: "15+", suffix: "+", label: "Years our founders have run real projects.", shape: "tetra" },
  { to: null, display: "4", label: "Domains: residential, commercial, interiors, infrastructure.", shape: "ico", dark: true },
];

export const ORBIT_NODES = [
  // Outer shell — 2 nodes
  { label: "Documentation", shell: 2, angle: 78, labelFirst: false },
  { label: "Profitability", shell: 1, angle: 210, labelFirst: true },
  // Inner shell — 2 nodes
  { label: "Collaboration", shell: 1, angle: 140, labelFirst: true },
  { label: "Operations", shell: 1, angle: 325, labelFirst: false },
];

// ---------- Home: Problem ----------
export type Problem = { icon: "doc" | "rupee" | "ops" | "collab" | "client" | "site"; title: string; body: string };
export const PROBLEMS: Problem[] = [
  { icon: "doc", title: "Documentation", body: "Drawings get lost across revisions. Nobody can say what changed between R0 and R1, or why." },
  { icon: "rupee", title: "Profitability", body: "Effort and money leak on rework nobody tracked. The real cost of a project stays invisible." },
  { icon: "ops", title: "Operations", body: "The owner becomes the single point everything routes through, and growth stalls there." },
  { icon: "collab", title: "Collaboration", body: "Teams work in silos across fragmented chat threads, causing delays and status confusion." },
  { icon: "client", title: "Client Portal", body: "Constant status calls pull you away from execution to manage client updates and communication." },
  { icon: "site", title: "Site Visits", body: "Field progress and attendance are based on trust, leading to tracking errors and vendor disputes." },
];

// ---------- Home: 5 Questions deck ----------
export type Question = { num: string; title: string; sub: string };
export const QUESTIONS: Question[] = [
  { num: "01", title: "What's due today?", sub: "Today's priorities." },
  { num: "02", title: "Which projects slipped?", sub: "Missed-deadline flags." },
  { num: "03", title: "Who's working on what?", sub: "Team allocation." },
  { num: "04", title: "Where are my commercials?", sub: "Financial snapshot." },
  { num: "05", title: "What needs my approval?", sub: "Pending queue." },
];

// ---------- Home: Features ----------
export type FeatureSplit = {
  eyebrow: string;
  title: string;
  body: string;
  slotId: string;
  placeholder: string;
  reverse: boolean;
};
export const FEATURES_SPLIT: FeatureSplit[] = [
  {
    eyebrow: "01 · Documentation",
    title: "Drawings & change-request documentation",
    body: "Every drawing, every revision, every reason it changed, in one trail. ArchiFlask compares R0 and R1 automatically and highlights exactly what moved, eliminating manual checking and drawing-version confusion.",
    slotId: "af-feat-drawings",
    placeholder: "ArchiFlask drawing revision comparison highlighting changes between R0 and R1",
    reverse: false,
  },
  {
    eyebrow: "02 · Profitability",
    title: "Task management & effort tracking",
    body: "Track effort to the hour, across every project, per person. Know which projects are eating more time than you quoted, before they eat the margin.",
    slotId: "af-feat-effort",
    placeholder: "Drop: task & effort-tracking screen",
    reverse: true,
  },
];

export type FeatureCard = { num: string; title: string; body: string };
export const FEATURES_CARDS: FeatureCard[] = [
  { num: "03", title: "Geo-tagged attendance", body: "On-site presence logged with location, not the honour system." },
  { num: "04", title: "Leads & enquiry tracking", body: "Capture and follow every enquiry, so new business never falls through the cracks." },
  { num: "05", title: "Geo-tagged site visits", body: "Site updates with photos and video, pinned to location and time." },
];

// ---------- Home: Capabilities ----------
export type Capability = { title: string; body: string; dark?: boolean };
export const CAPABILITIES: Capability[] = [
  {
    title: "Drawings and GFC Docs",
    body: "Organize client drawings in dedicated folders for layouts structural plumbing and electrical."
  },
  {
    title: "360° Viewer: Visualize designs in full perspective",
    body: "Upload panoramic image files to view your designs in immersive 360 perspectives."
  },
  {
    title: "Documented Site Visits",
    body: "Log site photos with detailed reports to review standards and correct deviations."
  },
  {
    title: "Concept Plan Board: The foundation of every design",
    body: "Share and approve initial layout concepts early with direct online sketching tools."
  },
  {
    title: "AI-Powered Drawing Revision Comparison",
    body: "Instantly compare revised drawings with prior versions to highlight all key updates."
  },
  {
    title: "Present, discuss, decide together",
    body: "Use direct screen sharing to host client walkthroughs and gather instant feedback.",
    dark: true
  }
];

// ---------- Home: Impact cards ----------
export type ImpactCard = { kicker: string; body: string };
export const IMPACT_CARDS: ImpactCard[] = [
  {
    kicker: "DRAWING CHAOS AT SCALE",
    body: "A firm running 30+ live projects was losing time hunting for the right drawing and the reason behind each change. Now they pull up any drawing, its full revision history, and what drove every change, in a couple of clicks.",
  },
  {
    kicker: "EFFORT NO ONE COULD SEE",
    body: "A firm couldn't see where the team's hours were going across multiple projects. With task management and effort tracking, they now see every person's effort down to the hour, per project, which lets them spot projects running over their planned effort and reallocate people who are free.",
  },
];

// ---------- Home: Pricing ----------
export type PriceFeature = { text: string; muted?: boolean };
export type PricingTier = {
  name: string;
  priceStrike?: string;
  price: string;
  priceCurrency?: boolean;
  pricePeriod?: string;
  subline?: string;
  yearly?: { strike: string; now: string; suffix: string };
  blurb?: string;
  features: PriceFeature[];
  addon?: string;
  cta: string;
  ctaHref: string;
  variant: "surface" | "outline" | "dark";
  popular?: boolean;
};
export const PRICING: PricingTier[] = [
  {
    name: "Free",
    price: "0",
    priceCurrency: true,
    pricePeriod: "/ mo",
    blurb: "For trying ArchiFlask on a single project.",
    features: [
      { text: "1 Administrator" },
      { text: "1 Team Member" },
      { text: "1 Mobile App Account" },
      { text: "1 Project" },
      { text: "500MB Cloud Storage" },
      { text: "Additional Storage", muted: true },
      { text: "Additional Users", muted: true },
    ],
    cta: "Get Started",
    ctaHref: "SIGNUP",
    variant: "surface",
  },
  {
    name: "Architect",
    priceStrike: "₹949",
    price: "₹600",
    subline: "+GST / user / month",
    yearly: { strike: "₹7200", now: "₹6480", suffix: "/ user / yr (10% off)" },
    features: [
      { text: "Unlimited Projects" },
      { text: "Unlimited Mobile Logins" },
      { text: "2GB Cloud Storage" },
      { text: "Project Schedule & Payments" },
      { text: "Drawings, GFC & 3D Views" },
      { text: "Change Requests & MoM" },
      { text: "Site Visits & Photos" },
      { text: "Concept Plan & Layout Render" },
    ],
    addon: "Add Storage, 10GB @ ₹275/mo",
    cta: "Get Started",
    ctaHref: "SIGNUP",
    variant: "outline",
  },
  {
    name: "Builder / PMC",
    priceStrike: "₹1499",
    price: "₹999",
    subline: "+GST / user / month",
    yearly: { strike: "₹11998", now: "₹10190", suffix: "/ user / yr (15% off)" },
    features: [
      { text: "Everything in Architect Plan" },
      { text: "Material Request & Inventory" },
      { text: "Labor Attendance" },
      { text: "On-Site Changes" },
      { text: "Expense Planning" },
      { text: "Purchase Orders" },
      { text: "Work Orders" },
      { text: "Bill Of Quantity" },
    ],
    addon: "Add Storage, 10GB @ ₹275/mo",
    cta: "Get Started",
    ctaHref: "SIGNUP",
    variant: "dark",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For larger teams and bespoke needs.",
    features: [
      { text: "25+ Users" },
      { text: "Customized Storage plans" },
      { text: "Customized additional user charges" },
      { text: "Customized additional Storage charges" },
      { text: "Dedicated Account Manager" },
      { text: "Dedicated support plans" },
      { text: "On-Site support if required" },
    ],
    cta: "Contact Sales",
    ctaHref: "/book-demo",
    variant: "surface",
  },
];
export const PRICING_NOTE =
  "All paid plans are +GST per user. Add 10GB cloud storage to any business plan for ₹275/mo. The Free plan never expires.";

// ---------- Home: Add-ons ----------
// Real-time, value-added features priced separately, layered onto any plan.
export type AddOn = { title: string; body: string; price: string; period?: string };
export const ADDONS: AddOn[] = [
  { title: "Extra Cloud Storage", body: "Add 10GB to any business plan when projects pile up.", price: "₹275", period: "/ mo" },
  { title: "Extra Users", body: "Bring more of the team on without changing your plan.", price: "₹500", period: "/ user / mo" },
  { title: "AI Drawing Compare", body: "Automatic R0-vs-R1 diffing that highlights exactly what changed.", price: "₹999", period: "/ mo" },
  { title: "Client Portal Seats", body: "Give clients their own window into project status and approvals.", price: "₹300", period: "/ seat / mo" },
  { title: "On-Site Support", body: "Hands-on onboarding and field setup with our team.", price: "Custom" },
  { title: "WhatsApp Alerts", body: "Push task, approval and site updates straight to WhatsApp.", price: "₹499", period: "/ mo" },
];

// ---------- About ----------
export type ProductPillar = { icon: "circle" | "doc" | "rupee"; title: string; body: string };
export const ABOUT_PRODUCT: ProductPillar[] = [
  { icon: "circle", title: "Clarity", body: "Every drawing, revision and decision in one trail. The whole firm sees the same picture." },
  { icon: "doc", title: "Collaboration", body: "Teams, clients and the site stay in sync, on web and mobile, with their own access." },
  { icon: "rupee", title: "Control", body: "Effort, deadlines and profitability tracked to the hour and the rupee, per project, per person." },
];

export type Founder = { slotId: string; name: string; role: string; bio: string; alt: string };
export const FOUNDERS: Founder[] = [
  {
    slotId: "af-founder-1",
    name: "Sivaraman Arunachalam",
    role: "Co-Founder & CEO",
    bio: "15+ years as an architect and interior designer, with a deep, lived understanding of the problems firms face. ArchiFlask, Wallzehn's first product, grew directly out of that experience, and its early success led him to build a technology company solving workflow problems across industries.",
    alt: "Sivaraman Arunachalam, ArchiFlask co-founder and architect",
  },
  {
    slotId: "af-founder-2",
    name: "Hari Kumaravelu",
    role: "Co-Founder",
    bio: "A solution architect with 15+ years in IT, driven by a lifelong fascination with how things work. He builds products that solve complex problems and deliver real, simplifying value to the people who use them.",
    alt: "Hari Kumaravelu, ArchiFlask co-founder and solution architect",
  },
];

// ---------- Impact ----------
export type Outcome = { num: string; text: string; dark?: boolean };
export const IMPACT_OUTCOMES: Outcome[] = [
  { num: "01", text: "Cut client approval delays, and the client communication problems that come with them." },
  { num: "02", text: "Surfaced the real cost of revisions and rework." },
  { num: "03", text: "Made profitability visible per project." },
  { num: "04", text: "Held deadlines without slippage." },
  { num: "05", text: "Ran projects and teams from the pocket.", dark: true },
];

export type Story = { kicker: string; body: string };
export const IMPACT_STORIES: Story[] = [
  {
    kicker: "DRAWING CHAOS AT SCALE",
    body: "A firm running 30+ live projects was losing time hunting for drawings, the right revision, and the reason behind each change. After ArchiFlask, they pull up any drawing, its full revision history, and what drove each change, in a couple of clicks.",
  },
  {
    kicker: "EFFORT NO ONE COULD SEE",
    body: "A firm couldn't see where the team's hours were going across multiple projects. With task management and effort tracking, they now see every person's effort down to the hour, per project, which lets them spot projects running over their planned effort and reallocate people who are free.",
  },
];

export type Review = { quote: string; who: string; dark?: boolean };
export const REVIEWS: Review[] = [
  {
    quote: "Archiflask has been a major asset in managing vendor relationships and handling files. Its seamless integration for vendor engagement has made coordination effortless, while the advanced file handling capabilities ensure that all documents are organized and easily accessible. The result is a smoother workflow.",
    who: "Poonam Jain · Landscape Architect, Hyderabad"
  },
  {
    quote: "As a design architect, Archiflask has truly transformed how I work. Its intuitive interface and powerful features streamline the design process, allowing me to visualize projects with stunning clarity and precision. The collaboration tools are fantastic, making it easy to coordinate.",
    who: "Krishna · Principal Architect, Chennai"
  },
  {
    quote: "Archiflask has revolutionized the way I manage client relationships. Its transparency features have made it incredibly easy to keep clients informed and engaged throughout every stage of the project. The real-time updates and detailed reports ensure that everyone is on the same page.",
    who: "Neha · Architect, Bengaluru",
    dark: true
  },
  {
    quote: "The task-tracking features are exceptional, allowing me to assign and monitor tasks effortlessly. It keeps everyone on track with clear deadlines and progress updates, which has greatly improved our project efficiency. Managing tasks in real time has streamlined our workflow.",
    who: "Raja Subramanian · Senior Architect, Chennai"
  },
  {
    quote: "Archiflask has revolutionized the way I manage client relationships. Its transparency features have made it incredibly easy to keep clients informed. The real-time updates and detailed reports significantly improve client trust and satisfaction. It's a game-changer!",
    who: "Amit Singh · Interior Designer, Delhi"
  },
  {
    quote: "The task-tracking features are exceptional, allowing us to monitor progress and assign responsibilities with absolute clarity. It keeps our team on schedule and synchronized across site visits and office tasks. An invaluable tool for project delivery.",
    who: "Sanjay Mehta · Construction Director, Mumbai",
    dark: true
  }
];

export const DOMAINS = ["Residential", "Commercial", "Interiors", "Infrastructure"];

// ---------- Blog ----------
export type BlogFeatured = {
  slotId: string;
  category: string;
  title: string;
  body: string;
  meta: string[];
};
export const BLOG_FEATURED: BlogFeatured = {
  slotId: "af-blog-feat",
  category: "Featured · Growth",
  title: "How to scale an architecture firm without losing control of your projects.",
  body: "You can't grow a practice you're running out of your head, your inbox, and a dozen WhatsApp groups. Here's how firm owners move from memory to a system, and what changes when they do.",
  meta: ["8 min read", "June 2026"],
};

export type BlogPost = {
  slotId: string;
  category: string;
  title: string;
  body: string;
  read: string;
};
export const BLOG_POSTS: BlogPost[] = [
  { slotId: "af-blog-1", category: "Documentation", title: "Drawing revision management: end the hunt for the right R-number.", body: "Why drawings get lost at scale, and how an automatic R0-vs-R1 trail keeps every change accountable.", read: "6 min read" },
  { slotId: "af-blog-2", category: "Profitability", title: "Where project margin actually leaks in a design firm.", body: "Rework nobody tracked, effort nobody quoted. Tracking time to the hour shows where the money really goes.", read: "5 min read" },
  { slotId: "af-blog-3", category: "Operations", title: "From WhatsApp groups to an operating system: a firm owner's playbook.", body: "A practical path off scattered chats and spreadsheets toward one source of truth the whole firm trusts.", read: "7 min read" },
  { slotId: "af-blog-4", category: "Field", title: "Geo-tagged site attendance: replacing the honour system on site.", body: "Logging presence with location, and what reliable field data does for billing and accountability.", read: "4 min read" },
  { slotId: "af-blog-5", category: "Clients", title: "Why a client portal wins more repeat business than any pitch.", body: "Giving clients their own window into the project turns transparency from a chore into something you sell.", read: "5 min read" },
  { slotId: "af-blog-6", category: "Growth", title: "The SOP mindset: building a practice that runs without you.", body: "Why the firms that scale cleanly are the ones that turned how they work into a documented standard.", read: "6 min read" },
];

// ---------- Book a Demo ----------
export type DemoExpect = { n: string; title: string; body: string };
export const DEMO_EXPECT: DemoExpect[] = [
  { n: "1", title: "A live walkthrough", body: "On your kind of projects, residential, commercial, interiors or infra." },
  { n: "2", title: "Your questions answered", body: "Onboarding, your team size, how the client app works." },
  { n: "3", title: "Start free, same day", body: "No end date · 1 project · 2 users (1 admin + 1 team)." },
];

// Calendar is generated relative to "now" so it never goes stale (the audit
// flagged the old hardcoded June-2026 grid). A day is bookable when it's a
// future weekday in the displayed month; selValue is the label sent on submit.
export type DemoDay = { num: number; selValue?: string };
export type DemoCalendar = {
  monthLabel: string; // e.g. "June 2026"
  leadingBlanks: number; // Monday-first blanks before day 1
  days: DemoDay[];
};

const WD_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MIN_BOOKABLE_DAYS = 3; // roll to next month if fewer slots remain

// Monday-first weekday index (0 = Mon … 6 = Sun).
const monIndex = (d: Date) => (d.getDay() + 6) % 7;

export function buildDemoCalendar(ref: Date = new Date()): DemoCalendar {
  // First selectable day is tomorrow (gives the team lead time to reach out).
  const start = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() + 1);

  // Decide which month to display: this month, unless too few weekdays remain.
  let year = start.getFullYear();
  let month = start.getMonth();
  const isBookable = (d: Date) =>
    d.getMonth() === month &&
    d.getTime() >= start.getTime() &&
    d.getDay() !== 0 &&
    d.getDay() !== 6;

  const countBookable = () => {
    const last = new Date(year, month + 1, 0).getDate();
    let n = 0;
    for (let day = 1; day <= last; day++) {
      if (isBookable(new Date(year, month, day))) n++;
    }
    return n;
  };

  if (countBookable() < MIN_BOOKABLE_DAYS) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: DemoDay[] = [];
  for (let num = 1; num <= daysInMonth; num++) {
    const d = new Date(year, month, num);
    const bookable =
      d.getTime() >= start.getTime() && d.getDay() !== 0 && d.getDay() !== 6;
    days.push(
      bookable ? { num, selValue: `${WD_SHORT[d.getDay()]} ${num}` } : { num },
    );
  }

  return {
    monthLabel: firstOfMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    }),
    leadingBlanks: monIndex(firstOfMonth),
    days,
  };
}

export type DemoSlot = { label: string; value: string };
export const DEMO_SLOTS: DemoSlot[] = [
  { label: "10:00", value: "10:00–11:00 AM" },
  { label: "11:00", value: "11:00 AM–12:00 PM" },
  { label: "12:00", value: "12:00–1:00 PM" },
  { label: "2:00", value: "2:00–3:00 PM" },
  { label: "3:00", value: "3:00–4:00 PM" },
  { label: "4:00", value: "4:00–5:00 PM" },
  { label: "5:00", value: "5:00–6:00 PM" },
  { label: "6:00", value: "6:00–7:00 PM" },
];
