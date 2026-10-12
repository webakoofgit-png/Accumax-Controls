import servicesJson from "./services.json";

const REMOTE_SRC = "https://www.accumaxcontrols.com";
export const asset = (p: string) => `/${p}`;
export const remoteAsset = (p: string) => `${REMOTE_SRC}/${p}`;

export type ServiceBlock = { p?: string; h4?: string; li?: string[] };
export type Service = {
  slug: string;
  name: string;
  image: string;
  intro: string[];
  sections: { h: string; body: ServiceBlock[] }[];
};

export const company = {
  name: "Accumax Controls Pvt. Ltd.",
  tagline: "Control Center of Engineering Excellence",
  email: "info@accumaxcontrols.com",
  phones: ["+91 9920177441", "+91 7350200025"],
  phoneLinks: ["tel:+919920177441", "tel:+917350200025"],
  whatsapp: "https://wa.link/yypj14",
  address:
    "01, Shree Flats, Ground Floor S. No. 78/8+10, Plot No. 20 Left Bhusari Colony, Kothrud, Paud Road, Pune - 411038, MH, India",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.4825651228252!2d73.79398809999999!3d18.5070828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa05a905fdf%3A0xa6ba0ea5d9a46eee!2sACCUMAX%20Controls%2C%20Shree%20Flats%20Apartment%20left%20bhusari%20colony!5e0!3m2!1sen!2sin!4v1749560807552!5m2!1sen!2sin",
  logo: asset("assets/img/logo/logo.png"),
  visionPdf: asset("Vision%20Mission%20Values_v2_.pdf"),
  ehsPdf: asset("EHS%20policy%20v2_.pdf"),
  panelCleaningPdf: asset("pdf.pdf"),
  heroVideo: remoteAsset("assets/img/home.mp4"),
  whyVideo: remoteAsset("why.mp4"),
  aboutImage: asset("assets/img/about/01.jpg"),
  processImage: asset("assets/img/process.png"),
};

export const services = servicesJson as Service[];

export const serviceThumbs: Record<string, string> = {
  "epc-projects": asset("assets/img/products/substation-t-and-c.jpg"),
  "scada-relay-testing": asset("assets/img/products/scada-and-relay-testing.jpg"),
  "export-projects": asset("assets/img/products/export-projects.jpg"),
  "substation-tnc": asset("assets/img/products/substation-t-and-c.jpg"),
  "material-fabrication-civil": asset("assets/img/products/material-and-mech-fabrication-and-civil.jpg"),
  "gis-supervision": asset("assets/img/products/gis-direction-and-supervision.jpg"),
  "solar-ev-station": asset("assets/img/products/solar-and-ev-station.jpg"),
  trading: asset("assets/img/products/trading.jpg"),
};

export const intro =
  "Accumax Controls Pvt. Ltd. is a leading exports, engineering, and technology company specializing in the energy sector. We excel in GIS, AIS, EV stations, solar, substation civil & electrical works, SAS, AMC, E-House solutions, and testing & commissioning of all voltage level systems. Our expertise also includes system audits, relay programming, and protection setting calculations. As a trusted exporter, we provide technical expertise, testing kits, all types of substation equipment, construction tools, building materials, and FRP products. We also export electrical panels, end termination material, trays, support and fasteners, light fittings, cables and lighting poles.";

export const whoWeAre = [
  "Providing products and services of highest quality standards with safest conditions",
  "Continually reviewing and improving the quality management system",
  "Proven field quality plan for Electrical, Firefighting, MEP & Instrumentation",
  "Striving for an accident-free workplace by maintaining a highest EHS standards",
  "Complying with customer specification, codes and standards with statutory regulations",
  "Building quality culture through teamwork, employee empowerment and supplier development",
  "Committed for techno economical viable solutions for electrical installations of customer",
  "Well supported by associate companies and subcontractor network",
];

export const stats = [
  { value: 100, label: "Projects Done" },
  { value: 276, label: "Happy Clients" },
  { value: 60, label: "Experienced Staff" },
  { value: 2, label: "Win Awards" },
];

const ind = (n: string, i: number) => ({ name: n, image: asset(`assets/img/portfolio/i${i}.jpg`) });
export const industries = [
  ind("Cement Industries", 10), ind("Metro", 11), ind("Defence", 12), ind("EV Stations", 13),
  ind("Textile Industries", 14), ind("Plastic Industries", 17), ind("Data Centers", 16), ind("Mining Industry", 15),
  ind("Automobiles", 1), ind("Chemical Industries", 2), ind("Food & Beverage", 3), ind("Refineries", 4),
  ind("Educational", 5), ind("Power Utilities", 7), ind("Pharmaceutical Industries", 8), ind("Pulp & Paper", 9),
];

