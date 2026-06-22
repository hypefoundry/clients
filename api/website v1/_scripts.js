/* API · Visual Direction 2 · interaction scripts */

/* ============================================================
   <page-hero> custom element
   Drop-in internal page hero. Wraps children in the standard
   hero-internal-bg / section-inner / hero-internal-content
   structure, injects the eyebrow tag from attributes, and
   auto-adds the chevron SVG to any .cta-primary that does not
   already have one.

   Usage:
     <page-hero eyebrow="About" eyebrow-secondary="The company behind the work">
       <h1 class="h1">Twelve years of <span class="accent">building wealth through property</span>.</h1>
       <p class="sub">Female-founded, Sydney-based...</p>
       <div class="ctas">
         <a href="get-started.html" class="cta cta-primary">See what fits</a>
         <a href="founder.html" class="cta cta-secondary">Read Emma's story</a>
       </div>
     </page-hero>
   ============================================================ */
(function () {
  if (typeof customElements === 'undefined' || customElements.get('page-hero')) return;

  var CHEVRON = '<svg class="cta-chev" width="6" height="10" viewBox="0 0 6 10" aria-hidden="true"><path d="M1 1L5 5L1 9" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function PageHero() {
    return Reflect.construct(HTMLElement, [], PageHero);
  }
  PageHero.prototype = Object.create(HTMLElement.prototype);
  PageHero.prototype.constructor = PageHero;
  Object.setPrototypeOf(PageHero, HTMLElement);

  PageHero.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var eyebrow = this.getAttribute('eyebrow') || '';
    var eyebrowSecondary = this.getAttribute('eyebrow-secondary') || '';
    var image = this.getAttribute('image') || '';

    var children = Array.prototype.slice.call(this.children);

    /* Auto-inject chevron on primary CTAs that are missing one. */
    children.forEach(function (child) {
      var primaries = [];
      if (child.classList && child.classList.contains('cta-primary')) primaries.push(child);
      if (child.querySelectorAll) {
        Array.prototype.forEach.call(child.querySelectorAll('.cta-primary'), function (n) {
          primaries.push(n);
        });
      }
      primaries.forEach(function (cta) {
        if (!cta.querySelector('.cta-chev')) {
          cta.insertAdjacentHTML('beforeend', ' ' + CHEVRON);
        }
      });
    });

    var eyebrowHtml = '';
    if (eyebrow) {
      eyebrowHtml = '<span class="eyebrow-tag">'
        + '<span class="dot"></span>'
        + '<span class="label-primary">' + eyebrow + '</span>'
        + (eyebrowSecondary
            ? '<span class="label-secondary">  ·  ' + eyebrowSecondary + '</span>'
            : '')
        + '</span>';
    }

    var section = document.createElement('section');
    section.className = 'section hero-internal-bg';
    var sectionInner = document.createElement('div');
    sectionInner.className = 'section-inner';
    var content = document.createElement('div');
    content.className = 'hero-internal-content in-view' + (image ? ' hero-internal-content-with-media' : '');

    if (image) {
      var copyCol = document.createElement('div');
      copyCol.className = 'hero-internal-copy';
      if (eyebrowHtml) copyCol.insertAdjacentHTML('beforeend', eyebrowHtml);
      children.forEach(function (child) { copyCol.appendChild(child); });
      content.appendChild(copyCol);

      var mediaCol = document.createElement('div');
      mediaCol.className = 'hero-internal-media';
      mediaCol.setAttribute('aria-hidden', 'true');
      mediaCol.style.backgroundImage = "url('" + image + "')";
      content.appendChild(mediaCol);
    } else {
      if (eyebrowHtml) content.insertAdjacentHTML('beforeend', eyebrowHtml);
      children.forEach(function (child) { content.appendChild(child); });
    }

    sectionInner.appendChild(content);
    section.appendChild(sectionInner);

    this.replaceWith(section);
  };

  customElements.define('page-hero', PageHero);
})();

/* ============================================================
   <press-articles> + <press-article> custom elements
   Reusable featured-articles grid. Drop on any page that needs
   the same press / media features card layout. Edits to the
   component apply site-wide.

   Usage:
     <press-articles heading="Selected" accent="media features" sub="A curated set...">
       <press-article href="#" source="Australian Business Journal" date="June 2026" image="images/api-strategy-1.jpg">
         <span data-headline>How the dual-pathway model serves...</span>
         <span data-excerpt>A feature on the operating idea behind API.</span>
       </press-article>
     </press-articles>

   Heading + sub are optional. If omitted, only the article grid renders.
   ============================================================ */
