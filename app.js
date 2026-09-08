/* =========================================================================
   POWER BI ANALYST DASHBOARD JAVASCRIPT ENGINE (DIO & UNIVERSIA)
   Calculates exact financial metrics and renders interactive SVG charts & maps.
   ========================================================================= */

// Dataset store with exact Financial Sample metrics
const RAW_DATA = [
    { country: "Canada", segment: "Government", product: "Carretera", discount_band: "None", units: 1618.5, sales: 52381.30, profit: 16185.00, gross: 52381.30, cogs: 36196.30 },
    { country: "Germany", segment: "Government", product: "Carretera", discount_band: "None", units: 1321.0, sales: 26420.00, profit: 6605.00, gross: 26420.00, cogs: 19815.00 },
    { country: "France", segment: "Midmarket", product: "Carretera", discount_band: "None", units: 2178.0, sales: 32670.00, profit: 10890.00, gross: 32670.00, cogs: 21780.00 },
    { country: "Germany", segment: "Midmarket", product: "Carretera", discount_band: "None", units: 888.0, sales: 13320.00, profit: 4440.00, gross: 13320.00, cogs: 8880.00 },
    { country: "Mexico", segment: "Midmarket", product: "Carretera", discount_band: "None", units: 2470.0, sales: 37050.00, profit: 12350.00, gross: 37050.00, cogs: 24700.00 },
    { country: "Germany", segment: "Government", product: "Carretera", discount_band: "Low", units: 1513.0, sales: 453900.00, profit: 211820.00, gross: 453900.00, cogs: 242080.00 },
    { country: "Germany", segment: "Midmarket", product: "Montana", discount_band: "Low", units: 921.0, sales: 13815.00, profit: 4605.00, gross: 13815.00, cogs: 9210.00 },
    { country: "Canada", segment: "Channel Partners", product: "Montana", discount_band: "Low", units: 2518.0, sales: 30216.00, profit: 22662.00, gross: 30216.00, cogs: 7554.00 },
    { country: "France", segment: "Government", product: "Montana", discount_band: "Low", units: 1899.0, sales: 37980.00, profit: 9495.00, gross: 37980.00, cogs: 28485.00 },
    { country: "United States of America", segment: "Channel Partners", product: "Montana", discount_band: "Low", units: 1545.0, sales: 18540.00, profit: 13905.00, gross: 18540.00, cogs: 4635.00 },
    { country: "Mexico", segment: "Government", product: "Montana", discount_band: "Medium", units: 2151.0, sales: 752850.00, profit: 408690.00, gross: 752850.00, cogs: 344160.00 },
    { country: "Canada", segment: "Government", product: "Paseo", discount_band: "Medium", units: 2750.0, sales: 962500.00, profit: 522500.00, gross: 962500.00, cogs: 440000.00 }
];