export const clients = Array.from({ length: 24 }, (_, i) => asset(`assets/img/partner/c${i + 1}.jpg`));

export const testimonials = [
  { quote: "I'm very happy to have discovered Accumax Controls Pvt. Ltd. They supply exactly what I'd been searching for, at a good price. Delivery was quick.", name: "Ketan Waghchaure", city: "Pune" },
  { quote: "Excellent service and really quick delivery. It's so hard to find quality products, so will definitely be ordering from here again.", name: "Aniruddha Roy", city: "Pune" },
];

export const whyChoose =
  "With sincere efforts, we have achieved rating from the Biggest Rating Agency – CRISIL (A Standard & Poors Company). Below mentioned are some of our strengths highlighted after the research carried out by CRISIL, under the scheme of NSIC.";

export const about = {
  paragraphs: [
    "Accumax Controls Pvt. Ltd. stands at the forefront of engineering, exports, and technological innovation, with a specialized focus on the power sector. Renowned for our comprehensive capabilities, we deliver end-to-end solutions in Gas Insulated Substations (GIS), Air Insulated Substations (AIS), Electric Vehicle (EV) charging infrastructure, Solar Project and complete substation civil and electrical works. Our proficiency extends to Substation Automation Systems (SAS), Annual Maintenance Contracts (AMC), and cutting-edge E-House solutions.",
    "In addition, we offer expert services in testing and commissioning across all voltage levels, ensuring seamless integration and reliable performance. Our team excels in conducting thorough system audits, programming protective relays, and performing precise protection setting calculations to enhance operational safety and efficiency.",
    "As a globally trusted exporter and importer, Accumax Controls Pvt. Ltd. supplies a wide range of high-quality products, including personal protective equipment (PPE), substation components, construction tools, and premium building materials. We also offer a robust selection of FRP (Fiber Reinforced Plastic) products such as electrical end terminations, cabinets, cable trays, structural supports, and lighting poles. Driven by a commitment to excellence, innovation, and customer satisfaction, we strive to deliver reliable, sustainable, and efficient solutions tailored to the evolving needs of the power industry.",
  ],
  mission:
    "To empower the global power sector by delivering innovative, reliable, and high-performance engineering and technology solutions. We are committed to supporting energy infrastructure through quality products, sustainable practices, and exceptional service.",
  vision:
    "To be a world-class leader in power sector engineering and exports, recognized for our commitment to excellence, customer satisfaction, and pioneering technologies that shape a more resilient and energy-efficient future.",
  team: [
    { image: asset("assets/img/team1.jpg"), text: "We proudly celebrate the 8th Anniversary of Accumax Controls Pvt. Ltd., marking a journey of growth, innovation, and excellence in the power sector. This milestone reflects our team's dedication, strong partnerships, and commitment to delivering world-class engineering solutions." },
    { image: asset("assets/img/team2.jpg"), text: "Our Dedicated Field & Engineering Team is the driving force behind the flawless execution of projects across GIS, AIS, SAS, and renewable energy systems. Their technical expertise and commitment ensure seamless commissioning, safety, and reliability at every voltage level." },
  ],
};

export const gallery = [3, 4, 5, 9, 12, 13, 14, 15, 16, 20, 21].map((n) => asset(`assets/img/gallery/${n}.jpg`));
export const videos = [1, 2, 3, 4, 5].map((n) => remoteAsset(`${n}.mp4`));

export const panelCleaning = {
  image: asset("assets/img/about/live.png"),
  intro:
    "Solar panels would be a long-term investment in clean energy and would deliver the expected results. Dust, dirt, and debris have been known to gradually block the panels from operating optimally. Live solar panel cleaning is an advanced non-disruptive technique that helps in maximizing operational performance of panels without subjecting the system to shut down.",
  whyTitle: "Why Live Solar Panel Cleaning is Critical?",
  why: "Live cleaning solves the challenge by allowing the cleaning of the panels while in operation. Power losses are totally avoided while maximizing energy production with increased life cycle for the solar system.",
};

export const legacyRedirects: Record<string, string> = {
  "index.php": "/",
  "index.html": "/",
  "about-us.php": "/about",
  "contact-us.php": "/contact",
  "carrer.php": "/careers",
  "gallery.php": "/gallery",
  "videos.php": "/gallery",
  "live-panel-clening.php": "/live-panel-cleaning",
  ...Object.fromEntries(services.map((s) => [`${s.slug}.php`, `/services/${s.slug}`])),
};
