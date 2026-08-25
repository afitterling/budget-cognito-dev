# Time Warp Portfolio

A concept note. Status: proposal, nothing built yet.

## The idea in one paragraph

You upload a **snapshot** — the positions you hold, as of a specific date. From that
single object we can move you along the time axis: replay the same book backwards
through real market history ("what if I'd held exactly this since 2019?"), project it
forwards, or drop it into a historical regime (March 2020, the 2022 rate shock, SVB) and
watch it survive or not. The snapshot is the noun; the *warp* is the verb.

The reason this is worth building is that it needs no broker connection, no PSD2, no
open-banking contract. A screenshot and thirty seconds of a user's attention is the
entire onboarding.

## Getting positions in

Two producers, one normalized record. That's the architectural point — screenshot
recognition is not a special case, it's just another way to emit a position row.

**Screenshot recognition.** The user photographs or screenshots their broker app —
Trade Republic, Scalable, IBKR, Revolut, DKB. A vision model returns raw table rows.
Then the normalizer does the actual work:

- *Number format is genuinely ambiguous.* `1.234,56` is de-DE, `1,234.56` is en-US, and
  bare `1.234` could be either. Don't guess from locale alone — use arithmetic as the
  solver: quantity × price should reconcile to market value, and only one parse makes it
  reconcile. That check is a disambiguator, not just a validator.
