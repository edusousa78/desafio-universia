import pandas as pd
import json
import os

excel_path = os.path.join("dataset", "Financial Sample.xlsx")

SEGMENT_MAP = {
    "Government": "Governo",
    "Small Business": "Pequenas Empresas",
    "Channel Partners": "Parceiros de Canal",
    "Midmarket": "Médias Empresas",
    "Enterprise": "Corporativo"
}

COUNTRY_MAP = {
    "United States of America": "Estados Unidos",
    "Canada": "Canadá",
    "France": "França",
    "Germany": "Alemanha",
    "Mexico": "México"
}

def analyze():
    print("Carregando Financial Sample.xlsx...")
    df = pd.read_excel(excel_path)
    
    df.columns = [c.strip() for c in df.columns]
    
    # Map segment and country names to PT-BR
    df["Segment_PT"] = df["Segment"].map(lambda s: SEGMENT_MAP.get(s, s))
    df["Country_PT"] = df["Country"].map(lambda c: COUNTRY_MAP.get(c, c))
    
    total_sales = float(df["Sales"].sum())
    total_units = float(df["Units Sold"].sum())
    total_profit = float(df["Profit"].sum())
    total_discounts = float(df["Discounts"].sum())
    total_cogs = float(df["COGS"].sum())
    total_gross_sales = float(df["Gross Sales"].sum())
    profit_margin_pct = (total_profit / total_sales) * 100 if total_sales > 0 else 0
    
    country_agg = df.groupby("Country_PT").agg({
        "Sales": "sum",
        "Units Sold": "sum",
        "Profit": "sum",
        "Gross Sales": "sum",
        "COGS": "sum"
    }).reset_index().rename(columns={"Country_PT": "Country"})
    
    country_agg["Profit Margin %"] = (country_agg["Profit"] / country_agg["Sales"]) * 100
    country_summary = country_agg.to_dict(orient="records")
    
    segment_agg = df.groupby("Segment_PT").agg({
        "Profit": "sum",
        "Sales": "sum",
        "Units Sold": "sum",
        "Discounts": "sum"
    }).reset_index().rename(columns={"Segment_PT": "Segment"})
    
    segment_agg["Profit Margin %"] = (segment_agg["Profit"] / segment_agg["Sales"]) * 100
    segment_summary = segment_agg.to_dict(orient="records")
    
    product_agg = df.groupby("Product").agg({
        "Sales": "sum",
        "Profit": "sum",
        "Units Sold": "sum"
    }).reset_index()
    product_summary = product_agg.to_dict(orient="records")
    
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
        
    print("\n--- VISÃO GERAL DE KPIS ---")
    print(f"Vendas Totais: R$ {total_sales:,.2f}")
    print(f"Unidades Vendidas: {total_units:,.2f}")
    print(f"Lucro Líquido: R$ {total_profit:,.2f}")
    print(f"Margem de Lucro: {profit_margin_pct:.2f}%")
    
    print("\n--- VISUAL MAPA 1 & 2: RESUMO POR PAÍS ---")
    for row in country_summary:
        print(f"País: {row['Country']} | Vendas: R$ {row['Sales']:,.2f} | Unidades: {row['Units Sold']:,.2f} | Lucro: R$ {row['Profit']:,.2f} | Margem: {row['Profit Margin %']:.2f}%")
        
    print("\n--- VISUAL PIZZA: LUCRO POR SEGMENTO ---")
    for row in segment_summary:
        print(f"Segmento: {row['Segment']} | Lucro: R$ {row['Profit']:,.2f} | Participação: {(row['Profit']/total_profit)*100:.2f}%")

if __name__ == "__main__":
    analyze()
