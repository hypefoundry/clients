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

export default function TheStrategyGap() {
  return (
    <EditorialPage>
      <Masthead category="Founder’s Guide" issue="No. 02 — Strategy" date="23 Apr 2026" />

      <ArticleHeader
        eyebrow="The Founder’s Guide"
        headline="Why your third rebrand still isn’t working."
        dek="The DIY → freelancer → agency cycle that costs founders $60k and a year — and still doesn’t move the number."
        byline={[
          'By Brand Foundry Studio',
          '23 April 2026',
          '9 min read',
        ]}
      />

      <Divider />

      {/* Lede */}
      <ProseBlock size="lede" dropCap>
        <p>
          The pattern is almost always the same. A founder builds the first site in Canva. It doesn’t convert, so they hire a freelancer for a few thousand. The freelancer ships something cleaner — but the leads are still wrong. They redo it themselves. Eventually they hire a proper agency for thirty, sixty, a hundred grand. The site looks incredible. The business still feels stuck.
        </p>
        <p>
          Every founder I meet thinks the problem was the <NotThis>designer</NotThis>. It almost never is. The thing that failed — every round, at every price point — is the <Highlight>strategy gap underneath the design</Highlight>.
        </p>
      </ProseBlock>

      <Divider />

      <NumberedStep
        number="01"
        title="The loop you didn’t realise you were in."
        note="It isn’t a design problem. It’s a compounding one."
      >
        <p>
          The cycle has four stops, and most founders do at least three of them before the penny drops:
        </p>
        <ul>
          <li><strong>DIY.</strong> Canva, Wix, a Figma template off Twitter. Two weekends. Looks okay. Converts at 0.4%.</li>
          <li><strong>Freelancer.</strong> $3–8k. Cleaner typography. Same offer, same positioning, same silence from the market.</li>
          <li><strong>Back to DIY.</strong> You open the file yourself, change the hero three times, ship, revert, ship again.</li>
          <li><strong>The agency.</strong> $30–100k. A nine-week process. A beautiful site. A tagline nobody repeats back to you.</li>
        </ul>
        <p>
          The total bill by the end is often north of $60k and a full year of calendar time. And the business — the actual commercial engine — is no further forward than it was in round one.
        </p>
      </NumberedStep>

      <NumberedStep
        number="02"
        title="Why every round fails the same way."
        note="A designer can only be as good as the brief."
      >
        <p>
          Every designer you hired — the freelancer, the agency, you — was asked to make the brand <em>look better</em>. Nobody was given a position to design <em>from</em>. So they made beautiful versions of an unclear idea. Four times.
        </p>
        <p>
          Design is the amplifier, not the signal. If the underlying strategy is blurry, design amplifies the blur — just at progressively higher resolution.
        </p>
      </NumberedStep>

      <PullQuote attribution="Brand Foundry Studio">
        If the designer doesn’t know what you actually do, how you’re different, and who you’re for — they’re guessing. Beautifully, but guessing.
      </PullQuote>

      <NumberedStep
        number="03"
        title="How to tell it’s a strategy gap, not a design gap."
        note="Five signals. If three are true, stop hiring designers."
      >
        <p>
          Most founders can’t tell the difference between the two because the symptoms look identical from the outside. The site isn’t working, so it must be the site. Look closer:
        </p>
        <ul>
          <li>You pitch the company differently in a sales meeting than the site does.</li>
          <li>“What do you do?” still takes you two sentences — and you change the second one depending who’s asking.</li>
          <li>The leads you attract aren’t the clients you want to serve.</li>
          <li>Every agency pitch you’ve taken has named a <em>different</em> position for you, and all of them sounded plausible.</li>
          <li>You’ve revised the tagline three times and the commercial problem hasn’t moved.</li>
        </ul>
        <p>
          Three or more, and no designer on earth is going to fix this for you. The brief is the problem. Not the execution.
        </p>
      </NumberedStep>

      <NumberedStep
        number="04"
        title="What strategy actually is — and what founders mistake it for."
        note="It isn’t a 60-page deck. It’s three answers you can defend."
      >
        <p>
          The word <em>strategy</em> has been ruined by consultancies selling it as a deliverable. Founders see the word, picture a 60-slide deck, and quietly assume they can’t afford it — or don’t need it yet.
        </p>
        <p>
          The strategic work that actually moves the business is smaller than that, and much harder:
        </p>
        <ul>
          <li><strong>Who you serve</strong> — specifically enough that you’d turn the wrong client away.</li>
          <li><strong>What you do for them</strong> — in language the client would use, not the language of your industry.</li>
          <li><strong>How you’re different</strong> — a real difference, not a softer way of saying “we care more.”</li>
        </ul>
        <p>
          Three answers. Clear enough to brief a designer, write a cold email, or close a room. If you can’t give them in a sentence each, no amount of craft on top will save you.
        </p>
      </NumberedStep>

      <OfferCard
        eyebrow="A word from the studio"
        title="Before you hire another agency — get a Brand Diagnosis."
        body="Thirty minutes with a senior designer. One written breakdown. One honest answer to the only question that matters first: is this a design problem, or a strategy gap? If it’s strategy, we’ll tell you — and save you the $60k round."
        cta="Apply for a Diagnosis"
        href="/diagnosis"
      />

      <NumberedStep
        number="05"
        title="The minimum viable strategy."
        note="If you skip this, you’ll fund round five of the same cycle."
      >
        <p>
          You don’t need a quarter-long brand workshop. You need three defended answers and the discipline to hold them. That’s the minimum a designer can actually work with — and the minimum the market needs from you to decide whether you’re the right choice.
        </p>
        <p>
          Write each one as a single sentence. No adjectives. No category words. No <NotThis>solutions</NotThis>. If the sentence could belong to a competitor — rewrite it until it couldn’t.
        </p>
      </NumberedStep>

      <NumberedStep
        number="06"
        title="The one-sentence test."
        note="The cheapest diagnostic in the business."
      >
        <p>
          Write this sentence from memory, right now, without editing: <em>“We help [who] do [what], differently because [why].”</em>
        </p>
        <p>
          Read it back. Ask yourself three questions:
        </p>
        <ul>
          <li>Could a competitor sign their name to it? If yes, your difference isn’t real yet.</li>
          <li>Would the person it describes recognise themselves? If not, your audience is still too broad.</li>
          <li>Would a stranger understand what you do from this sentence alone? If not, you haven’t found the plainest version of the thing.</li>
        </ul>
        <p>
          One hour on this sentence is worth more than nine weeks on a logo. It’s the brief every future designer will use, whether they admit it or not.
        </p>
      </NumberedStep>

      <DarkBreak eyebrow="The hard truth">
        Most founders don’t have a design problem. They have a strategy problem they keep paying designers to solve.
      </DarkBreak>

      <NumberedStep
        number="07"
        title="Before you hire anyone, do the thirty-minute audit."
        note="Three questions. Answer honestly. This step is the whole game."
      >
        <p>
          Block thirty uninterrupted minutes. Close the laptop. Write the answers by hand — typing lets you hide behind fluency.
        </p>
        <ul>
          <li><strong>What is the specific commercial problem?</strong> (“Leads come in but don’t close.” “Our enterprise deals stall in the final round.” “We compete on price because nothing else is landing.”)</li>
          <li><strong>What have we already tried — and what, specifically, didn’t work?</strong> Name the rebrand. The freelancer. The tagline. The homepage rewrite. Be honest about what each one failed to change.</li>
          <li><strong>If the brand is the answer, what would have to be true?</strong> This is the hardest one. Most founders, writing it out, realise the brand isn’t the constraint. The offer is. Or the market is. Or the founder’s own clarity is.</li>
        </ul>
        <p>
          If you can’t answer any of these, <Highlight>do not spend another dollar on design</Highlight>. You are not yet in a position to brief anyone — and you will simply fund another round of the same cycle.
        </p>
      </NumberedStep>

      <Divider />

      <ProseBlock>
        <p>
          Design without strategy is expensive decoration. Strategy without design is a document nobody reads. Founders need both — in that order — and the reason the DIY-to-agency cycle hurts so much is that it keeps reaching for the second half of the equation while the first half is still missing.
        </p>
        <p>
          The cheapest, fastest way out of the loop is to stop hiring for the symptom. Stop briefing colour palettes. Stop A/B testing headlines. Get honest about the gap, close it in a single sentence, and only then ask a designer to make it visible.
        </p>
        <p>
          That’s the order. That’s the whole piece.
        </p>
      </ProseBlock>

      <EndOfArticle
        kicker="Before you fund round four"
        headline="Find out whether it’s the brand — or the gap underneath it."
        body="The Brand Diagnosis is a focused, one-session review of your positioning, messaging, and site — by a designer with 15+ years inside the problem. Thirty minutes. One written breakdown. An honest answer on whether design is actually the thing to fix next."
        cta="Apply for a Diagnosis"
        href="/diagnosis"
      />

      <ArticleFooter
        nextReads={[
          { title: 'The founder’s guide to rebranding', href: '/read/founders-guide-to-rebranding' },
          { title: 'The founder’s guide to messaging', href: '#' },
        ]}
      />
    </EditorialPage>
  )
}
