# PC Procurement Data

Structured market data for the Japan–China PC Procurement Dashboard.

This repository is the monthly-updated data source for:

- Product catalog and lifecycle status
- Japan and China retailer price snapshots
- JPY/CNY exchange-rate observations
- Market and product-release events
- Procurement rules and user build profile

The public dashboard is hosted separately at:

https://bobabybeater3547.github.io/pc-procurement-dashboard/

## Data contract

The dashboard consumes these files:

- `data/catalog.json`
- `data/snapshots.json`
- `data/events.json`
- `data/market.json`
- `data-bundle.js`

Run `python scripts/validate_data.py` and then `python scripts/build_data_bundle.py` after any manual data change.
