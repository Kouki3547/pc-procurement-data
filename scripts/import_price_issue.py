#!/usr/bin/env python3
"""Import one structured manual-price GitHub Issue into snapshots.json."""
from __future__ import annotations

import argparse
import json
import re
import sys
from copy import deepcopy
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
MARKER = "pc-price-submission:v1"
ALLOWED_PLATFORMS = {"京东", "淘宝", "天猫"}
ALLOWED_HOSTS = {
    "京东": ("jd.com", "3.cn"),
    "淘宝": ("taobao.com", "tmall.com"),
    "天猫": ("tmall.com", "taobao.com"),
}


class SubmissionError(ValueError):
    pass


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def extract_payload(body: str) -> dict:
    if MARKER not in body:
        raise SubmissionError(f"缺少 {MARKER} 标记。")
    blocks = re.findall(r"```json\s*(\{.*?\})\s*```", body, flags=re.DOTALL | re.IGNORECASE)
    if not blocks:
        raise SubmissionError("未找到有效的 JSON 数据块。")
    try:
        payload = json.loads(blocks[0])
    except json.JSONDecodeError as error:
        raise SubmissionError(f"JSON 无法解析：{error}") from error
    return payload


def normalized_url(raw: object, platform: str) -> str:
    value = re.sub(r"\s+", "", str(raw or ""))
    try:
        parsed = urlsplit(value)
    except ValueError as error:
        raise SubmissionError("商品链接格式无效。") from error
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise SubmissionError("商品链接必须是 http/https URL。")
    host = (parsed.hostname or "").lower()
    roots = ALLOWED_HOSTS[platform]
    if not any(host == root or host.endswith("." + root) for root in roots):
        raise SubmissionError("商品链接域名与所选平台不匹配。")
    return value


def optional_number(value: object, name: str) -> float | int | None:
    if value is None or value == "":
        return None
    if not isinstance(value, (int, float)) or isinstance(value, bool) or value < 0:
        raise SubmissionError(f"{name} 必须是非负数字或 null。")
    return value


def validate_payload(payload: dict, known_products: set[str]) -> dict:
    if payload.get("schemaVersion") != 1:
        raise SubmissionError("schemaVersion 必须为 1。")
    if payload.get("submissionType") != "personal-checkout":
        raise SubmissionError("submissionType 必须为 personal-checkout。")

    product_id = str(payload.get("productId") or "")
    if product_id not in known_products:
        raise SubmissionError(f"未知 productId：{product_id}")

    platform = str(payload.get("platform") or "")
    if platform not in ALLOWED_PLATFORMS:
        raise SubmissionError("平台必须为京东、淘宝或天猫。")

    checkout = payload.get("checkoutPrice")
    if not isinstance(checkout, (int, float)) or isinstance(checkout, bool) or checkout <= 0:
        raise SubmissionError("checkoutPrice 必须大于 0。")

    observed_at = str(payload.get("observedAt") or "")
    try:
        date.fromisoformat(observed_at)
    except ValueError as error:
        raise SubmissionError("observedAt 必须为 YYYY-MM-DD。") from error

    listing_title = str(payload.get("listingTitle") or "").strip()
    shop_name = str(payload.get("shopName") or "").strip()
    channel_type = str(payload.get("channelType") or "").strip()
    if not listing_title or not shop_name or not channel_type:
        raise SubmissionError("listingTitle、shopName 和 channelType 不得为空。")

    source_url = normalized_url(payload.get("sourceUrl"), platform)
    listed = optional_number(payload.get("listedPrice"), "listedPrice")
    coupon = optional_number(payload.get("couponPrice"), "couponPrice")
    shipping = optional_number(payload.get("shipping", 0), "shipping") or 0

    return {
        "productId": product_id,
        "country": "China",
        "platform": platform,
        "listingTitle": listing_title,
        "currency": "CNY",
        "listedPrice": listed,
        "couponPrice": coupon,
        "checkoutPrice": checkout,
        "shipping": shipping,
        "taxIncluded": True,
        "stock": "personal-observed",
        "sourceUrl": source_url,
        "verifiedAt": observed_at,
        "quality": "personal-checkout",
        "shopName": shop_name,
        "channelType": channel_type,
        "notes": payload.get("notes"),
    }


def select_snapshot(snapshots: list[dict], observed_at: str) -> dict:
    for snapshot in snapshots:
        if snapshot.get("date") == observed_at:
            return snapshot
    if not snapshots:
        raise SubmissionError("没有可继承汇率信息的历史快照。")
    latest = max(snapshots, key=lambda item: item.get("date", ""))
    snapshot = {
        "date": observed_at,
        "fx": deepcopy(latest["fx"]),
        "quotes": [],
        "coverageNotes": ["This snapshot was created from a personal checkout-price submission; FX metadata was inherited from the latest available market snapshot."],
    }
    snapshots.append(snapshot)
    return snapshot


def import_issue(event: dict) -> tuple[dict, bool]:
    issue = event.get("issue") or {}
    title = str(issue.get("title") or "")
    body = str(issue.get("body") or "")
    if not title.startswith("[价格提交]") and MARKER not in body:
        raise SubmissionError("该 Issue 不是价格提交。")

    catalog = load_json(DATA_DIR / "catalog.json")
    snapshots_doc = load_json(DATA_DIR / "snapshots.json")
    known_products = {item["id"] for item in catalog.get("products", [])}
    quote = validate_payload(extract_payload(body), known_products)
    quote["submissionIssue"] = issue.get("html_url") or issue.get("url")

    snapshot = select_snapshot(snapshots_doc.setdefault("snapshots", []), quote["verifiedAt"])
    quotes = snapshot.setdefault("quotes", [])

    duplicate_key = (
        quote["productId"], quote["platform"], quote["shopName"],
        quote["verifiedAt"], quote["quality"],
    )
    old = [
        item for item in quotes
        if (
            item.get("productId"), item.get("platform"), item.get("shopName"),
            item.get("verifiedAt"), item.get("quality"),
        ) == duplicate_key
    ]
    changed = not old or old[0] != quote
    quotes[:] = [
        item for item in quotes
        if (
            item.get("productId"), item.get("platform"), item.get("shopName"),
            item.get("verifiedAt"), item.get("quality"),
        ) != duplicate_key
    ]
    quotes.append(quote)
    snapshot["quotes"] = quotes
    snapshots_doc["snapshots"] = sorted(snapshots_doc["snapshots"], key=lambda item: item["date"])

    (DATA_DIR / "snapshots.json").write_text(
        json.dumps(snapshots_doc, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return quote, changed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--event", required=True, type=Path)
    args = parser.parse_args()
    event = load_json(args.event)
    try:
        quote, changed = import_issue(event)
    except SubmissionError as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(2) from error
    print(json.dumps({"status": "success", "changed": changed, "quote": quote}, ensure_ascii=False))


if __name__ == "__main__":
    main()
