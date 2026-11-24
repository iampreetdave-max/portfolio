// Research papers: one page each at /research/<slug> (app/research/[slug]), listed on /research and
// atop /writing. PDF at public/research/<slug>.pdf; figures and the offline demo in public/research/<slug>/.
// Title, abstract, highlights, keywords, Table 1 (minus its source-file column) and figure captions are
// copied verbatim from each paper's paper.md; only `finding` (one highlight) and `description` (meta
// description, from the abstract, no model names) are picked by hand. `*x*` in the text is italic.
export type Paper = {
  slug: string;
  title: string;
  finding: string;
  description: string;
  demo: string;
  abstract: string;
  highlights: string[];
  keywords: string[];
  figures: { file: string; w: number; h: number; caption: string }[]; // first is the hero
  table: { caption: string; head: string[]; rows: string[][] };
};

export const AUTHOR = "Preet Ghanshyam Dave";
export const AFFILIATION = "Computer Science and Engineering (AI & ML), NLJIET, Gujarat Technological University, Ahmedabad, India";
export const DATE = { iso: "2026-11", scholar: "2026/11", text: "November 2026" };

export const pdf = (p: Paper) => `/research/${p.slug}.pdf`;
export const asset = (p: Paper, file: string) => `/research/${p.slug}/${file}`;
export const plain = (s: string) => s.replace(/\*/g, "");

