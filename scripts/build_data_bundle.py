#!/usr/bin/env python3
"""Build browser-loadable dashboard data and copy the localization layer."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
OUT = ROOT / "data-bundle.js"
LOCALIZATION_SOURCE = ROOT / "ui" / "localization.js"
LOCALIZATION_OUT = ROOT / "localization.js"


def load(name: str) -> dict:
    with (DATA_DIR / name).open("r", encoding="utf-8") as f:
        return json.load(f)


def main() -> None:
    payload = {
        "catalog": load("catalog.json"),
        "snapshots": load("snapshots.json"),
        "events": load("events.json"),
        "market": load("market.json"),
    }
    OUT.write_text(
        "window.PC_PROCUREMENT_DATA = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    if LOCALIZATION_SOURCE.exists():
        shutil.copyfile(LOCALIZATION_SOURCE, LOCALIZATION_OUT)
    print(f"Wrote {OUT}")
    if LOCALIZATION_SOURCE.exists():
        print(f"Wrote {LOCALIZATION_OUT}")


if __name__ == "__main__":
    main()