(function () {
  if (typeof customElements === 'undefined' || customElements.get('press-article')) return;

  function PressArticle() {
    return Reflect.construct(HTMLElement, [], PressArticle);
  }
  PressArticle.prototype = Object.create(HTMLElement.prototype);
  PressArticle.prototype.constructor = PressArticle;
  Object.setPrototypeOf(PressArticle, HTMLElement);

  PressArticle.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var href = this.getAttribute('href') || '#';
    var image = this.getAttribute('image') || '';
    var source = this.getAttribute('source') || '';
    var date = this.getAttribute('date') || '';

    var headlineEl = this.querySelector('[data-headline]');
    var excerptEl = this.querySelector('[data-excerpt]');
    var headlineHtml = headlineEl ? headlineEl.innerHTML : '';
    var excerptHtml = excerptEl ? excerptEl.innerHTML : '';

    var a = document.createElement('a');
    a.className = 'featured-article';
    a.setAttribute('href', href);

    var inner = '';
    if (image) {
      inner += '<div class="article-image" style="background-image: url(\'' + image + '\');" aria-hidden="true"></div>';
    }
    if (headlineHtml) inner += '<h3 class="article-headline">' + headlineHtml + '</h3>';
    if (excerptHtml) inner += '<p class="article-excerpt">' + excerptHtml + '</p>';
    inner += '<div class="article-meta">';
    if (source) inner += '<span class="article-source">' + source + '</span>';
    if (date) inner += '<span class="article-date">' + date + '</span>';
    inner += '</div>';

    a.innerHTML = inner;
    this.replaceWith(a);
  };

  customElements.define('press-article', PressArticle);
})();

(function () {
  if (typeof customElements === 'undefined' || customElements.get('press-articles')) return;

  function PressArticles() {
    return Reflect.construct(HTMLElement, [], PressArticles);
  }
  PressArticles.prototype = Object.create(HTMLElement.prototype);
  PressArticles.prototype.constructor = PressArticles;
  Object.setPrototypeOf(PressArticles, HTMLElement);

  PressArticles.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var heading = this.getAttribute('heading') || '';
    var accent = this.getAttribute('accent') || '';
    var sub = this.getAttribute('sub') || '';
    var ctaHref = this.getAttribute('cta-href') || '#';
    var ctaLabel = this.getAttribute('cta-label') || '';
    var sectionClass = this.getAttribute('section-class') || '';
    var sectionStyle = this.getAttribute('section-style') || '';

    var children = Array.prototype.slice.call(this.children);

    var section = document.createElement('section');
    section.className = 'section' + (sectionClass ? ' ' + sectionClass : '');
    if (sectionStyle) section.setAttribute('style', sectionStyle);

    var sectionInner = document.createElement('div');
    sectionInner.className = 'section-inner';

    if (heading || sub || ctaLabel) {
      var CHEVRON_LOCAL = '<svg class="cta-chev" width="6" height="10" viewBox="0 0 6 10" aria-hidden="true"><path d="M1 1L5 5L1 9" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var headingHtml = '<div class="section-heading in-view">';
      if (heading) {
        var headingText = heading;
        if (accent) headingText = heading + ' <span class="accent">' + accent + '</span>';
        headingHtml += '<h2 class="h2">' + headingText + '.</h2>';
      }
      if (sub) headingHtml += '<p class="sub">' + sub + '</p>';
      if (ctaLabel) {
        headingHtml += '<div class="ctas" style="justify-content: center; margin-top: 24px;">'
          + '<a href="' + ctaHref + '" class="cta cta-secondary">' + ctaLabel + ' ' + CHEVRON_LOCAL + '</a>'
          + '</div>';
      }
      headingHtml += '</div>';
      sectionInner.insertAdjacentHTML('beforeend', headingHtml);
    }

    var grid = document.createElement('div');
    grid.className = 'featured-articles in-view';
    children.forEach(function (child) { grid.appendChild(child); });
    sectionInner.appendChild(grid);

    section.appendChild(sectionInner);
    this.replaceWith(section);
  };

  customElements.define('press-articles', PressArticles);
})();

/* ============================================================
   <podcast-feature> custom element
   Full-bleed podcast cut-through with platform links, pull-quote,
   attribution, CTAs, and a compact player. Reusable on any page
   that needs the same audio-feature register.

   Usage:
     <podcast-feature
       image="images/api-podcast.jpg"
       album="Property Boss Mums"
       artist="Emma Allen"
       name="Emma Allen"
       role="Founder, Active Property Investing · Almost two decades in property"
       primary-href="founder.html"
       primary-label="Read Emma's story"
       secondary-href="podcast.html"
       secondary-label="Explore the archive">
       <span data-quote>Quote text here.</span>
     </podcast-feature>

   Attributes are all optional; whatever is missing simply does not render.
   ============================================================ */
