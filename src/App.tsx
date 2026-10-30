import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Dribbble,
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
  github: string;
  demo: string;
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const projects: Project[] = [
  {
    title: "Morrow Studio",
    category: "Brand identity · Digital",
    description:
      "A warm, considered identity and digital home for a fictional independent ceramics studio.",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Sculptural ceramic objects displayed in a sunlit studio",
    tags: ["Art direction", "Branding", "Web design"],
    theme: "project-art",
    github: "https://github.com/yourname/morrow-studio",
    demo: "https://yourname.github.io/morrow-studio",
  },
  {
    title: "Fieldnotes",
    category: "Product design · Web app",
    description:
      "A concept for a calmer way to collect inspiration, save ideas, and find creative connections.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "An open notebook and pen on a clean desk",
    tags: ["Product strategy", "UI/UX", "Prototyping"],
    theme: "project-notes",
    github: "https://github.com/yourname/fieldnotes",
    demo: "https://yourname.github.io/fieldnotes",
  },
  {
    title: "Goodkind Coffee",
    category: "Visual identity · E-commerce",
    description:
      "A friendly visual world and storefront concept for a small-batch neighborhood coffee roaster.",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A welcoming neighborhood coffee shop interior",
    tags: ["Brand identity", "Shopify", "Art direction"],
    theme: "project-coffee",
    github: "https://github.com/yourname/goodkind-coffee",
    demo: "https://yourname.github.io/goodkind-coffee",
  },
];

const skills = [
  {
    icon: Palette,
    title: "Visual design",
    items: "Brand identity, art direction, typography, illustration",
  },
  {
    icon: PenTool,
    title: "Product & UX",
    items: "UI/UX design, wireframing, prototyping, design systems",
  },
  {
    icon: Asterisk,
    title: "Development",
    items: "HTML, CSS, JavaScript, React, responsive design",
  },
];

const timeline = [
  {
    type: "Experience",
    date: "2022 — Present",
    title: "Independent Designer & Studio Founder",
    place: "Northstar Studio · Remote",
    description:
      "Partnering with thoughtful teams to shape digital products, visual identities, and the experiences in between.",
  },
  {
    type: "Experience",
    date: "2020 — 2022",
    title: "Product Designer",
    place: "Creative practice · Your city",
    description:
      "Worked across research, interaction design, and visual systems for early-stage product teams.",
  },
  {
    type: "Education",
    date: "2016 — 2020",
    title: "Design & Digital Media",
    place: "Your university · Your city",
    description:
      "A foundation in visual communication, human-centered design, and creative technology.",
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

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
    window.location.href = `mailto:hello@northstar.studio?subject=${subject}&body=${body}`;
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
        <a className="wordmark" href="#top" aria-label="Alex Morgan, home" onClick={closeMenu}>
          <span className="wordmark-mark">a<span>.</span></span>
          <span className="wordmark-name">Alex Morgan</span>
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
              Thoughtful design.
              <br />
              <span>Made to matter.</span>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.16 }}
            >
              I&apos;m Alex — an independent designer and studio founder creating meaningful
              identities and digital experiences for people with a point of view.
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
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                alt="Portrait placeholder for Alex Morgan"
                loading="eager"
              />
              <div className="portrait-caption">
                <span>Alex Morgan</span>
                <span>Designer · Founder</span>
              </div>
            </div>
            <div className="hero-note">
              <span className="note-star">✳</span>
              <span>Curious by nature.<br />Intentional by design.</span>
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
              Good design makes room for <span>better things.</span>
            </h2>
            <p>
              I&apos;m a designer who likes asking one more question, noticing the little things,
              and turning complicated ideas into something clear and human. My practice moves
              between visual identity, digital product, and the details that make an experience
              feel like itself.
            </p>
            <p>
              When I&apos;m not at my desk, you&apos;ll probably find me collecting old magazines,
              getting lost on a long walk, or trying a new recipe. I&apos;m building a small,
              independent studio around kind collaboration and work with a longer shelf life.
            </p>
            <a className="text-link" href="#contact">
              More about working together <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </motion.div>
        </section>

        <section className="skills-section section-spacing" aria-labelledby="skills-title">
          <div className="section-shell">
            <SectionHeading
              eyebrow="What I bring"
              title="A curious mind, a versatile toolkit."
              description="From first thought to final details, I bring the right mix of big-picture thinking and hands-on craft."
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
                eyebrow="Selected explorations"
                title="A few things I’ve made."
                description="A collection of self-initiated concepts and illustrative placeholders. Project details are here to make this template easy to personalize."
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
                    <span className="project-image-label">Concept project</span>
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
                    <div className="project-actions">
                      <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub placeholder (opens in a new tab)`}>
                        GitHub <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                      <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo placeholder (opens in a new tab)`}>
                        Live <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    </div>
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
                title="Good ideas deserve great execution."
                description="Bring me in for a focused piece of work or a thoughtful start-to-finish partnership."
              />
              <a className="text-link" href="#contact">
                Tell me what you&apos;re working on <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="service-list">
              {[
                {
                  number: "01",
                  title: "Brand & visual identity",
                  detail: "Positioning, visual direction, identity systems, and brand guidelines.",
                },
                {
                  number: "02",
                  title: "Web & software development",
                  detail: "Responsive websites, front-end builds, and lightweight software prototypes.",
                },
                {
                  number: "03",
                  title: "Product & UI/UX design",
                  detail: "Research, product flows, interface design, and interactive prototypes.",
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
              title="Learning, making, growing."
              description="A simple timeline template — replace these examples with your real experience and education."
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
              <span className="eyebrow">Have a good one in mind?</span>
              <h2>Let&apos;s make<br /><span>something meaningful.</span></h2>
              <p>Tell me a little about what you&apos;re building. I&apos;ll get back to you as soon as I can.</p>
              <a className="contact-email" href="mailto:hello@northstar.studio">
                <Mail size={17} /> hello@northstar.studio
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
          <a className="wordmark footer-wordmark" href="#top">
            <span className="wordmark-mark">a<span>.</span></span>
            <span className="wordmark-name">Alex Morgan</span>
          </a>
          <span className="footer-credit">Independent designer & studio founder</span>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <span className="copyright">© {new Date().getFullYear()} Alex Morgan</span>
          <a className="back-to-top" href="#top" aria-label="Back to top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
