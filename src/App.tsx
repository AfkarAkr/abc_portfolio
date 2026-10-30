import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  PenTool,
  Send,
  Sun,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  theme: string;
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const projects: Project[] = [
  {
    title: "Olive & Oak",
    category: "Logo design · Brand identity",
    description:
      "A sample identity concept for a modern artisan food brand, exploring a distinctive logo and a warm, natural visual language.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Minimal skincare packaging arranged as a branding mockup",
    tags: ["Logo design", "Brand identity", "Art direction"],
    theme: "project-art",
  },
  {
    title: "Serein Botanicals",
    category: "Packaging · Visual identity",
    description:
      "A sample packaging concept for a fictional botanical skincare line, with a calm palette and clear product labels.",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Skincare bottles and containers arranged together",
    tags: ["Packaging", "Label design", "Typography"],
    theme: "project-notes",
  },
  {
    title: "Daybreak Coffee",
    category: "Brand identity · Packaging",
    description:
      "A sample logo and coffee packaging direction for a fictional neighborhood coffee roaster.",
    image:
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Coffee beans and a cup arranged for a coffee brand concept",
    tags: ["Logo design", "Packaging", "Print design"],
    theme: "project-coffee",
  },
];

const skills = [
  {
    icon: Palette,
    title: "Logo & branding",
    items: "Logo design, visual identity, brand colors, typography",
  },
  {
    icon: PenTool,
    title: "Packaging & print",
    items: "Packaging concepts, labels, print layouts, production-ready artwork",
  },
  {
    icon: Asterisk,
    title: "Digital design",
    items: "Social media graphics, campaign artwork, digital brand assets",
  },
];