(function () {
  if (typeof customElements === 'undefined' || customElements.get('podcast-feature')) return;

  var CHEVRON = '<svg class="cta-chev" width="6" height="10" viewBox="0 0 6 10" aria-hidden="true"><path d="M1 1L5 5L1 9" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var SPOTIFY_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#1ED760" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm5.516 17.297c-.224.367-.701.482-1.063.257-2.913-1.781-6.581-2.184-10.901-1.197-.413.094-.825-.165-.92-.578-.094-.413.165-.825.578-.92 4.728-1.08 8.783-.616 12.057 1.379.366.226.481.704.249 1.059zm1.473-3.275c-.281.456-.876.6-1.331.319-3.333-2.049-8.418-2.642-12.36-1.444-.515.156-1.058-.135-1.213-.65-.156-.515.135-1.057.651-1.213 4.503-1.367 10.105-.708 13.928 1.659.456.281.6.876.319 1.331zm.123-3.404c-3.997-2.373-10.591-2.591-14.408-1.43-.617.187-1.273-.162-1.461-.78-.187-.617.162-1.273.78-1.461 4.379-1.329 11.66-1.072 16.262 1.659.564.335.749 1.062.414 1.626-.335.564-1.062.749-1.626.414z"/></svg>';

  var APPLE_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><defs><linearGradient id="apIconGradComp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F452FF"/><stop offset="1" stop-color="#832BC1"/></linearGradient></defs><rect width="24" height="24" rx="5.5" fill="url(#apIconGradComp)"/><path fill="#fff" d="M12 5.4a2.85 2.85 0 1 0 0 5.7 2.85 2.85 0 0 0 0-5.7zm-2.4 7.2c-1.5 0-2.1.85-2.1 1.95 0 .8.35 1.3.9 2 .7.85 1.7 1.7 3.6 1.7s2.9-.85 3.6-1.7c.55-.7.9-1.2.9-2 0-1.1-.6-1.95-2.1-1.95H9.6z"/></svg>';

  var PLAY_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z"/></svg>';

  function PodcastFeature() {
    return Reflect.construct(HTMLElement, [], PodcastFeature);
  }
  PodcastFeature.prototype = Object.create(HTMLElement.prototype);
  PodcastFeature.prototype.constructor = PodcastFeature;
  Object.setPrototypeOf(PodcastFeature, HTMLElement);

  PodcastFeature.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var image = this.getAttribute('image') || '';
    var album = this.getAttribute('album') || '';
    var artist = this.getAttribute('artist') || '';
    var name = this.getAttribute('name') || '';
    var role = this.getAttribute('role') || '';
    var primaryHref = this.getAttribute('primary-href') || '#';
    var primaryLabel = this.getAttribute('primary-label') || '';
    var secondaryHref = this.getAttribute('secondary-href') || '#';
    var secondaryLabel = this.getAttribute('secondary-label') || '';
    var podcastHref = this.getAttribute('podcast-href') || 'podcast.html';

    var quoteEl = this.querySelector('[data-quote]');
    var quoteHtml = quoteEl ? quoteEl.innerHTML : '';

    var section = document.createElement('section');
    section.className = 'section cut-through-bleed in-view';
    if (image) section.setAttribute('style', "background-image: url('" + image + "');");

    var ctas = '';
    if (primaryLabel) {
      ctas += '<a href="' + primaryHref + '" class="cta cta-on-dark">' + primaryLabel + ' ' + CHEVRON + '</a>';
    }
    if (secondaryLabel) {
      ctas += '<a href="' + secondaryHref + '" class="cta cta-ghost-on-dark">' + secondaryLabel + '</a>';
    }

    var attribution = '';
    if (name || role) {
      attribution = '<p class="cut-through-attribution cut-through-attribution-light">'
        + (name ? '<span class="attribution-name">' + name + '</span>' : '')
        + (name && role ? '<span class="attribution-divider" aria-hidden="true">|</span>' : '')
        + (role ? '<span class="attribution-role">' + role + '</span>' : '')
        + '</p>';
    }

    section.innerHTML = ''
      + '<div class="cut-through-bleed-overlay" aria-hidden="true"></div>'
      + '<div class="section-inner">'
      +   '<div class="bleed-top">'
      +     '<div class="available-on available-on-dark">'
      +       '<span class="lbl">Available on</span>'
      +       '<div class="platforms">'
      +         '<a href="' + podcastHref + '" class="platform" aria-label="Listen on Spotify">' + SPOTIFY_SVG + '<span>Spotify</span></a>'
      +         '<a href="' + podcastHref + '" class="platform" aria-label="Listen on Apple Podcasts">' + APPLE_SVG + '<span>Apple Podcasts</span></a>'
      +       '</div>'
      +     '</div>'
      +   '</div>'
      +   '<div class="bleed-bottom">'
      +     '<div class="cut-through-bleed-content">'
      +       (quoteHtml ? '<p class="pull-quote pull-quote-light">&ldquo;' + quoteHtml + '&rdquo;</p>' : '')
      +       attribution
      +       (ctas ? '<div class="ctas">' + ctas + '</div>' : '')
      +     '</div>'
      +   '</div>'
      +   (album ? ('<div class="player-album player-album-compact">'
      +     '<div class="album-bottom">'
      +       '<button type="button" class="control-play" aria-label="Pause">' + PLAY_SVG + '</button>'
      +       '<div class="album-meta">'
      +         '<div class="album-info">'
      +           '<p class="album-title">' + album + '</p>'
      +           (artist ? '<p class="album-artist">' + artist + '</p>' : '')
      +         '</div>'
      +         '<div class="album-progress">'
      +           '<div class="progress-track" aria-hidden="true">'
      +             '<span class="progress-fill"></span>'
      +             '<span class="progress-thumb"></span>'
      +           '</div>'
      +         '</div>'
      +       '</div>'
      +     '</div>'
      +   '</div>') : '')
      + '</div>';

    this.replaceWith(section);
  };

  customElements.define('podcast-feature', PodcastFeature);
})();

