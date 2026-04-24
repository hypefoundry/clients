import {
  EditorialPage,
  Masthead,
  ArticleHeader,
  Divider,
  ProseBlock,
  NumberedStep,
  PullQuote,
  DarkBreak,
  OfferCard,
  EndOfArticle,
  ArticleFooter,
  Highlight,
  NotThis,
} from '../EditorialShell.jsx'

export default function FoundersGuideToRebranding() {
  return (
    <EditorialPage>
      <Masthead category="Founder’s Guide" issue="No. 01 — Rebranding" date="21 Apr 2026" />

      <ArticleHeader
        eyebrow="The Founder’s Guide"
        headline="Is another rebrand actually the answer?"
        dek="Seven honest questions to ask yourself — before you hire the agency, sign the proposal, or change a single pixel."
        byline={[
          'By Brand Foundry Studio',
          '21 April 2026',
          '8 min read',
        ]}
      />

      <Divider />

      {/* Lede */}
      <ProseBlock size="lede" dropCap>
        <p>
          Most rebrands start with the wrong question. Founders ask, <em>“what should our brand look like?”</em> when the question that actually pays is, <em>“why has the brand stopped working?”</em> — and a shiny new identity almost never answers it.
        </p>
        <p>
          What follows is a practical guide for founders weighing a rebrand. Seven questions to ask before you commit another six figures to a logo, a type refresh, or a site that <Highlight>looks great and still doesn’t convert</Highlight>.
        </p>
      </ProseBlock>

      <Divider />

      <NumberedStep
        number="01"
        title="When to rebrand — and when to leave it alone."
        note="Rebranding isn’t a reflex. It’s a response."
      >
        <p>
          A rebrand is worth doing when there’s a real misalignment between who the business has become and how the market still perceives it. Not when the founder is bored of the logo. The honest indicators:
        </p>
        <ul>
          <li>Your positioning has outgrown the brand — you pitch differently now than the website does.</li>
          <li>The leads you attract don’t match the clients you want to serve.</li>
          <li>The brand no longer makes your team proud to represent the company.</li>
          <li>You’re about to raise, expand, or pivot — and the current brand can’t carry that weight.</li>
        </ul>
        <p>
          If none of those are true, rebranding won’t fix what’s broken. The problem is probably smaller, sharper, and closer to the surface than the whole brand.
        </p>
      </NumberedStep>

      <NumberedStep
        number="02"
        title="Choose the partner, not the portfolio."
        note="A case study tells you they can ship. It doesn’t tell you how they’ll behave when the work gets hard."
      >
        <p>
          Anyone can put together a beautiful case study. Fewer studios can tell you how they handled the meeting where the founder pushed back, the board weighed in, and the timeline slipped. That’s where most rebrands actually succeed or fail.
        </p>
        <ul>
          <li>Experience with your stage of company, not just your industry.</li>
          <li>A process they can explain plainly, without a deck.</li>
          <li>Candor in the first call. If they agree with everything you say, they’re selling.</li>
          <li>Cultural fit. You’ll spend three months inside their process — if meeting one feels strained, the work will too.</li>
        </ul>
        <p>
          Ask: <em>“What’s a project you walked away from, and why?”</em> The answer tells you how seriously they take alignment.
        </p>
      </NumberedStep>

      <PullQuote attribution="Brand Foundry Studio">
        If the brand isn’t the bottleneck, rebranding won’t move the number — it’ll just move the problem.
      </PullQuote>

      <NumberedStep
        number="03"
        title="Trust the process — but understand it."
        note="Rebranding isn’t linear production. It’s a structured investigation."
      >
        <p>
          There will be detours. Revisions. Moments where the thing you thought you wanted turns out to be the wrong answer. That isn’t failure — that’s how it’s supposed to work. A good rebrand surfaces things the business was quietly avoiding, and a founder’s job in the room is to stay <Highlight>curious, not defensive</Highlight>.
        </p>
        <p>
          The uncomfortable thing is almost always the thing worth chasing. Let the process do what it’s designed to do.
        </p>
      </NumberedStep>

      <NumberedStep
        number="04"
        title="Appoint one owner internally."
        note="Rebrand by committee is how rebrands die."
      >
        <p>
          Every stakeholder brings context. But only one person should hold the thread — someone senior enough to make calls, close enough to the work to feel it, and patient enough to translate between the studio and the rest of the company.
        </p>
        <p>
          If you’re the founder, this probably isn’t you. You’re too close. Pick someone who can protect the direction when you’re not in the room.
        </p>
      </NumberedStep>

      <OfferCard
        eyebrow="A word from the studio"
        title="Thinking about a rebrand? Start with a Brand Diagnosis."
        body="Before you commit to three months of studio work, spend thirty minutes finding out what’s actually broken. One call, one written breakdown, and an honest answer to the only question that matters first: what should you fix first?"
        cta="Apply for a Diagnosis"
        href="/diagnosis"
      />

      <NumberedStep
        number="05"
        title="Keep the decision team small."
        note="Three to four people. That’s the ceiling."
      >
        <p>
          More than four and every review turns into consensus-building instead of critique. The people in the room should understand the business deeply, not just the brand, and they should be able to disagree with each other in writing.
        </p>
        <p>
          No observers. No <NotThis note="veto-er incoming">“also add Sarah from marketing”</NotThis>. Observers become vetoers by the second round, and the work starts designing itself around their objections instead of the actual goal.
        </p>
      </NumberedStep>

      <NumberedStep
        number="06"
        title="Get specific about your why."
        note="“We need a refresh” is not a reason."
      >
        <p>
          A reason sounds like: <em>“we’re losing the enterprise deal in the final round because the site looks like a seed-stage company.”</em> Or: <em>“our pitch has changed twice this year and the brand can’t hold any of them.”</em>
        </p>
        <p>
          Write your why in a single sentence. If it can’t fit in a sentence, you haven’t found it yet. The clearer the why, the more decisive every subsequent decision becomes.
        </p>
      </NumberedStep>

      <DarkBreak eyebrow="Step 07 — the hard one">
        Most founders can’t look at their own brand without flinching. Until you can — you’re not rebranding. You’re re-wallpapering.
      </DarkBreak>

      <NumberedStep
        number="07"
        title="Be radically honest — especially about what isn’t working."
        note="This is the step most founders skip. It’s the one that decides the outcome."
      >
        <p>
          Name the specific things that aren’t working. The tagline that doesn’t land. The colors that feel dated. The voice that shifts depending on who wrote the page. The section of the site you quietly hope nobody clicks.
        </p>
        <p>
          Write the list. Share it with the studio on day one. Resist the temptation to defend anything on it. <Highlight>Honest audits produce honest brands.</Highlight> The opposite produces a cosmetic exercise with a new colour palette and the same underlying problem.
        </p>
      </NumberedStep>

      <Divider />

      <ProseBlock>
        <p>
          Rebranding isn’t the end of the journey. Done well, it’s a re-alignment — a sharper position, a clearer voice, a brand that doesn’t drift when you’re not watching it.
        </p>
        <p>
          Done poorly, it’s an expensive cosmetic pass that buys you six months of compliments from other designers, and nothing from the market.
        </p>
        <p>
          The difference, almost always, is diagnosis.
        </p>
      </ProseBlock>

      <EndOfArticle
        kicker="Before you spend another dollar"
        headline="Bring us what isn’t working. We’ll tell you what to fix first."
        body="The Brand Diagnosis is a focused, one-session review of your brand, messaging, and website — by a designer with 15+ years inside the problem. No retainers. No bloated proposals. Just the answer."
        cta="Apply for a Diagnosis"
        href="/diagnosis"
      />

      <ArticleFooter
        nextReads={[
          { title: 'The founder’s guide to messaging', href: '#' },
          { title: 'The founder’s guide to pricing your offer', href: '#' },
        ]}
      />
    </EditorialPage>
  )
}
