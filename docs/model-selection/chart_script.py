import pandas as pd
import plotly.graph_objects as go
import plotly.express as px

# Create the data
data = [
  {"Domain": "Python Authoring", "Rank": 1, "Model": "Claude Opus 4 (Anthropic)", "Company": "Anthropic", "Score": 72.5},
  {"Domain": "Python Authoring", "Rank": 2, "Model": "OpenAI o3 (OpenAI)", "Company": "OpenAI", "Score": 69.1},
  {"Domain": "Python Authoring", "Rank": 3, "Model": "GPT-4.1 (OpenAI)", "Company": "OpenAI", "Score": 65.0},
  {"Domain": "Digital Content Writing", "Rank": 1, "Model": "Gemini 2.5 Pro (Google)", "Company": "Google", "Score": 95.0},
  {"Domain": "Digital Content Writing", "Rank": 2, "Model": "ChatGPT-4o (OpenAI)", "Company": "OpenAI", "Score": 92.0},
  {"Domain": "Digital Content Writing", "Rank": 3, "Model": "Perplexity Sonar Pro (Perplexity)", "Company": "Perplexity", "Score": 88.0},
  {"Domain": "UX Design Solutions", "Rank": 1, "Model": "ChatGPT-4o (OpenAI)", "Company": "OpenAI", "Score": 90.0},
  {"Domain": "UX Design Solutions", "Rank": 2, "Model": "Claude Sonnet 4 (Anthropic)", "Company": "Anthropic", "Score": 87.0},
  {"Domain": "UX Design Solutions", "Rank": 3, "Model": "Gemini 2.5 Pro (Google)", "Company": "Google", "Score": 85.0},
  {"Domain": "Research & Analysis", "Rank": 1, "Model": "Perplexity Sonar Deep Research (Perplexity)", "Company": "Perplexity", "Score": 94.0},
  {"Domain": "Research & Analysis", "Rank": 2, "Model": "OpenAI o3 (OpenAI)", "Company": "OpenAI", "Score": 91.0},
  {"Domain": "Research & Analysis", "Rank": 3, "Model": "Claude Opus 4 (Anthropic)", "Company": "Anthropic", "Score": 89.0},
  {"Domain": "Brand Content Creation", "Rank": 1, "Model": "GPT-4.5 (OpenAI)", "Company": "OpenAI", "Score": 88.0},
  {"Domain": "Brand Content Creation", "Rank": 2, "Model": "Claude Sonnet 4 (Anthropic)", "Company": "Anthropic", "Score": 86.0},
  {"Domain": "Brand Content Creation", "Rank": 3, "Model": "Gemini 2.5 Pro (Google)", "Company": "Google", "Score": 84.0},
  {"Domain": "Content Editing", "Rank": 1, "Model": "Claude Opus 4 (Anthropic)", "Company": "Anthropic", "Score": 91.0},
  {"Domain": "Content Editing", "Rank": 2, "Model": "OpenAI o3 (OpenAI)", "Company": "OpenAI", "Score": 89.0},
  {"Domain": "Content Editing", "Rank": 3, "Model": "Gemini 2.5 Pro (Google)", "Company": "Google", "Score": 87.0},
  {"Domain": "Social Media Management", "Rank": 1, "Model": "ChatGPT-4o (OpenAI)", "Company": "OpenAI", "Score": 92.0},
  {"Domain": "Social Media Management", "Rank": 2, "Model": "Claude Sonnet 4 (Anthropic)", "Company": "Anthropic", "Score": 89.0},
  {"Domain": "Social Media Management", "Rank": 3, "Model": "Perplexity Sonar Pro (Perplexity)", "Company": "Perplexity", "Score": 86.0}
]

df = pd.DataFrame(data)

# Create abbreviated model names for the chart (15 char limit)
df['Model_Short'] = df['Model'].str.replace(' (Anthropic)', '').str.replace(' (OpenAI)', '').str.replace(' (Google)', '').str.replace(' (Perplexity)', '')
df['Model_Short'] = df['Model_Short'].str.replace('Claude Opus 4', 'Claude Opus').str.replace('Claude Sonnet 4', 'Claude Sonnet').str.replace('Perplexity Sonar Deep Research', 'Sonar Deep').str.replace('Perplexity Sonar Pro', 'Sonar Pro').str.replace('Gemini 2.5 Pro', 'Gemini 2.5')

# Abbreviate domain names to fit 15 character limit
domain_mapping = {
    'Python Authoring': 'Python Auth',
    'Digital Content Writing': 'Content Write',
    'UX Design Solutions': 'UX Design',
    'Research & Analysis': 'Research',
    'Brand Content Creation': 'Brand Content',
    'Content Editing': 'Content Edit',
    'Social Media Management': 'Social Media'
}
df['Domain_Short'] = df['Domain'].map(domain_mapping)

# Create y-axis labels with rank info (15 char limit)
df['Y_Label'] = df['Domain_Short'] + ' #' + df['Rank'].astype(str)

# Define colors for companies
company_colors = {
    'Anthropic': '#1FB8CD',  # Strong cyan
    'OpenAI': '#FFC185',     # Light orange
    'Google': '#ECEBD5',     # Light green
    'Perplexity': '#5D878F'  # Cyan
}

# Create the horizontal bar chart
fig = go.Figure()

for company in ['Anthropic', 'OpenAI', 'Google', 'Perplexity']:
    company_data = df[df['Company'] == company]
    if not company_data.empty:
        fig.add_trace(go.Bar(
            x=company_data['Score'],
            y=company_data['Y_Label'],
            name=company,
            orientation='h',
            marker_color=company_colors[company],
            text=company_data['Score'],
            textposition='inside',
            texttemplate='%{text}',
            hovertemplate='<b>%{customdata[0]}</b><br>Score: %{x}<br>Rank: #%{customdata[1]}<extra></extra>',
            customdata=list(zip(company_data['Model_Short'], company_data['Rank'])),
            cliponaxis=False
        ))

# Update layout
fig.update_layout(
    title='Top 3 LLM Models by Domain',
    xaxis_title='Score',
    yaxis_title='Domain & Rank',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Save the chart
fig.write_image('llm_rankings_chart.png')