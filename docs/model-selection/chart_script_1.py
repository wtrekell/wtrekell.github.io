import pandas as pd
import plotly.graph_objects as go
import plotly.express as px

# Create the data
data = [
  {"Domain": "Python Authoring", "Rank": "#1", "Model": "Claude Opus 4", "Company": "Anthropic", "Performance": 95},
  {"Domain": "Python Authoring", "Rank": "#2", "Model": "OpenAI o3", "Company": "OpenAI", "Performance": 92},
  {"Domain": "Python Authoring", "Rank": "#3", "Model": "GPT-4.1", "Company": "OpenAI", "Performance": 87},
  {"Domain": "Digital Content", "Rank": "#1", "Model": "Gemini 2.5 Pro", "Company": "Google", "Performance": 95},
  {"Domain": "Digital Content", "Rank": "#2", "Model": "ChatGPT-4o", "Company": "OpenAI", "Performance": 92},
  {"Domain": "Digital Content", "Rank": "#3", "Model": "Sonar Pro", "Company": "Perplexity", "Performance": 88},
  {"Domain": "UX Design", "Rank": "#1", "Model": "ChatGPT-4o", "Company": "OpenAI", "Performance": 90},
  {"Domain": "UX Design", "Rank": "#2", "Model": "Claude Sonnet 4", "Company": "Anthropic", "Performance": 87},
  {"Domain": "UX Design", "Rank": "#3", "Model": "Gemini 2.5 Pro", "Company": "Google", "Performance": 85},
  {"Domain": "Research & Analysis", "Rank": "#1", "Model": "Sonar Deep Research", "Company": "Perplexity", "Performance": 94},
  {"Domain": "Research & Analysis", "Rank": "#2", "Model": "OpenAI o3", "Company": "OpenAI", "Performance": 91},
  {"Domain": "Research & Analysis", "Rank": "#3", "Model": "Claude Opus 4", "Company": "Anthropic", "Performance": 89},
  {"Domain": "Brand Content", "Rank": "#1", "Model": "GPT-4.5", "Company": "OpenAI", "Performance": 88},
  {"Domain": "Brand Content", "Rank": "#2", "Model": "Claude Sonnet 4", "Company": "Anthropic", "Performance": 86},
  {"Domain": "Brand Content", "Rank": "#3", "Model": "Gemini 2.5 Pro", "Company": "Google", "Performance": 84},
  {"Domain": "Content Editing", "Rank": "#1", "Model": "Claude Opus 4", "Company": "Anthropic", "Performance": 91},
  {"Domain": "Content Editing", "Rank": "#2", "Model": "OpenAI o3", "Company": "OpenAI", "Performance": 89},
  {"Domain": "Content Editing", "Rank": "#3", "Model": "Gemini 2.5 Pro", "Company": "Google", "Performance": 87},
  {"Domain": "Social Media", "Rank": "#1", "Model": "ChatGPT-4o", "Company": "OpenAI", "Performance": 92},
  {"Domain": "Social Media", "Rank": "#2", "Model": "Claude Sonnet 4", "Company": "Anthropic", "Performance": 89},
  {"Domain": "Social Media", "Rank": "#3", "Model": "Sonar Pro", "Company": "Perplexity", "Performance": 86}
]

df = pd.DataFrame(data)

# Abbreviate domain names to fit 15 character limit
domain_abbrev = {
    "Python Authoring": "Python Auth",
    "Digital Content": "Digital Cont", 
    "UX Design": "UX Design",
    "Research & Analysis": "Research",
    "Brand Content": "Brand Cont",
    "Content Editing": "Content Edit",
    "Social Media": "Social Media"
}

# Abbreviate model names to fit 15 character limit
model_abbrev = {
    "Claude Sonnet 4": "Claude Son 4",
    "Sonar Deep Research": "Sonar Deep",
    "Gemini 2.5 Pro": "Gemini 2.5"
}

df['Domain_Short'] = df['Domain'].map(domain_abbrev)
df['Model_Short'] = df['Model'].map(lambda x: model_abbrev.get(x, x))

# Create x-axis labels combining domain and rank
df['x_label'] = df['Domain_Short'] + ' ' + df['Rank']

# Define company colors as specified in instructions
company_colors = {
    'Anthropic': '#4472C4',    # Blue
    'OpenAI': '#70AD47',       # Green  
    'Google': '#FFC185',       # Light orange (from brand colors)
    'Perplexity': '#7030A0'    # Purple
}

# Create the grouped bar chart
fig = go.Figure()

for company in ['Anthropic', 'OpenAI', 'Google', 'Perplexity']:
    company_data = df[df['Company'] == company]
    if not company_data.empty:
        fig.add_trace(go.Bar(
            name=company,
            x=company_data['x_label'],
            y=company_data['Performance'],
            marker_color=company_colors[company],
            text=company_data['Model_Short'],
            textposition='outside',
            cliponaxis=False,
            hovertemplate='<b>%{text}</b><br>Performance: %{y}<extra></extra>'
        ))

# Update layout
fig.update_layout(
    title='Top Models by Domain',
    xaxis_title='Domain & Rank',
    yaxis_title='Performance',
    barmode='group',
    bargap=0.2,
    bargroupgap=0.1
)

# Update axes (removed cliponaxis as it's not valid for axes)
fig.update_xaxes(tickangle=-45)
fig.update_yaxes()

# Save the chart
fig.write_image('top_models_by_domain.png')