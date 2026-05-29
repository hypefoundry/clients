# Wireframe Rules · Active Property Investing

This document codifies the conventions established during home.html. Every new wireframe in this folder should follow these rules so the prototype stays consistent.

---

## 1. Source-of-truth hierarchy

When deciding what content goes where, refer to these in order:

1. **The locked v2 deck** (`.context/deck/api-positioning-deck-v2.html`). The version Emma has approved. The strategic anchor.
2. **The Thursday transcript** (`.context/attachments/0worz6/60 Minute Session Emma Allen x Hype Foundry_otter_ai_transcript.txt`). Verification source. If the deck and an older strategy doc disagree, what Emma actually said in the session wins.
3. **The v2 strategy docs** (`01-positioning.md`, `03-audience-readiness.md`, `04-conversion-architecture.md`, etc.). Supporting context. Older docs may have drifted, so always cross-check against the deck and transcript.

Two hard rules locked from prior conversation:
- **Trueline + internal compass (deck slide 04) are STRICT INTERNAL ONLY.** All public copy on wireframes draws from the positioning statement (deck slide 06) only.
- **Readiness scale stays public but is no longer called "the readiness scale" externally.** Public name is *"Active or Aspiring?"* per Emma's Thursday framing.

---

## 2. The labels-vs-descriptions distinction

This is the most important rule for wireframes in this folder.

### Labels (eyebrow tags, section headers): keep strategy/wireframing terminology

These are short navigation tags. The client has been educated on strategy deck terms, so don't dumb them down.

✅ Keep terms like:
- `Door 1 · ICP LP`
- `Door 4 · Pre-ICP`
- `Card 2 · Education`
- `Step 1`
- `Editorial pull-quote`
- `02 · WHAT MAKES API DIFFERENT` (annotation section header)
- `06 · PATHWAY ROUTING`
- `H1`, `H2`, `H3`, `Eyebrow`, `Sub`, `Primary CTA`, `Secondary CTA`, `Body`

### Descriptions (placeholder text inside boxes): plain human language

These describe what content will fill the slot. They should read like you're talking to a smart non-technical client.

❌ Avoid:
- "Names the audience + the outcome. Sourced from the positioning statement."
- "Outcome-led one-liner pulled from the journey content."
- "Lift line from positioning statement · founder-attributed."

✅ Use:
- "The main heading. Says who we're for and what they get from working with us."
- "A short headline summarising what this client achieved."
- "A short, memorable line about how we work, pulled from our positioning."

**Rule of thumb:** if it *labels* the slot, keep terminology. If it *describes the content* that fills the slot, plain language.

---

## 3. Annotations are behavioural notes, not strategy rationale

External annotations (the columns either side of the wireframe) carry **short, plain-language notes** about what the section does on the page: cross-block relationships, sticky behaviour, on-page CTA surfacing count, spine cross-links. **NOT** strategy explanation (the deck does that).

✅ Good:
- "The first thing visitors see. Has the main 'go to the assessment' button. The button also follows the visitor as they scroll."
- "Second time on the page that we surface the assessment link."
- "Verifiable facts only. Female-founded sits here, not the hero."

❌ Bad (too much strategy):
- "Per 22-Laws review: Emma carries the brand identity weight (company name is generic). Introduce her at homepage scroll-depth so visitors meet her at least once even if they skip the Founder page."

One short paragraph per section is enough. Two if the section has a real behavioural quirk worth flagging.

---

## 4. Wireframes describe structure, not draft copy

Week 2 = structure + messaging hierarchy. **Copy lives in Week 4** (Marcus pass).

Wireframes should never contain placeholder copy that *looks like* finalised copy. If a box would otherwise show *"For busy professionals building wealth through property"*, show *"The main heading. Says who we're for and what they get from working with us"* instead. This protects against Emma reading wireframe placeholders as a copy commitment.

Headings retain their visual styling (`.h1`, `.h2`, `.h3`) so the hierarchy reads at a glance. Only the words change to functional descriptors.