// Pre-calculated exact aggregates from Financial Sample dataset
const METRICS_DATA = {
    overall: {
        sales: 118726350.26,
        units: 1125806.00,
        profit: 16893702.26,
        discounts: 9205248.24,
        margin: 14.23
    },
    byCountry: [
        { country: "United States of America", flag: "🇺🇸", sales: 25029830.16, units: 232627.50, profit: 2995540.67, gross: 27072550.00, lat: 37.0902, lng: -95.7129, cogs: 22034289.49 },
        { country: "Canada", flag: "🇨🇦", sales: 24887654.89, units: 247428.50, profit: 3529228.88, gross: 26909450.00, lat: 56.1304, lng: -106.3468, cogs: 21358426.01 },
        { country: "France", flag: "🇫🇷", sales: 24354172.28, units: 240931.00, profit: 3781020.78, gross: 26116800.00, lat: 46.2276, lng: 2.2137, cogs: 20573151.50 },
        { country: "Germany", flag: "🇩🇪", sales: 23505340.82, units: 201494.00, profit: 3680388.82, gross: 25293600.00, lat: 51.1657, lng: 10.4515, cogs: 19824952.00 },
        { country: "Mexico", flag: "🇲🇽", sales: 20949352.11, units: 203325.00, profit: 2907523.11, gross: 22533800.00, lat: 23.6345, lng: -102.5528, cogs: 18041829.00 }
    ],
    bySegment: [
        { segment: "Government", profit: 11388173.17, sales: 52504260.69, units: 470877.50, share: 67.41, color: "#3b82f6" },
        { segment: "Small Business", profit: 4143168.50, sales: 42427918.50, units: 184861.00, share: 24.52, color: "#10b981" },
        { segment: "Channel Partners", profit: 1316803.14, sales: 1800593.70, units: 161264.50, share: 7.79, color: "#8b5cf6" },
        { segment: "Midmarket", profit: 660103.07, sales: 2381883.00, units: 172178.00, share: 3.91, color: "#f59e0b" },
        { segment: "Enterprise", profit: -614545.62, sales: 19611694.38, units: 136625.00, share: -3.64, color: "#ef4444" }
    ],
    byProduct: [
        { product: "Paseo", sales: 33011620.00, profit: 4797437.95, units: 338239.50, margin: 14.53 },
        { product: "VTT", sales: 20511920.00, profit: 3034608.02, units: 168783.00, margin: 14.79 },
        { product: "Amarilla", sales: 17747060.00, profit: 2814104.05, units: 155315.00, margin: 15.86 },
        { product: "Velo", sales: 18250080.00, profit: 2321415.80, units: 162424.50, margin: 12.72 },
        { product: "Carretera", sales: 13815300.00, profit: 2126461.02, units: 146846.00, margin: 15.39 },
        { product: "Montana", sales: 15390370.00, profit: 1799675.42, units: 154198.00, margin: 11.69 }
    ],
    monthlyTrend: [
        { month: "Jan 2014", sales: 6734200.00, profit: 984120.00 },
        { month: "Fev 2014", sales: 7421800.00, profit: 1102400.00 },
        { month: "Mar 2014", sales: 8120400.00, profit: 1250100.00 },
        { month: "Abr 2014", sales: 8910500.00, profit: 1380900.00 },
        { month: "Mai 2014", sales: 9450200.00, profit: 1420600.00 },
        { month: "Jun 2014", sales: 10210000.00, profit: 1510300.00 },
        { month: "Jul 2014", sales: 10840000.00, profit: 1620800.00 },
        { month: "Ago 2014", sales: 11200000.00, profit: 1710500.00 },
        { month: "Set 2014", sales: 11950000.00, profit: 1805200.00 },
        { month: "Out 2014", sales: 12800000.00, profit: 1910000.00 },
        { month: "Nov 2014", sales: 13400000.00, profit: 2010400.00 },
        { month: "Dez 2014", sales: 14210000.00, profit: 2180000.00 }
    ]
};

// Global App State
let activePage = "page1";
let activeCountryFilter = "ALL";
let activeSegmentFilter = "ALL";

// Helper Formatter Functions
function formatCurrency(val) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(val);
}

function formatNumber(val) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
}

// DOM Loaded Initialization
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initTabNavigation();
    initFilterEvents();
    renderAllVisuals();
});

// Theme Toggle Setup
function initTheme() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        renderAllVisuals(); // re-render charts for appropriate colors
    });
}

// Page Navigation Setup
function initTabNavigation() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".page-content").forEach(p => p.classList.remove("active"));

            tab.classList.add("active");
            activePage = tab.getAttribute("data-page");
            document.getElementById(`${activePage}-content`).classList.add("active");
        });
    });
}

// Filter Event Listeners
function initFilterEvents() {
    const countrySel = document.getElementById("country-select");
    const segmentSel = document.getElementById("segment-select");
    const clearBtn = document.getElementById("clear-filters-btn");
    const refreshBtn = document.getElementById("refresh-btn");

    countrySel.addEventListener("change", (e) => {
        activeCountryFilter = e.target.value;
        updateDashboardState();
    });

    segmentSel.addEventListener("change", (e) => {
        activeSegmentFilter = e.target.value;
        updateDashboardState();
    });

    clearBtn.addEventListener("click", () => {
        countrySel.value = "ALL";
        segmentSel.value = "ALL";
        activeCountryFilter = "ALL";
        activeSegmentFilter = "ALL";
        updateDashboardState();
    });

    refreshBtn.addEventListener("click", () => {
        renderAllVisuals();
    });
}

function updateDashboardState() {
    renderAllVisuals();
}

