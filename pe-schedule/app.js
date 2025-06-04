// Course data
const courseData = {
  "weeks": [
    {
      "id": 1,
      "title": "Foundation Building - Week 1",
      "phase": "Foundation",
      "objectives": ["Master core prompt engineering principles", "Set up AI toolkit", "Learn role definition and context provision"],
      "dailyActivities": [
        "30-minute practice session (10 min review, 15 min practice, 5 min documentation)",
        "Practice basic prompting with ChatGPT",
        "Set up Claude and Perplexity AI accounts",
        "Read prompt engineering fundamentals"
      ],
      "toolsFocus": ["ChatGPT for basic prompting", "Account setup for all platforms"],
      "keySkills": ["Role definition", "Task specification", "Context provision", "Output formatting"],
      "weeklyReview": "30-minute assessment of prompt quality improvements"
    },
    {
      "id": 2,
      "title": "Foundation Building - Week 2",
      "phase": "Foundation",
      "objectives": ["Apply foundation skills to research tasks", "Generate first AI-assisted deliverable"],
      "dailyActivities": [
        "Continue 30-minute daily practice",
        "Practice research prompt templates",
        "Generate interview guides using AI",
        "Create user persona prompts"
      ],
      "toolsFocus": ["Perplexity AI for research", "ChatGPT for persona development"],
      "keySkills": ["Research automation", "Interview guide generation", "Competitive analysis"],
      "deliverable": "Complete research plan using only AI assistance",
      "assessment": "30% reduction in research preparation time",
      "weeklyReview": "Evaluate research plan quality and time savings"
    },
    {
      "id": 3,
      "title": "Creative Applications - Week 3",
      "phase": "Creative",
      "objectives": ["Master AI-assisted ideation", "Learn creative prompting techniques"],
      "dailyActivities": [
        "30-minute creative prompting practice",
        "Role-based ideation exercises",
        "Brand voice development with AI",
        "UI content generation practice"
      ],
      "toolsFocus": ["ChatGPT for ideation", "Claude for creative collaboration"],
      "keySkills": ["Creative prompting", "Brand voice matching", "Ideation techniques"],
      "weeklyReview": "Assess creative output quality and diversity"
    },
    {
      "id": 4,
      "title": "Design Applications - Week 4",
      "phase": "Creative",
      "objectives": ["Master Claude Artifacts", "Create functional prototypes", "Rapid prototyping skills"],
      "dailyActivities": [
        "Claude Artifacts tutorial and practice",
        "Prototype iteration exercises",
        "UI component generation",
        "Interactive element creation"
      ],
      "toolsFocus": ["Claude Artifacts for prototyping", "Iterative design with AI"],
      "keySkills": ["Prototype creation", "UI component design", "Interactive elements"],
      "deliverable": "Complete UI prototype using Claude Artifacts in 2 hours",
      "assessment": "50% faster first-draft content generation",
      "weeklyReview": "Evaluate prototype quality and creation speed"
    },
    {
      "id": 5,
      "title": "Advanced Techniques - Week 5",
      "phase": "Advanced",
      "objectives": ["Learn chain-of-thought reasoning", "Master few-shot learning", "Complex problem solving"],
      "dailyActivities": [
        "Chain-of-thought prompting practice",
        "Few-shot learning exercises",
        "Multi-step reasoning challenges",
        "Complex UX problem breakdown"
      ],
      "toolsFocus": ["All platforms for advanced techniques", "Cross-platform problem solving"],
      "keySkills": ["Chain-of-thought reasoning", "Few-shot learning", "Prompt chaining"],
      "weeklyReview": "Assess complex problem-solving improvements"
    },
    {
      "id": 6,
      "title": "Testing & Validation - Week 6",
      "phase": "Advanced",
      "objectives": ["AI-assisted testing", "Accessibility auditing", "Validation techniques"],
      "dailyActivities": [
        "Usability script generation practice",
        "Accessibility checklist creation",
        "Test scenario development",
        "Results analysis with AI"
      ],
      "toolsFocus": ["AI for testing scripts", "Accessibility tools", "Analysis platforms"],
      "keySkills": ["Usability testing", "Accessibility auditing", "Results analysis"],
      "deliverable": "WCAG-compliant accessibility checklist",
      "assessment": "Complex problem-solving capability demonstrated",
      "weeklyReview": "Evaluate testing thoroughness and efficiency"
    },
    {
      "id": 7,
      "title": "Quality Assurance - Week 7",
      "phase": "Integration",
      "objectives": ["Develop quality standards", "Learn bias recognition", "Ethical AI practices"],
      "dailyActivities": [
        "Output quality assessment practice",
        "Bias detection exercises",
        "Fact-checking AI outputs",
        "Privacy protection techniques"
      ],
      "toolsFocus": ["Quality validation across all platforms", "Cross-referencing tools"],
      "keySkills": ["Quality assessment", "Bias recognition", "Ethical AI usage"],
      "weeklyReview": "Assess quality standards and bias awareness"
    },
    {
      "id": 8,
      "title": "Workflow Integration - Week 8",
      "phase": "Integration",
      "objectives": ["Complete workflow integration", "Create standard procedures", "Long-term strategy"],
      "dailyActivities": [
        "Workflow mapping exercises",
        "Template creation and testing",
        "Process optimization",
        "Future planning session"
      ],
      "toolsFocus": ["Integrated workflow across all platforms", "Process optimization"],
      "keySkills": ["Workflow integration", "Process creation", "Strategic planning"],
      "deliverable": "Complete workflow integration plan",
      "assessment": "60% quicker prototype development",
      "weeklyReview": "Final assessment and future roadmap"
    }
  ]
};

