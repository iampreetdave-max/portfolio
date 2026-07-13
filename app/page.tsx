// Minimal single-column homepage (dhruvchauhan.me style). Theme + header live
// in globals.css / SiteHeader so this is just content.

const work = [
  { role: "AI/ML Software Engineer, Agility", note: "I build ML models directly with clients and get them into real products. Started as an intern in 2025 and moved to full-time. This is where I learned what “it works on my machine” actually costs.", when: "2026 – Now" },
  { role: "AI/ML Intern, stealth AI startup", note: "Owned models and pipelines, built an MVP around reinforcement learning, and helped get it ready for a Y Combinator application. Small team, high trust, a lot of learning fast.", when: "2025" },
  { role: "Project Lead, GTU", note: "Led CodeTransform, a Python-to-JavaScript converter, from an idea to a state-level Design Engineering presentation. First time I had to design and build at the same time.", when: "2023 – Now" },
  { role: "Team Lead, Smart India Hackathon", note: "Led a team building a virtual herbal garden with detailed 3D models, presented at the national level.", when: "2024" },
];

const projects = [
  { name: "Therma Netra", note: "AI digital twin of India’s climate on national datasets (IMD, INSAT, IMDAA, CPCB). Built for ISRO BAH 2026.", href: null },
  { name: "CityShield · VisionScan", note: "Offline AI policing platform that fuses physical and cyber crime on one map and goes from a live CCTV anomaly to a dispatched patrol. KANAD 2026.", href: "https://github.com/iampreetdave-max/Guardian-Angle" },
  { name: "Arbiter", note: "Agentic legal AI on Google’s ADK that researches live law and drafts documents. XPRIZE Build with Gemini.", href: "https://github.com/iampreetdave-max/arbiter" },
  { name: "AI Race News", note: "Ingests 110+ AI/ML sources every 15 minutes, dedupes and tags them, and serves it all through a public API.", href: "https://github.com/iampreetdave-max/ai-race-news" },
  { name: "Sports prediction engines", note: "NBA, soccer and NASCAR models graded against real results. +16.5% tracked ROI on Grade-A NBA picks over 1,064 games.", href: "https://github.com/iampreetdave-max/football-predictions" },
];

const writing = [
  { title: "Engineers Fear AI, As Mathematicians Once Feared Calculators", when: "Paper", href: null },
  { title: "Zipf’s Law for LLMs", when: "LinkedIn", href: "https://www.linkedin.com/posts/iampreetdave_ai-machinelearning-zipfslaw-ugcPost-7358579994941448193-dETg/" },
  { title: "How GPS Works", when: "LinkedIn", href: "https://www.linkedin.com/posts/iampreetdave_did-you-know-your-phones-gps-finds-you-share-7367498895888732160-unkR/" },
];

export default function Home() {
  return (
    <main className="page-pad wrap">
      <p className="lead">
        Hi, I&rsquo;m Preet. I&rsquo;m an AI/ML engineer in Ahmedabad. I work at
        Agility, where I build machine-learning systems with clients, from the
        data all the way to something running in production. Before that I was
        interning, breaking things, and slowly figuring out how to ship. I like
        problems that are a little too big for me and the stubbornness it takes
        to finish them.
      </p>

      <h2 className="sec-label">Work</h2>
      <div className="rowlist">
        {work.map((w) => (
          <div className="row" key={w.role}>
            <div className="row-main">
              <div className="row-title">{w.role}</div>
              <div className="row-note">{w.note}</div>
            </div>
            <div className="row-when">{w.when}</div>
          </div>
        ))}
      </div>

      <h2 className="sec-label">Projects</h2>
      <div className="rowlist">
        {projects.map((p) => (
          <div className="row" key={p.name}>
            <div className="row-main">
              <div className="row-title">
                {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}
              </div>
              <div className="row-note">{p.note}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="more"><a href="/projects">All projects and automations &rarr;</a></p>

      <h2 className="sec-label">Writing</h2>
      <div className="rowlist">
        {writing.map((a) => (
          <div className="row" key={a.title}>
            <div className="row-title">
              {a.href ? <a href={a.href} target="_blank" rel="noopener noreferrer">{a.title}</a> : a.title}
            </div>
            <div className="row-when">{a.when}</div>
          </div>
        ))}
      </div>

      <h2 className="sec-label">Contact</h2>
      <div className="links-row">
        <a href="mailto:iampreetdave@gmail.com">Email</a>
        <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="/resume.pdf" download>Résumé</a>
        <a href="/cv.pdf" download>CV</a>
      </div>

      <footer className="foot">Preet Ghanshyam Dave</footer>
    </main>
  );
}
