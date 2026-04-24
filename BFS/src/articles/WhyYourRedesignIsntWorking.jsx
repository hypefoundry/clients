import { Link } from 'react-router-dom'

const SANS = '"Hanken Grotesk", "Inter", system-ui, sans-serif'
const SERIF = '"Bespoke Serif", "Source Serif 4", Georgia, serif'

const STYLES = `
  .ed-post {
    --ed-base: 4.2666666667vw;
    --ed-pad: calc(var(--ed-base) * 1.25);
    --ed-bg: #fcf8ec;
    --ed-ink: #1e1e1e;
    --ed-pink: #fbc1d4;
    --ed-yellow: #fed35b;
    background: var(--ed-bg);
    color: var(--ed-ink);
    font-family: ${SANS};
    font-weight: 400;
    min-height: 100vh;
    overflow-x: hidden;
  }
  @media (min-width: 600px) {
    .ed-post {
      --ed-base: 1.5625vw;
      --ed-pad: calc(var(--ed-base) * 2.5);
    }
  }
  @media (min-width: 1025px) {
    .ed-post {
      --ed-base: min(0.8333333333vw, calc(0.8333333333vh * 2.3));
      --ed-pad: calc(var(--ed-base) * 2);
    }
  }

  .ed-navbar {
    background: var(--ed-pink);
    padding: calc(var(--ed-base) * 1.25) var(--ed-pad);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .ed-navbar a { color: inherit; text-decoration: none; }
  .ed-navbar__brand {
    font-family: ${SERIF};
    font-size: calc(var(--ed-base) * 1.25);
    font-weight: 500;
    letter-spacing: -0.01em;
  }
  .ed-navbar__link {
    font-family: ${SANS};
    font-size: calc(var(--ed-base) * 0.875);
    font-weight: 600;
    letter-spacing: 0.045em;
    text-transform: uppercase;
  }

  .ed-main {
    display: flex;
    flex-direction: column;
    gap: calc(var(--ed-base) * 3);
    padding-bottom: calc(var(--ed-base) * 8);
  }
  @media (min-width: 1025px) {
    .ed-main { gap: calc(var(--ed-base) * 6.25); }
  }

  .ed-hero {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--ed-base) * 1);
    justify-content: flex-start;
    max-width: calc(var(--ed-base) * 86.125);
    margin: 0 auto;
    padding-bottom: calc(var(--ed-base) * 0.875);
    padding-left: var(--ed-pad);
    padding-right: var(--ed-pad);
    padding-top: calc((var(--ed-base) * 9.0625) - var(--ed-pad));
    text-align: center;
    width: 100%;
  }
  @media (min-width: 600px) {
    .ed-hero {
      gap: calc(var(--ed-base) * 2.8125);
      padding-bottom: calc(var(--ed-base) * 3.4375);
      padding-top: calc((var(--ed-base) * 10.75) - var(--ed-pad));
    }
  }
  @media (min-width: 1025px) {
    .ed-hero {
      padding-top: calc((var(--ed-base) * 12.125) - var(--ed-pad));
    }
  }

  .ed-hero__categories {
    display: flex;
    font-family: ${SANS};
    font-size: calc(var(--ed-base) * 0.625);
    font-weight: 600;
    gap: calc(var(--ed-base) * 0.5);
    letter-spacing: 0.04em;
    line-height: 1;
    text-transform: uppercase;
    align-items: center;
  }
  @media (min-width: 600px) {
    .ed-hero__categories { font-size: calc(var(--ed-base) * 0.75); }
  }
  @media (min-width: 1025px) {
    .ed-hero__categories {
      font-size: calc(var(--ed-base) * 0.875);
      letter-spacing: 0.045em;
    }
  }
  .ed-hero__categories span:not(:first-child)::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 0.9em;
    background: var(--ed-ink);
    margin-right: calc(var(--ed-base) * 0.5);
    vertical-align: middle;
    opacity: 0.4;
  }

  .ed-hero__title {
    font-family: ${SERIF};
    font-size: calc(var(--ed-base) * 2.5);
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 1;
    margin: 0;
    text-align: center;
    text-wrap: balance;
  }
  @media (min-width: 600px) {
    .ed-hero__title { margin-top: calc(var(--ed-base) * 1.875); }
  }
  @media (min-width: 1025px) {
    .ed-hero__title {
      font-size: calc(var(--ed-base) * 6);
      letter-spacing: -0.01em;
    }
  }

  .ed-hero__subtitle {
    font-family: ${SERIF};
    font-style: italic;
    font-size: calc(var(--ed-base) * 1.125);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.4;
    text-align: center;
    margin: 0;
    max-width: 30ch;
    text-wrap: balance;
  }
  @media (min-width: 600px) {
    .ed-hero__subtitle { font-size: calc(var(--ed-base) * 1.75); }
  }
  @media (min-width: 1025px) {
    .ed-hero__subtitle {
      font-size: calc(var(--ed-base) * 3);
      line-height: 1.2;
      letter-spacing: -0.01em;
    }
  }

  .ed-hero__author {
    align-items: center;
    display: flex;
    gap: calc(var(--ed-base) * 1.5625);
    margin-top: calc(var(--ed-base) * 1);
  }
  @media (min-width: 1025px) {
    .ed-hero__author { margin-top: calc(var(--ed-base) * 1.875); }
  }
  .ed-hero__author-fig {
    background: var(--ed-pink);
    border-radius: 50%;
    height: calc(var(--ed-base) * 3.8125);
    width: calc(var(--ed-base) * 3.8125);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${SERIF};
    font-size: calc(var(--ed-base) * 1.4);
    font-weight: 500;
    color: var(--ed-ink);
  }
  .ed-hero__author-meta {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    font-family: ${SANS};
    font-size: calc(var(--ed-base) * 0.875);
    font-weight: 600;
    gap: calc(var(--ed-base) * 0.3125);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-align: left;
  }
  .ed-hero__author-meta .role { opacity: 0.55; }

  .ed-content {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: calc(var(--ed-base) * 3);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--ed-pad);
    padding-right: var(--ed-pad);
    width: 100%;
  }
  @media (min-width: 1025px) {
    .ed-content {
      gap: calc(var(--ed-base) * 5);
      max-width: calc(var(--ed-base) * 57.375);
    }
  }

  .ed-content section {
    display: flex;
    flex-direction: column;
    gap: calc(var(--ed-base) * 1.5);
    width: 100%;
  }
  @media (min-width: 1025px) {
    .ed-content section { gap: calc(var(--ed-base) * 2); }
  }

  .ed-eyebrow {
    font-family: ${SANS};
    font-size: calc(var(--ed-base) * 0.75);
    font-weight: 600;
    letter-spacing: 0.18em;
    line-height: 1;
    text-transform: uppercase;
    color: var(--ed-ink);
    opacity: 0.55;
    margin: 0;
  }
  @media (min-width: 1025px) {
    .ed-eyebrow {
      font-size: calc(var(--ed-base) * 0.875);
      letter-spacing: 0.2em;
    }
  }

  .ed-content h2 {
    font-family: ${SERIF};
    font-size: calc(var(--ed-base) * 2);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.2;
    margin: 0;
    text-wrap: balance;
    width: 100%;
  }
  @media (min-width: 1025px) {
    .ed-content h2 {
      font-size: calc(var(--ed-base) * 3);
      letter-spacing: -0.05em;
    }
  }

  .ed-content h3 {
    font-family: ${SERIF};
    font-size: calc(var(--ed-base) * 1.5);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0;
    width: 100%;
  }
  @media (min-width: 1025px) {
    .ed-content h3 { font-size: calc(var(--ed-base) * 2); }
  }

  .ed-content p {
    font-family: ${SANS};
    font-size: calc(var(--ed-base) * 1.25);
    font-weight: 400;
    letter-spacing: -0.0125em;
    line-height: 1.3;
    margin: 0;
    width: 100%;
  }
  @media (min-width: 1025px) {
    .ed-content p {
      font-size: calc(var(--ed-base) * 1.5);
      letter-spacing: -0.01em;
    }
  }

  .ed-content a {
    text-decoration: underline;
    text-underline-offset: 0.15em;
    color: inherit;
  }

  .ed-footer {
    border-top: 1px solid rgba(30,30,30,0.12);
    padding: calc(var(--ed-base) * 2) var(--ed-pad);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: calc(var(--ed-base) * 1);
    font-family: ${SANS};
    font-size: calc(var(--ed-base) * 0.875);
  }
  .ed-footer a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`

