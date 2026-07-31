(() => {
  const EXACT = {
    "2027 Graduation Build": "2027 毕业装机计划",
    "PC Procurement Dashboard": "PC 硬件采购仪表盘",
    "Compare Japan and China using landed cost in CNY, track product launches, and keep recommendations tied to dated evidence.": "以人民币到手价比较日本与中国渠道，持续跟踪新品发布，并让每项购买建议都有可追溯的日期与来源。",
    "Toggle theme": "切换主题",
    "Import monthly JSON": "导入月度 JSON",
    "Export data": "导出数据",
    "JPY → CNY": "日元 → 人民币",
    "Tracked products": "跟踪产品",
    "Verified quotes": "已验证报价",
    "Purchase window": "计划购买时间",
    "Mar–Apr 2027": "2027年3–4月",
    "Monthly discovery + repricing": "每月扫描新品并更新价格",
    "Dynamic candidate catalog": "动态候选产品库",
    "Search": "搜索",
    "Category": "类别",
    "Status": "状态",
    "Sort": "排序",
    "All": "全部",
    "New": "新品",
    "Active": "在售",
    "Watch": "观察",
    "Retired": "退市",
    "Fit score": "适配评分",
    "Best verified price": "最低已验证价",
    "Newest": "最新发布",
    "Model A–Z": "型号 A–Z",
    "Candidate": "候选产品",
    "Fit": "适配度",
    "Recommended channel": "推荐购买渠道",
    "Evidence": "依据",
    "Basket": "配置单",
    "Missing data stays missing": "未核实价格保持为空",
    "New-product and market radar": "新品与市场动态",
    "Monthly discovery layer": "每月新品扫描",
    "Scenario controls": "方案设置",
    "Build budget (CNY)": "整机预算（人民币）",
    "FX override: 1 JPY in CNY": "手动汇率：1 日元兑换人民币",
    "No components selected.": "尚未选择配件。",
    "Clear basket": "清空配置单",
    "Decision posture": "当前决策建议",
    "Prioritize flexible architecture now; delay irreversible SKU choices until pricing is verified.": "现阶段优先确定可升级的平台架构；等价格完成验证后，再锁定不可逆的具体型号。",
    "Selected build basket": "已选配置单",
    "Procurement rules": "采购规则",
    "Data status": "数据状态",
    "Retailer pages frequently hide coupon or checkout pricing. A monthly update should record list price, checkout price, stock, date and source separately.": "零售页面经常隐藏优惠券价或结算价。月度更新会分别记录标价、结算价、库存、日期与来源。",
    "Verified direct/retailer quote": "直接/零售商报价已验证",
    "Observed through aggregator": "通过价格聚合站观察",
    "Japan — warranty/logistics": "日本购买——保修与物流更方便",
    "China — verify official store": "中国购买——优先核实官方旗舰店",
    "Await two-country quotes": "等待中日两地报价",
    "No verified quote": "暂无已验证报价",
    "Official specifications only": "仅有官方规格",
    "Specification target; SKU pending": "仅确定规格目标，具体型号待定",
    "Remove": "移除",
    "Add": "加入",
    "No products match the filters.": "没有符合筛选条件的产品。",
    "No verified quotes in this snapshot.": "当前快照中暂无已验证报价。",
    "Open source": "查看来源",
    "Source": "来源",
    "Latest snapshot": "最新数据快照",
    "FX and retailer evidence are versioned together.": "汇率与零售报价依据按同一版本保存。",
    "Country coverage": "国家/地区覆盖",
    "None": "无",
    "China price extraction remains incomplete in the seed snapshot.": "初始快照中的中国渠道价格仍不完整。",
    "Products with quotes": "已有报价的产品",
    "Unquoted products are candidates, not price recommendations.": "没有报价的产品只是候选项，不代表价格推荐。",
    "Unpriced": "暂无价格",
    "Needs verified Japan and China quotes": "需要补充中日两地的已验证报价",
    "Add candidates from the table.": "请从候选产品表中加入配件。",
    "Incomplete basket": "配置单价格不完整",
    "Do not treat the subtotal as a build total. Missing price evidence must be resolved first.": "不要把当前小计视为整机总价；应先补齐缺失的价格依据。",
    "Over budget": "超出预算",
    "Rebalance CPU/GPU tiers or wait for a verified purchase window.": "可以下调 CPU/GPU 档位，或等待更合适且已验证的购买窗口。",
    "Scenario is price-complete": "方案价格已完整",
    "Compare landed cost and warranty risk before choosing purchase country.": "选择购买国家前，应同时比较到手价与保修风险。",
    "Build the candidate architecture now; lock exact SKUs closer to March 2027.": "现在先确定候选平台架构，接近 2027 年 3 月时再锁定具体型号。",
    "Monthly data imported": "月度数据已导入",
    "Invalid dashboard package": "无效的仪表盘数据包",
    "Japan": "日本",
    "China": "中国",
    "in-stock": "有货",
    "observed": "已观察",
    "verified": "已验证",
    "aggregator-observed": "聚合站观察值",
    "new": "新品",
    "active": "在售",
    "watch": "观察",
    "retired": "退市",
    "market-risk": "市场风险",
    "new-product": "新品",
    "new-platform": "新平台",
    "CPU": "CPU",
    "GPU": "GPU",
    "Motherboard": "主板",
    "Memory": "内存",
    "SSD": "SSD",
    "PSU": "电源",
    "Cooler": "散热器",
    "Case": "机箱",
    "balanced": "均衡",
    "efficient": "高能效",
    "upgradeable": "可升级",
    "gaming": "游戏",
    "premium": "高端",
    "productivity": "生产力",
    "1440p": "2K 游戏",
    "1440p-ultra": "2K 极高画质",
    "4k": "4K",
    "cuda": "CUDA",
    "value": "性价比",
    "16gb": "16GB 显存",
    "gigabyte": "技嘉",
    "am5": "AM5",
    "wifi7": "Wi-Fi 7",
    "baseline": "基础配置",
    "upgrade-later": "后续升级",
    "2tb": "2TB",
    "tLC": "TLC",
    "buy-in-japan": "建议日本购买",
    "warranty": "保修",
    "future-gpu": "预留显卡升级",
    "china-value": "中国渠道性价比",
    "air-cooling": "风冷",
    "shipping": "运输",
    "Strong mixed-use baseline for gaming, MATLAB/Python and a long-lived AM5 build.": "适合游戏、MATLAB/Python 与长期使用的均衡 AM5 基础方案。",
    "Gaming-first option; only worth the premium if GPU and monitor targets justify it.": "偏重游戏性能；只有显卡与显示器目标足以体现优势时，溢价才值得。",
    "Track pricing, but avoid paying a launch premium unless performance-per-yuan is compelling.": "持续观察价格；除非每元性能明显突出，否则不支付首发溢价。",
    "Useful comparison point, but platform longevity and total board cost must beat AM5.": "可作为对照方案，但平台寿命与主板总成本必须优于 AM5 才值得选择。",
    "Natural target for gaming plus CUDA-enabled personal projects, subject to VRAM and price.": "适合游戏与 CUDA 个人项目的自然候选，但需要重点评估显存和价格。",
    "Longer VRAM headroom, but current memory-driven GPU inflation may make it poor value.": "16GB 显存更有余量，但内存成本推动的显卡涨价可能使其性价比偏低。",
    "Potentially the rational fallback if 5070-class pricing remains distorted.": "如果 RTX 5070 档价格持续失真，这可能是更理性的替代方案。",
    "Strong VRAM and raster alternative; compare software compatibility with CUDA needs.": "显存与光栅性能较强，但需要结合 CUDA 软件兼容需求比较。",
    "A practical AORUS anchor if Japanese warranty pricing is reasonable.": "若日本渠道含保修价格合理，可作为实用的 AORUS 主板基准。",
    "Start at 32 GB; preserve two free DIMM slots only if board topology and stability support it.": "先从 32GB 起步；只有主板拓扑与稳定性允许时，才优先保留两个空闲 DIMM 插槽。",
    "Avoid overpaying for Gen5 unless real workloads benefit; exact model remains dynamic.": "除非实际工作负载确实受益，否则无需为 PCIe 5.0 SSD 多付钱；具体型号保持动态选择。",
    "Buy locally in Japan unless a globally warranted Chinese-channel deal is exceptional.": "原则上在日本本地购买；只有中国渠道价格极具优势且支持全球保修时再例外考虑。",
    "A category where China pricing often justifies buying domestically and carrying to Japan.": "该品类中国渠道通常更有性价比，适合在国内购买后带回日本。",
    "Buy in Japan to avoid cross-border bulk shipping and damage risk.": "建议在日本购买，以避免跨境大件运输成本与损坏风险。",
    "AMD EXPO preferred; exact SKU selected by monthly pricing and QVL": "优先选择 AMD EXPO；具体型号根据月度价格与主板 QVL 决定",
    "TLC NAND, DRAM or proven HMB design, strong sustained performance": "TLC NAND，带 DRAM 或成熟 HMB 方案，持续性能良好",
    "Native 12V-2x6, 80 Plus Gold, 10-year-class warranty preferred": "原生 12V-2x6、80 Plus 金牌，优先选择约 10 年保修",
    "Exact Peerless Assassin / Phantom Spirit successor chosen at purchase time": "购买时根据价格选择 Peerless Assassin、Phantom Spirit 或其后继型号",
    "Front mesh, ≥360 mm GPU clearance, easy filters, sensible shipping size": "前面板网孔、显卡限长至少 360mm、滤网易清洁、运输尺寸合理",
    "China RTX 50 board pricing moved sharply higher": "中国 RTX 50 系列板卡价格大幅上调",
    "Recent distributor-list changes indicate severe volatility; do not assume China is automatically cheaper for GPUs.": "近期经销商价格表变化显示波动剧烈，不能再默认显卡在中国渠道一定更便宜。",
    "GeForce RTX 5050 entered the lower end of the RTX 50 family": "GeForce RTX 5050 进入 RTX 50 系列入门档",
    "The candidate universe must be refreshed monthly rather than hard-coded around 5060/5070-class cards.": "候选产品库必须每月刷新，不能长期固定在 RTX 5060/5070 档。",
    "AMD launched Ryzen 9 9950X3D2 Dual Edition": "AMD 发布 Ryzen 9 9950X3D2 Dual Edition",
    "Not a default recommendation for this build, but confirms that the Ryzen 9000 desktop catalog is still evolving.": "它不是本次装机的默认推荐，但说明 Ryzen 9000 桌面产品线仍在变化。",
    "AMD expanded Ryzen AI 400 to desktop OEM systems": "AMD 将 Ryzen AI 400 扩展至桌面 OEM 系统",
    "Track whether retail DIY variants or compelling small-form-factor systems alter the desktop-vs-laptop decision.": "需要继续观察零售 DIY 版本或高性价比小型主机是否会改变台式机与笔记本的选择。",
    "Intel added Core Ultra 270K Plus and 250K/KF Plus desktop processors": "Intel 新增 Core Ultra 270K Plus 与 250K/KF Plus 桌面处理器",
    "Monthly discovery must monitor both new SKUs and platform-level value changes.": "月度扫描既要跟踪新型号，也要评估平台整体性价比的变化。",
    "Compare landed cost, not sticker price": "比较到手价，而不是标价",
    "Include exchange rate, checkout discounts, shipping, tax, baggage or forwarding cost and realistic warranty return cost.": "综合考虑汇率、结算优惠、运费、税费、行李或转运成本，以及现实的保修寄回成本。",
    "Discover products before repricing": "先发现新品，再更新价格",
    "Every monthly cycle adds new releases, flags discontinued products and avoids a frozen model list.": "每个月都要加入新发布产品、标记停产型号，避免候选清单长期固定。",
    "Weight warranty by failure impact": "根据故障影响权衡保修价值",
    "PSU, motherboard, GPU and display receive a larger local-warranty penalty than CPU, RAM or air cooling.": "电源、主板、显卡和显示器比 CPU、内存或风冷散热器更需要重视本地保修。",
    "Missing price is not zero": "缺失价格不等于零元",
    "A retailer quote appears only when source, date, stock and price type are recorded.": "只有在来源、日期、库存和价格类型都记录完整时，零售报价才会显示。"
  };

  const CATEGORY = {
    CPU: "CPU", GPU: "GPU", Motherboard: "主板", Memory: "内存",
    SSD: "SSD", PSU: "电源", Cooler: "散热器", Case: "机箱"
  };

  function translate(input) {
    const text = String(input || "").trim();
    if (!text) return text;
    if (Object.prototype.hasOwnProperty.call(EXACT, text)) return EXACT[text];
    let match;
    if ((match = text.match(/^(\d+) products$/))) return `${match[1]} 款产品`;
    if ((match = text.match(/^(\d+) marked new$/))) return `其中 ${match[1]} 款为新品`;
    if ((match = text.match(/^Newest (\d+) days old$/))) return `最新报价更新于 ${match[1]} 天前`;
    if ((match = text.match(/^(\d+)d old$/))) return `${match[1]} 天前`;
    if ((match = text.match(/^(Japan|China) — current verified lead$/))) return `${match[1] === "Japan" ? "日本" : "中国"}——当前已验证价格更低`;
    if ((match = text.match(/^(.+) verified subtotal · (\d+) item\(s\) missing price$/))) return `${match[1]} 已验证小计 · ${match[2]} 个配件缺少价格`;
    if ((match = text.match(/^(CPU|GPU|Motherboard|Memory|SSD|PSU|Cooler|Case):\s*(.+)$/))) return `${CATEGORY[match[1]]}: ${match[2]}`;
    if (text.startsWith("Japan ·")) return text.replace(/^Japan/, "日本");
    if (text.startsWith("China ·")) return text.replace(/^China/, "中国");
    if (text === "No quotes") return "暂无报价";
    return text;
  }

  function translateTextNodes(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement && ["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) continue;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (!trimmed) continue;
      const translated = translate(trimmed);
      if (translated !== trimmed) node.nodeValue = raw.replace(trimmed, translated);
    }
  }

  function applyAttributes() {
    document.documentElement.lang = "zh-CN";
    document.title = "PC 硬件采购仪表盘";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = "中日电脑硬件价格、汇率与采购渠道动态比较仪表盘。";
    const search = document.getElementById("searchInput");
    if (search) search.placeholder = "型号、品牌、标签…";
  }

  function quoteCostCny(quote, rate) {
    const local = Number(quote.checkoutPrice || 0) + Number(quote.shipping || 0);
    return quote.currency === "JPY" ? local * rate : local;
  }

  function applySourceNativeListingTitles() {
    const data = window.PC_PROCUREMENT_DATA;
    if (!data || !data.snapshots || !data.snapshots.snapshots) return;
    const snapshot = [...data.snapshots.snapshots].sort((a, b) => b.date.localeCompare(a.date))[0];
    if (!snapshot) return;
    const rate = snapshot.fx.JPY_CNY;
    const sorted = [...snapshot.quotes].sort((a, b) => quoteCostCny(a, rate) - quoteCostCny(b, rate));
    document.querySelectorAll("#quoteGrid .quote").forEach((card, index) => {
      const title = card.querySelector(".list-title span:first-child");
      const quote = sorted[index];
      if (title && quote && quote.listingTitle) title.textContent = quote.listingTitle;
    });
  }

  let observer;
  let scheduled = false;
  function localize() {
    scheduled = false;
    if (observer) observer.disconnect();
    applyAttributes();
    translateTextNodes();
    applySourceNativeListingTitles();
    if (observer) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  function scheduleLocalization() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(localize);
  }

  if (document.body) {
    observer = new MutationObserver(scheduleLocalization);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    scheduleLocalization();
  } else {
    addEventListener("DOMContentLoaded", () => {
      observer = new MutationObserver(scheduleLocalization);
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      scheduleLocalization();
    }, { once: true });
  }
})();
