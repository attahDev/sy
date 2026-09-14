/**
 * Single source of truth for SYBTE site copy and structured content.
 *
 * Figures in `impactStats` come from the latest publicly reported Capacity
 * Building Programme update and are date-stamped by `impactDataDate` so they
 * can be refreshed without creating conflicting totals.
 */

export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About SYBTE",
        href: "/about",
        description: "Who we are, our mission, vision and purpose.",
      },
      {
        label: "Our Focus",
        href: "/about#focus",
        description: "The eight areas our programmes are built around.",
      },
      {
        label: "Why South Yorkshire",
        href: "/about#why-south-yorkshire",
        description: "Sheffield, Barnsley, Doncaster and Rotherham.",
      },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      {
        label: "Programmes & Roadmap",
        href: "/programmes",
        description: "Current delivery and our 2026–2028 direction.",
      },
      {
        label: "Events & Training",
        href: "/events",
        description: "Workshops, masterclasses and university sessions.",
      },
      {
        label: "Digital Health & Innovation",
        href: "/digital-health",
        description: "Community-centred health technology and research.",
      },
      {
        label: "Digital Platform",
        href: "/platform",
        description: "Digital Academy, Mentor AI and startup resources.",
      },
    ],
  },
  {
    label: "Impact",
    href: "/impact",
    children: [
      {
        label: "Community Impact",
        href: "/impact",
        description: "Verified programme metrics and outcomes.",
      },
      {
        label: "Spotlight",
        href: "/spotlight",
        description: "Founders, students, leaders and alumni stories.",
      },
      {
        label: "Recognition",
        href: "/recognition",
        description: "Award Recognition — honouring excellence across the region.",
      },
      {
        label: "Awards",
        href: "/awards",
        description: "Recognising South Yorkshire change makers.",
      },
      {
        label: "News",
        href: "/news",
        description: "Announcements, partner news and press coverage.",
      },
    ],
  },
  { label: "Partners", href: "/partners" },
  { label: "Team", href: "/team" },
  { label: "Get Involved", href: "/get-involved" },
];

/** Date stamp shown alongside every published impact figure. */
export const impactDataDate = "Latest verified programme update, September 2026";

export const impactStats = [
  {
    value: "101",
    label: "Registered candidates",
    note: "Across the SYBTE Capacity Building Programme.",
  },
  {
    value: "46",
    label: "Participants trained",
    note: "Completed specialist training sessions to date.",
  },
  {
    value: "5",
    label: "Specialist programmes delivered",
    note: "Cyber security, AI, business leadership and entrepreneurship.",
  },
  {
    value: "72%",
    label: "Programme delivery reported",
    note: "Recorded at the time of the latest published update.",
  },
];

export const focusAreas = [
  "Digital skills and confidence",
  "Artificial Intelligence and emerging technology",
  "Cyber security and digital trust",
  "Entrepreneurship and business growth",
  "Leadership and professional development",
  "Mentoring and access to networks",
  "Student and youth opportunity",
  "Community-led innovation and inclusion",
];

export const boroughs = [
  {
    name: "Sheffield",
    description:
      "Our delivery base, home to Sheffield Technology Parks and both regional universities.",
  },
  {
    name: "Barnsley",
    description:
      "Growing digital campus activity and an important route into new technology careers.",
  },
  {
    name: "Doncaster",
    description:
      "Strong logistics, enterprise and community networks with rising digital demand.",
  },
  {
    name: "Rotherham",
    description:
      "Advanced manufacturing and innovation strengths we help connect to diverse talent.",
  },
];

export type RoadmapPhase = {
  period: string;
  title: string;
  summary: string;
  milestones: string[];
};

