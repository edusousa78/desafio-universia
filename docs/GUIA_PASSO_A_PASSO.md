# Guia Passo a Passo: Construção do Relatório no Power BI Desktop

Este documento fornece o passo a passo completo para recriar as 3 páginas do relatório financeiro no Power BI Desktop e atender a todas as exigências do desafio DIO & Universia.

---

## 📋 Pré-requisitos
1. **Power BI Desktop** instalado.
2. Arquivo de dados: `dataset/Financial Sample.xlsx`.
3. Imagens de fundo e logotipo (opcional): `assets/clean blue.png`, `assets/clean white.png` e `assets/logo_dio.png`.

---

## 🚀 Passo 1: Importação e Transformação dos Dados no Power Query

1. Abra o **Power BI Desktop**.
2. Clique em **Obter Dados (Get Data) -> Excel Workbook**.
3. Selecione o arquivo `dataset/Financial Sample.xlsx`.
4. Marque a tabela `financials` (ou planilha `Financials`) e clique em **Transformar Dados (Transform Data)**.
5. No **Power Query Editor**:
   - Verifique o tipo de cada coluna:
     - `Segment`, `Country`, `Product`, `Discount Band` -> **Texto**.
     - `Units Sold`, `Manufacturing Price`, `Sale Price`, `Gross Sales`, `Discounts`, `Sales`, `COGS`, `Profit` -> **Número Decimal**.
     - `Date` -> **Data**.
   - Remova espaços em branco das colunas se necessário.
   - Clique em **Fechar e Aplicar (Close & Apply)**.

---

## 📐 Passo 2: Criação das Medidas DAX

Crie uma nova tabela chamada `_Medidas` no Power BI para organizar suas métricas. Adicione as seguintes medidas (disponíveis em `dax/medidas_dax.txt`):

```dax
Total Vendas = SUM('financials'[Sales])
Total Unidades Vendidas = SUM('financials'[Units Sold])
Total Lucro = SUM('financials'[Profit])
Total Descontos = SUM('financials'[Discounts])
Total Vendas Brutas = SUM('financials'[Gross Sales])
Total COGS = SUM('financials'[COGS])

Margem de Lucro % = 
DIVIDE([Total Lucro], [Total Vendas], 0)
```

Formate `Total Vendas`, `Total Lucro` e `Total Descontos` como Moeda (`$ / R$`) e `Margem de Lucro %` como Porcentagem (`0.0%`).

---

## 📄 Passo 3: Construção da Página 1 - Visão Geral de Vendas (Sales Overview)

1. Renomeie a página para: `Visão Geral de Vendas`.
2. **Adicione os Cards de KPI**:
   - Card 1: `Total Vendas` (Título: "Vendas Totais").
   - Card 2: `Total Lucro` (Título: "Lucro Líquido").
   - Card 3: `Total Unidades Vendidas` (Título: "Unidades Vendidas").
   - Card 4: `Margem de Lucro %` (Título: "Margem de Lucro (%)").
3. **Gráfico de Linhas/Colunas**:
   - *Tipo*: Gráfico de Colunas e Linhas Combinado (*Line and Stacked Column Chart*).
   - *Eixo X*: `Date` (Mês/Ano).
   - *Eixo Y de Colunas*: `Total Vendas`.
   - *Eixo Y de Linha*: `Total Lucro`.
   - *Título*: "Evolução Mensal de Vendas e Lucratividade".
4. **Gráfico de Barras**:
   - *Tipo*: Gráfico de Barras Clusterizadas (*Clustered Bar Chart*).
   - *Eixo Y*: `Segment`.
   - *Eixo X*: `Total Vendas`.
   - *Título*: "Volume de Vendas por Segmento de Mercado".
5. **Segmentadores de Dados (Slicers)**:
   - Filtro por `Country` (País).
   - Filtro por `Year` (Ano).

---

## 📄 Passo 4: Construção da Página 2 - Análise de Produtos e Lucratividade

1. Adicione uma nova página e renomeie para: `Análise de Produtos e Lucro`.
2. **Gráfico de Colunas Clusterizadas**:
   - *Tipo*: Gráfico de Colunas Clusterizadas.
   - *Eixo X*: `Product`.
   - *Eixo Y*: `Total Lucro`.
   - *Legenda*: `Discount Band`.
   - *Título*: "Distribuição de Lucro por Produto e Faixa de Desconto".
