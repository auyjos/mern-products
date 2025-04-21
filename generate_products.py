#!/usr/bin/env python3
import csv
import time

import requests
from bs4 import BeautifulSoup

# ——— CONFIG —————————————————————————————————————————————————————
SEARCH_QUERY = "graphics+card"     # change to e.g. "cpu", "motherboard", etc.
BASE_URL     = f"https://www.newegg.com/p/pl?d={SEARCH_QUERY}"
OUTPUT_CSV   = "newegg_hardware.csv"
USER_AGENT   = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

# ——— FUNCTIONS ——————————————————————————————————————————————————

def fetch_page(url):
    """GET the page HTML, with a realistic User-Agent."""
    headers = {"User-Agent": USER_AGENT}
    resp = requests.get(url, headers=headers, timeout=10)
    resp.raise_for_status()
    return resp.text

def parse_products(html, limit=40):
    """Parse product entries, fix lazy-loaded images, and return dicts."""
    soup = BeautifulSoup(html, "html.parser")

    # 1) Pre-load lazy images: copy data-src into src
    for img in soup.find_all("img", attrs={"data-src": True}):
        img["src"] = img["data-src"]

    # 2) Select the product cells
    items = soup.select("div.item-cell")[:limit]
    out   = []

    for item in items:
        # extract the title
        name_el = item.select_one("a.item-title")
        title   = name_el.get_text(strip=True) if name_el else ""

        # extract the image (now in src)
        img_el = item.select_one("img")
        image  = img_el.get("src", "") if img_el else ""

        # extract price parts
        price_el = item.select_one("li.price-current")
        if price_el and price_el.strong and price_el.sup:
            doll  = price_el.strong.get_text(strip=True)  # e.g. "1,299"
            cents = price_el.sup.get_text(strip=True)     # e.g. "99"
        else:
            doll, cents = "0", "00"

        # clean and convert price to integer dollars
        doll_clean = doll.replace(",", "")
        cents_clean = cents.replace(".", "")
        full_price_str = f"{doll_clean}.{cents_clean}"
        try:
            price_int = int(float(full_price_str))
        except ValueError:
            price_int = 0

        out.append({
            "name":  title,
            "price": price_int,
            "image": image
        })

    return out

def write_csv(records, filename):
    """Write a list of dicts to a CSV file with headers name,price,image."""
    fieldnames = ["name", "price", "image"]
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for rec in records:
            writer.writerow(rec)
    print(f"✅ Wrote {len(records)} products to {filename}")

# ——— MAIN ——————————————————————————————————————————————————————

def main():
    print(f"Fetching Newegg search for '{SEARCH_QUERY}'…")
    html = fetch_page(BASE_URL)
    products = parse_products(html, limit=20)
    if not products:
        print("⚠️  No products found; site structure may have changed.")
    else:
        write_csv(products, OUTPUT_CSV)

if __name__ == "__main__":
    main()
