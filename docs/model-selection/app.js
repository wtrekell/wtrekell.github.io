// Application Data
const appData = {
  "models": [
    {
      "name": "Claude Opus 4",
      "company": "Anthropic",
      "inputCost": 75,
      "outputCost": 150,
      "strengths": ["Complex coding", "Multi-file projects", "Content editing"],
      "domains": ["Python Authoring", "Content Editing"],
      "ranking": 1,
      "benchmarks": {"SWE-bench": 72.5, "Terminal-bench": 43.2}
    },
    {
      "name": "Claude Sonnet 4",
      "company": "Anthropic",
      "inputCost": 15,
      "outputCost": 30,
      "strengths": ["Instruction following", "Brand consistency", "UX reasoning"],
      "domains": ["UX Design", "Brand Content", "Social Media"],
      "ranking": 2,
      "benchmarks": {}
    },
    {
      "name": "OpenAI o3",
      "company": "OpenAI",
      "inputCost": 10,
      "outputCost": 40,
      "strengths": ["Mathematical programming", "Reasoning", "Research analysis"],
      "domains": ["Python Authoring", "Research & Analysis", "Content Editing"],
      "ranking": 2,
      "benchmarks": {"SWE-bench": 69.1}
    },
    {
      "name": "GPT-4.1",
      "company": "OpenAI",
      "inputCost": 5,
      "outputCost": 20,
      "strengths": ["Large codebase analysis", "1M token context"],
      "domains": ["Python Authoring"],
      "ranking": 3,
      "benchmarks": {}
    },
    {
      "name": "GPT-4.5",
      "company": "OpenAI",
      "inputCost": 8,
      "outputCost": 25,
      "strengths": ["Brand voice consistency", "Style adherence"],
      "domains": ["Brand Content"],
      "ranking": 1,
      "benchmarks": {}
    },
    {
      "name": "ChatGPT-4o",
      "company": "OpenAI",
      "inputCost": 3,
      "outputCost": 12,
      "strengths": ["Multimodal", "UX design", "Social media"],
      "domains": ["Digital Content", "UX Design", "Social Media"],
      "ranking": 1,
      "benchmarks": {"Fiction Writing": 37}
    },
    {
      "name": "o4-mini",
      "company": "OpenAI",
      "inputCost": 1.1,
      "outputCost": 4.4,
      "strengths": ["Cost-effective", "High volume"],
      "domains": [],
      "ranking": 3,
      "benchmarks": {}
    },
    {
      "name": "Gemini 2.5 Pro",
      "company": "Google",
      "inputCost": 2.5,
      "outputCost": 15,
      "strengths": ["SEO optimization", "Cost-effective", "Creative writing"],
      "domains": ["Digital Content", "UX Design", "Brand Content", "Content Editing"],
      "ranking": 1,
      "benchmarks": {"Chatbot Arena": "Top creative writing"}
    },
    {
      "name": "Perplexity Sonar Pro",
      "company": "Perplexity",
      "inputCost": 20,
      "outputCost": 20,
      "subscription": true,
      "strengths": ["Real-time search", "Citations", "Trend monitoring"],
      "domains": ["Digital Content", "Social Media"],
      "ranking": 3,
      "benchmarks": {}
    },
    {
      "name": "Perplexity Sonar Deep Research",
      "company": "Perplexity",
      "inputCost": 25,
      "outputCost": 25,
      "subscription": true,
      "strengths": ["Comprehensive research", "Multiple sources", "In-depth analysis"],
      "domains": ["Research & Analysis"],
      "ranking": 1,
      "benchmarks": {}
    }
  ],
  "domains": [
    {
      "id": "python",
      "name": "Python Authoring",
      "description": "Software development, coding, algorithm implementation",
      "topModels": ["Claude Opus 4", "OpenAI o3", "GPT-4.1"]
    },
    {
      "id": "content",
      "name": "Digital Content Writing",
      "description": "Blog posts, articles, SEO content, digital publications",
      "topModels": ["Gemini 2.5 Pro", "ChatGPT-4o", "Perplexity Sonar Pro"]
    },
    {
      "id": "ux",
      "name": "UX Design Solutions",
      "description": "User experience design, personas, interface design",
      "topModels": ["ChatGPT-4o", "Claude Sonnet 4", "Gemini 2.5 Pro"]
    },
    {
      "id": "research",
      "name": "Research & Analysis",
      "description": "Data analysis, market research, academic research",
      "topModels": ["Perplexity Sonar Deep Research", "OpenAI o3", "Claude Opus 4"]
    },
    {
      "id": "brand",
      "name": "Brand Content Creation",
      "description": "Brand-aligned content, marketing materials, corporate communications",
      "topModels": ["GPT-4.5", "Claude Sonnet 4", "Gemini 2.5 Pro"]
    },
    {
      "id": "editing",
      "name": "Content Editing",
      "description": "Content refinement, proofreading, quality assurance",
      "topModels": ["Claude Opus 4", "OpenAI o3", "Gemini 2.5 Pro"]
    },
    {
      "id": "social",
      "name": "Social Media Management",
      "description": "Social media content, campaign management, trend monitoring",
      "topModels": ["ChatGPT-4o", "Claude Sonnet 4", "Perplexity Sonar Pro"]
    }
  ],
  "companies": [
    {
      "name": "Anthropic",
      "description": "Safety-first AI with focus on responsible development",
      "strengths": ["Complex reasoning", "Coding excellence", "Content editing"],
      "models": ["Claude Opus 4", "Claude Sonnet 4"],
      "philosophy": "Methodical approach, high-stakes applications"
    },
    {
      "name": "OpenAI",
      "description": "Broad accessibility and rapid innovation",
      "strengths": ["General purpose", "Multimodal", "Diverse workflows"],
      "models": ["OpenAI o3", "GPT-4.1", "GPT-4.5", "ChatGPT-4o", "o4-mini"],
      "philosophy": "Accessible AI for everyone"
    },
    {
      "name": "Google",
      "description": "Scale and efficiency with cost-effective performance",
      "strengths": ["Cost-effective", "High volume", "Creative writing"],
      "models": ["Gemini 2.5 Pro"],
      "philosophy": "Efficient AI at scale"
    },
    {
      "name": "Perplexity",
      "description": "Information accuracy and real-time research",
      "strengths": ["Real-time information", "Research", "Citations"],
      "models": ["Perplexity Sonar Pro", "Perplexity Sonar Deep Research"],
      "philosophy": "Accurate, sourced information"
    }
  ]
};

