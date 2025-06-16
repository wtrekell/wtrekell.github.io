import pandas as pd
import plotly.graph_objects as go

# Create the data
data = [
    {"Company": "Anthropic", "Position": "#1 Rankings", "Count": 2},
    {"Company": "Anthropic", "Position": "#2 Rankings", "Count": 3},
    {"Company": "Anthropic", "Position": "#3 Rankings", "Count": 1},
    {"Company": "OpenAI", "Position": "#1 Rankings", "Count": 4},
    {"Company": "OpenAI", "Position": "#2 Rankings", "Count": 2},
    {"Company": "OpenAI", "Position": "#3 Rankings", "Count": 1},
    {"Company": "Google", "Position": "#1 Rankings", "Count": 1},
    {"Company": "Google", "Position": "#2 Rankings", "Count": 0},
    {"Company": "Google", "Position": "#3 Rankings", "Count": 4},
    {"Company": "Perplexity", "Position": "#1 Rankings", "Count": 1},
    {"Company": "Perplexity", "Position": "#2 Rankings", "Count": 0},
    {"Company": "Perplexity", "Position": "#3 Rankings", "Count": 2}
]

df = pd.DataFrame(data)

# Define gold, silver, bronze colors for ranking positions
colors = {
    "#1 Rankings": "#FFD700",  # Gold
    "#2 Rankings": "#C0C0C0",  # Silver
    "#3 Rankings": "#CD7F32"   # Bronze
}

# Create the figure
fig = go.Figure()

# Get unique companies and positions in correct order
companies = df['Company'].unique()
positions = ["#1 Rankings", "#2 Rankings", "#3 Rankings"]  # Correct order

# Add traces for each ranking position in the correct order
for position in positions:
    position_data = df[df['Position'] == position]
    
    # Create lists for x and y values, ensuring all companies are represented
    x_vals = []
    y_vals = []
    text_vals = []
    
    for company in companies:
        company_data = position_data[position_data['Company'] == company]
        if len(company_data) > 0:
            count = company_data['Count'].iloc[0]
        else:
            count = 0
        
        x_vals.append(company)
        y_vals.append(count)
        text_vals.append(str(count) if count > 0 else "")
    
    fig.add_trace(go.Bar(
        name=position,  # Keep full descriptive name
        x=x_vals,
        y=y_vals,
        text=text_vals,
        textposition='inside',
        textfont=dict(color='black', size=12),
        marker_color=colors[position],
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title="Company Rankings Distribution",
    barmode='stack',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes
fig.update_xaxes(title="Company")
fig.update_yaxes(title="Count")

# Save the chart
fig.write_image("rankings_chart.png")