export const roadmap: RoadmapPhase[] = [
  {
    period: "2026",
    title: "Build the Foundations",
    summary:
      "Establish the regional platform, deliver the first specialist programmes and build the partnerships and volunteer network that everything else depends on.",
    milestones: [
      "Establish the South Yorkshire regional platform and community.",
      "Deliver capacity-building programmes in cyber security, artificial intelligence, business leadership and entrepreneurship.",
      "Develop partnerships with technology, education, business and community organisations.",
      "Build a regional volunteer and specialist leadership network.",
      "Connect workshop participants to ongoing digital resources and mentoring.",
      "Strengthen university engagement and Black History Month / Power of Expression programming.",
    ],
  },
  {
    period: "2027",
    title: "Deepen Participation & Pathways",
    summary:
      "Widen the offer across all four boroughs, formalise progression routes and start tracking outcomes rather than attendance.",
    milestones: [
      "Expand the training and mentoring offer across South Yorkshire.",
      "Develop stronger student, founder and community pathways into technology and entrepreneurship.",
      "Grow partner-led programmes in digital health, AI, cyber security, innovation and business growth.",
      "Introduce stronger outcome tracking: progression, jobs, businesses supported, mentoring, funding readiness and skills application.",
      "Create more founder and community showcases and spotlight stories.",
    ],
  },
  {
    period: "2028 and beyond",
    title: "Scale Regional Impact",
    summary:
      "Turn a regional programme into a recognised talent and founder pipeline with real access to investment, markets and influence.",
    milestones: [
      "Develop a recognised South Yorkshire pipeline for diverse technology talent and founders.",
      "Increase access to investment, markets, mentors and corporate opportunities.",
      "Strengthen cross-region collaboration with the wider Black Tech Expo ecosystem.",
      "Use evidence and community insight to influence inclusive innovation and regional economic participation.",
    ],
  },
];

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  /** Portrait in /public/team. Members without one fall back to a monogram. */
  image?: string;
  /** Tailwind object-position utility used to frame the face in the crop. */
  imagePosition?: string;
};

export const team: TeamMember[] = [
  {
    name: "Michael Ekpechue",
    role: "Founder, Black Tech Expo",
    focus: "Strategic leadership and wider Black Tech Expo ecosystem",
    bio: "Michael founded Black Tech Expo to widen access to technology, enterprise and opportunity for global majority talent. He leads strategy across the wider ecosystem and connects the South Yorkshire region into the national platform, its partners, programmes and networks.",
    image: "/team/michael-ekpechue.png",
    imagePosition: "object-top",
  },
  {
    name: "Rose Gordon",
    role: "Regional Head, South Yorkshire Black Tech Expo",
    focus:
      "Regional leadership, partnerships, programmes, community engagement and delivery",
    bio: "Rose leads South Yorkshire Black Tech Expo across the region. She is responsible for partnerships, programme delivery, community engagement and the day-to-day work of building an inclusive regional technology ecosystem in Sheffield, Barnsley, Doncaster and Rotherham.",
    image: "/team/rose-gordon.jpg",
    imagePosition: "object-top",
  },
  {
    name: "Dr Patience Amos",
    role: "Digital Health Innovation Lead (Voluntary)",
    focus:
      "Digital health, innovation, research and community-centred health technology",
    bio: "Patience shapes SYBTE's digital health direction, with a focus on innovation, research, community engagement and health equity. Her work connects communities, health professionals and researchers with the technologists building health solutions.",
  },
  {
    name: "Nicola Towse",
    role: "SYBTE Ambassador",
    focus:
      "Regional advocacy, connections and support for the South Yorkshire technology ecosystem",
    bio: "Nicola champions SYBTE across the regional technology ecosystem, opening conversations, making introductions and supporting the community, programmes and events that help underrepresented talent progress.",
  },
];

export type Partner = {
  name: string;
  category: string;
  status: "confirmed" | "pending";
  description: string;
};

export const partners: Partner[] = [
  {
    name: "Sheffield Technology Parks",
    category: "Delivery Partner",
    status: "confirmed",
    description:
      "Delivery partner and location supporting SYBTE capacity-building activity in Sheffield city centre.",
  },
  {
    name: "Sheffield Hallam University & Students' Union",
    category: "University Collaboration",
    status: "pending",
    description:
      "University event collaboration reaching students and emerging technology talent.",
  },
  {
    name: "University of Sheffield — Staff Race Equality Network",
    category: "University Collaboration",
    status: "pending",
    description:
      "Black History Month collaboration and staff network engagement.",
  },
  {
    name: "Barclays Eagle Labs",
    category: "Enterprise & Innovation",
    status: "pending",
    description:
      "Relationship and collaboration discussions around founder and business support.",
  },
  {
    name: "Sheffield Women in Tech",
    category: "Regional Network",
    status: "pending",
    description:
      "Regional relationship and collaboration widening access for women in technology.",
  },
  {
    name: "Afyalife Foundation",
    category: "Community Partner",
    status: "pending",
    description:
      "Community organisation involved in joint community activity and outreach.",
  },
];