export default function WhyYourRedesignIsntWorking() {
  return (
    <div className="ed-post" data-template="post">
      <style>{STYLES}</style>

      <nav className="ed-navbar">
        <Link to="/" className="ed-navbar__brand">Brand Foundry Studio</Link>
        <Link to="/apply" className="ed-navbar__link">Book the Audit</Link>
      </nav>

      <main className="ed-main">
        <header className="ed-hero">
          <div className="ed-hero__categories">
            <span>Strategy</span>
            <span>Rebranding</span>
          </div>

          <h1 className="ed-hero__title">Why your redesign isn't working</h1>

          <p className="ed-hero__subtitle">
            Most founders don't have a design problem. They have a clarity problem they keep paying designers to solve.
          </p>

          <div className="ed-hero__author">
            <div className="ed-hero__author-fig">CS</div>
            <div className="ed-hero__author-meta">
              <span>Clark Spendelow</span>
              <span className="role">Founder, BFS</span>
            </div>
          </div>
        </header>

        <article className="ed-content">
          <section>
            <p className="ed-eyebrow">The pattern (recognition)</p>
            <h2>The pattern is almost always the same.</h2>
            <p>You build the first version yourself. It doesn't convert.</p>
            <p>You hire a freelancer. It looks better, but the leads are still wrong.</p>
            <p>You tweak the messaging. You rewrite the homepage. You change the offer.</p>
            <p>Still nothing moves.</p>
            <p>Eventually, you consider a full redesign.</p>
            <p>Different versions. Different price points. Same result.</p>
          </section>

          <section>
            <h2>Before you redesign anything, find out if you actually should.</h2>
            <p>From the outside, it looks obvious.</p>
            <p>The site isn't converting. The messaging feels off. The leads aren't right.</p>
            <p>So you assume it's a design problem.</p>
            <p>So you redesign it.</p>
          </section>
        </article>
      </main>

      <footer className="ed-footer">
        <span>© {new Date().getFullYear()} Brand Foundry Studio</span>
        <Link to="/apply">Book the Audit →</Link>
      </footer>
    </div>
  )
}