export const papers: Paper[] = [
  {
    slug: "jailbreak-lifecycle",
    title: "A public jailbreak within days, failure reports within hours: chat-model jailbreaks on a public forum, 2023 to 2025",
    finding: "From 2024 on, a public jailbreak appeared for 29 of 30 chat-model releases, a median 2.1 days after release; a third to a half of shared jailbreaks drew a failure report within a week.",
    description: "How soon after a chat model's release is a jailbreak for it shared in public, and how long do shared jailbreaks keep working? A study of 38 releases from six vendors and 12,322 posts on a public jailbreak forum, 2023 to 2025.",
    demo: "Jailbreak Lifecycle Explorer",
    abstract: "How soon after a chat model's release does a jailbreak for it appear in public, and how long do shared jailbreaks keep working? We found no study that times either across many releases. We combine 38 releases from six vendors dated by Epoch AI, the full record of r/ChatGPTJailbreak from January 2023 to its ban in December 2025 (12,322 posts, 120,186 human comments), and Hugging Face repositories named as abliterated or uncensored. A forum post sharing a jailbreak that named the model appeared for 29 of the 30 releases from 2024 on, at a Kaplan-Meier median of 2.1 days (95% CI 1.1 to 3.9), with no difference between 2024 and 2025; only 1 of 8 releases from 2023 got one, when the forum was small and titles rarely named versions. Against the earliest dated outside reports, the forum was first for three of seven models and outside reporters for three, with one tie. Of 3,030 shared jailbreaks with human comments, 34.6% drew a comment within seven days saying they no longer worked; Kaplan-Meier, which assumes quiet posts would have been reported like busy ones, gives an upper estimate of 48.2%. Most reports came within hours. Annual rates showed no trend, though our failure detector's precision (0.64) may have varied by year. We detected no rise in failure reports after releases (+0.25 percentage points, 95% CI -0.15 to +0.68). Posting-time features predicted lifetimes only weakly (held-out concordance 0.547). Open-weight families had a stripped copy a median 1.7 days after release.",
    highlights: [
      "From 2024 on, a forum post sharing a jailbreak that named the model appeared for 29 of 30 chat-model releases, a median 2.1 days after release (95% CI 1.1 to 3.9); 2024 and 2025 did not differ.",
      "Against the earliest dated outside report, the forum was first for three of seven models, the outside reporter for three, and one was a tie within the reports' date resolution.",
      "Between 34.6% (observed) and 48.2% (Kaplan-Meier upper estimate) of 3,030 shared jailbreaks drew a \"doesn't work\" or \"patched\" comment within a week, with no annual trend from 2023 to 2025.",
      "We could not detect a rise in failure reports in the 14 days after 38 model releases (+0.25 percentage points, 95% CI -0.15 to +0.68).",
      "Open-weight model families had an \"abliterated\" or \"uncensored\" copy on Hugging Face a median 1.7 days after release (19 of 20 families).",
    ],
    keywords: ["jailbreak", "large language models", "AI safety", "survival analysis", "Kaplan-Meier", "Reddit", "open-weight models", "red teaming"],
    figures: [
      { file: "fig1_first_break.png", w: 1440, h: 1280, caption: "Figure 1. Hours from each model's release date (00:00 UTC) to the first forum post sharing a jailbreak that names it, for 38 releases from six vendors (log scale). Filled circles count only titles that name the version; hollow circles also count titles that name only the family (\"Claude\", \"Grok\"), credited to the newest model. Crosses mark the earliest dated outside report we found (security lab, press, or a public post timed by the press). Arrows: no such post before the forum's ban. From 2024 on, most releases cluster around one to two days; most 2023 releases have no version-named post." },
      { file: "fig2_lifetime.png", w: 1440, h: 600, caption: "Figure 2. Share of shared jailbreaks with a comment reporting that they no longer work, by days since posting (symmetric log scale). Left: all 3,030; the solid line is the Kaplan-Meier estimate with its 95% interval, an upper estimate because most posts stop getting comments within a day; the dashed line is the share observed, a lower bound. Right: Kaplan-Meier by year of posting." },
      { file: "fig6_open_weights.png", w: 1440, h: 660, caption: "Figure 6. Left: hours from each open-weight family's release date to the first Hugging Face repository with \"abliterated\" or \"uncensored\" in its name (log scale). Right: new such repositories per quarter, 2023 to 2025, and the part that are GGUF re-packs for local use." },
    ],
    table: {
      caption: "Table 1. Key results at a glance. CI: 95% confidence interval (bootstrap, Greenwood or Kaplan-Meier); p-values are log-rank tests unless stated. Kaplan-Meier lifetime shares are upper estimates (see Methods).",
      head: ["Claim", "Estimate", "95% CI or test", "n"],
      rows: [
        ["Releases with a forum jailbreak naming them", "30 of 38", "", "38 releases"],
        ["Median days to that post, releases from 2024 on", "2.1", "1.1 to 3.9", "30 releases"],
        ["Same, 2024 vs 2025 releases", "1.5 vs 2.1", "p = 0.30", "10 / 20"],
        ["2023 releases with such a post", "1 of 8", "", "8 releases"],
        ["Forum first / outside first / tie", "3 / 3 / 1", "", "7 models"],
        ["Failure report within 7 days, observed", "34.6%", "", "3,030 posts"],
        ["Failure report within 7 days, Kaplan-Meier", "48.2%", "46.0 to 50.4", "3,030 posts"],
        ["Within 7 days (KM), posted in 2023 vs 2025", "49.0% vs 47.9%", "p = 0.53", "500 / 1,710"],
        ["Within 7 days (KM), title claims robustness vs not", "69.2% vs 45.9%", "Holm p < 0.001", "272 / 2,758"],
        ["Precision of the failure-report rule", "0.64", "0.50 to 0.78", "50 comments"],
        ["Change in failure-report share after releases", "+0.25 points", "-0.15 to +0.68", "38 releases"],
        ["Held-out concordance, model chosen on validation", "0.547", "0.513 to 0.579", "816 posts"],
        ["Median days to a stripped open-weight copy", "1.7", "", "19 of 20 families"],
      ],
    },
  },
  {
    slug: "house-edge",
    title: "Price does the work, limits are the safety valve: decomposing the house edge on 198,144 football matches",
    finding: "A sequential test on closing-line value flags 99.8% of simulated value bettors after a median of 17 bets; a test on profit flags 3.8% within 1,000 bets.",
    description: "How much of a bookmaker's advantage comes from the price it posts, the products it sells and the customers it lets bet? A study of 198,144 football matches, 5,295 NFL games, exact casino mathematics and a simulated book on real odds.",
    demo: "House Edge Lab",
    abstract: "How much of a bookmaker's advantage comes from the price it posts, the products it sells and the customers it lets bet? We study 198,144 matches from 22 European football divisions from 2000/01 to 2025/26, 5,295 NFL games, exact casino mathematics and a simulated book on real odds. Bet365's median overround fell from 12.38% in 2002/03 to between 5.63% and 7.64% since 2018/19. Product multiplies it: Bet365 outcomes priced at 10 or more returned -31.22% (95% CI -37.92% to -24.22%) and four-leg favourite accumulators -18.56% (-22.49% to -14.83%), against -4.66% for single bets. Taking soft-book prices 2% above Pinnacle's fair price returned +2.62% (0.28% to 5.18%) over 15,715 bets, while a walk-forward LightGBM model lost 7.47% and added no information to the market (log-loss change -0.0001, -0.0002 to 0.00005). A sequential test on closing-line value flags 99.8% of simulated value bettors after a median of 17 bets; the same test on profit flags 3.8% within 1,000. In a simulated book with an assumed customer mix, posting a 5% overround with value bettors supplying a tenth of handle, limiting on closing-line value adds 0.175 points of profit per unit of handle (2.4% of profit), worth about 0.17 points of overround, and limiting on profit lowers profit. Across assumed mixes the gain is 0.4% to 12.4% of profit. Price and product do nearly all the work; limiting is a cheap, fast safety valve that removes the one group that beats the book, consistent with Massachusetts operator data showing 0.64% of accounts limited.",
    highlights: [
      "Bet365's median 1X2 overround fell from 12.38% in 2002/03 to 6.11% in 2018/19 and was 7.64% in 2025/26, while Pinnacle's closing overround stayed between 2.45% and 3.65%.",
      "Four-leg favourite accumulators at Bet365 returned -18.56% (95% CI -22.49% to -14.83%), close to the -18.29% that compounding the single-bet margin implies.",
      "A sequential test on closing-line value flags 99.8% of simulated value bettors after a median of 17 bets; a test on profit flags 3.8% within 1,000 bets.",
      "In a simulated 5%-margin book where value bettors supply 10% of handle, limiting on closing-line value adds 0.175 points of profit per unit of handle (2.4% of profit); limiting on profit lowers it.",
      "A results-only LightGBM model lost 7.47% at Bet365 and added nothing to Pinnacle's price (log-loss change -0.0001, 95% CI -0.0002 to 0.00005).",
    ],
    keywords: ["sports betting", "bookmaker margin", "favourite-longshot bias", "accumulators", "account limiting", "closing-line value", "sequential testing", "LightGBM", "casino house edge"],
    figures: [
      { file: "fig9_casino.png", w: 1119, h: 766, caption: "Figure 1. House edge by product. Blue: standard casino bets; orange: casino side and proposition bets; green: football products at Bet365 (asterisk: expected loss against Pinnacle's closing price; the last bar is realized). Casino edges are exact except blackjack, which is simulated." },
      { file: "fig4_accumulators.png", w: 1425, h: 566, caption: "Figure 5. Accumulators built from real same-week matches, 2012/13 to 2025/26. Points: realized return with 95% week-clustered bootstrap intervals. Lines: expected return if legs are independent and Pinnacle's closing price is fair. (a) Favourite on every leg. (b) A random outcome on every leg." },
      { file: "fig7_detect.png", w: 1424, h: 737, caption: "Figure 8. Detecting skilled bettors. (a) Area under the ROC curve for separating value bettors from recreational bettors, by number of bets observed, using the running t-statistic of CLV or of profit. (b) ROC curves after 100 bets." },
    ],
    table: {
      caption: "Table 1. Key results at a glance. CIs are 95% intervals from a bootstrap over calendar weeks; simulated quantities have no CI and are reported with their range across assumptions. n/a: not applicable.",
      head: ["Claim", "Estimate", "95% CI", "n"],
      rows: [
        ["Bet365 median 1X2 overround, 2025/26", "7.64%", "n/a", "26 seasons"],
        ["Return on Bet365 outcomes priced 10 or more", "-31.22%", "-37.92% to -24.22%", "8,640 bets"],
        ["Return on four-leg favourite accumulators, Bet365", "-18.56% (expected -18.29%)", "-22.49% to -14.83%", "150 per week, 619 weeks"],
        ["Value bettor, 2% rule at best soft price: return", "+2.62%", "0.28% to 5.18%", "15,715 bets"],
        ["Value bettor: closing-line value", "+2.94%", "2.74% to 3.12%", "15,715 bets"],
        ["Value threshold chosen on 2012/13 to 2018/19, tested later (null)", "-1.51%", "-14.87% to 15.21%", "635 bets"],
        ["LightGBM log loss minus Bet365's (null for the model)", "+0.0130", "0.0121 to 0.0139", "161,761 matches"],
        ["Change in log loss from adding the model to Pinnacle pre-closing (null)", "-0.0001", "-0.0002 to 0.00005", "n/a"],
        ["Value bettors flagged by the CLV test; median bets to flag", "99.8%; 17", "n/a", "400 bettors"],
        ["Value bettors flagged by the profit test within 1,000 bets", "3.8%", "n/a", "400 bettors"],
        ["Profit added by CLV limiting, 5% overround, 10% value share", "+0.175 points (2.4% of profit)", "n/a (0.4% to 12.4% across assumed mixes)", "150 bettors per type"],
        ["Overround worth of CLV limiting at a 3% base", "0.17 points", "n/a", "150 bettors per type"],
      ],
    },
  },
  {
    slug: "vibe-shuffle",
    title: "Shuffle with a sense of direction: listener-written mood rules for playlist shuffle, and what smoothness costs in randomness",
    finding: "At 100 songs, listener-written mood rules plus a temperature cut jarring jumps from 14.4% (Fisher-Yates) to 0.1%; scored against real crowd labels, from 8.2% to 4.4%.",
    description: "Listeners complain about shuffle play. Listener-written mood rules and one temperature cut jarring jumps from 14.4% (Fisher-Yates) to 0.1% of transitions, and the paper measures what that smoothness costs in randomness.",
    demo: "Vibe Shuffle",
    abstract: "Listeners complain about shuffle play. In 390 Reddit and Hacker News posts sampled at random from 19,215 collected between 2014 and 2026, 37.4% [30.7, 44.6] of complaints concern repeats or songs that never play and 1.6% [0.6, 4.7] genre or mood jumps between neighbours. We therefore treat smooth flow as an option. The listener writes a grammar over four mood states and may add a mood arc; a heuristic sampler, a sequential softmax walk followed by 20 sweeps of Metropolis moves, targets a Boltzmann distribution over play orders whose temperature runs from uniform over the orders the rules allow to a cheapest-path order. On 300 synthetic 100-song libraries built from 73,720 Spotify tracks, Fisher-Yates makes a jarring genre-and-mood jump on 14.4% [13.5, 15.2] of transitions, Spotify's 2014 artist spreading on 14.5% and the best of 100 random orders on 11.4%; the sampler at temperature 0.2 makes 0.1% [0.0, 0.1]. The rules alone deliver about half of that cut, and tempo jumps do not change. Scored against real crowd mood labels for 1,373 tracks, the jarring rate falls from 8.2% [7.7, 8.8] to 4.4% [4.0, 4.8]. Smoothness costs predictability: the next song can be guessed 14.1% of the time against 1.0%, and consecutive shuffles share 7.0 of 99 transitions against 1.0, which a penalty on the previous shuffle's transitions cuts to 0.04. Song positions stay near-uniform (entropy 0.994 of 1). On six-song libraries the sampler ends 0.058 in total variation from its target, against a sampling floor of 0.019.",
    highlights: [
      "Of 182 shuffle complaints in a random sample of 390 posts from 2014 to 2026, 37.4% concern repeats and only 1.6% genre or mood jumps.",
      "At 100 songs, listener-written mood rules plus a temperature cut jarring jumps from 14.4% (Fisher-Yates) to 0.1%; scored against real crowd labels, from 8.2% to 4.4%.",
      "The rules alone deliver about half of the cut (11.6% to 6.3%), and tempo jumps stay where they were (34.6% against 33.9%).",
      "Smooth orders are more predictable: the next song is guessed 14.1% of the time against 1.0%, and 7.0 of 99 transitions repeat from the previous shuffle, which a memory penalty cuts to 0.04.",
      "The plain sequential walk leaves misfits for the end of the queue (3.9% jarring in its last tenth); Metropolis refinement removes this but remains a heuristic, 0.058 in total variation from its target on six-song libraries.",
    ],
    keywords: ["shuffle play", "playlist sequencing", "music mood", "Boltzmann sampling", "Markov chain Monte Carlo", "user control", "music recommender systems"],
    figures: [
      { file: "fig_pareto.png", w: 1518, h: 583, caption: "Figure 4. The trade-off between smooth transitions and randomness, 20 libraries of 100 songs. (a) Jarring-jump rate against next-song predictability (log scale); (b) against the effective number of next songs as a share of the library. The line joins walk temperatures from 5 (left in a, right in b) to 0.05. Fisher-Yates and artist spread overlap." },
      { file: "fig_temperatures.png", w: 1270, h: 497, caption: "Figure 1. One 60-song synthetic library shuffled four ways, drawn in the valence-energy plane. Dots are songs coloured by mood (blue Sad, green Chill, yellow Happy, vermillion Intense); grey lines join consecutive songs and darken toward the end of the queue; dashed pink lines are jarring jumps. Panel titles give that order's jarring rate and mean step. Fisher-Yates and the walk at three temperatures, gentle grammar, no arc." },
      { file: "fig_app.png", w: 1200, h: 1130, caption: "Figure 7. The Vibe Shuffle app (desktop, light theme): grammar grid and presets, arc and surprise controls, summary statistics, the vibe-plane path of the queue next to a plain shuffle of the same songs, and the queue with mood chips and jump markers." },
    ],
    table: {
      caption: "Table 1. Key results at a glance. Libraries hold 100 songs unless stated. Intervals are 95% bootstrap intervals over libraries, or Wilson intervals for shares of complaints; \"not computed\" marks an estimate without one.",
      head: ["Claim", "Estimate", "95% CI", "n"],
      rows: [
        ["Repeat complaints, share of complaints", "37.4%", "[30.7, 44.6]", "182 complaints"],
        ["Genre or mood-jump complaints, share of complaints", "1.6%", "[0.6, 4.7]", "182 complaints"],
        ["Jarring jumps, Fisher-Yates", "14.4%", "[13.5, 15.2]", "300 libraries"],
        ["Jarring jumps, refined sampler, T = 0.2", "0.1%", "[0.0, 0.1]", "300 libraries"],
        ["Jarring jumps, rules only (Fisher-Yates 11.6%)", "6.3%", "[4.6, 8.1]", "20 libraries"],
        ["Jarring jumps in real crowd labels, refined minus Fisher-Yates", "−3.8 points", "[−4.4, −3.2]", "100 libraries, 1,373 tracks"],
        ["Tempo jumps over 40 BPM, refined minus Fisher-Yates (null)", "−0.7 points", "[−1.9, 0.4]", "20 libraries"],
        ["Next song guessed, refined, T = 0.2 (Fisher-Yates 1.0%)", "14.1%", "[13.8, 14.5]", "20 libraries"],
        ["Transitions repeated from the previous shuffle, T = 0.2 (Fisher-Yates 1.02)", "6.96 of 99", "[6.63, 7.28]", "20 libraries, 40 shuffles each"],
        ["The same with the memory penalty", "0.04 of 99", "[0.03, 0.06]", "20 libraries, 40 shuffles each"],
        ["Jarring jumps in the last tenth of the queue, walk alone, T = 0.2", "3.9%", "[3.2, 4.6]", "300 libraries"],
        ["Total variation from the exact target, refined, T = 0.2 (floor 0.019)", "0.058", "not computed", "8 six-song libraries"],
      ],
    },
  },
  {
    slug: "jarvis",
    title: "Competence without social debt: the JARVIS wish in myth, psychology and public data",
    finding: "JARVIS names 86.8% of the 8,594 GitHub repositories (2008 to 2025) that pair one of twelve fictional AI names with \"assistant\".",
    description: "Why do people want a JARVIS, Tony Stark's assistant in the Iron Man films, and what can public traces show about the wish? A theory synthesis, competence without social debt, set against GitHub, Wikipedia and Hacker News data.",
    demo: "JARVIS Index",
    abstract: "Why do people want a JARVIS, Tony Stark's assistant in the Iron Man films, and what can public traces show about the wish? A review draws five literatures into one account of it, *competence without social debt*: expert help that carries none of the reciprocity, judgement or loss of credit that help from people does. The gender evidence shows that men use generative AI more, not that they want such an assistant more. A \"JARVIS index\" measures footprints: GitHub counts for twelve fictional AI names (2008 to 2025), 30,661 JARVIS-named repositories, 22 English Wikipedia series (2015 to 2026) and 1,216 Hacker News items. JARVIS names 86.8% of the 8,594 repositories that pair a fictional AI name with \"assistant\". Against all new repositories its growth sped up after ChatGPT (+39.3% a year, 95% CI 22.2% to 58.7%); against all assistant repositories it slowed (-20.6% a year, -30.7% to -9.1%), and its share of them fell from 3.13% in 2022 to 2.35% in 2025, so there is no JARVIS-specific acceleration. Of 400 repositories labelled by an AI assistant (human check pending), 24% state a purpose, mostly an assistant that does things; fandom is 19.2% of these before 2023 and 21.1% after (Fisher p = 1.0). After ChatGPT's launch, views of ELIZA rose 75.0% and of HAL 9000 39.4%, beyond all 45 placebo dates, while JARVIS views follow Marvel (7.86 times baseline after *Avengers: Endgame*). The wish shows in what people name and read; its growth tracks the assistant boom, not the character.",
    highlights: [
      "JARVIS names 86.8% of the 8,594 GitHub repositories (2008 to 2025) that pair one of twelve fictional AI names with \"assistant\".",
      "JARVIS assistant repositories rose 7.7-fold from 2022 to 2025, but assistant repositories of all kinds rose 10.2-fold, so JARVIS's share fell from 3.13% to 2.35%: no JARVIS-specific post-ChatGPT acceleration.",
      "In 400 sampled JARVIS repositories (AI-labelled, human check pending), 24% state a purpose, and the fandom share of those is 19.2% before 2023 and 21.1% after (Fisher p = 1.0).",
      "After ChatGPT's launch, Wikipedia views of ELIZA rose 75.0% and HAL 9000 39.4%, more than at any of 45 placebo dates; JARVIS's 28.4% sat mid-distribution (placebo p = 0.59).",
      "Marvel releases move JARVIS attention far more than chatbots do: 7.86 times baseline views after *Avengers: Endgame* against 1.16 after ChatGPT.",
    ],
    keywords: ["JARVIS", "AI assistants", "anthropomorphism", "help seeking", "gender", "GitHub", "Wikipedia pageviews", "cultural analytics"],
    figures: [
      { file: "fig_footprint.png", w: 2156, h: 722, caption: "Figure 1. JARVIS dominates the naming but did not outpace the assistant boom. Left: repositories per 100,000 new GitHub repositories that contain each name and the word \"assistant\" (name, description or topics), by creation year (log scale; helpers solid and coloured, hostile AIs grey with distinct dashes). Middle: JARVIS's share of all twelve names in that form. Right: JARVIS's share of all repositories matching \"assistant\". The share panels start in 2015, before which they rest on a handful of repositories. Dotted vertical lines mark the launches of Siri, the Echo and ChatGPT." },
      { file: "fig_pageviews.png", w: 2182, h: 1022, caption: "Figure 3. Left: weekly English Wikipedia pageviews by human users (log scale) for the JARVIS articles and four comparison articles, July 2015 to November 2026; dotted lines mark film and series releases, dashed lines Zuckerberg's write-up and ChatGPT's launch. Right: level change at ChatGPT's launch for all 22 series (dots, symmetric log scale) against the range of each series' own placebo-date estimates (grey bars); orange dots exceed every placebo." },
      { file: "fig_motives.png", w: 2084, h: 742, caption: "Figure 2. Left: fandom (explicit Iron Man, Stark or Marvel references) as a share of JARVIS-named repositories labelled fandom or effectance, before 2023 and from 2023. Circles: reference sample (created 2008 to 2022 and 2023 to 2025; Wilson 95% intervals). Squares: whole corpus (created 2015 to 2022 and 2023 to 2025), adjusted classify-and-count with the keyword rules and with the embedding classifier; bootstrap 95% intervals include classifier error. Crosses: unadjusted keyword counts. Right: shares of all JARVIS-named repositories that mention a language model or agent, have a description, or are written mainly in Python." },
    ],
    table: {
      caption: "Table 1. Key results at a glance. Intervals are 95%; for Wikipedia the test is the placebo-in-time p (smallest possible 0.022). Labels in rows 6 to 8 come from an AI assistant applying the codebook, not yet checked by a person.",
      head: ["Claim", "Estimate", "95% CI or test", "n"],
      rows: [
        ["JARVIS share of the 12 names, assistant form, 2008-2025", "86.8%", "", "8,594 repositories"],
        ["JARVIS name-form precision", "0.81", "0.57 to 0.93", "30 sampled"],
        ["Post-2022 slope change, offset all new repositories (name form)", "+39.3% a year", "+22.2% to +58.7%", "15 years"],
        ["Post-2022 slope change, offset all \"assistant\" repositories (name form)", "-20.6% a year", "-30.7% to -9.1%", "15 years"],
        ["JARVIS share of all \"assistant\" repositories, 2022 and 2025", "3.13%, 2.35%", "", "15,333 and 156,894"],
        ["Reference repositories that state a purpose", "24%", "20.1% to 28.4%", "400"],
        ["Fandom share of purpose-stating repositories, before 2023 and from 2023 (null)", "19.2%, 21.1%", "Fisher p = 1.0", "52, 38"],
        ["Embedding classifier agreement with reference labels (kappa)", "0.58", "0.52 to 0.66", "394"],
        ["ELIZA pageviews, level change at ChatGPT's launch", "+75.0%", "placebo p = 0.022", "45 placebo dates"],
        ["JARVIS pageviews, level change at ChatGPT's launch (null)", "+28.4%", "placebo p = 0.59", "45 placebo dates"],
        ["JARVIS pageviews, 14 days after *Avengers: Endgame*", "7.86 times baseline", "", "14 days"],
        ["Hacker News \"jarvis\" rate, 2023-2025 against 2017-2022", "1.56 times", "1.05 to 2.31", "1,216 items"],
      ],
    },
  },
  {
    slug: "scam-english",
    title: "Does bad English still filter? Testing Herley's self-selection argument across scam genres, 2005 to 2025",
    finding: "Advance-fee letters from 2005-2007 had 3.6 times the grammar-match rate of credential phishing from the same years (95% CI 3.0 to 4.2).",
    description: "Herley argued in 2012 that advance-fee scam e-mails look absurd on purpose. On 52,752 e-mails, 419 letters had 3.6 times the grammar-match rate of phishing, and phishing from 2023 to 2025 was no more fluent than in 2005 to 2007.",
    demo: "Scam Filter Explorer",
    abstract: "Herley argued in 2012 that advance-fee scam e-mails look absurd on purpose. Each reply costs the scammer a long conversation before he learns whether the responder will pay, so repelling all but the most gullible saves work. We state this as a binormal model in which optimal obviousness rises with the cost of engaging a responder whose value is not yet known, and test its ordinal prediction on 52,752 public e-mail messages: advance-fee (419) letters, credential phishing from 2005 to 2025, and legitimate mail including era-matched 2007 TREC ham. In 2005-2007, 419 letters had 3.6 times the LanguageTool grammar-match rate of phishing (95% CI 3.0 to 4.2; 1.9 to 4.2 across rule sets and format restrictions); 84% of sampled 419 matches and 62.5% of phishing matches were real errors. Precision-corrected misspellings were 2.7 times the phishing rate (1.7 to 4.5). Phishing had half the grammar-match rate of 2007 legitimate mail (0.51, 0.42 to 0.62). Genre is confounded with writer population, collection and format, so these contrasts are consistent with Herley's account but cannot show that obviousness is chosen. The model's prediction that language models make phishing more fluent is not supported: grammar matches in 2023-2025 equalled those of 2005-2007 (ratio 0.94, 0.71 to 1.22). Across 24 parameter settings, automating conversation multiplies victims by 1.2 to about two million (median 12.8). If the bad-English filter ends, the model says it ends first in conversational scams, for which we found no dated public corpus.",
    highlights: [
      "Advance-fee letters from 2005-2007 had 3.6 times the grammar-match rate of credential phishing from the same years (95% CI 3.0 to 4.2), and 1.9 to 4.2 times across rule sets and format restrictions.",
      "Phishing had about half the grammar-match rate of era-matched 2007 legitimate mail (ratio 0.51), but the 67 plain-text phishing messages did not differ from it (0.82, 0.34 to 1.43).",
      "Phishing did not become more fluent: grammar matches in 2023-2025 equalled those in 2005-2007 (ratio 0.94, 0.71 to 1.22), against the model's prediction for the language-model era.",
      "A filter trained on 2005-2007 error and capitalization features scored an AUC of 0.89 in period and 0.75 on average over 2023-2025, so errors stayed a moderate phishing cue.",
      "In the model, automating conversation multiplies victims per million recipients by a factor between 1.2 and about two million over 24 settings of Herley's parameters (median 12.8).",
    ],
    keywords: ["advance-fee fraud", "phishing", "self-selection", "Herley", "large language models", "LanguageTool", "interrupted time series", "SHAP"],
    figures: [
      { file: "p1_genre.png", w: 1520, h: 840, caption: "Figure 1. Obviousness measures by genre: 2005-2007 scams, 2007 TREC ham and 1999-2002 Enron and SpamAssassin mail, near-duplicate representatives, means with 95% bootstrap intervals. 419 letters have the most LanguageTool grammar matches and all-capital words and the lowest reading ease; on raw dictionary misses they do not differ from phishing. The 419 lexicon describes the genre and is not a test." },
      { file: "p2_trend.png", w: 1480, h: 880, caption: "Figure 5. Nazario phishing by year, near-duplicate representatives, means with 95% bootstrap intervals; the dashed line marks the release of ChatGPT. Grammar matches show no gain in fluency over twenty years. Dictionary misses and obfuscated words peaked in 2022-2023 and fell afterwards; urgency words doubled." },
      { file: "ml_temporal.png", w: 1240, h: 740, caption: "Figure 7. Area under the ROC curve for separating each year's phishing from held-out 2007 legitimate mail, for models trained on 2005-2007 phishing; bands are 95% bootstrap intervals and the dashed line marks the release of ChatGPT. The error-and-capitalization models decline slowly from about 0.84 in 2008 to about 0.75 and show no break in 2022; the raw dictionary-miss rate alone points the wrong way." },
    ],
    table: {
      caption: "Table 1. Key results at a glance. Ratios are 419 over phishing unless stated; 2005-2007 near-duplicate representatives. \"Filtered\" grammar drops LanguageTool rules with known false alarms (Section 4.2).",
      head: ["Claim", "Estimate", "95% CI", "n"],
      rows: [
        ["Grammar matches per 100 words, filtered rules", "3.57", "3.04-4.18", "1,230/1,440"],
        ["Same, all grammar rules", "2.85", "2.46-3.28", "1,230/1,440"],
        ["Same, plain-text phishing only", "2.21", "1.26-5.40", "1,230/67"],
        ["Same, negative-binomial IRR, year and length", "3.91", "3.22-4.75", "2,670"],
        ["Grammar matches that are real errors: 419 / phishing / legitimate 2007", "0.84/0.625/0.60", "", "25/24/25"],
        ["Misspellings, precision-corrected", "2.72", "1.73-4.50", "1,230/1,440"],
        ["Raw dictionary misses (no difference)", "1.04", "0.90-1.18", "1,230/1,440"],
        ["Grammar matches, phishing over legitimate 2007", "0.51", "0.42-0.62", "1,440/1,500"],
        ["Phishing grammar matches, 2023-2025 over 2005-2007 (no change)", "0.94", "0.71-1.22", "751/1,440"],
        ["AUC of 2005-2007 error-and-caps filter on 2025 phishing", "0.78", "0.75-0.81", "299/750"],
        ["r/Scams grammar posts per 1,000, slope change at 2023Q1 (no change)", "−0.27", "−0.65 to 0.11", "47 quarters"],
        ["Model: victims per million, automated over human (median 12.8)", "1.21-2,019,966", "", "24 settings"],
      ],
    },
  },
  {
    slug: "dataset-discovery",
    title: "All catalog links opened, fewer requests found a match: catalog-grounded versus web-search LLM dataset discovery on 102 held-out requests",
    finding: "All 279 verifiable top-five links from the catalog-grounded finder opened, against 83.6% and 89.69% for two LLMs writing dataset lists with web search (102 held-out requests).",
    description: "Does it help to stop a language model from writing dataset links? On 102 held-out requests every verifiable link from a catalog-grounded finder opened, against 83.6% and 89.69% for LLMs with web search, but it found an on-target dataset for fewer requests.",
    demo: "Dataset discovery benchmark explorer",
    abstract: "Does it help to stop a language model from writing dataset links? We compared the author's Open Data Finder, where Claude Haiku 5.5 may only choose among records from eight catalog APIs, with Claude Sonnet 5.5 and Haiku 5.5 writing dataset lists with up to five web searches. Of 120 requests hashed before any run, the 102 not used to build the finder are the primary set, 40 of them rewritten from real r/datasets posts. Under one link rule for all systems, with refused links set aside, all 279 verifiable top-five finder links opened, against 83.6% (95% CI 79.41 to 87.47) for Sonnet and 89.69% (86.02 to 92.89) for Haiku; per request the finder led Sonnet by 16.96 points (12.45 to 21.94). Pages that answered 404 and were never archived, a proxy for invented links, made up 6.49% of Sonnet's links, 1.34% of Haiku's and none of the finder's. The finder returned nothing for 22 requests. By two LLM judges, its first link was on target as often as the baselines' (36.27% against 38.24% and 43.14%; difference from Sonnet -1.96 points, -13.73 to 9.8), but over all links the baselines found an on-target dataset for 67.65% and 73.53% of requests against 39.22%, and for real requests 50% and 55% against 22.5%. The finder cost $0.0005 per request against $0.0492 and $0.0371. A dead-link classifier tested on unseen hosts reached an AUC of only 0.5783 (0.4895 to 0.6531). Catalog grounding removes broken links; it does not widen what can be found.",
    highlights: [
      "Under one link rule for every system, 279 of 279 verifiable top-five finder links opened, against 83.6% for Sonnet and 89.69% for Haiku with web search (102 held-out requests).",
      "6.49% of Sonnet's links and 1.34% of Haiku's were 404s with no archived copy, a proxy for invented pages; the finder had none.",
      "The finder's first link was on target as often as a web-search system's first link (36.27% of requests against 38.24% and 43.14%), but the longer web-search lists found an on-target dataset far more often (67.65% and 73.53% against 39.22%).",
      "On the 18 needs used while building the finder it looked much better (72.22% on-target coverage), which is why they are reported apart.",
      "A URL-feature model cannot spot dead links on unseen hosts (AUC 0.5783), and caught 31 of 85 links with no archived copy when flagging the riskiest 30%.",
    ],
    keywords: ["dataset search", "retrieval-augmented generation", "hallucination", "link rot", "LLM evaluation", "open data"],
    figures: [
      { file: "fig_tradeoff.png", w: 878, h: 654, caption: "Figure 6. Mean cost per need (log scale) against the share of needs with an on-target live link (any link, repaired view), with 95% intervals; filled markers are the 62 held-out authored needs, open markers the 40 real requests. A and D cost the same and are drawn slightly apart." },
      { file: "fig_resolve.png", w: 1463, h: 639, caption: "Figure 1. The main result on the 102 held-out needs, run 1. Left: share of top-five links that resolve under one rule for all systems (bars, links whose server refused the checker set aside) and under the finder's own rule (dashes). Right: share of needs with an on-target live link when only the first link, the first three, or all links are counted. Error bars are 95% cluster bootstrap intervals over needs." },
      { file: "fig_pipeline.png", w: 1187, h: 486, caption: "Figure 2. The two designs compared. The finder (top) lets the model plan searches and choose among fetched catalog records; the web-search baseline (bottom) asks the model to write the dataset list itself, with up to five web searches." },
    ],
    table: {
      caption: "Table 1. Key results at a glance (102 held-out needs, run 1 unless stated). Intervals are 95% cluster bootstrap over needs. A: finder; B: Sonnet with web search; C: Haiku with web search.",
      head: ["Claim", "Estimate", "95% CI", "n"],
      rows: [
        ["Top-5 resolve, same rule for all (A, B, C)", "100%, 83.6%, 89.69%", "B 79.41 to 87.47; C 86.02 to 92.89", "279, 445, 417 links"],
        ["Paired A minus B, top-5 resolve (same rule)", "+16.96 points", "12.45 to 21.94", "79 needs"],
        ["Top-5 resolve, finder's own rule (A, B, C)", "98.59%, 75.46%, 80.26%", "B 70.41 to 80.2", "283, 493, 466 links"],
        ["Odds ratio A vs B, finder's rule (4 vs 121 failures)", "24.65", "6.14 to 98.89", "1,242 links"],
        ["Links that 404 with no archived copy (B, C; A)", "6.49%, 1.34%; 0%", "B 4.55 to 8.64; C 0.38 to 2.53", "678, 521, 293 links"],
        ["On-target, first link only (A, B, C)", "36.27%, 38.24%, 43.14%", "A 26.47 to 46.08", "102 needs"],
        ["Paired A minus B, first link on target", "-1.96 points", "-13.73 to 9.8", "102 needs"],
        ["On-target, any link (A, B, C)", "39.22%, 67.65%, 73.53%", "A 29.41 to 49.02", "102 needs"],
        ["On-target, any link, real requests", "22.5%, 50%, 55%", "A 10 to 35", "40 needs"],
        ["Judge agreement (linear weighted kappa)", "0.625", "0.577 to 0.668", "1,853 links"],
        ["Cost per need (A, B, C)", "$0.0005, $0.0492, $0.0371", "B 0.0413 to 0.0576", "102 needs"],
        ["Dead-link AUC, unseen hosts (LightGBM)", "0.5783", "0.4895 to 0.6531", "2,344 links"],
      ],
    },
  },
];