- *Instrument resolution is the harder half.* Screenshots show display names ("iShares
  Core MSCI World"), not ISINs. The same fund has many listings in different currencies
  — IE00B4L5Y983 is EUNL on XETRA in EUR and SWDA on the LSE in USD. Pick the wrong
  listing and every FX number downstream is wrong. Ambiguity goes to the user, not to a
  coin flip.
- *The review screen is the product.* Every extracted row carries a confidence. High
  confidence rows are pre-accepted, low ones are pre-filled but need a tap. This is what
  makes OCR trustworthy rather than merely impressive.
- *Don't keep the image.* A broker screenshot contains account numbers, a real name, and
  total net worth. Extract, then delete; keep a hash for dedupe if we need one.

**Manual entry.** Symbol autocomplete, quantity, optional cost basis and trade date.
Plus "paste a table" from a broker web page, which is the same normalizer minus the
vision step.

## Multi-currency, done properly

Most implementations collapse this too early. There are four distinct currencies per
position, and conflating any two produces phantom P&L:

| Layer | Example |
| --- | --- |
| Instrument currency | AAPL trades in USD |
| Listing / quote currency | SWDA quotes USD on LSE, EUNL quotes EUR on XETRA |
| Account currency | what the broker books it in |
| Display currency | what the user asked to see |

Rules that follow from that:

- Store in instrument currency at native precision. Convert at the read/analytics layer,
  never at write time — FX rates get revised, and a stored converted number is a lie you
  can no longer correct.
- One FX source, one fixing time, stated explicitly (ECB 16:00 CET reference rates are a
  defensible default for a EUR-first audience). Mixing intraday spot with daily fixings
  invents returns that never happened.
- Equity and FX calendars differ per venue. Forward-fill across holidays with an explicit
  stale flag; never interpolate.

And then the payoff: **split the attribution.** Total return = local return + FX return +
interaction. "Your MSCI World was up 18% in USD but 11% in EUR" is the single most
underserved insight for a European retail investor, and it falls straight out of the
warp engine for free. For a EUR/USD audience this is the differentiating feature, not a
footnote.

## What breaks a naive backtest

A 2019 snapshot replayed to today against raw close prices is simply wrong. We need:

- **Corporate actions** — splits, reverse splits, spin-offs, mergers, ticker changes,
  ETF share-class changes. Adjusted series, with versioned adjustment factors so a cached
  history can be invalidated when a factor lands.
- **Total return vs price return** as an explicit toggle. Dividends reinvested or not
  changes a decade-long comparison by double digits.
- **Delistings.** If a holding went to zero or was acquired at $4.10, the honest answer is
  that number, not "no data for this symbol."

## Where the AI actually earns its keep

Being specific here, because "AI visualizes it" can mean anything:

1. **Extraction** — vision OCR to structured positions, as above.
2. **Narration, over a computed fact table.** Hard rule: the model never does arithmetic.
   A deterministic engine produces the numbers; the model writes "the March 2020 drawdown
   was −34%, of which about 6pp was EUR/USD moving against you." Let an LLM compute
   returns in a finance product and you will ship confidently wrong numbers.
3. **Question → warp parameters.** "What if I'd bought this in 2019 instead?" becomes
   `{anchor: 2019-01-02, book: snapshot_7, display: EUR, basis: TR}` — constrained tool
   calling over a fixed set of warp operations, not free-form code. Auditable, cacheable,
   testable.
4. **Suggesting which counterfactuals are interesting.** Given a book concentrated in
   three tech names, offer: versus equal-weight, versus MSCI World, versus your own worst
   and best possible entry timing. This is the "what's best to check out" part.

## What it looks like

- **A scrubber you drag**, with the whole book re-valuing live. Time warp has to be felt,
  not read off a table.
- **Ghost lines** — actual and counterfactual on the same axes, the counterfactual
  desaturated.
- **A contribution waterfall** — which positions actually made and lost the money over the
  warped window.
- **An FX ribbon** — the same series in local and display currency, the shaded gap between
  them being the FX effect.
- **Regime chips** — tap COVID, 2022, SVB, and the window snaps to it.

## What I'd be careful about

**Positioning versus advice.** "How would this have performed" is retrospective analysis
and is fine. "What's best to check out" is the phrase that drifts toward a personal
recommendation on a specific instrument, which under MiFID II is regulated investment
advice. The fix is also the better product: rank *counterfactuals of the user's own book*,
never instruments for the user to buy.

**Hindsight is a drug.** "You'd have 4× by going all-in on one name" is fun and corrosive,
and every "what if you'd bought Bitcoin" toy already does it. Pair every counterfactual
with its risk twin — max drawdown, volatility, and the many similar bets that didn't work.
The honest version is the defensible one.

**Data licensing is the real cost.** Deep EOD history plus corporate actions plus FX,
redistributed to consumers, needs a licensed vendor. Free tiers won't survive production
or their own terms of service. This should be priced before anything else is committed to.

**Holdings are sensitive personal data** under GDPR. Encrypted at rest, keyed by the
Cognito `sub` this repo already issues, with working export and delete.

## How it fits this stack

The pattern in this repo's README carries over directly — HTTP API with a JWT authorizer
against the existing user pool, identity kept separate from the consumer app:

- `POST /api/v1/snapshots` for normalized positions; `POST /api/v1/snapshots/ingest`
  returns a presigned S3 URL for a screenshot.
- Extraction runs async (queue + Lambda) — vision calls take seconds, so don't hold the
  request open. The client polls a draft snapshot.
- Screenshots land in S3 with SSE and a short lifecycle expiry.
- Snapshots in DynamoDB, immutable: `PK=USER#<sub>`, `SK=SNAP#<ts>#<id>`, drafts alongside.
- Prices and FX in their own table, `INSTRUMENT#<id>` / `FX#<pair>` with date-range items.
  Cache hard — history doesn't change, except when a corporate action says it does.
- Warp compute is a pure function, cacheable by (snapshot hash, anchor, currency, options).

## Build order

- **v0 — prove the feel.** Manual entry, single currency, one warp (rebase to a date), one
  chart. The only question being answered is whether the scrubber feels good.
- **v1 — the real thing.** Screenshot ingestion with the review screen, EUR/USD with the
  attribution split, dividends and splits, regime chips.
- **v2 — the AI layer.** Natural language to warp parameters, suggested counterfactuals,
  diffing two snapshots.
- **v3 — the part that compounds.** If users upload snapshots repeatedly, we end up holding
  a longitudinal record of their actual book with no broker integration at all. Time warp
  is the hook; the accumulated snapshot history is the asset that's hard to copy.

## Open questions for you

1. EU-first (EUR display, XETRA/LSE listings) or US-first? It changes the instrument
   resolution work and the FX default more than anything else here.
2. Which three brokers do we tune screenshot recognition against first?
3. Is there a market data vendor already, or is that a decision this would force?
4. Does this live inside the existing budget app, or stand alone with its own onboarding?