/* ============================================================
   <announcement-strip> custom element
   Site-wide top strip: a short message with optional inline link,
   plus the four social icons. Drop into any page that needs the
   same chrome.

   Usage (defaults to the current site-wide message and links):
     <announcement-strip></announcement-strip>

   Override any of the attributes if needed:
     <announcement-strip
       message="2024 ASBCA Winner · 2026 Finalist · Top 10 to Watch (Australian Business Journal)."
       link-href="press.html"
       link-label="View the press"
       facebook="https://www.facebook.com/"
       youtube="https://www.youtube.com/"
       instagram="https://www.instagram.com/"
       linkedin="https://www.linkedin.com/">
     </announcement-strip>

   Pass empty strings to drop a social link from the row.
   ============================================================ */
(function () {
  if (typeof customElements === 'undefined' || customElements.get('announcement-strip')) return;

  var FB_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v6.98A10 10 0 0 0 22 12z"/></svg>';
  var YT_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.6-.46-5.3a2.79 2.79 0 0 0-1.96-1.97C18.9 4.3 12 4.3 12 4.3s-6.88 0-8.58.43a2.79 2.79 0 0 0-1.96 1.97C1 8.4 1 12 1 12s0 3.6.46 5.3a2.79 2.79 0 0 0 1.96 1.97c1.7.43 8.58.43 8.58.43s6.88 0 8.58-.43a2.79 2.79 0 0 0 1.96-1.97C23 15.6 23 12 23 12zM9.75 15.5v-7L15.75 12 9.75 15.5z"/></svg>';
  var IG_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm3 13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6.5A2.5 2.5 0 1 1 14.5 12 2.5 2.5 0 0 1 12 14.5zm4.75-7.25a.75.75 0 1 0 .75.75.75.75 0 0 0-.75-.75z"/></svg>';
  var LI_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>';

  var DEFAULTS = {
    message:   '2024 ASBCA Winner · 2026 Finalist · Top 10 to Watch (Australian Business Journal).',
    linkHref:  'press.html',
    linkLabel: 'View the press',
    facebook:  'https://www.facebook.com/',
    youtube:   'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    linkedin:  'https://www.linkedin.com/'
  };

  function attr(el, name, fallback) {
    return el.hasAttribute(name) ? el.getAttribute(name) : fallback;
  }

  function social(href, label, svg) {
    if (!href) return '';
    return '<a href="' + href + '" aria-label="' + label + '" target="_blank" rel="noopener noreferrer">' + svg + '</a>';
  }

  function AnnouncementStrip() {
    return Reflect.construct(HTMLElement, [], AnnouncementStrip);
  }
  AnnouncementStrip.prototype = Object.create(HTMLElement.prototype);
  AnnouncementStrip.prototype.constructor = AnnouncementStrip;
  Object.setPrototypeOf(AnnouncementStrip, HTMLElement);

  AnnouncementStrip.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var message   = attr(this, 'message',   DEFAULTS.message);
    var linkHref  = attr(this, 'link-href', DEFAULTS.linkHref);
    var linkLabel = attr(this, 'link-label', DEFAULTS.linkLabel);
    var facebook  = attr(this, 'facebook',  DEFAULTS.facebook);
    var youtube   = attr(this, 'youtube',   DEFAULTS.youtube);
    var instagram = attr(this, 'instagram', DEFAULTS.instagram);
    var linkedin  = attr(this, 'linkedin',  DEFAULTS.linkedin);

    var linkHtml = (linkHref && linkLabel)
      ? ' <a href="' + linkHref + '">' + linkLabel + '</a>'
      : '';

    var wrapper = document.createElement('div');
    wrapper.className = 'announcement-strip';
    wrapper.innerHTML = ''
      + '<div class="announcement-inner">'
      +   '<p class="announcement-message">' + message + linkHtml + '</p>'
      +   '<div class="announcement-socials">'
      +     social(facebook,  'Facebook',  FB_SVG)
      +     social(youtube,   'YouTube',   YT_SVG)
      +     social(instagram, 'Instagram', IG_SVG)
      +     social(linkedin,  'LinkedIn',  LI_SVG)
      +   '</div>'
      + '</div>';

    this.replaceWith(wrapper);
  };

  customElements.define('announcement-strip', AnnouncementStrip);
})();

