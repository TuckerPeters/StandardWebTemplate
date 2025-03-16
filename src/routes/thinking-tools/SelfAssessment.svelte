<script lang="ts">
import { onMount } from "svelte";
import { fade, fly, slide } from "svelte/transition";
import { habits } from "../../lib/habits";
import { callOpenAI } from "../../lib/api";

let mounted = false;
let loading = false;
let currentStep = 1;
let selectedHabit: number | null = null;
let selfRatings: {[id: number]: number} = {};
let freeformResponses: {[key: string]: string} = {
  strengths: "",
  challenges: "",
  goals: ""
};
let generatedFeedback = "";
let showResults = false;

// Initialize self-ratings for all habits
onMount(() => {
  habits.forEach(habit => {
    selfRatings[habit.id] = 0;
  });
  
  setTimeout(() => {
    mounted = true;
  }, 100);
});

function goToStep(step: number) {
  if (step === 2 && !selectedHabit) {
    alert("Please select a habit to focus on first");
    return;
  }
  
  if (step === 3 && (selfRatings[selectedHabit] === 0)) {
    alert("Please rate yourself on the selected habit first");
    return;
  }
  
  if (step === 4 && (!freeformResponses.strengths.trim() || !freeformResponses.challenges.trim())) {
    alert("Please fill out both your strengths and challenges");
    return;
  }
  
  currentStep = step;
  
  // Scroll to top when changing steps
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectHabit(id: number) {
  selectedHabit = id;
}

function handleRatingChange(id: number, rating: number) {
  selfRatings[id] = rating;
}

async function generateResults() {
  if (!freeformResponses.goals.trim()) {
    alert("Please describe your goals for improvement");
    return;
  }
  
  loading = true;
  
  try {
    const selectedHabitData = habits.find(h => h.id === selectedHabit);
    
    // Generate feedback using the API
    const systemPrompt = `You are a self-assessment coach focusing on the Habit of Mind: ${selectedHabitData.name}.
    The user has rated themselves ${selfRatings[selectedHabit]}/5 on this habit.
    They listed these strengths: "${freeformResponses.strengths}"
    They listed these challenges: "${freeformResponses.challenges}"
    They have these goals: "${freeformResponses.goals}"
    
    Provide constructive, supportive feedback that incorporates the Habits of Mind framework. 
    Focus on growth mindset and specific strategies they could try to improve.
    Format your response with clear sections for Strengths, Growth Areas, and Action Steps.`;
    
    const response = await callOpenAI(systemPrompt, "Please provide feedback on my self-assessment");
    
    generatedFeedback = response;
    showResults = true;
    currentStep = 5;
  } catch (error) {
    console.error("Error generating feedback:", error);
    generatedFeedback = "I'm sorry, there was an error generating your feedback. Please try again.";
    showResults = true;
    currentStep = 5;
  } finally {
    loading = false;
  }
}

function restart() {
  currentStep = 1;
  selectedHabit = null;
  habits.forEach(habit => {
    selfRatings[habit.id] = 0;
  });
  freeformResponses = {
    strengths: "",
    challenges: "",
    goals: ""
  };
  generatedFeedback = "";
  showResults = false;
}

// Helper function to get habit description
function getHabitDescription(id: number): string {
  const habit = habits.find(h => h.id === id);
  return habit ? habit.description : "";
}

// Helper function to get habit examples
function getHabitExamples(id: number): string[] {
  const habit = habits.find(h => h.id === id);
  return habit ? habit.examples : [];
}

// Helper function to get habit name
function getHabitName(id: number): string {
  const habit = habits.find(h => h.id === id);
  return habit ? habit.name : "";
}
</script>

<div class="self-assessment-container">
  <!-- Header section -->
  <section class="assessment-header" in:fade={{ duration: 500, delay: 200 }}>
    <div class="header-shape shape-1"></div>
    <div class="header-shape shape-2"></div>
    
    <h1 class="section-title">Self-Assessment Tool</h1>
    <p class="section-subtitle">
      Reflect on your Habits of Mind to identify strengths and areas for growth.
      This tool helps you develop metacognition - thinking about your own thinking.
    </p>
    
    <!-- Progress indicator -->
    <div class="progress-bar-container">
      <div class="progress-steps">
        {#each Array(5) as _, i}
          <div 
            class="progress-step" 
            class:active={currentStep === i + 1}
            class:completed={currentStep > i + 1}
          >
            <span class="step-number">{i + 1}</span>
            <span class="step-label">
              {i === 0 ? 'Select Habit' : 
               i === 1 ? 'Rate Yourself' : 
               i === 2 ? 'Reflect' : 
               i === 3 ? 'Set Goals' : 'Results'}
            </span>
          </div>
        {/each}
      </div>
      
      <div class="progress-bar">
        <div class="progress-fill" style="width: {(currentStep - 1) * 25}%"></div>
      </div>
    </div>
  </section>
  
  <!-- Main content -->
  <div class="assessment-content container" in:fade={{ duration: 500, delay: 300 }}>
    <!-- Step 1: Select a habit -->
    {#if currentStep === 1}
      <div class="step-container" in:fly={{ y: 20, duration: 400 }}>
        <h2 class="step-title">Step 1: Choose a Habit of Mind to Assess</h2>
        <p class="step-instruction">
          Select one Habit of Mind that you want to focus on for self-assessment.
          Choose a habit that you're curious about or want to develop further.
        </p>
        
        <div class="habits-grid">
          {#each habits as habit}
            <div 
              class="habit-card" 
              class:selected={selectedHabit === habit.id}
              on:click={() => selectHabit(habit.id)}
              on:keydown={e => e.key === 'Enter' && selectHabit(habit.id)}
              role="button"
              tabindex="0"
              aria-pressed={selectedHabit === habit.id}
            >
              <div class="habit-header">
                <span class="habit-number">{habit.id}</span>
                <h3 class="habit-name">{habit.name}</h3>
              </div>
              <p class="habit-desc">{habit.description}</p>
              
              {#if selectedHabit === habit.id}
                <div class="selected-indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              {/if}
            </div>
          {/each}
        </div>
        
        <div class="step-actions">
          <button 
            class="btn btn-lg next-btn" 
            on:click={() => goToStep(2)}
            disabled={!selectedHabit}
          >
            Continue to Self-Rating
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    {/if}
    
    <!-- Step 2: Rate yourself -->
    {#if currentStep === 2 && selectedHabit !== null}
      <div class="step-container" in:fly={{ y: 20, duration: 400 }}>
        <h2 class="step-title">Step 2: Rate Your Current Ability</h2>
        <p class="step-instruction">
          How would you rate your current use of <strong>{getHabitName(selectedHabit)}</strong>?
          Consider how consistently you demonstrate this habit in different situations.
        </p>
        
        <div class="selected-habit-info card">
          <h3 class="habit-focus">{getHabitName(selectedHabit)}</h3>
          <p class="habit-focus-desc">{getHabitDescription(selectedHabit)}</p>
          
          <div class="habit-examples">
            <h4 class="examples-title">Examples of this habit in action:</h4>
            <ul class="examples-list">
              {#each getHabitExamples(selectedHabit) as example}
                <li>{example}</li>
              {/each}
            </ul>
          </div>
        </div>
        
        <div class="rating-container">
          <label class="rating-label">Rate yourself from 1 to 5:</label>
          <div class="rating-options">
            {#each [1, 2, 3, 4, 5] as rating}
              <div 
                class="rating-option" 
                class:selected={selfRatings[selectedHabit] === rating}
                on:click={() => handleRatingChange(selectedHabit, rating)}
                on:keydown={e => e.key === 'Enter' && handleRatingChange(selectedHabit, rating)}
                role="button"
                tabindex="0"
                aria-pressed={selfRatings[selectedHabit] === rating}
              >
                <span class="rating-number">{rating}</span>
                <span class="rating-label">
                  {rating === 1 ? 'Beginning' : 
                   rating === 2 ? 'Developing' : 
                   rating === 3 ? 'Proficient' : 
                   rating === 4 ? 'Advanced' : 'Expert'}
                </span>
              </div>
            {/each}
          </div>
          
          <div class="rating-description">
            {#if selfRatings[selectedHabit] === 1}
              <p>I rarely use this habit. I'm just beginning to recognize when it would be helpful.</p>
            {:else if selfRatings[selectedHabit] === 2}
              <p>I sometimes use this habit, but only in familiar situations or when prompted.</p>
            {:else if selfRatings[selectedHabit] === 3}
              <p>I often use this habit in many situations. I'm becoming more consistent with it.</p>
            {:else if selfRatings[selectedHabit] === 4}
              <p>I regularly use this habit across different contexts and can teach it to others.</p>
            {:else if selfRatings[selectedHabit] === 5}
              <p>I consistently and automatically apply this habit in almost all situations.</p>
            {:else}
              <p>Select a rating to see description</p>
            {/if}
          </div>
        </div>
        
        <div class="step-actions">
          <button class="btn btn-secondary back-btn" on:click={() => goToStep(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </button>
          
          <button 
            class="btn btn-lg next-btn" 
            on:click={() => goToStep(3)}
            disabled={selfRatings[selectedHabit] === 0}
          >
            Continue to Reflection
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    {/if}
    
    <!-- Step 3: Reflect on strengths and challenges -->
    {#if currentStep === 3 && selectedHabit !== null}
      <div class="step-container" in:fly={{ y: 20, duration: 400 }}>
        <h2 class="step-title">Step 3: Reflect on Your Strengths and Challenges</h2>
        <p class="step-instruction">
          Take a moment to think about your experiences with <strong>{getHabitName(selectedHabit)}</strong>.
          What are your strengths and challenges with this habit?
        </p>
        
        <div class="reflection-prompts">
          <div class="reflection-prompt">
            <h3 class="prompt-title">Your Strengths</h3>
            <p class="prompt-desc">What specific situations or contexts do you already use this habit effectively?</p>
            <textarea 
              class="reflection-input"
              rows="4"
              placeholder="I'm good at using this habit when..."
              bind:value={freeformResponses.strengths}
            ></textarea>
            <div class="prompt-tips">
              <h4>Thinking Prompts:</h4>
              <ul>
                <li>When have you successfully used this habit?</li>
                <li>What makes it easier for you to use this habit?</li>
                <li>What positive results have you seen from using this habit?</li>
              </ul>
            </div>
          </div>
          
          <div class="reflection-prompt">
            <h3 class="prompt-title">Your Challenges</h3>
            <p class="prompt-desc">In what situations or contexts do you struggle to use this habit?</p>
            <textarea 
              class="reflection-input"
              rows="4"
              placeholder="I find it difficult to use this habit when..."
              bind:value={freeformResponses.challenges}
            ></textarea>
            <div class="prompt-tips">
              <h4>Thinking Prompts:</h4>
              <ul>
                <li>What makes it difficult to use this habit consistently?</li>
                <li>Are there specific emotions or situations that make it harder?</li>
                <li>What barriers or obstacles get in your way?</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="metacognition-tip highlight">
          <h4>Metacognition Tip</h4>
          <p>As you reflect, you're practicing "thinking about your thinking" - a key Habit of Mind itself! 
          This self-awareness helps you identify patterns and develop strategies for growth.</p>
        </div>
        
        <div class="step-actions">
          <button class="btn btn-secondary back-btn" on:click={() => goToStep(2)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </button>
          
          <button 
            class="btn btn-lg next-btn" 
            on:click={() => goToStep(4)}
            disabled={!freeformResponses.strengths.trim() || !freeformResponses.challenges.trim()}
          >
            Continue to Goal Setting
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    {/if}
    
    <!-- Step 4: Set goals -->
    {#if currentStep === 4 && selectedHabit !== null}
      <div class="step-container" in:fly={{ y: 20, duration: 400 }}>
        <h2 class="step-title">Step 4: Set Goals for Growth</h2>
        <p class="step-instruction">
          Based on your reflection, set specific goals for developing your <strong>{getHabitName(selectedHabit)}</strong> habit.
          What specific steps could you take to improve?
        </p>
        
        <div class="goals-container">
          <div class="goal-setting-card card">
            <h3 class="goal-setting-title">Your Growth Plan</h3>
            <p class="goal-setting-desc">
              Describe specific, measurable goals that will help you develop this habit.
              Think about when, where, and how you'll practice using this habit.
            </p>
            
            <textarea 
              class="goals-input"
              rows="6"
              placeholder="To develop this habit, I will..."
              bind:value={freeformResponses.goals}
            ></textarea>
            
            <div class="goal-tips">
              <h4>SMART Goal Tips:</h4>
              <ul>
                <li><strong>Specific:</strong> What exactly will you do?</li>
                <li><strong>Measurable:</strong> How will you track progress?</li>
                <li><strong>Achievable:</strong> Is this realistic for you?</li>
                <li><strong>Relevant:</strong> How does this connect to your challenges?</li>
                <li><strong>Time-bound:</strong> When will you work on this?</li>
              </ul>
            </div>
          </div>
          
          <div class="goal-examples highlight">
            <h4>Example Goals for {getHabitName(selectedHabit)}</h4>
            <ul>
              {#if selectedHabit === 1} <!-- Persisting -->
                <li>I will spend at least 10 minutes on difficult problems before asking for help.</li>
                <li>When I feel like giving up, I'll try at least two different approaches.</li>
                <li>I'll keep a "persistence journal" to track challenges I've overcome.</li>
              {:else if selectedHabit === 2} <!-- Managing impulsivity -->
                <li>Before responding in discussions, I'll pause for 3 seconds to collect my thoughts.</li>
                <li>I'll create a checklist to review before submitting important work.</li>
                <li>When feeling frustrated, I'll use a calming technique before continuing.</li>
              {:else if selectedHabit === 3} <!-- Listening with understanding -->
                <li>During conversations, I'll practice summarizing what others say before responding.</li>
                <li>I'll ask at least one clarifying question in each class discussion.</li>
                <li>I'll notice when I'm forming a response instead of listening, and refocus.</li>
              {:else if selectedHabit === 4} <!-- Thinking flexibly -->
                <li>For complex problems, I'll brainstorm at least three different approaches.</li>
                <li>I'll seek out perspectives different from my own on current issues.</li>
                <li>When my first solution doesn't work, I'll try to reframe the problem.</li>
              {:else if selectedHabit === 5} <!-- Metacognition -->
                <li>I'll spend 5 minutes after each study session reflecting on what worked well.</li>
                <li>I'll keep a learning journal to track my thinking strategies.</li>
                <li>Before tests, I'll create a plan for how I'll approach different question types.</li>
              {:else}
                <li>I'll practice this habit daily in a specific context (like class discussions or problem-solving).</li>
                <li>I'll reflect weekly on situations where I used this habit effectively.</li>
                <li>I'll partner with a friend to give each other feedback on using this habit.</li>
              {/if}
            </ul>
          </div>
        </div>
        
        <div class="step-actions">
          <button class="btn btn-secondary back-btn" on:click={() => goToStep(3)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </button>
          
          <button 
            class="btn btn-lg next-btn" 
            on:click={generateResults}
            disabled={loading || !freeformResponses.goals.trim()}
          >
            {#if loading}
              <span class="loading-spinner"></span>
              Generating feedback...
            {:else}
              Get Personalized Feedback
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            {/if}
          </button>
        </div>
      </div>
    {/if}
    
    <!-- Step 5: Results and feedback -->
    {#if currentStep === 5 && selectedHabit !== null && showResults}
      <div class="step-container" in:fly={{ y: 20, duration: 400 }}>
        <h2 class="step-title">Your Growth Plan for {getHabitName(selectedHabit)}</h2>
        <p class="step-instruction">
          Here's a personalized analysis of your self-assessment and goals for developing the
          <strong>{getHabitName(selectedHabit)}</strong> habit.
        </p>
        
        <div class="results-summary">
          <div class="results-card card">
            <div class="result-header">
              <div class="result-badge">
                <span class="habit-number">{selectedHabit}</span>
                <h3 class="habit-name">{getHabitName(selectedHabit)}</h3>
              </div>
              <div class="self-rating">
                <span class="rating-label">Your Self-Rating:</span>
                <div class="rating-display">
                  {#each Array(5) as _, i}
                    <span class="rating-star" class:filled={i < selfRatings[selectedHabit]}>★</span>
                  {/each}
                </div>
              </div>
            </div>
            
            <div class="feedback-content">
              <div class="feedback-text">
                {#each generatedFeedback.split('\n') as paragraph}
                  {#if paragraph.trim()}
                    {#if paragraph.startsWith('#')}
                      <h3>{paragraph.replace(/^#+\s/, '')}</h3>
                    {:else if paragraph.startsWith('**')}
                      <h4>{paragraph.replace(/^\*\*|\*\*$/g, '')}</h4>
                    {:else}
                      <p>{paragraph}</p>
                    {/if}
                  {/if}
                {/each}
              </div>
            </div>
            
            <div class="next-steps">
              <h3>Continue Your Growth Journey</h3>
              <p>Remember that developing Habits of Mind is an ongoing process. Regular reflection and practice are key to growth.</p>
              <div class="next-steps-actions">
                <button class="btn" on:click={restart}>
                  Start a New Self-Assessment
                </button>
                <button class="btn btn-secondary" on:click={() => {
                  const text = `
Self-Assessment Results: ${getHabitName(selectedHabit)}
Self-Rating: ${selfRatings[selectedHabit]}/5

Strengths:
${freeformResponses.strengths}

Challenges:
${freeformResponses.challenges}

My Growth Goals:
${freeformResponses.goals}

Feedback:
${generatedFeedback}
                  `;
                  
                  const blob = new Blob([text], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${getHabitName(selectedHabit).replace(/\s+/g, '-').toLowerCase()}-assessment.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
.self-assessment-container {
  width: 100%;
  padding-bottom: var(--spacing-3xl);
  position: relative;
}

.assessment-header {
  padding: var(--spacing-2xl) 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
    font-size: 2.5rem;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }
  
  .section-subtitle {
    color: var(--text-secondary);
    max-width: 800px;
    margin: 0 auto var(--spacing-xl);
    font-size: 1.1rem;
    position: relative;
    z-index: 2;
  }
}

.header-shape {
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  opacity: 0.1;
  
  &.shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    top: -100px;
    right: -50px;
  }
  
  &.shape-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, var(--secondary-color), var(--primary-light));
    bottom: -50px;
    left: -50px;
  }
}

.progress-bar-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    display: none;
  }
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 80px;
  
  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--surface-color);
    color: var(--text-secondary);
    border: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    transition: all var(--transition-speed);
  }
  
  .step-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-align: center;
    transition: all var(--transition-speed);
  }
  
  &.active {
    .step-number {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    
    .step-label {
      color: var(--primary-color);
      font-weight: 600;
    }
  }
  
  &.completed {
    .step-number {
      background-color: var(--success-color);
      color: white;
      border-color: var(--success-color);
    }
  }
}

.progress-bar {
  height: 6px;
  background-color: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
  
  .progress-fill {
    height: 100%;
    background: var(--gradient-primary);
    transition: width 0.5s ease;
  }
}

.assessment-content {
  max-width: 900px;
  margin: 0 auto;
}

.step-container {
  padding: var(--spacing-xl) 0;
  
  .step-title {
    font-size: 1.75rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  .step-instruction {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xl);
    font-size: 1.1rem;
  }
}

.habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.habit-card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: all var(--transition-speed);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
    border-color: var(--primary-light);
  }
  
  &.selected {
    border-color: var(--primary-color);
    background-color: var(--highlight-color);
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
  }
  
  .habit-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-sm);
  }
  
  .habit-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: var(--spacing-sm);
  }
  
  .habit-name {
    font-size: 1.1rem;
    color: var(--text-color);
    margin: 0;
  }
  
  .habit-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }
  
  .selected-indicator {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    color: var(--primary-color);
  }
}

.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .back-btn, .next-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    
    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
    }
  }
}

.selected-habit-info {
  margin-bottom: var(--spacing-xl);
  
  .habit-focus {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
  }
  
  .habit-focus-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  .habit-examples {
    margin-top: var(--spacing-md);
    
    .examples-title {
      font-size: 1rem;
      margin-bottom: var(--spacing-sm);
      color: var(--text-color);
    }
    
    .examples-list {
      padding-left: var(--spacing-xl);
      
      li {
        margin-bottom: var(--spacing-xs);
        color: var(--text-secondary);
      }
    }
  }
}

.rating-container {
  margin-bottom: var(--spacing-xl);
  
  .rating-label {
    display: block;
    margin-bottom: var(--spacing-md);
    font-weight: 600;
    color: var(--text-color);
  }
  
  .rating-options {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
  }
  
  .rating-option {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-md);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-speed);
    
    @media (max-width: 768px) {
      min-width: calc(50% - var(--spacing-sm));
    }
    
    &:hover {
      transform: translateY(-2px);
      border-color: var(--primary-light);
    }
    
    &.selected {
      border-color: var(--primary-color);
      background-color: var(--highlight-color);
      transform: translateY(-2px);
    }
    
    .rating-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: var(--spacing-xs);
    }
    
    .rating-label {
      font-size: 0.85rem;
      color: var(--text-secondary);
      text-align: center;
      margin: 0;
    }
  }
  
  .rating-description {
    padding: var(--spacing-md);
    background-color: var(--highlight-color);
    border-radius: var(--radius-md);
    
    p {
      margin: 0;
      color: var(--text-secondary);
      font-style: italic;
    }
  }
}

.reflection-prompts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.reflection-prompt {
  .prompt-title {
    font-size: 1.25rem;
    color: var(--text-color);
    margin-bottom: var(--spacing-sm);
  }
  
  .prompt-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  .reflection-input {
    width: 100%;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    color: var(--text-color);
    transition: all var(--transition-speed);
    margin-bottom: var(--spacing-md);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
    }
  }
  
  .prompt-tips {
    padding: var(--spacing-md);
    background-color: var(--highlight-color);
    border-radius: var(--radius-md);
    
    h4 {
      font-size: 0.9rem;
      margin-bottom: var(--spacing-sm);
      color: var(--text-color);
    }
    
    ul {
      padding-left: var(--spacing-lg);
      margin: 0;
      
      li {
        margin-bottom: var(--spacing-xs);
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
    }
  }
}

.metacognition-tip {
  margin-bottom: var(--spacing-xl);
  
  h4 {
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
  }
}

.goals-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.goal-setting-card {
  padding: var(--spacing-xl);
  
  .goal-setting-title {
    font-size: 1.25rem;
    color: var(--text-color);
    margin-bottom: var(--spacing-sm);
  }
  
  .goal-setting-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  .goals-input {
    width: 100%;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    color: var(--text-color);
    transition: all var(--transition-speed);
    margin-bottom: var(--spacing-md);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
    }
  }
  
  .goal-tips {
    h4 {
      font-size: 0.9rem;
      margin-bottom: var(--spacing-sm);
      color: var(--text-color);
    }
    
    ul {
      padding-left: var(--spacing-lg);
      margin: 0;
      
      li {
        margin-bottom: var(--spacing-xs);
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
    }
  }
}

.goal-examples {
  h4 {
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  ul {
    padding-left: var(--spacing-lg);
    margin: 0;
    
    li {
      margin-bottom: var(--spacing-sm);
      color: var(--text-secondary);
    }
  }
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: var(--spacing-sm);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.results-card {
  padding: var(--spacing-xl);
  
  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-md);
    }
  }
  
  .result-badge {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    
    .habit-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .habit-name {
      font-size: 1.5rem;
      color: var(--text-color);
      margin: 0;
    }
  }
  
  .self-rating {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    
    .rating-label {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    
    .rating-display {
      display: flex;
      gap: 2px;
      
      .rating-star {
        font-size: 1.5rem;
        color: var(--border-color);
        
        &.filled {
          color: var(--primary-color);
        }
      }
    }
  }
  
  .feedback-content {
    margin-bottom: var(--spacing-xl);
    
    .feedback-text {
      h3 {
        font-size: 1.3rem;
        margin-top: var(--spacing-xl);
        margin-bottom: var(--spacing-md);
        color: var(--text-color);
        
        &:first-child {
          margin-top: 0;
        }
      }
      
      h4 {
        font-size: 1.1rem;
        margin-top: var(--spacing-md);
        margin-bottom: var(--spacing-sm);
        color: var(--text-color);
      }
      
      p {
        margin-bottom: var(--spacing-md);
        color: var(--text-secondary);
        line-height: 1.6;
      }
    }
  }
  
  .next-steps {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--border-color);
    
    h3 {
      font-size: 1.3rem;
      margin-bottom: var(--spacing-md);
      color: var(--text-color);
    }
    
    p {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-lg);
    }
    
    .next-steps-actions {
      display: flex;
      gap: var(--spacing-md);
      
      @media (max-width: 768px) {
        flex-direction: column;
      }
      
      button {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        
        @media (max-width: 768px) {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
}

/* General utility styles */
.highlight {
  background-color: var(--highlight-color);
  border-left: 4px solid var(--primary-color);
  padding: var(--spacing-lg);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.card {
  background-color: var(--surface-color);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
}
</style>