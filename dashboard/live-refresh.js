(() => {
  const DATA_FILES = ['catalog', 'snapshots', 'events', 'market'];
  let refreshing = false;
  let lastRefresh = 0;

  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);

  function toast(message) {
    const node = document.getElementById('toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('show');
    setTimeout(() => node.classList.remove('show'), 1800);
  }

  function latestSnapshot(documentData) {
    return [...(documentData?.snapshots || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0] || null;
  }

  function landedCny(quote, fx) {
    const total = Number(quote.checkoutPrice || 0) + Number(quote.shipping || 0);
    return quote.currency === 'JPY' ? total * fx : total;
  }

  function decorateQuotes() {
    const root = window.PC_PROCUREMENT_DATA;
    const snapshot = latestSnapshot(root?.snapshots);
    if (!snapshot) return;
    const fx = Number(snapshot.fx?.JPY_CNY || 0);
    const sorted = [...(snapshot.quotes || [])].sort((a, b) => landedCny(a, fx) - landedCny(b, fx));
    const cards = document.querySelectorAll('#quotes .quote');
    cards.forEach((card, index) => {
      const quote = sorted[index];
      if (!quote) return;
      let origin = card.querySelector('.live-quote-origin');
      if (!origin) {
        origin = document.createElement('div');
        origin.className = 'small live-quote-origin';
        card.appendChild(origin);
      }
      const parts = [];
      if (quote.shopName) parts.push(quote.shopName);
      if (quote.channelType) parts.push(quote.channelType);
      if (quote.quality === 'personal-checkout') parts.push('个人结算价');
      origin.textContent = parts.join(' · ');
    });
  }

  function forceRender() {
    const fxInput = document.getElementById('fxo');
    if (fxInput) {
      fxInput.dispatchEvent(new Event('change', { bubbles: true }));
      requestAnimationFrame(decorateQuotes);
    }
  }

  async function loadFile(name, token) {
    const url = new URL(`data/${name}.json`, window.location.href);
    url.searchParams.set('_refresh', token);
    const response = await fetch(url, { cache: 'no-store', credentials: 'same-origin' });
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    return response.json();
  }

  async function refreshData({ announce = false, force = false } = {}) {
    const now = Date.now();
    if (refreshing || (!force && now - lastRefresh < 5000)) return;
    refreshing = true;
    lastRefresh = now;
    try {
      const token = String(now);
      const values = await Promise.all(DATA_FILES.map((name) => loadFile(name, token)));
      const fresh = Object.fromEntries(DATA_FILES.map((name, index) => [name, values[index]]));
      const root = window.PC_PROCUREMENT_DATA;
      if (!root) throw new Error('PC_PROCUREMENT_DATA is unavailable');
      const changed = DATA_FILES.some((name) => !same(root[name], fresh[name]));
      if (changed) {
        for (const name of DATA_FILES) root[name] = fresh[name];
        forceRender();
        toast('已载入最新价格数据');
      } else if (announce) {
        forceRender();
        toast('当前已经是最新数据');
      } else {
        decorateQuotes();
      }
    } catch (error) {
      console.warn('[Live refresh]', error);
      if (announce) toast('刷新失败，请稍后重试');
    } finally {
      refreshing = false;
    }
  }

  function addRefreshButton() {
    if (document.getElementById('refreshDataButton')) return;
    const actions = document.querySelector('.actions');
    if (!actions) return;
    const button = document.createElement('button');
    button.id = 'refreshDataButton';
    button.type = 'button';
    button.textContent = '刷新数据';
    button.addEventListener('click', () => refreshData({ announce: true, force: true }));
    actions.prepend(button);
  }

  function boot() {
    if (!document.body || !window.PC_PROCUREMENT_DATA) return setTimeout(boot, 120);
    addRefreshButton();
    refreshData({ force: true });
    window.addEventListener('pageshow', () => refreshData());
    window.addEventListener('focus', () => refreshData());
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) refreshData();
    });
    setInterval(() => refreshData(), 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