const timeline = [
  {
    type: "Experience",
    date: "Around 4 years",
    title: "Graphic design",
    place: "Freelance & independent work",
    description:
      "Around four years of graphic design experience. Add specific roles, clients, education, and dates here when you are ready.",
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/afkar_akr", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/afkar-mohamed-29a7ba2a3", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/search?q=Afkar+Akr&type=users", icon: Github },
];

const contactEmail = "your-email@example.com";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return { theme, toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")) };
}

function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`social-links${compact ? " social-links-compact" : ""}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} (opens in a new tab)`}
        >
          <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
          {!compact && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.65 } },
  };

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setFormStatus("Please complete each field before sending.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setFormStatus("Your email app should open with your message ready to send.");
    event.currentTarget.reset();
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Afkar Akr, home" onClick={closeMenu}>
          <span className="wordmark-mark" aria-hidden="true">AK</span>
          <span className="wordmark-name">Afkar Akr</span>
        </a>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-ambient-glow glow-top-left" aria-hidden="true" />
          <div className="hero-ambient-glow glow-bottom-right" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div
              className="availability"
              initial="hidden"
              animate="visible"
              variants={reveal}
            >
              <span className="availability-dot" />
              Available for select projects
            </motion.div>
            <motion.h1
              id="hero-title"
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.08 }}
            >
              Graphic design.
              <br />
              <span>Made with meaning.</span>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.16 }}
            >
              I&apos;m Afkar — a graphic designer with around four years of experience creating
              memorable logos, brand identities, and packaging.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.24 }}
            >
              <a className="button button-primary" href="#work">
                Explore my work <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="button button-text" href="#contact">
                Start a conversation <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
            <motion.div
              className="hero-socials"
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.32 }}
            >
              <span>Find me elsewhere</span>
              <SocialLinks compact />
            </motion.div>
          </div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.18 }}
          >
            <div className="portrait-frame">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"
                alt="Male portrait placeholder for Afkar Akr"
                loading="eager"
              />
              <div className="portrait-caption">
                <span>Afkar Akr</span>
                <span>Graphic Designer</span>
              </div>
            </div>
            <div className="hero-note">
              <span className="note-star">✳</span>
              <span>Distinctive identities.<br />Thoughtful details.</span>
            </div>
            <span className="hero-orbit orbit-one" aria-hidden="true" />
            <span className="hero-orbit orbit-two" aria-hidden="true" />
          </motion.div>
          <a className="scroll-cue" href="#about">
            <ArrowDown size={15} aria-hidden="true" /> Scroll to explore
          </a>
        </section>

        <section className="about section-shell section-spacing" id="about">
          <motion.div
            className="about-aside"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
          >
            <span className="eyebrow">A little about me</span>
            <div className="about-stamp" aria-hidden="true">
              <span>DESIGN WITH INTENTION</span>
              <Asterisk size={25} />
            </div>
          </motion.div>
          <motion.div
            className="about-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
          >
            <h2>
              I turn ideas into <span>visual identities.</span>
            </h2>
            <p>
              I&apos;m Afkar Akr, a graphic designer with around four years of experience. I enjoy
              shaping ideas into clear, memorable visuals—from distinctive logos and cohesive
              brand identities to considered packaging.
            </p>
            <p>
              My goal is to help businesses express who they are through thoughtful, consistent
              design. I&apos;m always looking to learn, collaborate, and take on creative projects
              where good design can make a difference.
            </p>
            <a className="text-link" href="#contact">
              Let&apos;s work together <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </motion.div>
        </section>

        <section className="skills-section section-spacing" aria-labelledby="skills-title">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Graphic design skills"
              title="Building brands from the details up."
              description="A design-focused toolkit for shaping memorable identities and bringing them to life across print and digital."
              titleId="skills-title"
            />
            <div className="skills-grid">
              {skills.map(({ icon: Icon, title, items }, index) => (
                <motion.article
                  className="skill-card"
                  key={title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={reveal}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="skill-icon"><Icon size={21} strokeWidth={1.7} /></div>
                  <span className="skill-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{items}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section section-spacing" id="work">
          <div className="section-shell">
            <div className="work-heading">
              <SectionHeading
                eyebrow="Sample graphic design work"
                title="Ideas made into identities."
                description="These fictional concept projects are examples to help you present your logo, branding, and packaging work. Replace them with your own projects."
              />
              <span className="work-count">01 — 03</span>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.article
                  className="project-card"
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={reveal}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    className={`project-image ${project.theme}`}
                    href="#contact"
                    aria-label={`Ask about the ${project.title} concept`}
                  >
                    <img src={project.image} alt={project.imageAlt} loading="lazy" />
                    <span className="project-image-action"><ArrowUpRight size={19} /></span>
                    <span className="project-image-label">Fictional sample concept</span>
                  </a>
                  <div className="project-meta">
                    <div>
                      <span className="project-category">{project.category}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-footer">
                    <div className="tag-list">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <a className="text-link project-contact-link" href="#contact">
                      Discuss a project <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
            <a className="button button-outline all-work-link" href="#contact">
              Have a project in mind? <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="services-section section-spacing" id="services">
          <div className="section-shell services-layout">
            <div className="services-intro">
              <SectionHeading
                eyebrow="Ways to work together"
                title="Design that helps your brand stand out."
                description="From a memorable logo to packaging that feels unmistakably yours, let’s make your next idea real."
              />
              <a className="text-link" href="#contact">
                Tell me what you&apos;re working on <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-list">
              {[
                {
                  number: "01",
                  title: "Logo design & branding",
                  detail: "Custom logo concepts, visual identity systems, color palettes, and brand guidelines.",
                },
                {
                  number: "02",
                  title: "Packaging & label design",
                  detail: "Packaging concepts, product labels, and print-ready artwork for your products.",
                },
                {
                  number: "03",
                  title: "Social media & marketing design",
                  detail: "On-brand social graphics, campaign visuals, and promotional design assets.",
                },
              ].map((service) => (
                <details className="service-item" key={service.number}>
                  <summary>
                    <span className="service-number">{service.number}</span>
                    <span className="service-title">{service.title}</span>
                    <span className="service-expand" aria-hidden="true">+</span>
                  </summary>
                  <p>{service.detail}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="journey-section section-spacing" id="journey">
          <div className="section-shell">
            <SectionHeading
              eyebrow="The journey so far"
              title="Around four years in graphic design."
              description="An overview of the experience shared so far. Add your specific roles, clients, and education details when you are ready."
            />
            <div className="timeline">
              {timeline.map((item, index) => (
                <motion.article
                  className="timeline-item"
                  key={`${item.title}-${item.date}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="timeline-marker"><span /></div>
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-content">
                    <span className="eyebrow">{item.type}</span>
                    <h3>{item.title}</h3>
                    <span className="timeline-place">{item.place}</span>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-spacing" id="contact">
          <div className="section-shell contact-layout">
            <div className="contact-intro">
              <span className="eyebrow">Have a design project in mind?</span>
              <h2>Let&apos;s create<br /><span>something memorable.</span></h2>
              <p>Tell me about your logo, branding, or packaging project, and let&apos;s start a conversation.</p>
              <a className="contact-email" href={`mailto:${contactEmail}`}>
                <Mail size={17} /> {contactEmail}
              </a>
              <SocialLinks />
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label>
                  Your name
                  <input name="name" type="text" autoComplete="name" placeholder="Jane Smith" required />
                </label>
                <label>
                  Email address
                  <input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
                </label>
              </div>
              <label>
                What are you thinking about?
                <textarea
                  name="message"
                  rows={5}
                  placeholder="A little about your project, timeline, or big idea..."
                  required
                />
              </label>
              <div className="form-submit-row">
                <button className="button button-primary" type="submit">
                  Send an inquiry <Send size={15} aria-hidden="true" />
                </button>
                <span className="form-note">Opens a pre-filled email in your email app.</span>
              </div>
              <p className="form-status" aria-live="polite">{formStatus}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="wordmark footer-wordmark" href="#top" aria-label="Afkar Akr, back to top">
            <span className="wordmark-mark" aria-hidden="true">AK</span>
            <span className="wordmark-name">Afkar Akr</span>
          </a>
          <span className="footer-credit">Graphic designer · Around 4 years of experience</span>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <span className="copyright">© {new Date().getFullYear()} Afkar Akr</span>
          <a className="back-to-top" href="#top" aria-label="Back to top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