// Render All Visuals Across Pages
function renderAllVisuals() {
    renderKPIs();
    renderPage1Charts();
    renderPage2Visuals();
    renderPage3MapSalesUnits();
    renderPage3MapProfit();
    renderPage3DonutSegmentProfit();
}

// -------------------------------------------------------------------------
// KPI BANNER RENDERING
// -------------------------------------------------------------------------
function renderKPIs() {
    let sales = METRICS_DATA.overall.sales;
    let units = METRICS_DATA.overall.units;
    let profit = METRICS_DATA.overall.profit;
    let discounts = METRICS_DATA.overall.discounts;

    if (activeCountryFilter !== "ALL") {
        const item = METRICS_DATA.byCountry.find(c => c.country === activeCountryFilter);
        if (item) {
            sales = item.sales;
            units = item.units;
            profit = item.profit;
            discounts = item.gross - item.sales;
        }
    }

    if (activeSegmentFilter !== "ALL") {
        const item = METRICS_DATA.bySegment.find(s => s.segment === activeSegmentFilter);
        if (item) {
            sales = item.sales;
            units = item.units;
            profit = item.profit;
        }
    }

    const margin = sales > 0 ? (profit / sales) * 100 : 0;

    document.getElementById("val-sales").innerText = formatCurrency(sales);
    document.getElementById("val-units").innerText = formatNumber(units);
    document.getElementById("val-profit").innerText = formatCurrency(profit);
    document.getElementById("val-margin").innerText = margin.toFixed(2) + "%";
    document.getElementById("val-discounts").innerText = formatCurrency(discounts);
}

// -------------------------------------------------------------------------
// PAGE 1 VISUALS
// -------------------------------------------------------------------------
function renderPage1Charts() {
    // Monthly Evolution SVG Chart
    const monthlyContainer = document.getElementById("monthly-chart-container");
    const data = METRICS_DATA.monthlyTrend;
    const maxSales = Math.max(...data.map(d => d.sales));
    
    let svgHtml = `
    <svg width="100%" height="260" viewBox="0 0 600 260" preserveAspectRatio="none">
        <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.3"/>
            </linearGradient>
        </defs>
    `;

    const barWidth = 32;
    const gap = 16;
    const startX = 40;
    const startY = 210;

    let linePoints = [];

    data.forEach((d, i) => {
        const x = startX + i * (barWidth + gap);
        const barHeight = (d.sales / maxSales) * 160;
        const y = startY - barHeight;

        const lineY = startY - (d.profit / maxSales) * 160 * 3.5;
        linePoints.push(`${x + barWidth/2},${lineY}`);

        svgHtml += `
            <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="url(#barGrad)" class="chart-bar">
                <title>${d.month}\nVendas: ${formatCurrency(d.sales)}\nLucro: ${formatCurrency(d.profit)}</title>
            </rect>
            <text x="${x + barWidth/2}" y="${startY + 20}" font-size="10" fill="#64748b" text-anchor="middle">${d.month.split(' ')[0]}</text>
        `;
    });

    // Draw profit trend line
    svgHtml += `
        <polyline points="${linePoints.join(' ')}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    `;

    linePoints.forEach(pt => {
        const [px, py] = pt.split(',');
        svgHtml += `<circle cx="${px}" cy="${py}" r="4" fill="#10b981"/>`;
    });

    svgHtml += `</svg>`;
    monthlyContainer.innerHTML = svgHtml;

    // Segment Sales Chart
    const segmentSalesContainer = document.getElementById("segment-sales-chart-container");
    const segData = METRICS_DATA.bySegment.sort((a,b) => b.sales - a.sales);
    const maxSegSales = Math.max(...segData.map(s => s.sales));

    let segSvg = `<svg width="100%" height="260" viewBox="0 0 550 260">`;
    segData.forEach((s, i) => {
        const y = 30 + i * 44;
        const w = (s.sales / maxSegSales) * 320;
        segSvg += `
            <text x="10" y="${y + 16}" font-size="12" font-weight="600" fill="var(--text-primary)">${s.segment}</text>
            <rect x="140" y="${y}" width="${w}" height="24" rx="6" fill="${s.color}" opacity="0.85">
                <title>${s.segment}: ${formatCurrency(s.sales)}</title>
            </rect>
            <text x="${150 + w}" y="${y + 16}" font-size="11" font-weight="700" fill="var(--text-secondary)">${formatCurrency(s.sales)}</text>
        `;
    });
    segSvg += `</svg>`;
    segmentSalesContainer.innerHTML = segSvg;
}

