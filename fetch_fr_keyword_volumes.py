#!/usr/bin/env python3
"""Read-only: pull historical search volumes for French loyalty-card keywords
(France market) via Google Ads KeywordPlanIdeaService. No campaign changes."""
import csv
import sys
from pathlib import Path

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

CONFIG = "/Users/danielgruederich/Documents/Claude projects/halfen-conversion/.secrets/google-ads.yaml"
CUSTOMER_ID = "6587531752"            # Bonuskarte account (658-753-1752), accessed directly
FRANCE_GEO = "geoTargetConstants/2250"  # France
KEYWORDS_FILE = "/Users/danielgruederich/Documents/Claude projects/bonuskarte-digital/fr-paris-keywords.txt"
OUT_CSV = "/Users/danielgruederich/Documents/Claude projects/bonuskarte-digital/fr-paris-keyword-volumes.csv"


def main() -> None:
    keywords = [l.strip() for l in Path(KEYWORDS_FILE).read_text().splitlines() if l.strip()]
    client = GoogleAdsClient.load_from_storage(CONFIG)
    client.login_customer_id = CUSTOMER_ID  # direkter Zugriff auf Bonuskarte (nicht via MCC)
    svc = client.get_service("KeywordPlanIdeaService")

    req = client.get_type("GenerateKeywordHistoricalMetricsRequest")
    req.customer_id = CUSTOMER_ID
    req.keywords.extend(keywords)
    req.geo_target_constants.append(FRANCE_GEO)
    req.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    # language omitted -> all languages (matches "Alle Sprachen")

    resp = svc.generate_keyword_historical_metrics(request=req)

    rows = []
    for r in resp.results:
        m = r.keyword_metrics
        rows.append({
            "keyword": r.text,
            "avg_monthly_searches": (m.avg_monthly_searches if m else 0) or 0,
            "competition": (m.competition.name if m else ""),
            "competition_index": (m.competition_index if m else ""),
            "low_bid_eur": round(m.low_top_of_page_bid_micros / 1e6, 2) if (m and m.low_top_of_page_bid_micros) else "",
            "high_bid_eur": round(m.high_top_of_page_bid_micros / 1e6, 2) if (m and m.high_top_of_page_bid_micros) else "",
        })

    rows.sort(key=lambda x: x["avg_monthly_searches"], reverse=True)

    with open(OUT_CSV, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "avg_monthly_searches", "competition",
                                          "competition_index", "low_bid_eur", "high_bid_eur"])
        w.writeheader()
        w.writerows(rows)

    print(f"{'KEYWORD':45} {'O/Monat':>8}  {'WETTBEWERB':<10} {'CPC-hoch':>8}")
    print("-" * 78)
    for r in rows:
        print(f"{r['keyword']:45} {r['avg_monthly_searches']:>8}  {r['competition']:<10} {str(r['high_bid_eur']):>8}")

    returned = {r["keyword"] for r in rows}
    missing = [k for k in keywords if k not in returned]
    if missing:
        print("\nKein Volumen zurueckgegeben:")
        for k in missing:
            print("  -", k)

    print(f"\nCSV gespeichert: {OUT_CSV}")
    print(f"Geo: France (2250) | Konto: {CUSTOMER_ID} | Keywords: {len(keywords)} | Treffer: {len(rows)}")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as ex:
        print("GoogleAdsException:")
        for err in ex.failure.errors:
            print("  -", err.error_code, "|", err.message)
        sys.exit(1)
    except Exception as e:  # noqa: BLE001
        print("FEHLER:", type(e).__name__, "|", str(e)[:800])
        sys.exit(1)