/* ============================================================
   <feature-video> custom element
   Pull-quote-led play button. Image background, dark gradient,
   pulsing play ring, attribution bottom-left, duration top-right.

   Usage:
     <feature-video
       image="images/api-video-thumb.jpg"
       attribution="Emma Allen · Founder"
       duration="2 min"
       label="Play founder video">
       <span data-quote>Property is the vehicle.<br><span class="accent">Strategy</span> is the engine.</span>
     </feature-video>

   - image, attribution, duration are optional. Omit any to drop it.
   - label sets the aria-label on the underlying button.
   - The quote slot accepts any inline HTML, including <br> and <span class="accent">.
   ============================================================ */
(function () {
  if (typeof customElements === 'undefined' || customElements.get('feature-video')) return;

  var CLOCK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="14" height="14"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var PLAY_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  function FeatureVideo() {
    return Reflect.construct(HTMLElement, [], FeatureVideo);
  }
  FeatureVideo.prototype = Object.create(HTMLElement.prototype);
  FeatureVideo.prototype.constructor = FeatureVideo;
  Object.setPrototypeOf(FeatureVideo, HTMLElement);

  FeatureVideo.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var image       = this.getAttribute('image') || '';
    var attribution = this.getAttribute('attribution') || '';
    var duration    = this.getAttribute('duration') || '';
    var label       = this.getAttribute('label') || 'Play video';

    var quoteEl = this.querySelector('[data-quote]');
    var quoteHtml = quoteEl ? quoteEl.innerHTML : '';

    var section = document.createElement('section');
    section.className = 'section';

    var inner = ''
      + '<div class="section-inner tight">'
      +   '<button type="button" class="feature-video in-view"'
      +     (image ? ' style="background-image: url(\'' + image + '\');"' : '')
      +     ' aria-label="' + label + '">'
      +     '<span class="overlay" aria-hidden="true"></span>'
      +     (quoteHtml
          ? '<span class="quote"><p class="pull-quote">' + quoteHtml + '</p></span>'
          : '')
      +     '<span class="video-play-wrap" aria-hidden="true">'
      +       '<span class="play-ring"></span>'
      +       '<span class="play-ring"></span>'
      +       '<span class="video-play">' + PLAY_SVG + '</span>'
      +     '</span>'
      +     (attribution ? '<span class="attribution">' + attribution + '</span>' : '')
      +     (duration ? '<span class="duration">' + CLOCK_SVG + ' ' + duration + '</span>' : '')
      +   '</button>'
      + '</div>';

    section.innerHTML = inner;
    this.replaceWith(section);
  };

  customElements.define('feature-video', FeatureVideo);
})();

/* ============================================================
   <site-footer> custom element
   Site-wide footer chrome: brand logo, newsletter signup, 5 link
   columns, copyright row. Drop into any page.

   Usage:
     <site-footer></site-footer>

   No attributes. The link sets, newsletter copy, and license line
   are baked in here so a single edit propagates across every page.
   ============================================================ */