---

## 5. CTA conventions

- **Primary CTA** (filled dark button): the main conversion action for the page. Usually routes to the assessment (`readiness-scale.html`) or `get-started.html`.
- **Secondary CTA** (outlined button): lower-friction route. Methodology, founder, podcast, eBook downloads.
- **Icon-only CTA** (use `cta-icon` class with an inline SVG): for download buttons where the icon carries the meaning.
- CTA labels show just the destination or action (e.g. *"Get Started"*, *"Watch a client story"*). The button style (filled vs outlined) communicates primary vs secondary — no need to prefix with *"Primary CTA · "* or *"Secondary CTA · "*.
- Use real `<a href="...">` tags on CTAs so the prototype is clickable.

---

## 6. Image and video conventions

- **`.img`**: diagonal-stripe placeholder. Text inside describes what kind of image goes there (e.g. *"Founder portrait · headshot or environmental"*).
- **`.video`**: diagonal-stripe placeholder with a dark circular play-button overlay. Caption beneath the frame (`.vid-caption`) describes the video.
- Don't use `.img` for videos. Don't use `.video` for static photos.

---

## 7. File and link conventions

- All wireframe files live in `.context/wireframes/`.
- Filenames match the URL slug: `for-investors.html`, `client-journeys.html`, etc.
- Every wireframe links to `_styles.css`. Never inline styles for new wireframes.
- Every wireframe has a `← All wireframes` link in the page-title bar that goes to `index.html`.
- Nav + footer links point at real wireframe files (even if those files don't exist yet, they'll 404 until built). This makes the prototype feel real.
- The `index.html` page is updated as wireframes get completed. Change the status from `To do` to `In progress` to `Done`.

---

## 8. Starting a new wireframe

1. Copy `_template.html` to `[page-slug].html`
2. Update the `<title>` tag and the `Wireframe · [PAGE NAME]` eyebrow
3. Build the sections according to the JTBD and section list in `.context/strategy/04-conversion-architecture.md` for that page (verify against the deck site map in slide 19)
4. Use the labels-vs-descriptions rule throughout
5. Update `index.html` to mark the page as `In progress` then `Done`

---

## 9. When to call Marcus

Don't run Marcus during wireframe construction (Week 2). Marcus is the copy pass. Schedule for Week 4 once all wireframes have client sign-off on structure.

Exception: if you're choosing between two structural options (e.g. *"do we have one differentiator card or three?"*) and you need Marcus's Schwartz/Wiebe/Ogilvy lens to pick, that's fair use mid-wireframe.

---

## 10. No em dashes

Don't use em dashes (—) in body text, descriptions, annotations, or proposed copy. They are an overused stylistic crutch that often signals AI-generated text.

Default punctuation alternatives:
- **Comma** for soft asides
- **Period** for clean sentence breaks
- **Colon** for lead-ins
- **Parentheses** for tangential context
- **Middle dot ·** for label separators in wireframe terminology (e.g. *Door 1 · ICP LP*)

Use em dashes only when absolutely necessary (e.g. typographic attribution lines on pull-quotes like *"— Emma Allen"*, or verbatim quotes that contained one).

Hyphens (-) for compound modifiers (*"done-with-you"*, *"5-minute"*) are fine. They are not em dashes.

---

## 11. Memory rules in effect

These auto-memory rules apply across the project. Relevant entries live in `/Users/astro/.claude/projects/-Users-astro-conductor-repos-api/memory/MEMORY.md`:

- **`feedback_never_assume`**: never invent numbers, %, timeframes, or service-level claims. If not traceable to source, remove or tag as estimate.
- **`feedback_api_trueline_internal_only`**: trueline + internal compass = internal only. Public copy from positioning statement only.
- **`feedback_wireframe_plain_language`**: labels keep strategy terms, descriptions use plain language.
- **`feedback_no_em_dashes`**: avoid em dashes in text.

When in doubt, check those.