// Application state
let currentWeek = null;
let progress = {
  activities: {},
  assessments: {}
};

// DOM elements
const timeline = document.getElementById('timeline');
const weekDetailCard = document.getElementById('weekDetailCard');
const weekDetailContent = document.getElementById('weekDetailContent');
const currentWeekTitle = document.getElementById('currentWeekTitle');
const prevWeekBtn = document.getElementById('prevWeek');
const nextWeekBtn = document.getElementById('nextWeek');
const overallProgress = document.getElementById('overallProgress');
const progressText = document.getElementById('progressText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderTimeline();
    setupEventListeners();
    updateOverallProgress();
});

// Render the timeline
function renderTimeline() {
    timeline.innerHTML = '';
    
    courseData.weeks.forEach(week => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('tabindex', '0');
        timelineItem.setAttribute('role', 'button');
        timelineItem.setAttribute('aria-label', `Select ${week.title}`);
        
        const phaseClass = week.phase.toLowerCase();
        const weekProgress = calculateWeekProgress(week.id);
        
        timelineItem.innerHTML = `
            <div class="timeline-card card ${phaseClass}">
                <div class="card__body">
                    <div class="timeline-phase ${phaseClass}">${week.phase}</div>
                    <h3 class="timeline-week">Week ${week.id}</h3>
                    <div class="timeline-objectives">
                        <h4>Key Objectives:</h4>
                        <ul>
                            ${week.objectives.slice(0, 2).map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="timeline-progress">
                        <div class="week-progress-bar">
                            <div class="week-progress-fill" style="width: ${weekProgress}%"></div>
                        </div>
                        <span class="progress-text">${weekProgress}% Complete</span>
                    </div>
                </div>
            </div>
        `;
        
        timelineItem.addEventListener('click', () => selectWeek(week.id));
        timelineItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectWeek(week.id);
            }
        });
        
        timeline.appendChild(timelineItem);
    });
}

// Select a week
function selectWeek(weekId) {
    currentWeek = weekId;
    updateTimelineSelection();
    renderWeekDetails();
    updateNavigationButtons();
    
    // Scroll to week details
    weekDetailCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Update timeline selection
function updateTimelineSelection() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (index + 1 === currentWeek) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Render week details
function renderWeekDetails() {
    const week = courseData.weeks.find(w => w.id === currentWeek);
    if (!week) return;
    
    currentWeekTitle.textContent = week.title;
    weekDetailCard.style.display = 'block';
    
    const phaseClass = week.phase.toLowerCase();
    
    let detailsHTML = `
        <div class="week-detail-content">
            <div class="detail-section">
                <h3 class="detail-title">Learning Objectives</h3>
                <ul class="timeline-objectives">
                    ${week.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3 class="detail-title">Daily Activities</h3>
                <div class="activities-list">
                    ${week.dailyActivities.map((activity, index) => `
                        <div class="activity-item">
                            <label class="checkbox-label">
                                <input type="checkbox" class="activity-checkbox" 
                                       data-week="${week.id}" data-activity="${index}"
                                       ${progress.activities[`${week.id}-${index}`] ? 'checked' : ''}>
                                <span class="checkmark"></span>
                            </label>
                            <span class="activity-text">${activity}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3 class="detail-title">Tools Focus</h3>
                <ul class="timeline-objectives">
                    ${week.toolsFocus.map(tool => `<li>${tool}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3 class="detail-title">Key Skills</h3>
                <div class="skills-list">
                    ${week.keySkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
    `;
    
    if (week.deliverable) {
        detailsHTML += `
            <div class="detail-section deliverable-section">
                <h3 class="detail-title">Week Deliverable</h3>
                <p><strong>${week.deliverable}</strong></p>
            </div>
        `;
    }
    
    if (week.assessment) {
        detailsHTML += `
            <div class="detail-section assessment-section-week">
                <h3 class="detail-title">Assessment Target</h3>
                <p><strong>${week.assessment}</strong></p>
            </div>
        `;
    }
    
    detailsHTML += `
            <div class="detail-section">
                <h3 class="detail-title">Weekly Review</h3>
                <p>${week.weeklyReview}</p>
            </div>
        </div>
    `;
    
    weekDetailContent.innerHTML = detailsHTML;
    
    // Add event listeners to activity checkboxes
    const activityCheckboxes = weekDetailContent.querySelectorAll('.activity-checkbox');
    activityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleActivityToggle);
    });
}