// Application State
let currentSection = 'dashboard';

// DOM Elements
const navButtons = document.querySelectorAll('.nav__btn');
const sections = document.querySelectorAll('.section');
const useCaseSelect = document.getElementById('useCase');
const recommendationsDiv = document.getElementById('recommendations');
const monthlyTokensInput = document.getElementById('monthlyTokens');
const inputOutputRatio = document.getElementById('inputOutputRatio');
const inputPercent = document.getElementById('inputPercent');
const outputPercent = document.getElementById('outputPercent');
const costResults = document.getElementById('costResults');
const performanceTable = document.getElementById('performanceTable');
const companiesGrid = document.getElementById('companiesGrid');
const searchInput = document.getElementById('searchInput');
const companyFilter = document.getElementById('companyFilter');
const referenceTable = document.getElementById('referenceTable');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupModelSelector();
    setupCostCalculator();
    renderPerformanceTable();
    renderCompanies();
    renderReferenceTable();
    setupSearch();
}

// Navigation
function setupNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            navigateToSection(sectionId);
        });
    });

    // Handle navigation buttons in hero
    document.querySelectorAll('[data-navigate]').forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.navigate;
            navigateToSection(sectionId);
        });
    });
}

function navigateToSection(sectionId) {
    currentSection = sectionId;
    
    // Update navigation buttons
    navButtons.forEach(btn => {
        btn.classList.toggle('nav__btn--active', btn.dataset.section === sectionId);
    });
    
    // Update sections
    sections.forEach(section => {
        section.classList.toggle('section--active', section.id === sectionId);
    });
}

