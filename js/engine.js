/* ========================================================
   ADSHIELD WEB PLAYER - CORE ENGINE v3 (i18n Compatible)
   ======================================================== */

class AdShieldEngine {
  constructor() {
    this.currentUrl = '';
    this.currentMode = 'sandbox'; // 'sandbox' | 'proxy'
    this.activeProxies = [
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?'
    ];
    this.currentProxyIdx = 0;

    this.sensitiveKeywords = [
      'porn', 'xxx', 'hentai', 'xvideos', 'pornhub', 'sex', 'jav', 
      'vlxx', 'phimsex', 'bet88', 'fun88', 'kubet', 'w88'
    ];

    this.adPatterns = [
      /googlesyndication/i,
      /doubleclick/i,
      /adsbygoogle/i,
      /adnxs/i,
      /popads/i,
      /propellerads/i,
      /monetag/i,
      /adcash/i,
      /exoclick/i,
      /adroll/i,
      /adsterra/i,
      /richads/i,
      /clickadu/i,
      /outbrain/i,
      /taboola/i,
      /trafficjunky/i,
      /ad-maven/i,
      /zeroredirect/i
    ];
  }

  checkSafety(url) {
    const lower = (url || '').toLowerCase();
    const matched = this.sensitiveKeywords.some(kw => lower.includes(kw));
    return {
      isSafe: !matched,
      warning: matched ? (window.i18n ? window.i18n.t('warn_desc') : 'Sensitive URL warning') : null
    };
  }

  normalizeUrl(rawUrl) {
    let clean = (rawUrl || '').trim();
    if (!clean) return '';
    if (!/^https?:\/\//i.test(clean)) {
      clean = 'https://' + clean;
    }
    return clean;
  }

  setupSandboxFrame(iframe, url) {
    this.currentUrl = url;
    iframe.removeAttribute('srcdoc');

    iframe.setAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-forms allow-pointer-lock'
    );
    iframe.setAttribute(
      'allow',
      'autoplay; fullscreen; gamepad; microphone; camera; focus-without-user-activation'
    );
    iframe.src = url;
  }

  async loadCleanProxy(iframe, url, onStatusUpdate) {
    this.currentUrl = url;
    if (onStatusUpdate) onStatusUpdate(window.i18n ? window.i18n.t('loading_title') : 'Loading...');

    const proxyUrl = this.activeProxies[this.currentProxyIdx] + encodeURIComponent(url);

    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      let html = await response.text();

      if (onStatusUpdate) onStatusUpdate(window.i18n ? window.i18n.t('loading_sub') : 'Sanitizing code...');

      const sanitizedHtml = this.sanitizeHtml(html, url);

      iframe.removeAttribute('src');
      iframe.setAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-forms allow-pointer-lock'
      );
      iframe.setAttribute('allow', 'autoplay; fullscreen; gamepad');
      iframe.srcdoc = sanitizedHtml;

      return { success: true };
    } catch (err) {
      console.warn('Proxy load failed:', err);
      if (this.currentProxyIdx < this.activeProxies.length - 1) {
        this.currentProxyIdx++;
        return this.loadCleanProxy(iframe, url, onStatusUpdate);
      }
      return { success: false, error: err.message };
    }
  }

  sanitizeHtml(html, originalUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    let base = doc.querySelector('base');
    if (!base) {
      base = doc.createElement('base');
      doc.head.insertBefore(base, doc.head.firstChild);
    }
    base.href = originalUrl;

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => {
      const src = script.getAttribute('src') || '';
      const content = script.textContent || '';
      const isAdScript = this.adPatterns.some(pat => pat.test(src) || pat.test(content));
      if (isAdScript) script.remove();
    });

    const shieldScript = doc.createElement('script');
    shieldScript.textContent = `
      (function() {
        window.open = function() {
          console.warn('[AdShield] Blocked popup window.open');
          return null;
        };
        try {
          Object.defineProperty(window, 'top', { value: window.self });
          Object.defineProperty(window, 'parent', { value: window.self });
        } catch(e) {}
      })();
    `;
    doc.head.insertBefore(shieldScript, doc.head.firstChild);

    const shieldStyle = doc.createElement('style');
    shieldStyle.textContent = `
      [id*="ad-"], [class*="ad-"], [id*="banner"], [class*="banner"],
      [id*="popup"], [class*="popup"], .adsbygoogle, .ad-container,
      iframe[src*="doubleclick"], iframe[src*="ad"] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
        opacity: 0 !important;
        height: 0 !important;
      }
    `;
    doc.head.appendChild(shieldStyle);

    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  getBookmarkletCode() {
    const alertMsg = window.i18n ? window.i18n.t('bookmarklet_alert') : 'AdShield: Popups blocked and ads hidden!';
    return `javascript:(function(){
      window.open=function(){console.warn('AdShield: Blocked popup');return null;};
      document.querySelectorAll('[id*="ad-"],[class*="ad-"],.adsbygoogle,iframe[src*="doubleclick"]').forEach(e=>e.remove());
      alert('${alertMsg}');
    })();`.replace(/\s+/g, ' ');
  }
}

window.adShieldEngine = new AdShieldEngine();
