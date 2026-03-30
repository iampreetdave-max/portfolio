import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { game, payload } = await req.json();

    let systemPrompt = "";
    let userPrompt = "";

    if (game === "market") {
      if (payload.action === "generate") {
        systemPrompt = `You are a geopolitical finance analyst AI. Generate a realistic geopolitical scenario and a related financial asset for a trading prediction game. Respond ONLY with valid JSON, no markdown.`;
        userPrompt = `Generate a geopolitical scenario for a trading game. Return JSON:
{
  "scenario": "A 2-3 sentence realistic geopolitical event",
  "asset": "A specific tradeable asset like XAU/USD, Brent Crude, NDX, EUR/USD, BTC/USD, US 10Y Yield, etc.",
  "asset_class": "One of: Commodities, Equities, Forex, Crypto, Bonds"
}`;
      } else {
        systemPrompt = `You are a geopolitical finance analyst AI. Evaluate a user's bull/bear prediction for a geopolitical scenario's market impact. Respond ONLY with valid JSON, no markdown.`;
        userPrompt = `Scenario: "${payload.scenario}"
Asset: ${payload.asset}
User predicted: ${payload.prediction}

Evaluate this prediction. Return JSON:
{
  "correct_direction": "BULL" or "BEAR",
  "is_correct": true/false,
  "confidence": 60-95 (integer, your confidence in the correct direction),
  "explanation": "2-3 sentences explaining the market logic and why this direction is expected"
}`;
      }
    } else if (game === "country") {
      if (payload.action === "generate") {
        systemPrompt = `You are a geopolitical risk analyst AI. Generate clues about a country's geopolitical risk factors for a guessing game. Do NOT name the country in clues. Respond ONLY with valid JSON, no markdown.`;
        userPrompt = `Pick a country with notable current geopolitical tensions. Give 5 clues (easy to hard) about its risk factors WITHOUT naming it. Return JSON:
{
  "country": "The country name",
  "region": "Geographic region",
  "risk_score": 0-100 integer,
  "clues": ["hardest clue", "hard clue", "medium clue", "easier clue", "easiest clue"],
  "risk_analysis": {
    "level": "Low/Medium/High/Elevated/Critical",
    "key_tensions": ["tension1", "tension2", "tension3"],
    "market_sectors": ["sector1", "sector2"]
  }
}`;
      } else {
        systemPrompt = `You are a geopolitical risk analyst. Check if a country guess is correct. Respond ONLY with valid JSON, no markdown.`;
        userPrompt = `The target country is "${payload.answer}". The user guessed "${payload.guess}". Return JSON:
{
  "is_correct": true/false,
  "hint": "A short helpful hint if wrong, or congratulatory message if correct"
}`;
      }
    } else if (game === "tension") {
      if (payload.action === "generate") {
        systemPrompt = `You are a Global Tension Index (GTI) analyst AI. Generate a breaking geopolitical event for a tension scoring game. Respond ONLY with valid JSON, no markdown.`;
        userPrompt = `Generate a realistic breaking geopolitical event. Return JSON:
{
  "event": "A 1-2 sentence breaking news event",
  "category": "One of: Military, Economic, Diplomatic, Cyber, Humanitarian",
  "region": "Affected region",
  "gti_score": 0-100 integer (the AI-estimated Global Tension Index impact),
  "gti_level": "Low (0-20) / Medium (21-40) / High (41-60) / Elevated (61-80) / Critical (81-100)",
  "reasoning": "2-3 sentences explaining why this event warrants this GTI score"
}`;
      }
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Claude API error: ${response.status}`, details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    // Parse JSON from Claude's response
    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      // Try to extract JSON from the response if wrapped in markdown
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
      }
      return NextResponse.json({ error: "Failed to parse AI response", raw: text }, { status: 500 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