3. **Tabela / Matriz Detalhada**:
   - *Campos*: `Product`, `Total Unidades Vendidas`, `Preço Médio Fabricação`, `Preço Médio Venda`, `Total Vendas`, `Total Lucro`, `Margem de Lucro %`.
   - *Formatação*: Aplique formatação condicional (Barra de dados ou gradiente de cor) na coluna `Margem de Lucro %`.
   - *Título*: "Demonstrativo Detalhado de Performance por Produto".

---

## 📄 Passo 5: Construção da Página 3 - Distribuição Geográfica e Lucro por Segmento (Desafio Principal)

Esta é a página exigida individualmente pelo desafio DIO.

1. Adicione uma nova página e renomeie para: `Distribuição Geográfica e Lucro`.

2. **Visual Mapa 1: Soma de Vendas e Unidades Vendidas por País**
   - *Tipo de Visual*: Mapa (*Map* / *Bubble Map*).
   - *Localização (Location)*: `Country`.
   - *Tamanho da Bolha (Bubble size)*: `Total Vendas`.
   - *Dicas de Ferramentas (Tooltips)*: 
     - Adicione `Total Unidades Vendidas` (`Units Sold`).
     - Adicione `Total Vendas Brutas` (`Gross Sales`).
   - *Título Personalizado*: "Distribuição Global: Vendas e Unidades por País".
   - *Alinhamento e Estilo*: Ajuste o título para centralizado ou à esquerda com fonte em negrito e tamanho 14pt.

3. **Visual Mapa 2: Soma de Lucro por País**
   - *Tipo de Visual*: Mapa Preenchido ou Mapa com Bolhas de Cor (*Filled Map / Bubble Map*).
   - *Localização (Location)*: `Country`.
   - *Tamanho / Gradiente de Cor*: `Total Lucro`.
   - *Dicas de Ferramentas (Tooltips)*:
     - Adicione `Margem de Lucro %`.
     - Adicione `Total Vendas`.
   - *Título Personalizado*: "Lucratividade por País: Lucro Total em USD".
   - *Alinhamento e Estilo*: Alinhe lado a lado ou na grade superior com o Mapa 1.

4. **Visual 3: Lucro por Segmento (Visual de Pizza / Rosca)**
   - *Tipo de Visual*: Gráfico de Rosca (*Donut Chart*) ou Gráfico de Pizza (*Pie Chart*).
   - *Legenda (Legend)*: `Segment`.
   - *Valores (Values)*: `Total Lucro`.
   - *Rótulos de Dados (Detail Labels)*: Selecione "Valor de exibição e Porcentagem do Total".
   - *Dicas de Ferramentas (Tooltips)*: Adicione `Total Vendas` e `Margem de Lucro %`.
   - *Título Personalizado*: "Participação do Lucro por Segmento de Mercado".

5. **Refinamento de Disposição e Nomenclatura dos Visuais**:
   - Organize os visuais mantendo espaçamentos homogêneos (margens de 10px a 15px).
   - Utilize títulos claros, diretos e sem jargões técnicos brutos (ex: altere "Soma de Profit por Country" para "Lucratividade por País: Lucro Total em USD").
   - Adicione cartões superiores de resumo (Total Lucro, Total Vendas) se houver espaço livre no cabeçalho da página.

---

## 📤 Passo 6: Publicação do Relatório e Compartilhamento no PowerPoint

1. No Power BI Desktop, salve o arquivo como `desafio_power_bi_analyst.pbix`.
2. Clique na aba **Página Inicial (Home)** -> **Publicar (Publish)**.
3. Selecione seu espaço de trabalho (**Meu Workspace / My Workspace**) e confirme a publicação.
4. Após publicar, acesse o **Power BI Service** ([app.powerbi.com](https://app.powerbi.com)).
5. **Para Compartilhar no PowerPoint**:
   - Abra o relatório no Power BI Service.
   - Clique em **Exportar (Export) -> PowerPoint -> Embutir dados em tempo real (Live Data)** ou **Inserir Imagem**.
   - Copie o link gerado.
   - No PowerPoint, vá em **Inserir -> Suplementos -> Power BI** e cole a URL do relatório interativo.
6. Caso não possua acesso ao Power BI Service / PowerPoint corporativo, salve a versão `.pbix` no seu repositório local conforme instruído pelo desafio.
