![LedgerLens review screen: a statement ledger with per-row checks, confidences and one handwritten check flagged for review](/projects/ledgerlens.jpg "Interface illustration on synthetic data: every row carries its checks, and the one low-confidence handwritten amount goes to review.")

## Design principle: AI where needed, determinism where not

Reading handwriting and printed text off a photographed or scanned document is a genuinely hard perception problem - that's where a model (OCR engine, then a vision-language model) earns its keep. But once text has been extracted, *checking that it is internally consistent* is a solved, 100% deterministic problem that has no business being left to a model's guess:

- Does the handwritten legal amount ("One thousand two hundred eighty-four and 50/100") match the printed courtesy amount ("$1,284.50")?
- Does the routing number on the MICR line pass its checksum, or does it contain a misread digit?
- Is the date on the document actually plausible?
- Does a statement's opening balance plus its transactions equal its stated closing balance?

LedgerLens draws this line explicitly, in code: `ledgerlens/ocr.py` and `ledgerlens/vlm.py` do the probabilistic extraction; `ledgerlens/validators.py` does the deterministic verification. Only fields that fail verification, or whose confidence lands below a threshold, are ever flagged for a human to look at.

## Two-stage pipeline: OCR, then VLM

![LedgerLens pipeline: preprocessing, OCR, vision-language extraction with voting, deterministic validators, then human review](/writing/ai-where-needed-determinism-where-not/pipeline.light.png "Models read, plain code checks: only the first two stages are probabilistic; the validators and the review flag are not.")

**Why two stages instead of one?** A plain OCR engine is fast and cheap but doesn't reason about field *semantics* - it doesn't inherently know which number on the page is the check number versus the amount. A VLM re-reading a whole page cold is more expensive and, in practice, less reliable than one that gets to cross-reference a cheap Stage-1 OCR pass as grounding context. Splitting the work lets each stage do the part it's actually good at.

**Self-consistency voting.** In production, Stage 2 is sampled multiple times at temperature > 0. `ledgerlens.vlm.vote()` takes N independent extractions and returns, per field, the majority value plus a blended confidence score (agreement-across-samples averaged with the model's own reported confidence). This buys a cheap, honest reliability signal without needing a second, more expensive model to check the first one.

## The validator / reconciliation gate

`ledgerlens/validators.py` is the "determinism where it counts" core of this package. Every function in it is a pure, model-free function with a single arithmetic or calendar responsibility:

| Function | What it checks |
|---|---|
| `words_to_number()` | Parses a handwritten-style written amount ("One thousand two hundred eighty-four and 50/100") into a float - a real words-to-number parser, not a lookup table. |
| `reconcile_amount()` | Cross-checks the printed numeric amount against the parsed written amount. |
| `validate_routing_number()` | Real ABA/MICR routing-number checksum: the standard 3-7-1 weighted mod-10 check-digit rule used by every US bank routing number. |
| `check_date_sanity()` | Flexible date parsing plus plausibility bounds (catches things like a misread century, or an impossible future date). |
| `reconcile_statement_balance()` | Verifies `opening_balance + sum(transactions) == closing_balance` on a statement. |
| `validate_item()` | Runs the applicable checks against one extracted item and stamps `needs_review` / `review_reasons`. |

None of these call a model, make a network request, or depend on anything but arithmetic and the standard library - they are the part of the system that is allowed to be boring, because boring here means trustworthy.

## Human-in-the-loop

LedgerLens is built to *route* uncertainty to a human, not to hide it. Every exported row carries its per-field confidence and a `needs_review` flag with plain-English reasons attached (failed reconciliation, implausible date, low-confidence field). The exported spreadsheet visually highlights rows needing review. The goal is that a reviewer's attention goes exactly where the automation is least trustworthy - cursive payee names and memo lines - rather than a rubber stamp on every row, or worse, silent trust in a field the model was actually unsure about.

## Honest accuracy note

This is a real, load-bearing claim, not boilerplate: OCR/VLM accuracy on bank documents is **not uniform across fields**, and pretending otherwise is how automated pipelines quietly corrupt financial data.

- **Printed / machine-readable fields** (check number, printed dates, the courtesy numeric-amount box, statement summary lines): **95-99%** first-pass accuracy in practice.
- **Cursive / handwritten fields** (payee name, the legal amount-in-words line, free-text memo): roughly **45-70%** first-pass accuracy, heavily dependent on handwriting legibility.

Because of that gap, LedgerLens treats human review of handwritten fields as **mandatory, not optional** - the confidence scoring and validator gate exist specifically to make it obvious which fields need that review, rather than presenting a fully-automated result as more trustworthy than it actually is.
