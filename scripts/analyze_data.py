import pandas as pd
import json
import os

excel_path = os.path.join("dataset", "Financial Sample.xlsx")

def analyze():
    print("Loading Financial Sample.xlsx...")
    df = pd.read_excel(excel_path)
    
    # Strip whitespace from column names if any
    df.columns = [c.strip() for c in df.columns]
    
    # Calculate overall KPIs
    total_sales = float(df["Sales"].sum())
    total_units = float(df["Units Sold"].sum())
    total_profit = float(df["Profit"].sum())
    total_discounts = float(df["Discounts"].sum())
    total_cogs = float(df["COGS"].sum())
    total_gross_sales = float(df["Gross Sales"].sum())
    profit_margin_pct = (total_profit / total_sales) * 100 if total_sales > 0 else 0
    
    # Page 3 Visual 1 & 2: By Country
    country_agg = df.groupby("Country").agg({
        "Sales": "sum",
        "Units Sold": "sum",
        "Profit": "sum",
        "Gross Sales": "sum",
        "COGS": "sum"
    }).reset_index()
    
    country_agg["Profit Margin %"] = (country_agg["Profit"] / country_agg["Sales"]) * 100
    country_summary = country_agg.to_dict(orient="records")
    
    # Page 3 Visual 3: Profit by Segment
    segment_agg = df.groupby("Segment").agg({
        "Profit": "sum",
        "Sales": "sum",
        "Units Sold": "sum",
        "Discounts": "sum"
    }).reset_index()
    
    segment_agg["Profit Margin %"] = (segment_agg["Profit"] / segment_agg["Sales"]) * 100
    segment_summary = segment_agg.to_dict(orient="records")
    
    # Product performance
    product_agg = df.groupby("Product").agg({
        "Sales": "sum",
        "Profit": "sum",
        "Units Sold": "sum"
    }).reset_index()
    product_summary = product_agg.to_dict(orient="records")
    
    # Monthly trend
    df["YearMonth"] = df["Date"].dt.strftime("%Y-%m")
    trend_agg = df.groupby(["YearMonth", "Year", "Month Name"]).agg({
        "Sales": "sum",
        "Profit": "sum"
    }).reset_index().sort_values("YearMonth")
    trend_summary = trend_agg.to_dict(orient="records")
    
    summary = {
        "kpis": {
            "total_sales": total_sales,
            "total_units_sold": total_units,
            "total_profit": total_profit,
            "total_discounts": total_discounts,
            "total_cogs": total_cogs,
            "total_gross_sales": total_gross_sales,
            "profit_margin_pct": round(profit_margin_pct, 2)
        },
        "by_country": country_summary,
        "by_segment": segment_summary,
        "by_product": product_summary,
        "monthly_trend": trend_summary
    }
    
    out_path = "verification_results.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
        
    print("\n--- KPI OVERVIEW ---")
    print(f"Total Sales: ${total_sales:,.2f}")
    print(f"Total Units Sold: {total_units:,.2f}")
    print(f"Total Profit: ${total_profit:,.2f}")
    print(f"Profit Margin: {profit_margin_pct:.2f}%")
    
    print("\n--- VISUAL MAPA 1 & 2: COUNTRY SUMMARY ---")
    for row in country_summary:
        print(f"Country: {row['Country']} | Sales: ${row['Sales']:,.2f} | Units: {row['Units Sold']:,.2f} | Profit: ${row['Profit']:,.2f} | Margin: {row['Profit Margin %']:.2f}%")
        
    print("\n--- VISUAL PIZZA: PROFIT BY SEGMENT ---")
    for row in segment_summary:
        print(f"Segment: {row['Segment']} | Profit: ${row['Profit']:,.2f} | Share: {(row['Profit']/total_profit)*100:.2f}%")

if __name__ == "__main__":
    analyze()