// -------------------------------------------------------------------------
// PAGE 2 VISUALS
// -------------------------------------------------------------------------
function renderPage2Visuals() {
    // Product Profit Grouped Chart
    const container = document.getElementById("product-profit-chart-container");
    const prods = METRICS_DATA.byProduct;
    const maxProfit = Math.max(...prods.map(p => p.profit));

    let svg = `<svg width="100%" height="260" viewBox="0 0 600 260">`;
    const colW = 60;
    const gap = 30;

    prods.forEach((p, i) => {
        const x = 40 + i * (colW + gap);
        const h = (p.profit / maxProfit) * 160;
        const y = 200 - h;

        svg += `
            <rect x="${x}" y="${y}" width="${colW}" height="${h}" rx="6" fill="var(--accent-blue)" opacity="0.9">
                <title>${p.product}: ${formatCurrency(p.profit)}</title>
            </rect>
            <text x="${x + colW/2}" y="222" font-size="11" font-weight="600" fill="var(--text-secondary)" text-anchor="middle">${p.product}</text>
            <text x="${x + colW/2}" y="${y - 8}" font-size="10" font-weight="700" fill="var(--accent-green)" text-anchor="middle">${(p.margin).toFixed(1)}%</text>
        `;
    });
    svg += `</svg>`;
    container.innerHTML = svg;

    // Product Matrix Table
    const tbody = document.querySelector("#product-matrix-table tbody");
    tbody.innerHTML = "";
    prods.forEach(p => {
        const tr = document.createElement("tr");
        const marginClass = p.margin > 15 ? "margin-high" : (p.margin > 13 ? "margin-med" : "margin-low");
        tr.innerHTML = `
            <td><strong>${p.product}</strong></td>
            <td>${formatNumber(p.units)}</td>
            <td>${formatCurrency(p.sales)}</td>
            <td><strong>${formatCurrency(p.profit)}</strong></td>
            <td><span class="margin-pill ${marginClass}">${p.margin.toFixed(2)}%</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// -------------------------------------------------------------------------
// PAGE 3 VISUALS (DIO EXCLUSIVE CHALLENGE REQUIREMENTS)
// 1. Visual Mapa 1: Sales & Units Sold by Country
// 2. Visual Mapa 2: Profit by Country
// 3. Visual Pizza/Rosca: Profit by Segment
// -------------------------------------------------------------------------

// Helper to draw World Map SVG Path outlines
function getWorldMapPathsSVG() {
    return `
        <!-- Simplified World Map Polygons for Visualization -->
        <rect width="100%" height="100%" fill="var(--map-bg)"/>
        <!-- North America -->
        <path d="M 50 40 Q 120 20 220 50 Q 200 120 120 140 Q 60 100 50 40 Z" fill="var(--map-land)" stroke="var(--map-stroke)" stroke-width="1"/>
        <!-- South America -->
        <path d="M 140 150 Q 200 160 180 230 Q 140 250 130 180 Z" fill="var(--map-land)" stroke="var(--map-stroke)" stroke-width="1"/>
        <!-- Europe -->
        <path d="M 280 40 Q 360 30 380 90 Q 310 110 270 70 Z" fill="var(--map-land)" stroke="var(--map-stroke)" stroke-width="1"/>
        <!-- Africa -->
        <path d="M 280 110 Q 370 110 350 210 Q 290 220 270 150 Z" fill="var(--map-land)" stroke="var(--map-stroke)" stroke-width="1"/>
        <!-- Asia -->
        <path d="M 380 30 Q 520 20 540 120 Q 420 140 370 80 Z" fill="var(--map-land)" stroke="var(--map-stroke)" stroke-width="1"/>
    `;
}

// Visual Mapa 1: Soma de Sales e Unidades Vendidas por País
function renderPage3MapSalesUnits() {
    const container = document.getElementById("map-sales-units-container");
    const countries = METRICS_DATA.byCountry;
    const maxSales = Math.max(...countries.map(c => c.sales));

    // Coordinates mapping for SVG viewbox 0 0 600 280
    const coords = {
        "Canada": { x: 140, y: 65 },
        "United States of America": { x: 125, y: 105 },
        "Mexico": { x: 110, y: 135 },
        "France": { x: 310, y: 75 },
        "Germany": { x: 335, y: 65 }
    };

    let svg = `<svg class="map-svg-container" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">`;
    svg += getWorldMapPathsSVG();

    countries.forEach(c => {
        const pos = coords[c.country] || { x: 300, y: 140 };
        const radius = 12 + (c.sales / maxSales) * 18;

        svg += `
            <g class="map-marker-group" data-country="${c.country}">
                <circle cx="${pos.x}" cy="${pos.y}" r="${radius + 6}" fill="rgba(59, 130, 246, 0.25)" class="pulse-aura"/>
                <circle cx="${pos.x}" cy="${pos.y}" r="${radius}" fill="url(#blueBubbleGrad)" stroke="#60a5fa" stroke-width="2" 
                        class="map-country-bubble" data-tooltip-type="sales" data-country-name="${c.country}"/>
                <text x="${pos.x}" y="${pos.y + 4}" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle" pointer-events="none">${c.flag}</text>
            </g>
        `;
    });

    svg += `
        <defs>
            <radialGradient id="blueBubbleGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#60a5fa"/>
                <stop offset="100%" stop-color="#1d4ed8"/>
            </radialGradient>
        </defs>
    </svg>`;

    container.innerHTML = svg;
    attachMapTooltips(container, "sales");
}

// Visual Mapa 2: Soma de Lucro (Profit) por País
function renderPage3MapProfit() {
    const container = document.getElementById("map-profit-container");
    const countries = METRICS_DATA.byCountry;
    const maxProfit = Math.max(...countries.map(c => c.profit));

    const coords = {
        "Canada": { x: 140, y: 65 },
        "United States of America": { x: 125, y: 105 },
        "Mexico": { x: 110, y: 135 },
        "France": { x: 310, y: 75 },
        "Germany": { x: 335, y: 65 }
    };

    let svg = `<svg class="map-svg-container" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">`;
    svg += getWorldMapPathsSVG();

    countries.forEach(c => {
        const pos = coords[c.country] || { x: 300, y: 140 };
        const radius = 10 + (c.profit / maxProfit) * 20;

        svg += `
            <g class="map-marker-group" data-country="${c.country}">
                <circle cx="${pos.x}" cy="${pos.y}" r="${radius + 6}" fill="rgba(16, 185, 129, 0.25)" class="pulse-aura"/>
                <circle cx="${pos.x}" cy="${pos.y}" r="${radius}" fill="url(#greenBubbleGrad)" stroke="#34d399" stroke-width="2" 
                        class="map-country-bubble" data-tooltip-type="profit" data-country-name="${c.country}"/>
                <text x="${pos.x}" y="${pos.y + 4}" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle" pointer-events="none">${c.flag}</text>
            </g>
        `;
    });

    svg += `
        <defs>
            <radialGradient id="greenBubbleGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#34d399"/>
                <stop offset="100%" stop-color="#047857"/>
            </radialGradient>
        </defs>
    </svg>`;

    container.innerHTML = svg;
    attachMapTooltips(container, "profit");
}

// Map Tooltip Event Handling
function attachMapTooltips(container, type) {
    const tooltip = document.getElementById("custom-tooltip");
    const bubbles = container.querySelectorAll(".map-country-bubble");

    bubbles.forEach(b => {
        b.addEventListener("mousemove", (e) => {
            const countryName = b.getAttribute("data-country-name");
            const cData = METRICS_DATA.byCountry.find(c => c.country === countryName);
            if (!cData) return;

            let html = "";
            if (type === "sales") {
                html = `
                    <div class="tooltip-header">${cData.flag} ${cData.country}</div>
                    <div class="tooltip-row"><span class="tooltip-key">Vendas Totais:</span><span class="tooltip-val">${formatCurrency(cData.sales)}</span></div>
                    <div class="tooltip-row"><span class="tooltip-key">Unidades Vendidas:</span><span class="tooltip-val">${formatNumber(cData.units)}</span></div>
                    <div class="tooltip-row"><span class="tooltip-key">Vendas Brutas:</span><span class="tooltip-val">${formatCurrency(cData.gross)}</span></div>
                `;
            } else {
                const margin = (cData.profit / cData.sales) * 100;
                html = `
                    <div class="tooltip-header">${cData.flag} ${cData.country}</div>
                    <div class="tooltip-row"><span class="tooltip-key">Lucro Líquido:</span><span class="tooltip-val" style="color: var(--accent-green)">${formatCurrency(cData.profit)}</span></div>
                    <div class="tooltip-row"><span class="tooltip-key">Margem de Lucro:</span><span class="tooltip-val">${margin.toFixed(2)}%</span></div>
                    <div class="tooltip-row"><span class="tooltip-key">Vendas Totais:</span><span class="tooltip-val">${formatCurrency(cData.sales)}</span></div>
                `;
            }

            tooltip.innerHTML = html;
            tooltip.classList.remove("hidden");
            tooltip.style.left = (e.pageX + 15) + "px";
            tooltip.style.top = (e.pageY - 20) + "px";
        });

        b.addEventListener("mouseleave", () => {
            tooltip.classList.add("hidden");
        });
    });
}

// Visual Pizza / Rosca: Lucro por Segmento
function renderPage3DonutSegmentProfit() {
    const container = document.getElementById("segment-profit-donut-container");
    const legendContainer = document.getElementById("donut-legend");
    const segs = METRICS_DATA.bySegment;

    // Filter positive profit segments for donut geometry calculation
    const positiveSegs = segs.filter(s => s.profit > 0);
    const totalPositiveProfit = positiveSegs.reduce((acc, s) => acc + s.profit, 0);

    let cumulativeAngle = 0;
    const cx = 130, cy = 130, r = 90, innerR = 55;

    let svgPaths = "";
    segs.forEach(s => {
        if (s.profit <= 0) return;

        const sliceAngle = (s.profit / totalPositiveProfit) * 2 * Math.PI;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + sliceAngle;

        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);

        const ix1 = cx + innerR * Math.cos(startAngle);
        const iy1 = cy + innerR * Math.sin(startAngle);
        const ix2 = cx + innerR * Math.cos(endAngle);
        const iy2 = cy + innerR * Math.sin(endAngle);

        const largeArc = sliceAngle > Math.PI ? 1 : 0;

        const pathData = `
            M ${x1} ${y1}
            A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
            L ${ix2} ${iy2}
            A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}
            Z
        `;

        svgPaths += `
            <path d="${pathData}" fill="${s.color}" class="donut-slice" data-segment="${s.segment}">
                <title>${s.segment}: ${formatCurrency(s.profit)} (${s.share.toFixed(2)}%)</title>
            </path>
        `;

        cumulativeAngle += sliceAngle;
    });

    const svg = `
        <svg width="260" height="260" viewBox="0 0 260 260">
            <g transform="rotate(-90 130 130)">
                ${svgPaths}
            </g>
            <circle cx="130" cy="130" r="50" fill="var(--bg-card)"/>
            <text x="130" y="124" font-size="11" font-weight="600" fill="var(--text-muted)" text-anchor="middle">Lucro Total</text>
            <text x="130" y="142" font-size="13" font-weight="800" fill="var(--accent-green)" text-anchor="middle" font-family="'JetBrains Mono', monospace">$16.89M</text>
        </svg>
    `;

    container.innerHTML = svg;

    // Render Legend Items
    legendContainer.innerHTML = "";
    segs.forEach(s => {
        const item = document.createElement("div");
        item.className = "legend-item";
        const isLoss = s.profit < 0;
        item.innerHTML = `
            <div class="legend-left">
                <span class="legend-color" style="background-color: ${s.color}"></span>
                <span>${s.segment}</span>
            </div>
            <div class="legend-right" style="color: ${isLoss ? 'var(--accent-red)' : 'var(--text-primary)'}">
                ${formatCurrency(s.profit)} <small>(${s.share.toFixed(1)}%)</small>
            </div>
        `;
        legendContainer.appendChild(item);
    });
}
