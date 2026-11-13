export const metadata = { title: "Work · Preet Ghanshyam Dave" };

const work = [
  {
    role: "AI/ML Software Engineer, Agility",
    when: "2026 – Now",
    note: "I build machine-learning models directly with clients and get them into real products, owning the problem from data and modelling through to deployment.",
  },
  {
    role: "Founder, Tensor Tapri",
    href: "https://tensortapri.org",
    when: "Nov 2026 – Now",
    note: "A free weekly email on AI, ML, automation and data for India, written from Ahmedabad. Its “What’s brewing” page tracks the week’s AI news and benchmark progress.",
  },
  {
    role: "Machine Learning Intern, Agility",
    when: "2025 – 2026",
    note: "Worked on client automation pipelines and predictive models. Moved to full-time after ten months.",
  },
  {
    role: "AI/ML Intern, stealth AI startup",
    when: "2025",
    note: "Owned the models and pipelines, applied reinforcement learning to the product’s core logic, built an MVP end to end, and helped prepare it for a Y Combinator application.",
  },
  {
    role: "Project Lead, Gujarat Technological University",
    when: "2023 – Nov 2026",
    note: "Led CodeTransform, a Python-to-JavaScript converter, from inception to a state-level Design Engineering presentation. Designed the architecture while building the product.",
  },
  {
    role: "Team Lead, Smart India Hackathon",
    when: "2024",
    note: "Led a team building a virtual herbal garden with detailed interactive 3D models, presented at the national level.",
  },
];

export default function Work() {
  return (
    <div className="rowlist">
      {work.map((w) => (
        <div className="row" key={w.role}>
          <div className="row-main">
            <div className="row-title">
              {w.href ? <a href={w.href} target="_blank" rel="noopener noreferrer">{w.role}</a> : w.role}
            </div>
            <div className="row-note">{w.note}</div>
          </div>
          <div className="row-when">{w.when}</div>
        </div>
      ))}
    </div>
  );
}