(function () {
  if (typeof customElements === 'undefined' || customElements.get('site-footer')) return;

  var TEMPLATE = ''
    + '<div class="section-inner">'
    +   '<div class="brand">'
    +     '<img src="images/api-logo-square.svg" alt="Active Property Investing" class="logo" />'
    +   '</div>'
    +   '<div class="main">'
    +     '<div class="newsletter">'
    +       '<h3 class="heading">Get property strategy in your inbox.</h3>'
    +       '<form class="newsletter-form" onsubmit="event.preventDefault();">'
    +         '<input type="email" placeholder="Enter your email" aria-label="Email address" required />'
    +         '<button type="submit">Subscribe</button>'
    +       '</form>'
    +       '<p class="newsletter-note">By subscribing you agree to our Privacy Policy and consent to receive updates from Active Property Investing.</p>'
    +       '<p class="license">Licensed real estate agency · NSW LIC TBC · QLD LIC TBC · VIC LIC TBC</p>'
    +     '</div>'
    +     '<div class="links">'
    +       '<div class="col">'
    +         '<h4>About</h4>'
    +         '<ul>'
    +           '<li><a href="about.html">About</a></li>'
    +           '<li><a href="founder.html">Founder</a></li>'
    +           '<li><a href="team.html">Team</a></li>'
    +           '<li><a href="giving-back.html">Giving Back</a></li>'
    +           '<li><a href="press.html">Press</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div class="col">'
    +         '<h4>Process</h4>'
    +         '<ul>'
    +           '<li><a href="process.html">Our Process</a></li>'
    +           '<li><a href="readiness-scale.html">How we think about fit</a></li>'
    +           '<li><a href="research-and-selection.html">Research &amp; Selection</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div class="col">'
    +         '<h4>Who we work with</h4>'
    +         '<ul>'
    +           '<li><a href="for-investors.html">For Investors</a></li>'
    +           '<li><a href="aspiring-investors.html">Aspiring Investors</a></li>'
    +           '<li><a href="for-women.html">For Women</a></li>'
    +           '<li><a href="rentvesting.html">Rentvesting</a></li>'
    +           '<li><a href="partners.html">Partners</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div class="col">'
    +         '<h4>Resources</h4>'
    +         '<ul>'
    +           '<li><a href="resources.html">Resources Hub</a></li>'
    +           '<li><a href="blog.html">Blog</a></li>'
    +           '<li><a href="ebooks.html">eBooks</a></li>'
    +           '<li><a href="podcast.html">Podcast</a></li>'
    +           '<li><a href="client-journeys.html">Client Journeys</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div class="col">'
    +         '<h4>Connect</h4>'
    +         '<ul>'
    +           '<li><a href="get-started.html">Get Started</a></li>'
    +           '<li><a href="contact.html">Contact</a></li>'
    +           '<li><a href="partner-network.html">Become a partner</a></li>'
    +           '<li>1300 449 974</li>'
    +           '<li>LinkedIn · Instagram</li>'
    +         '</ul>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="bottom">'
    +     '<p>&copy; 2026 Active Property Investing. All rights reserved. <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">AI Notice</a></p>'
    +   '</div>'
    + '</div>';

  function SiteFooter() {
    return Reflect.construct(HTMLElement, [], SiteFooter);
  }
  SiteFooter.prototype = Object.create(HTMLElement.prototype);
  SiteFooter.prototype.constructor = SiteFooter;
  Object.setPrototypeOf(SiteFooter, HTMLElement);

  SiteFooter.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;

    var footer = document.createElement('footer');
    footer.className = 'section site-footer';
    footer.innerHTML = TEMPLATE;
    this.replaceWith(footer);
  };

  customElements.define('site-footer', SiteFooter);
})();