export const partnershipOffers = [
  "Programme delivery",
  "Sponsorship",
  "Venues and facilities",
  "Mentoring",
  "Speakers and panellists",
  "Technology access",
  "Student engagement",
  "Research collaboration",
  "Employment pathways",
  "Community outreach",
];

export type PlatformTool = {
  name: string;
  summary: string;
  access: string;
  registration: string;
  href?: string;
};

export const platformTools: PlatformTool[] = [
  {
    name: "Digital Academy",
    summary:
      "Structured learning in digital skills, cyber security, AI and business fundamentals so training does not stop when a workshop ends.",
    access: "Open to registered community members and programme participants",
    registration: "Registration required",
    href: "/dashboard/academy",
  },
  {
    name: "AI Business Studio",
    summary:
      "Practical AI tooling for founders and small teams — turning ideas into plans, content, propositions and go-to-market assets.",
    access: "Founders, small businesses and programme participants",
    registration: "Registration required",
    href: "/dashboard/ai-studio",
  },
  {
    name: "Mentor AI",
    summary:
      "Always-available guidance between mentoring sessions, helping participants prepare, reflect and keep momentum on their goals.",
    access: "Registered members",
    registration: "Registration required",
    href: "/dashboard",
  },
  {
    name: "Business & Startup Resources",
    summary:
      "Templates, business planning tools and readiness checklists covering funding, marketing, operations and growth.",
    access: "Founders and aspiring founders",
    registration: "Registration required",
    href: "/dashboard/business-plan",
  },
  {
    name: "Research & Market Intelligence",
    summary:
      "Market, sector and opportunity insight to support business decisions, bids, funding applications and innovation projects.",
    access: "Founders, researchers and partner organisations",
    registration: "Registration required",
    href: "/dashboard/opportunity-insights",
  },
  {
    name: "Green Impact Toolkit",
    summary:
      "Tools to help businesses understand, measure and improve environmental impact alongside digital growth.",
    access: "Businesses and community organisations",
    registration: "Registration required",
    href: "/dashboard/green-impact",
  },
  {
    name: "Hall of Fame",
    summary:
      "Recognition for the founders, students, volunteers and community leaders whose work moves the region forward.",
    access: "Publicly viewable, nominations from the community",
    registration: "No registration to view",
  },
  {
    name: "Community & Networking",
    summary:
      "A regional community space to ask questions, share opportunities, find collaborators and stay connected after events.",
    access: "Registered members",
    registration: "Registration required",
    href: "/dashboard/community",
  },
];

export const impactMeasures = [
  "People registered and trained",
  "Programme completion",
  "Skills confidence before and after training",
  "Mentoring connections",
  "Founder and business support",
  "Employment or career progression",
  "Businesses launched or scaled",
  "Funding readiness and investment outcomes",
  "Student participation",
  "Partner organisations engaged",
  "Volunteer contribution",
  "Geographic reach across all four boroughs",
];

export const publicSources = [
  {
    label: "South Yorkshire Black Tech Expo — LinkedIn organisation page",
    detail: "Mission, programmes and public impact information.",
  },
  {
    label: "SYBTE Capacity Building Programme impact update",
    detail: "Latest searchable programme metrics.",
  },
  {
    label: "TECH SY",
    detail:
      "South Yorkshire technology ecosystem context and July 2026 ecosystem value of £3.7bn.",
  },
  {
    label: "South Yorkshire Mayoral Combined Authority",
    detail:
      "Regional geography and identification of digital and tech as a growth cluster.",
  },
];

export const contactDetails = {
  email: "info@gmblacktechexpo.co.uk",
  venue: "Sheffield Technology Parks, Cooper Buildings",
  address: "Arundel Street, Sheffield City Centre, Sheffield S1 2NS",
  regionalHead: "Rose Gordon, Regional Head (South Yorkshire)",
};