// Handle activity toggle
function handleActivityToggle(event) {
    const checkbox = event.target;
    const weekId = checkbox.dataset.week;
    const activityIndex = checkbox.dataset.activity;
    const activityKey = `${weekId}-${activityIndex}`;
    
    if (checkbox.checked) {
        progress.activities[activityKey] = true;
        // Add celebration animation
        checkbox.closest('.activity-item').classList.add('milestone-completed');
        setTimeout(() => {
            checkbox.closest('.activity-item').classList.remove('milestone-completed');
        }, 500);
    } else {
        delete progress.activities[activityKey];
    }
    
    updateWeekProgress(parseInt(weekId));
    updateOverallProgress();
}

// Calculate week progress
function calculateWeekProgress(weekId) {
    const week = courseData.weeks.find(w => w.id === weekId);
    if (!week) return 0;
    
    const totalActivities = week.dailyActivities.length;
    const completedActivities = week.dailyActivities.filter((_, index) => 
        progress.activities[`${weekId}-${index}`]
    ).length;
    
    return Math.round((completedActivities / totalActivities) * 100);
}

// Update week progress
function updateWeekProgress(weekId) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineItem = timelineItems[weekId - 1];
    if (timelineItem) {
        const progressBar = timelineItem.querySelector('.week-progress-fill');
        const progressTextEl = timelineItem.querySelector('.progress-text');
        const weekProgress = calculateWeekProgress(weekId);
        
        progressBar.style.width = `${weekProgress}%`;
        progressTextEl.textContent = `${weekProgress}% Complete`;
    }
}

// Update overall progress
function updateOverallProgress() {
    const totalWeeks = courseData.weeks.length;
    let totalProgress = 0;
    
    courseData.weeks.forEach(week => {
        totalProgress += calculateWeekProgress(week.id);
    });
    
    const averageProgress = Math.round(totalProgress / totalWeeks);
    overallProgress.style.width = `${averageProgress}%`;
    progressText.textContent = `${averageProgress}% Complete`;
}

// Update navigation buttons
function updateNavigationButtons() {
    if (currentWeek === null) {
        prevWeekBtn.disabled = true;
        nextWeekBtn.disabled = true;
        return;
    }
    
    prevWeekBtn.disabled = currentWeek <= 1;
    nextWeekBtn.disabled = currentWeek >= courseData.weeks.length;
}

// Setup event listeners
function setupEventListeners() {
    prevWeekBtn.addEventListener('click', () => {
        if (currentWeek > 1) {
            selectWeek(currentWeek - 1);
        }
    });
    
    nextWeekBtn.addEventListener('click', () => {
        if (currentWeek < courseData.weeks.length) {
            selectWeek(currentWeek + 1);
        }
    });
    
    // Assessment checkboxes
    const assessmentCheckboxes = document.querySelectorAll('.assessment-checkbox');
    assessmentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleAssessmentToggle);
    });
    
    // Keyboard navigation for timeline
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('timeline-item')) {
            const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
            const currentIndex = timelineItems.indexOf(e.target);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                timelineItems[currentIndex - 1].focus();
            } else if (e.key === 'ArrowRight' && currentIndex < timelineItems.length - 1) {
                e.preventDefault();
                timelineItems[currentIndex + 1].focus();
            }
        }
    });
}

// Handle assessment toggle
function handleAssessmentToggle(event) {
    const checkbox = event.target;
    const assessmentId = checkbox.id;
    
    if (checkbox.checked) {
        progress.assessments[assessmentId] = true;
        // Add celebration animation
        checkbox.closest('.assessment-card').classList.add('milestone-completed');
        setTimeout(() => {
            checkbox.closest('.assessment-card').classList.remove('milestone-completed');
        }, 500);
    } else {
        delete progress.assessments[assessmentId];
    }
}