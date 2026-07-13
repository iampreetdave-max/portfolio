export const metadata = {
  description:
    "Preet Dave is an AI/ML engineer in Ahmedabad, India. He builds applied machine learning, LLM and agentic-AI systems in production, from a climate digital twin on national datasets to offline computer vision for city police.",
  alternates: { canonical: "/" },
};

export default function About() {
  return (
    <div className="prose">
      <h1>Hi, I&rsquo;m Preet Dave.</h1>

      <p>
        Right now I&rsquo;m an AI/ML engineer at Agility, where I build machine-learning
        systems with clients and take them from raw data all the way to something
        running in production.
      </p>

      <p>
        I joined as an intern and moved to full-time within a year. Most of what I
        learned there was not about models. It was about what &ldquo;it works on my
        machine&rdquo; actually costs, and how much of the job is talking to the person
        who has the problem.
      </p>

      <p>
        Before that I interned at a stealth AI startup, where I owned the models and
        pipelines, built an MVP around reinforcement learning, and helped get it ready
        for a Y Combinator application. Small team, high trust, and a lot of learning
        very fast.
      </p>

      <p>
        At university I led{" "}
        <a href="https://github.com/iampreetdave-max/code-convertor" target="_blank" rel="noopener noreferrer">CodeTransform</a>,
        a Python-to-JavaScript converter, from an idea to a state-level presentation.
        It was the first time I had to design something and build it at the same time.
      </p>

      <p>
        These days I build at the edge of ML and real systems: a climate digital twin
        of India on national datasets, an offline computer-vision platform for a city
        police cyber-crime branch, and agentic legal AI. I like problems that are a
        little too big for me and the stubbornness it takes to finish them.
      </p>

      <p>
        Outside of work I take things apart to understand how they work, and then{" "}
        <a href="/writing">write about them</a>. Occasionally I lose an afternoon to a
        hackathon.
      </p>
    </div>
  );
}
