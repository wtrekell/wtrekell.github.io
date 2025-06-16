import pandas as pd
import plotly.graph_objects as go

# Load the data
data = [
    {"Model": "Claude Opus 4", "Company": "Anthropic", "Cost_Type": "Input", "Cost_Per_Million": 75},
    {"Model": "Claude Opus 4", "Company": "Anthropic", "Cost_Type": "Output", "Cost_Per_Million": 150},
    {"Model": "Claude Sonnet 4", "Company": "Anthropic", "Cost_Type": "Input", "Cost_Per_Million": 15},
    {"Model": "Claude Sonnet 4", "Company": "Anthropic", "Cost_Type": "Output", "Cost_Per_Million": 30},
    {"Model": "OpenAI o3", "Company": "OpenAI", "Cost_Type": "Input", "Cost_Per_Million": 10},
    {"Model": "OpenAI o3", "Company": "OpenAI", "Cost_Type": "Output", "Cost_Per_Million": 40},
    {"Model": "GPT-4.1", "Company": "OpenAI", "Cost_Type": "Input", "Cost_Per_Million": 5},
    {"Model": "GPT-4.1", "Company": "OpenAI", "Cost_Type": "Output", "Cost_Per_Million": 20},
    {"Model": "o4-mini", "Company": "OpenAI", "Cost_Type": "Input", "Cost_Per_Million": 1.1},
    {"Model": "o4-mini", "Company": "OpenAI", "Cost_Type": "Output", "Cost_Per_Million": 4.4},
    {"Model": "Gemini 2.5 Pro", "Company": "Google", "Cost_Type": "Input", "Cost_Per_Million": 2.5},
    {"Model": "Gemini 2.5 Pro", "Company": "Google", "Cost_Type": "Output", "Cost_Per_Million": 15},
    {"Model": "Perplexity Models", "Company": "Perplexity", "Cost_Type": "Subscription", "Cost_Per_Million": 20}
]

df = pd.DataFrame(data)

# Organize models by company
companies = ['Anthropic', 'OpenAI', 'Google', 'Perplexity']
models_by_company = {
    'Anthropic': ['Claude Opus 4', 'Claude Sonnet 4'],
    'OpenAI': ['OpenAI o3', 'GPT-4.1', 'o4-mini'],
    'Google': ['Gemini 2.5 Pro'],
    'Perplexity': ['Perplexity Models']
}

# Create abbreviated model names
model_abbreviations = {
    "Claude Opus 4": "Opus 4",
    "Claude Sonnet 4": "Sonnet 4", 
    "OpenAI o3": "o3",
    "GPT-4.1": "GPT-4.1",
    "o4-mini": "o4-mini",
    "Gemini 2.5 Pro": "Gemini 2.5",
    "Perplexity Models": "Perplexity"
}

# Build x-axis labels and company info
x_labels = []
x_companies = []
for company in companies:
    for model in models_by_company[company]:
        x_labels.append(model_abbreviations[model])
        x_companies.append(company)

# Prepare data arrays
input_costs = []
output_costs = []
subscription_costs = []

for company in companies:
    for model in models_by_company[company]:
        if company == 'Perplexity':
            input_costs.append(0)
            output_costs.append(0)
            sub_cost = df[(df['Model'] == model) & (df['Cost_Type'] == 'Subscription')]['Cost_Per_Million'].iloc[0]
            subscription_costs.append(sub_cost)
        else:
            input_cost = df[(df['Model'] == model) & (df['Cost_Type'] == 'Input')]['Cost_Per_Million'].iloc[0]
            output_cost = df[(df['Model'] == model) & (df['Cost_Type'] == 'Output')]['Cost_Per_Million'].iloc[0]
            input_costs.append(input_cost)
            output_costs.append(output_cost)
            subscription_costs.append(0)

# Create the figure
fig = go.Figure()

# Add background shading for company groups
company_positions = []
current_pos = -0.5
colors = ['rgba(31, 184, 205, 0.1)', 'rgba(255, 193, 133, 0.1)', 'rgba(236, 235, 213, 0.1)', 'rgba(93, 135, 143, 0.1)']

for i, company in enumerate(companies):
    company_start = current_pos
    company_end = current_pos + len(models_by_company[company])
    company_center = (company_start + company_end) / 2
    company_positions.append((company_center, company))
    
    # Add background rectangle for each company
    fig.add_shape(
        type="rect",
        x0=company_start,
        y0=0,
        x1=company_end,
        y1=160,  # Adjust based on max value
        fillcolor=colors[i % len(colors)],
        opacity=0.3,
        layer="below",
        line_width=0,
    )
    
    current_pos += len(models_by_company[company])

# Add input costs trace
fig.add_trace(go.Bar(
    name='Input',
    x=x_labels,
    y=input_costs,
    marker_color='#1FB8CD',
    cliponaxis=False,
    hovertemplate='<b>%{x}</b><br>Input: $%{y}/1M tokens<extra></extra>',
    text=[f'${cost}' if cost > 0 else '' for cost in input_costs],
    textposition='outside'
))

# Add output costs trace
fig.add_trace(go.Bar(
    name='Output',
    x=x_labels,
    y=output_costs,
    marker_color='#FFC185',
    cliponaxis=False,
    hovertemplate='<b>%{x}</b><br>Output: $%{y}/1M tokens<extra></extra>',
    text=[f'${cost}' if cost > 0 else '' for cost in output_costs],
    textposition='outside'
))

# Add subscription costs trace with darker color
fig.add_trace(go.Bar(
    name='Subscription',
    x=x_labels,
    y=subscription_costs,
    marker_color='#5D878F',  # Darker color instead of light green
    cliponaxis=False,
    hovertemplate='<b>%{x}</b><br>Monthly: $%{y}<extra></extra>',
    text=[f'${cost}/mo' if cost > 0 else '' for cost in subscription_costs],
    textposition='outside'
))

# Add company labels as prominent annotations
for pos, company in company_positions:
    fig.add_annotation(
        x=pos,
        y=170,  # Position above the chart
        text=f"<b>{company}</b>",
        showarrow=False,
        font=dict(size=14, color='black'),
        xanchor="center",
        bgcolor="white",
        bordercolor="gray",
        borderwidth=1
    )

# Update layout
fig.update_layout(
    title='LLM Pricing Comparison by Company',
    xaxis_title='Models',
    yaxis_title='Cost per 1M ($)',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    xaxis=dict(
        tickangle=0,
        categoryorder='array',
        categoryarray=x_labels,
        tickfont=dict(size=12)
    ),
    yaxis=dict(range=[0, 180]),  # Extended range for annotations and labels
    showlegend=True
)

# Save the chart
fig.write_image('llm_pricing_chart.png')