# 📊 Desafio Power BI Analyst - DIO & Universia

[![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)](https://powerbi.microsoft.com/)
[![DAX](https://img.shields.io/badge/DAX-Analysis_Services-blue?style=for-the-badge&logo=microsoft)](https://learn.microsoft.com/dax/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![HTML5/CSS3/JS](https://img.shields.io/badge/Web_Dashboard-Interactive-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#-dashboard-web-interativo-réplica)
[![DIO](https://img.shields.io/badge/DIO-Bootcamp_Power_BI-00C86F?style=for-the-badge)](https://dio.me)

> **Projeto Prático do Bootcamp Power BI Analyst (DIO & Universia)**  
> Repositório de referência do expert: [julianazanelatto/power_bi_analyst](https://github.com/julianazanelatto/power_bi_analyst)

---

## 📌 Sumário Executivo

Este projeto consiste na replicação e expansão de um relatório analítico financeiro construído no **Power BI Desktop**, utilizando o conjunto de dados **Financial Sample**.

Além de reproduzir as páginas 1 e 2 apresentadas durante as aulas, este repositório traz a solução do **desafio prático da Página 3**, focando na construção de visuais de mapas interativos, análise de lucro por segmento de mercado, customização de dicas de ferramentas (*tooltips*), formatação visual avançada e publicação do relatório com integração no **Microsoft PowerPoint**.

---

## 🖥️ Dashboard Web Interativo (Réplica)

Para facilitar a visualização por recrutadores e avaliadores da DIO sem a necessidade de abrir o Power BI Desktop, este repositório inclui uma **réplica web interativa em HTML5/CSS3/JS** acessível diretamente no navegador:

👉 **Para visualizar no navegador:** Abra o arquivo [`index.html`](file:///f:/Desktop/ESTUDOS-DIVERSOS/desafio-universia/index.html) na raiz do projeto.

---

## 📈 Estrutura do Relatório (3 Páginas)

### 📄 Página 1: Visão Geral de Vendas (Sales Overview)
- **Cards de KPI Superior**:
  - **Vendas Totais (*Total Sales*)**: `$118,726,350.26` (~`$118.73M`)
  - **Unidades Vendidas (*Units Sold*)**: `1,125,806` (~`1.13M unidades`)
  - **Lucro Líquido (*Total Profit*)**: `$16,893,702.26` (~`$16.89M`)
  - **Total de Descontos**: `$9,205,248.24` (`7.75%` das vendas brutas)
- **Evolução Mensal (Gráfico de Colunas e Linhas)**: Comparativo da evolução das vendas brutas com o lucro líquido mês a mês.
- **Vendas por Segmento (Gráfico de Barras)**: Distribuição do volume financeiro de vendas entre os 5 segmentos de mercado.
- **Segmentadores de Dados (Filtros Interativos)**: Filtros por Ano, País e Segmento.

---

### 📄 Página 2: Análise de Produtos e Lucratividade
- **Lucro por Produto e Faixa de Desconto (Gráfico de Colunas Clusterizadas)**: Comparação do desempenho financeiro dos produtos (`Paseo`, `VTT`, `Amarilla`, `Velo`, `Carretera`, `Montana`) cruzado com as faixas de desconto (*None*, *Low*, *Medium*, *High*).
- **Matriz de Performance de Produtos (Tabela Detalhada)**:
  - Exibição de Unidades Vendidas, Receita de Vendas, Custo de Fabricação (`COGS`), Lucro Líquido e Margem de Lucro (%).
  - Formatação condicional para destaque instantâneo de margens superiores a 15%.

---

### 📄 Página 3: Análise Geográfica & Lucro por Segmento (Desafio Exclusivo DIO)

A página 3 foi desenhada especificamente para atender aos requisitos de criação autônoma de visuais:

#### 1. Visual Mapa 1: Soma de Vendas & Unidades Vendidas por País
- **Tipo de Visual**: Mapa de Bolhas (*Bubble Map*).
- **Localização**: `Country`.
- **Tamanho da Bolha**: `Total Vendas` (`Sales`).
- **Dicas de Ferramentas (*Tooltips*)**: `Total Unidades Vendidas` e `Vendas Brutas` (`Gross Sales`).
- **Título Formatado**: *"Distribuição Global: Vendas e Unidades por País"*.

#### 2. Visual Mapa 2: Soma de Lucro (Profit) por País
- **Tipo de Visual**: Mapa de Mancha / Bolhas Gradiente (*Filled Map / Color Bubble Map*).
- **Localização**: `Country`.
- **Tamanho / Gradiente de Cor**: `Total Lucro` (`Profit`).
- **Dicas de Ferramentas (*Tooltips*)**: `Margem de Lucro %` e `Total Vendas`.
- **Título Formatado**: *"Lucratividade Global: Lucro Total por País"*.

#### 3. Visual Pizza / Rosca: Lucro por Segmento de Mercado
- **Tipo de Visual**: Gráfico de Rosca (*Donut Chart*).
- **Legenda**: `Segment`.
- **Valores**: `Total Lucro` (`Profit`).
- **Rótulos de Dados**: Exibição do Valor em USD e Porcentagem do Total.
- **Título Formatado**: *"Participação do Lucro por Segmento de Mercado"*.

---

## 🔢 Resumo Numérico das Métricas (Validação dos Dados)

Tabelas consolidadas via script Python ([`scripts/analyze_data.py`](file:///f:/Desktop/ESTUDOS-DIVERSOS/desafio-universia/scripts/analyze_data.py)):

### Performance por País (Visuais de Mapa 1 e 2)
| País | Vendas Totais ($) | Unidades Vendidas | Lucro Líquido ($) | Margem de Lucro (%) |
| :--- | :---: | :---: | :---: | :---: |
| 🇺🇸 **Estados Unidos** | `$25,029,830.16` | `232,627.5` | `$2,995,540.67` | `11.97%` |
| 🇨🇦 **Canadá** | `$24,887,654.89` | `247,428.5` | `$3,529,228.88` | `14.18%` |
| 🇫🇷 **França** | `$24,354,172.28` | `240,931.0` | `$3,781,020.78` | `15.53%` |
| 🇩🇪 **Alemanha** | `$23,505,340.82` | `201,494.0` | `$3,680,388.82` | `15.66%` |
| 🇲🇽 **México** | `$20,949,352.11` | `203,325.0` | `$2,907,523.11` | `13.88%` |
| **TOTAL GLOBAL** | **`$118,726,350.26`** | **`1,125,806.0`** | **`$16,893,702.26`** | **`14.23%`** |

### Participação de Lucro por Segmento (Visual Pizza/Rosca)
| Segmento de Mercado | Lucro Líquido ($) | Participação no Lucro (%) | Participação no Volume de Vendas |
| :--- | :---: | :---: | :---: |
| 🏛️ **Government** | `$11,388,173.17` | **`67.41%`** *(Líder de Mercado)* | `44.22%` |
| 🏬 **Small Business** | `$4,143,168.50` | **`24.52%`** | `35.73%` |
| 🤝 **Channel Partners** | `$1,316,803.14` | **`7.79%`** | `1.52%` |
| 🏢 **Midmarket** | `$660,103.07` | **`3.91%`** | `2.01%` |
| 🏭 **Enterprise** | `-$614,545.62` | **`-3.64%`** *(Operação com Prejuízo)* | `16.52%` |

---

## 🧮 Medidas DAX Utilizadas

Todas as fórmulas DAX criadas no projeto estão disponíveis no arquivo [`dax/medidas_dax.txt`](file:///f:/Desktop/ESTUDOS-DIVERSOS/desafio-universia/dax/medidas_dax.txt):

```dax
// Total de Vendas
Total Vendas = SUM('financials'[Sales])

// Total de Unidades Vendidas
Total Unidades Vendidas = SUM('financials'[Units Sold])

// Total de Lucro
Total Lucro = SUM('financials'[Profit])

// Margem de Lucro Percentual
Margem de Lucro % = DIVIDE([Total Lucro], [Total Vendas], 0)

// Total de Descontos
Total Descontos = SUM('financials'[Discounts])

// Custo de Produtos Vendidos (COGS)
Total COGS = SUM('financials'[COGS])
```

---

## 📁 Estrutura de Arquivos do Repositório

```
desafio-universia/
├── dataset/
│   ├── Financial Sample.xlsx        # Dataset base utilizado no Power BI
│   ├── Business Unit.csv
│   ├── Customer.csv
│   └── Dates.csv
├── assets/
│   ├── clean blue.png               # Plano de fundo azul para Power BI
│   ├── clean white.png              # Plano de fundo claro para Power BI
│   └── logo_dio.png                 # Logotipo oficial da DIO
├── dax/
│   └── medidas_dax.txt              # Coleção de fórmulas DAX prontas
├── docs/
│   └── GUIA_PASSO_A_PASSO.md        # Tutorial detalhado para recriação no Power BI Desktop
├── scripts/
│   └── analyze_data.py              # Script Python para validação das agregações dos mapas e visuais
├── index.html                       # Réplica interativa Web do relatório (HTML5)
├── styles.css                       # Estilização CSS3 (Modo Escuro / Claro / Glassmorphism)
├── app.js                          # Engine JS interativo com gráficos SVG e mapas
├── verification_results.json        # Arquivo JSON com o resultado dos cálculos
└── README.md                        # Documentação oficial do projeto
```

---

## 🚀 Como Executar e Replicar Este Projeto

### 1. No Power BI Desktop
1. Clone este repositório:
   ```bash
   git clone https://github.com/edusousa78/desafio-universia.git
   ```
2. Abra o **Power BI Desktop**.
3. Siga o tutorial completo passo a passo disponível em [`docs/GUIA_PASSO_A_PASSO.md`](file:///f:/Desktop/ESTUDOS-DIVERSOS/desafio-universia/docs/GUIA_PASSO_A_PASSO.md).

### 2. Publicação e Suplemento PowerPoint
1. No Power BI Desktop, salve e clique em **Publicar (Publish)** para o **Meu Workspace**.
2. No Power BI Service (`app.powerbi.com`), acesse o relatório publicado.
3. Clique em **Exportar -> PowerPoint -> Embutir dados em tempo real**.
4. Cole a URL no suplemento do PowerPoint (**Inserir -> Suplementos -> Power BI**).

### 3. Validação dos Dados via Python
Se desejar reexecutar os cálculos estatísticos:
```bash
python scripts/analyze_data.py
```

---

## 🤝 Créditos e Agradecimentos

- **Instituição**: Digital Innovation One (DIO) & Universia / Santander
- **Instrutora / Expert**: Juliana Zanelatto
- **Repositório de Referência**: [julianazanelatto/power_bi_analyst](https://github.com/julianazanelatto/power_bi_analyst)