(function () {
  function init() {
    /* ------------------------------------------------------------
       Backdrop element · sits behind any open mega menu, blurs the page
       ------------------------------------------------------------ */
    if (!document.querySelector('.nav-backdrop')) {
      var backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    /* ------------------------------------------------------------
       Nav dropdown · Stripe-style hover with delays + click fallback
       ------------------------------------------------------------ */
    var OPEN_DELAY = 100;   // delay before first dropdown opens on hover
    var CLOSE_DELAY = 220;  // grace period to let mouse travel before closing
    var openTimers = new WeakMap();
    var closeTimers = new WeakMap();

    var switchTimer;
    var SWITCH_DURATION = 480; // matches CSS animation 80ms delay + 380ms duration + small buffer

    function clearHeightMorph() {
      document.querySelectorAll('.nav .nav-dropdown > .nav-submenu-v2').forEach(function (m) {
        if (m.dataset.heightMorph) {
          m.style.height = '';
          m.style.overflow = '';
          m.style.transition = '';
          delete m.dataset.heightMorph;
        }
      });
    }

    function endSwitching() {
      document.body.classList.remove('nav-switching');
      document.body.classList.remove('nav-switching-backward');
      /* Clear .was-open from any outgoing menu so it stops participating */
      document.querySelectorAll('.nav-dropdown.was-open').forEach(function (el) {
        el.classList.remove('was-open');
      });
      clearHeightMorph();
      /* Snap any closed menu to fully-hidden state instantly · prevents the
         outgoing menu from briefly fading out on top of the new one (which
         can happen if DOM order puts it later in the stack). */
      document.querySelectorAll('.nav-dropdown:not(.open) > .nav-submenu-v2').forEach(function (m) {
        m.style.transition = 'none';
        m.style.opacity = '0';
        m.style.clipPath = 'inset(0 0 100% 0)';
        /* Force reflow so the snap commits before CSS rules resume */
        void m.offsetHeight;
        m.style.transition = '';
        m.style.opacity = '';
        m.style.clipPath = '';
      });
    }

    function closeAll() {
      clearTimeout(switchTimer);
      document.body.classList.remove('nav-switching');
      document.body.classList.remove('nav-switching-backward');
      clearHeightMorph();
      document.querySelectorAll('.nav-dropdown.was-open').forEach(function (el) {
        el.classList.remove('was-open');
      });
      document.querySelectorAll('.nav-dropdown.open').forEach(function (el) {
        el.classList.remove('open');
      });
    }
    function openOnly(dropdown) {
      var wasOpen = document.querySelector('.nav-dropdown.open');
      if (wasOpen && wasOpen !== dropdown) {
        /* Switching between two open-state menus · horizontal content morph */
        /* Detect direction: is the new dropdown later in DOM than the old one? */
        var isForward = !!(wasOpen.compareDocumentPosition(dropdown) & Node.DOCUMENT_POSITION_FOLLOWING);
        document.body.classList.add('nav-switching');
        document.body.classList.toggle('nav-switching-backward', !isForward);
        /* Mark outgoing menu so CSS scopes the morph styles to it alone */
        document.querySelectorAll('.nav-dropdown.was-open').forEach(function (el) {
          el.classList.remove('was-open');
        });
        /* Measure outgoing menu height before swap · used to seed the incoming
           menu's min-height so the visible panel transitions smoothly between
           two menus with different intrinsic heights. */
        var outgoingMenu = wasOpen.querySelector(':scope > .nav-submenu-v2');
        var incomingMenu = dropdown.querySelector(':scope > .nav-submenu-v2');
        var outgoingHeight = outgoingMenu ? outgoingMenu.offsetHeight : 0;

        wasOpen.classList.add('was-open');
        wasOpen.classList.remove('open');
        dropdown.classList.add('open');

        clearHeightMorph();
        if (outgoingMenu && incomingMenu && outgoingHeight) {
          /* Measure incoming menu's natural height (now that .open is set, it's
             laid out). The outgoing menu provides the visible chrome during the
             morph, so we animate ITS height to the incoming's natural height —
             that way when nav-switching ends and incoming chrome takes over,
             the two heights match and there's no snap. */
          var naturalHeight = incomingMenu.offsetHeight;
          if (naturalHeight && naturalHeight !== outgoingHeight) {
            outgoingMenu.dataset.heightMorph = '1';
            outgoingMenu.style.height = outgoingHeight + 'px';
            outgoingMenu.style.overflow = 'hidden';
            /* Inline transition overrides the body.nav-switching `transition: none`
               rule for this property only. */
            outgoingMenu.style.transition = 'height 380ms cubic-bezier(0.22, 1, 0.36, 1) 60ms';
            /* Force reflow so the start height commits, then animate to incoming's. */
            void outgoingMenu.offsetHeight;
            outgoingMenu.style.height = naturalHeight + 'px';
          }
        }

        clearTimeout(switchTimer);
        switchTimer = setTimeout(endSwitching, SWITCH_DURATION);
      } else {
        /* Fresh open from closed state · normal clip-path reveal */
        dropdown.classList.add('open');
      }
    }

    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
      var trigger = dropdown.querySelector(':scope > a');

      /* Click · toggle (tap fallback + keyboard) */
      if (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          var wasOpen = dropdown.classList.contains('open');
          closeAll();
          if (!wasOpen) dropdown.classList.add('open');
        });
      }

      /* Hover · only for mouse pointers (skips touch) */
      dropdown.addEventListener('pointerenter', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        clearTimeout(closeTimers.get(dropdown));

        /* If any dropdown is already open, switch instantly (no delay) */
        if (document.querySelector('.nav-dropdown.open')) {
          openOnly(dropdown);
        } else {
          var timer = setTimeout(function () { openOnly(dropdown); }, OPEN_DELAY);
          openTimers.set(dropdown, timer);
        }
      });

      dropdown.addEventListener('pointerleave', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        clearTimeout(openTimers.get(dropdown));
        var timer = setTimeout(function () {
          dropdown.classList.remove('open');
        }, CLOSE_DELAY);
        closeTimers.set(dropdown, timer);
      });
    });

    /* Click outside · close everything */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) closeAll();
    });

    /* Escape · close everything */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });

    /* ------------------------------------------------------------
       Journey tabs: swap story content when a testimonial tab is clicked
       ------------------------------------------------------------ */
    var journeys = {
      shane: {
        heading: 'Five properties, scaled with strategy, not speed.',
        blocks: [
          {
            label: 'Active investor scaling beyond a first property.',
            body: 'Already past the entry stage. Needed a partner who could keep pace as the portfolio grew, not start over each cycle.'
          },
          {
            label: 'Five purchases across multiple cycles.',
            body: 'Each property assessed against an evolving strategy. Markets, finance position, and portfolio role weighed every time, not just price.'
          },
          {
            label: 'A five-property portfolio, built deliberately.',
            body: 'Compounding gains across the cycle, with each purchase tied to the next step of the plan.'
          }
        ],
        quote: '"I have purchased five properties through API."',
        attribution: 'Shane M, active investor, Sydney',
        image: 'images/api-couple.jpg'
      },
      alicia: {
        heading: '“The API team gave us confidence to kick off our property investment journey.”',
        blocks: [
          {
            label: 'Sydney rentvestors, time-poor and clear on the outcome.',
            body: 'Already exploring the market on weekends. Already exhausted by it. Needed a strategy, not a pitch.'
          },
          {
            label: 'Two-year cycle. Dozens of properties weighed against the strategy.',
            body: "Every opportunity assessed against their goals, their portfolio, and the role this property had to play. Most didn't pass. The ones that did were ranked and explained."
          },
          {
            label: 'One purchase. The right one.',
            body: "A property aligned to their strategy, not the market's. Bought without compromise, and held with confidence."
          }
        ],
        quote: '"The team analysed so many properties to find us the one."',
        attribution: 'Alicia and Dave C, Sydney rentvestors',
        image: 'images/api-couple2.jpg'
      },
      stacy: {
        heading: 'A clear process, and trust built from the first conversation.',
        blocks: [
          {
            label: 'Solo investor, doing the research, wary of being sold to.',
            body: 'Looking for clarity and a process she could trust, not a sales pitch dressed up as advice.'
          },
          {
            label: 'Transparent discovery, clear documentation, regular check-ins.',
            body: 'Every step explained. Every property scored against the brief. Decisions stayed hers, the work stayed ours.'
          },
          {
            label: 'First investment property purchased, second strategy underway.',
            body: 'A foundation she can build on, with a partner she can keep working with as the plan evolves.'
          }
        ],
        quote: '"Emma immediately struck me as trustworthy, down-to-earth, and highly competent."',
        attribution: 'Stacy W, solo investor, Sydney',
        image: 'images/api-solo.jpg'
      }
    };

    var featuredEl = document.querySelector('.journey-featured');
    var currentJourney = null;
    document.querySelectorAll('.journey-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = this.getAttribute('data-journey');
        var data = journeys[key];
        if (!data || key === currentJourney) return;
        currentJourney = key;
        document.querySelectorAll('.journey-tab').forEach(function (t) {
          t.classList.remove('is-active');
        });
        this.classList.add('is-active');
        if (featuredEl) featuredEl.classList.add('is-swapping');
        setTimeout(function () {
          data.blocks.forEach(function (b, i) {
            var labelEl = document.querySelector('[data-journey-label="' + i + '"]');
            var bodyEl = document.querySelector('[data-journey-body="' + i + '"]');
            if (labelEl) labelEl.textContent = b.label;
            if (bodyEl) bodyEl.textContent = b.body;
          });
          var headingEl = document.querySelector('[data-journey-heading]');
          var quoteEl = document.querySelector('[data-journey-quote]');
          var attrEl = document.querySelector('[data-journey-attribution]');
          var imageEl = document.querySelector('[data-journey-image]');
          if (headingEl && data.heading) headingEl.textContent = data.heading;
          if (quoteEl) quoteEl.textContent = data.quote;
          if (attrEl) attrEl.textContent = data.attribution;
          if (imageEl && data.image) imageEl.style.backgroundImage = "url('" + data.image + "')";
          if (featuredEl) featuredEl.classList.remove('is-swapping');
        }, 240);
      });
    });

    /* ------------------------------------------------------------
       Intersection observer: .in-view elements fade up on scroll
       ------------------------------------------------------------ */
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.in-view').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      });

      document.querySelectorAll('.in-view').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: just reveal everything
      document.querySelectorAll('.in-view').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