// Model Selector
function setupModelSelector() {
    useCaseSelect.addEventListener('change', function() {
        const selectedDomain = this.value;
        if (selectedDomain) {
            showRecommendations(selectedDomain);
        } else {
            recommendationsDiv.innerHTML = '';
        }
    });
}

function showRecommendations(domainId) {
    const domain = appData.domains.find(d => d.id === domainId);
    if (!domain) return;

    // Get top 3 models only
    const topModels = domain.topModels.slice(0, 3).map(modelName => {
        return appData.models.find(m => m.name === modelName);
    }).filter(Boolean);

    let html = `<h3>Top 3 Recommendations for ${domain.name}</h3>`;
    html += `<p class="mb-32">${domain.description}</p>`;

    topModels.forEach((model, index) => {
        html += createRecommendationCard(model, index + 1);
    });

    recommendationsDiv.innerHTML = html;
}

function createRecommendationCard(model, rank) {
    const subscription = model.subscription ? ' (Subscription)' : '';
    const inputCost = model.subscription ? model.inputCost : model.inputCost;
    const outputCost = model.subscription ? model.outputCost : model.outputCost;
    
    return `
        <div class="recommendation-card">
            <div class="recommendation-header">
                <div class="model-info">
                    <h3>${model.name}</h3>
                    <span class="company-badge">${model.company}</span>
                </div>
                <div class="model-meta">
                    <div class="ranking-badge ranking-badge--${rank}">#${rank}</div>
                    <div class="pricing-info">
                        <div class="price">
                            ${model.subscription 
                                ? `$${inputCost}/month${subscription}` 
                                : `$${inputCost}/$${outputCost} per 1M tokens`
                            }
                        </div>
                        ${model.subscription ? '<div class="subscription-note">Subscription-based pricing</div>' : ''}
                    </div>
                </div>
            </div>
            <div class="strengths">
                <h4>Key Strengths:</h4>
                <div class="strengths-list">
                    ${model.strengths.map(strength => `<span class="strength-tag">${strength}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Cost Calculator
function setupCostCalculator() {
    monthlyTokensInput.addEventListener('input', updateCostCalculation);
    inputOutputRatio.addEventListener('input', function() {
        const value = parseInt(this.value);
        inputPercent.textContent = value;
        outputPercent.textContent = 100 - value;
        updateCostCalculation();
    });
    
    // Initial calculation
    updateCostCalculation();
}

function updateCostCalculation() {
    const monthlyTokens = parseFloat(monthlyTokensInput.value) || 1;
    const inputRatio = parseInt(inputOutputRatio.value) / 100;
    const outputRatio = 1 - inputRatio;
    
    const inputTokens = monthlyTokens * inputRatio;
    const outputTokens = monthlyTokens * outputRatio;
    
    const costs = appData.models.map(model => {
        let monthlyCost;
        if (model.subscription) {
            monthlyCost = model.inputCost; // Subscription cost
        } else {
            monthlyCost = (inputTokens * model.inputCost) + (outputTokens * model.outputCost);
        }
        
        return {
            ...model,
            monthlyCost: monthlyCost
        };
    }).sort((a, b) => a.monthlyCost - b.monthlyCost);
    
    renderCostResults(costs, monthlyTokens, inputRatio);
}

function renderCostResults(costs, monthlyTokens, inputRatio) {
    let html = `<h3>Monthly Cost Comparison</h3>`;
    html += `<p class="mb-32">Based on ${monthlyTokens.toFixed(1)}M tokens/month (${Math.round(inputRatio * 100)}% input, ${Math.round((1 - inputRatio) * 100)}% output)</p>`;
    
    // Show top 5 most cost-effective options
    costs.slice(0, 8).forEach((model, index) => {
        const isLowest = index === 0;
        html += `
            <div class="cost-card ${isLowest ? 'cost-card--best' : ''}">
                <div class="cost-card__info">
                    <h4>${model.name} ${isLowest ? '🏆' : ''}</h4>
                    <span class="company-badge">${model.company}</span>
                    ${model.subscription ? '<div class="subscription-note">Subscription-based pricing</div>' : ''}
                </div>
                <div class="cost-card__price">$${model.monthlyCost.toFixed(2)}</div>
            </div>
        `;
    });
    
    costResults.innerHTML = html;
}

// Performance Table
function renderPerformanceTable() {
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Company</th>
                    <th>Primary Domains</th>
                    <th>Key Strengths</th>
                    <th>Benchmarks</th>
                    <th>Pricing</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    appData.models.forEach(model => {
        const domains = model.domains.length > 0 ? model.domains.slice(0, 2).join(', ') : 'General Purpose';
        const strengths = model.strengths.slice(0, 2).join(', ');
        const benchmarks = Object.entries(model.benchmarks).map(([key, value]) => 
            `${key}: ${value}`
        ).join(', ') || 'N/A';
        
        const pricing = model.subscription 
            ? `$${model.inputCost}/month` 
            : `$${model.inputCost}/$${model.outputCost}`;
        
        html += `
            <tr>
                <td><strong>${model.name}</strong></td>
                <td>${model.company}</td>
                <td>${domains}</td>
                <td>${strengths}</td>
                <td>${benchmarks}</td>
                <td>${pricing}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    performanceTable.innerHTML = html;
}

// Companies
function renderCompanies() {
    let html = '';
    
    appData.companies.forEach(company => {
        html += `
            <div class="company-card">
                <div class="company-header">
                    <h3>${company.name}</h3>
                    <p class="company-description">${company.description}</p>
                </div>
                <div class="company-strengths">
                    <h4>Key Strengths:</h4>
                    <div class="strengths-list">
                        ${company.strengths.map(strength => `<span class="strength-tag">${strength}</span>`).join('')}
                    </div>
                </div>
                <div class="company-models">
                    <h4>Models:</h4>
                    <ul class="model-list">
                        ${company.models.map(model => `<li>${model}</li>`).join('')}
                    </ul>
                </div>
                <div class="philosophy">
                    "${company.philosophy}"
                </div>
            </div>
        `;
    });
    
    companiesGrid.innerHTML = html;
}

// Reference Table
function renderReferenceTable(filteredModels = appData.models) {
    if (filteredModels.length === 0) {
        referenceTable.innerHTML = `
            <div class="empty-state">
                <h3>No models found</h3>
                <p>Try adjusting your search terms or filters.</p>
            </div>
        `;
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Company</th>
                    <th>Input Cost</th>
                    <th>Output Cost</th>
                    <th>Domains</th>
                    <th>Key Strengths</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filteredModels.forEach(model => {
        const inputCost = model.subscription ? `$${model.inputCost}/month` : `$${model.inputCost}`;
        const outputCost = model.subscription ? 'Subscription' : `$${model.outputCost}`;
        
        html += `
            <tr>
                <td><strong>${model.name}</strong></td>
                <td>${model.company}</td>
                <td>${inputCost}</td>
                <td>${outputCost}</td>
                <td>
                    <div class="domain-tags">
                        ${model.domains.slice(0, 3).map(domain => `<span class="domain-tag">${domain}</span>`).join('')}
                    </div>
                </td>
                <td>${model.strengths.slice(0, 3).join(', ')}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    referenceTable.innerHTML = html;
}

// Search and Filter
function setupSearch() {
    searchInput.addEventListener('input', filterModels);
    companyFilter.addEventListener('change', filterModels);
}

function filterModels() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCompany = companyFilter.value;
    
    let filteredModels = appData.models.filter(model => {
        const matchesSearch = !searchTerm || 
                            model.name.toLowerCase().includes(searchTerm) ||
                            model.strengths.some(strength => strength.toLowerCase().includes(searchTerm)) ||
                            model.domains.some(domain => domain.toLowerCase().includes(searchTerm)) ||
                            model.company.toLowerCase().includes(searchTerm);
        
        const matchesCompany = !selectedCompany || model.company === selectedCompany;
        
        return matchesSearch && matchesCompany;
    });
    
    renderReferenceTable(filteredModels);
}