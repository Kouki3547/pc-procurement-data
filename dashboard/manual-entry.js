(() => {
  const REPO = 'Kouki3547/pc-procurement-data';
  const STORAGE_KEY = 'pc-procurement-manual-price-drafts-v1';
  const PLATFORM_OPTIONS = ['京东', '淘宝', '天猫'];
  const CHANNEL_OPTIONS = ['京东自营', '官方旗舰店', '品牌授权店', '第三方店铺'];

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function products() {
    return window.PC_PROCUREMENT_DATA?.catalog?.products || [];
  }

  function todayLocal() {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  function loadDrafts() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveDrafts(drafts) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.slice(0, 20))); } catch {}
  }

  function numberOrNull(value) {
    if (value === '' || value == null) return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function allowedStoreUrl(value, platform) {
    let url;
    try { url = new URL(value); } catch { return false; }
    const host = url.hostname.toLowerCase();
    if (platform === '京东') return host === 'jd.com' || host.endsWith('.jd.com') || host === '3.cn' || host.endsWith('.3.cn');
    return host === 'taobao.com' || host.endsWith('.taobao.com') || host === 'tmall.com' || host.endsWith('.tmall.com');
  }

  function buildIssue(record) {
    const product = products().find((item) => item.id === record.productId);
    const title = `[价格提交] ${product?.model || record.productId} / ${record.platform} / ${record.observedAt}`;
    const machinePayload = {
      schemaVersion: 1,
      submissionType: 'personal-checkout',
      productId: record.productId,
      platform: record.platform,
      listingTitle: record.listingTitle,
      listedPrice: record.listedPrice,
      couponPrice: record.couponPrice,
      checkoutPrice: record.checkoutPrice,
      shipping: record.shipping,
      currency: 'CNY',
      shopName: record.shopName,
      channelType: record.channelType,
      sourceUrl: record.sourceUrl,
      observedAt: record.observedAt,
      notes: record.notes || null
    };
    const body = [
      '<!-- pc-price-submission:v1 -->',
      '## 价格提交',
      '',
      `- **产品：** ${product ? `${product.brand} ${product.model}` : record.productId}`,
      `- **平台：** ${record.platform}`,
      `- **最终结算价：** ¥${record.checkoutPrice}`,
      `- **查询日期：** ${record.observedAt}`,
      '',
      '### 机器可读数据',
      '```json',
      JSON.stringify(machinePayload, null, 2),
      '```',
      '',
      '### 证据补充',
      `- 商品链接：${record.sourceUrl}`,
      '- 截图：可在提交 Issue 后直接拖入或从相册上传结算页截图。',
      '',
      '> 这是个人账号可见的结算价，不应被视为所有用户都能获得的公开市场价。'
    ].join('\n');
    return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  }

  function injectStyles() {
    if (document.getElementById('manual-price-style')) return;
    const style = document.createElement('style');
    style.id = 'manual-price-style';
    style.textContent = `
      .mp-fab{position:fixed;z-index:70;right:18px;bottom:20px;border:0;border-radius:999px;padding:13px 17px;background:var(--accent,#0f6fff);color:#fff;font-weight:750;box-shadow:0 12px 28px rgba(15,111,255,.3);cursor:pointer}
      .mp-overlay{position:fixed;z-index:100;inset:0;background:rgba(5,12,22,.58);backdrop-filter:blur(5px);display:none;align-items:flex-end;justify-content:center}
      .mp-overlay.open{display:flex}.mp-sheet{width:min(720px,100%);max-height:min(90vh,920px);overflow:auto;background:var(--panel,#fff);color:var(--text,#15202b);border:1px solid var(--border,#d9e1e9);border-radius:22px 22px 0 0;padding:20px 20px calc(20px + env(safe-area-inset-bottom));box-shadow:0 -20px 50px rgba(0,0,0,.2)}
      .mp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px}.mp-head h2{margin:0;font-size:1.2rem}.mp-head p{margin:6px 0 0;color:var(--muted,#687789);font-size:.82rem}.mp-close{border:0;background:var(--p2,#edf2f7);color:inherit;border-radius:999px;width:38px;height:38px;padding:0;font-size:1.3rem}
      .mp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mp-field{display:block;color:var(--muted,#687789);font-size:.8rem}.mp-field.full{grid-column:1/-1}.mp-field input,.mp-field select,.mp-field textarea{width:100%;min-height:44px;margin-top:5px;padding:10px 11px;border:1px solid var(--border,#d9e1e9);border-radius:11px;background:var(--p2,#edf2f7);color:var(--text,#15202b);font:inherit}.mp-field textarea{min-height:86px;resize:vertical}.mp-required{color:#c43b3b}
      .mp-help{margin:13px 0;color:var(--muted,#687789);font-size:.78rem;line-height:1.55}.mp-error{display:none;margin:10px 0;padding:10px;border-radius:10px;background:rgba(196,59,59,.12);color:#c43b3b;font-size:.82rem}.mp-error.show{display:block}.mp-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:16px}.mp-actions button{min-height:44px;border-radius:11px;padding:10px 14px}.mp-submit{border:0;background:var(--accent,#0f6fff);color:#fff;font-weight:750}.mp-secondary{border:1px solid var(--border,#d9e1e9);background:var(--panel,#fff);color:inherit}
      .mp-saved{margin-top:18px;padding-top:16px;border-top:1px solid var(--border,#d9e1e9)}.mp-saved h3{margin:0 0 10px;font-size:.95rem}.mp-draft{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--border,#d9e1e9);font-size:.8rem}.mp-draft:last-child{border-bottom:0}.mp-draft small{color:var(--muted,#687789)}.mp-draft button{padding:6px 9px;min-height:34px}
      @media(min-width:681px){.mp-overlay{align-items:center;padding:24px}.mp-sheet{border-radius:22px;max-height:88vh}.mp-fab{bottom:22px}}
      @media(max-width:680px){.mp-fab{right:14px;bottom:calc(82px + env(safe-area-inset-bottom));padding:12px 15px}.mp-sheet{max-height:92vh;padding:18px 14px calc(18px + env(safe-area-inset-bottom))}.mp-grid{grid-template-columns:1fr}.mp-field.full{grid-column:auto}.mp-actions{position:sticky;bottom:calc(-18px - env(safe-area-inset-bottom));margin:16px -14px calc(-18px - env(safe-area-inset-bottom));padding:12px 14px calc(12px + env(safe-area-inset-bottom));background:var(--panel,#fff);border-top:1px solid var(--border,#d9e1e9)}.mp-actions button{flex:1}}
    `;
    document.head.appendChild(style);
  }

  function injectUi() {
    if (document.getElementById('manualPriceButton')) return;
    injectStyles();
    const button = document.createElement('button');
    button.id = 'manualPriceButton';
    button.className = 'mp-fab';
    button.type = 'button';
    button.textContent = '＋ 录入价格';

    const overlay = document.createElement('div');
    overlay.id = 'manualPriceOverlay';
    overlay.className = 'mp-overlay';
    overlay.innerHTML = `
      <section class="mp-sheet" role="dialog" aria-modal="true" aria-labelledby="manualPriceTitle">
        <div class="mp-head"><div><h2 id="manualPriceTitle">录入中国渠道价格</h2><p>保存到本机，并生成结构化 GitHub Issue。无需电商 API 或 GitHub 密钥。</p></div><button class="mp-close" type="button" aria-label="关闭">×</button></div>
        <form id="manualPriceForm">
          <div class="mp-grid">
            <label class="mp-field full">产品 <span class="mp-required">*</span><select name="productId" required></select></label>
            <label class="mp-field">平台 <span class="mp-required">*</span><select name="platform" required>${PLATFORM_OPTIONS.map((item) => `<option>${item}</option>`).join('')}</select></label>
            <label class="mp-field">渠道类型 <span class="mp-required">*</span><select name="channelType" required>${CHANNEL_OPTIONS.map((item) => `<option>${item}</option>`).join('')}</select></label>
            <label class="mp-field full">中文商品标题 <span class="mp-required">*</span><input name="listingTitle" required placeholder="例如：AMD 锐龙7 9700X 盒装处理器"></label>
            <label class="mp-field">标价（元）<input name="listedPrice" inputmode="decimal" type="number" min="0" step="0.01" placeholder="可留空"></label>
            <label class="mp-field">券后价（元）<input name="couponPrice" inputmode="decimal" type="number" min="0" step="0.01" placeholder="可留空"></label>
            <label class="mp-field">最终结算价（元） <span class="mp-required">*</span><input name="checkoutPrice" inputmode="decimal" type="number" min="0.01" step="0.01" required></label>
            <label class="mp-field">运费（元）<input name="shipping" inputmode="decimal" type="number" min="0" step="0.01" value="0"></label>
            <label class="mp-field">店铺名称 <span class="mp-required">*</span><input name="shopName" required placeholder="例如：AMD 京东自营旗舰店"></label>
            <label class="mp-field">查询日期 <span class="mp-required">*</span><input name="observedAt" type="date" required></label>
            <label class="mp-field full">商品链接 <span class="mp-required">*</span><input name="sourceUrl" type="url" required placeholder="粘贴京东、淘宝或天猫商品链接"></label>
            <label class="mp-field full">备注<textarea name="notes" placeholder="PLUS/88VIP、国补、需领券、地区限制等"></textarea></label>
          </div>
          <p class="mp-help">点击提交后会打开 GitHub。请确认并提交 Issue；结算页截图可以在 GitHub 页面中从相册补充。个人结算价会单独标记，不会冒充公开市场价。</p>
          <div class="mp-error" id="manualPriceError"></div>
          <div class="mp-actions"><button class="mp-secondary" type="button" id="copyManualPrice">复制内容</button><button class="mp-submit" type="submit">保存并打开 GitHub</button></div>
        </form>
        <div class="mp-saved"><h3>本机最近记录</h3><div id="manualPriceDrafts"></div></div>
      </section>`;

    document.body.append(button, overlay);
    const form = overlay.querySelector('#manualPriceForm');
    const productSelect = form.elements.productId;
    productSelect.innerHTML = products().map((item) => `<option value="${esc(item.id)}">${esc(item.brand)} ${esc(item.model)}</option>`).join('');
    form.elements.observedAt.value = todayLocal();

    function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; }
    function open(prefill = null) {
      if (prefill) {
        for (const [key, value] of Object.entries(prefill)) if (form.elements[key] && value != null) form.elements[key].value = value;
      }
      overlay.classList.add('open'); document.body.style.overflow = 'hidden';
      setTimeout(() => form.elements.productId.focus(), 50);
    }

    function recordFromForm() {
      const values = Object.fromEntries(new FormData(form).entries());
      return {
        id: `manual-${Date.now()}`,
        productId: values.productId,
        platform: values.platform,
        channelType: values.channelType,
        listingTitle: values.listingTitle.trim(),
        listedPrice: numberOrNull(values.listedPrice),
        couponPrice: numberOrNull(values.couponPrice),
        checkoutPrice: numberOrNull(values.checkoutPrice),
        shipping: numberOrNull(values.shipping) ?? 0,
        shopName: values.shopName.trim(),
        observedAt: values.observedAt,
        sourceUrl: values.sourceUrl.trim(),
        notes: values.notes.trim()
      };
    }

    function validate(record) {
      if (!record.productId || !record.platform || !record.listingTitle || !record.shopName || !record.observedAt || !record.sourceUrl) return '请填写所有带 * 的字段。';
      if (!(record.checkoutPrice > 0)) return '最终结算价必须大于 0。';
      if (!allowedStoreUrl(record.sourceUrl, record.platform)) return '商品链接域名与所选平台不匹配。';
      if (record.listedPrice != null && record.listedPrice < record.checkoutPrice) return '标价通常不应低于最终结算价，请检查输入。';
      if (record.couponPrice != null && record.couponPrice < record.checkoutPrice) return '券后价低于结算价时，请在备注中说明运费或其他费用。';
      return '';
    }

    function renderDrafts() {
      const host = overlay.querySelector('#manualPriceDrafts');
      const drafts = loadDrafts();
      if (!drafts.length) { host.innerHTML = '<div class="mp-help">暂无本机记录。</div>'; return; }
      host.innerHTML = drafts.slice(0, 5).map((record) => {
        const product = products().find((item) => item.id === record.productId);
        return `<div class="mp-draft"><div><strong>${esc(product?.model || record.productId)}</strong><br><small>${esc(record.platform)} · ¥${esc(record.checkoutPrice)} · ${esc(record.observedAt)}</small></div><div><button type="button" data-resubmit="${esc(record.id)}">重新提交</button> <button type="button" data-delete="${esc(record.id)}">删除</button></div></div>`;
      }).join('');
      host.querySelectorAll('[data-resubmit]').forEach((item) => item.addEventListener('click', () => {
        const record = loadDrafts().find((draft) => draft.id === item.dataset.resubmit);
        if (record) open(record);
      }));
      host.querySelectorAll('[data-delete]').forEach((item) => item.addEventListener('click', () => {
        saveDrafts(loadDrafts().filter((draft) => draft.id !== item.dataset.delete)); renderDrafts();
      }));
    }

    async function copyRecord() {
      const record = recordFromForm();
      const error = validate(record);
      const errorBox = overlay.querySelector('#manualPriceError');
      if (error) { errorBox.textContent = error; errorBox.classList.add('show'); return; }
      const url = buildIssue(record);
      try { await navigator.clipboard.writeText(url); errorBox.textContent = 'GitHub 提交链接已复制。'; errorBox.classList.add('show'); }
      catch { errorBox.textContent = '无法访问剪贴板，请使用“保存并打开 GitHub”。'; errorBox.classList.add('show'); }
    }

    button.addEventListener('click', () => open());
    overlay.querySelector('.mp-close').addEventListener('click', close);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
    overlay.querySelector('#copyManualPrice').addEventListener('click', copyRecord);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const record = recordFromForm();
      const error = validate(record);
      const errorBox = overlay.querySelector('#manualPriceError');
      if (error) { errorBox.textContent = error; errorBox.classList.add('show'); return; }
      errorBox.classList.remove('show');
      const drafts = loadDrafts().filter((item) => !(item.productId === record.productId && item.platform === record.platform && item.observedAt === record.observedAt));
      drafts.unshift(record); saveDrafts(drafts); renderDrafts();
      const issueUrl = buildIssue(record);
      const opened = window.open(issueUrl, '_blank', 'noopener');
      if (!opened) window.location.href = issueUrl;
    });
    renderDrafts();
  }

  function boot() {
    if (!window.PC_PROCUREMENT_DATA?.catalog?.products?.length) return setTimeout(boot, 150);
    if (!document.body) return addEventListener('DOMContentLoaded', boot, { once: true });
    injectUi();
  }
  boot();
})();
