<script lang="ts">
import { onMount } from "svelte";
import { fade, fly } from "svelte/transition";
import { habits } from "../../lib/habits";
import { callOpenAI } from "../../lib/api";

let mounted = false;
let loading = false;
let problemStatement = "";
let selectedHabits: number[] = [];
let generatedResponse = "";
let showResponse = false;

onMount(() => {
  setTimeout(() => {
    mounted = true;
  }, 100);
});

async function handleSubmit() {
  if (!problemStatement.trim()) {
    alert("Please describe your problem first");
    return;
  }
  
  if (selectedHabits.length === 0) {
    alert("Please select at least one habit to apply");
    return;
  }
  
  loading = true;
  
  try {
    // Get the names of selected habits
    const habitNames = selectedHabits.map(id => 
      habits.find(h => h.id === id)?.name || ""
    ).filter(name => name);
    
    // Generate a response using the API
    const systemPrompt = `You are a problem solver coach focusing on the following Habits of Mind: ${habitNames.join(', ')}`;
    const response = await callOpenAI(systemPrompt, problemStatement);
    
    generatedResponse = response;
    showResponse = true;
  } catch (error) {
    console.error("Error generating response:", error);
    generatedResponse = "I'm sorry, there was an error processing your request. Please try again.";
    showResponse = true;
  } finally {
    loading = false;
  }
}

function toggleHabit(id: number) {
  if (selectedHabits.includes(id)) {
    selectedHabits = selectedHabits.filter(h => h !== id);
  } else {
    selectedHabits = [...selectedHabits, id];
  }
}

function reset() {
  problemStatement = "";
  selectedHabits = [];
  generatedResponse = "";
  showResponse = false;
}
</script>

<div class="problem-solver-container">
  <!-- Header section -->
  <section class="problem-header" in:fade={{ duration: 500, delay: 200 }}>
    <div class="header-shape shape-1"></div>
    <div class="header-shape shape-2"></div>
    
    <h1 class="section-title">Problem Solver's Workshop</h1>
    <p class="section-subtitle">
      Apply Habits of Mind to help you think through challenges creatively.
      Rather than providing direct answers, this tool guides your thinking process.
    </p>
  </section>
  
  <!-- Main content -->
  <div class="problem-solver-content container" in:fade={{ duration: 500, delay: 300 }}>
    {#if !showResponse}
      <div class="problem-form-container">
        <div class="tutor-introduction card">
          <div class="tutor-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 0 0-16 0"></path>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </div>
          <div class="tutor-message">
            <h3>Hello, I'm your Problem-Solving Tutor!</h3>
            <p>I'll guide your thinking process using the Habits of Mind framework. Instead of solving your problem for you, I'll help you develop the mental habits to tackle challenges yourself.</p>
            <div class="tutorial-tip highlight">
              <h4>How this works:</h4>
              <ol>
                <li>Describe your problem in detail below</li>
                <li>Select which Habits of Mind you'd like to apply</li>
                <li>I'll provide guided questions to help you think through the problem</li>
                <li>You'll develop your own solution, building valuable thinking skills along the way</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="problem-form card">
          <h2>Describe Your Problem</h2>
          <p class="form-instruction">
            What problem are you trying to solve? Be as specific as possible.
          </p>
          
          <textarea 
            bind:value={problemStatement}
            placeholder="Describe the problem you're facing..."
            rows="5"
            class="problem-input"
          ></textarea>
          
          <div class="thinking-tips highlight">
            <h4>Effective Problem Description Tips:</h4>
            <ul>
              <li><strong>Be specific:</strong> Include key details that matter to your problem</li>
              <li><strong>Define the goal:</strong> What would a successful outcome look like?</li>
              <li><strong>List constraints:</strong> What limitations or requirements must be met?</li>
              <li><strong>Show attempts:</strong> What have you already tried and what happened?</li>
            </ul>
          </div>
          
          <div class="habits-selection">
            <h3>Select Habits to Apply</h3>
            <p class="form-instruction">
              Choose one or more Habits of Mind that you think might help with this problem.
            </p>
            
            <div class="habits-grid">
              {#each habits as habit}
                <div 
                  class="habit-chip" 
                  class:selected={selectedHabits.includes(habit.id)}
                  on:click={() => toggleHabit(habit.id)}
                  on:keydown={e => e.key === 'Enter' && toggleHabit(habit.id)}
                  in:fly={{ y: 10, delay: 300 + (habit.id * 30), duration: 200 }}
                  role="button"
                  tabindex="0"
                  aria-pressed={selectedHabits.includes(habit.id)}
                >
                  <span class="habit-number">{habit.id}</span>
                  <span class="habit-name">{habit.name}</span>
                  <span class="habit-tooltip">{habit.description}</span>
                </div>
              {/each}
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              class="btn btn-lg" 
              on:click={handleSubmit}
              disabled={loading || !problemStatement.trim() || selectedHabits.length === 0}
            >
              {#if loading}
                <span class="loading-spinner"></span>
                Generating guidance...
              {:else}
                Get Thinking Guidance
              {/if}
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="response-card card" in:fly={{ y: 20, duration: 500 }}>
        <h2>Thinking Process Guidance</h2>
        
        <div class="selected-habits">
          <h3>Habits of Mind You're Developing:</h3>
          <div class="habit-tags">
            {#each selectedHabits as habitId}
              {#if habits.find(h => h.id === habitId)}
                <span class="habit-tag">
                  {habits.find(h => h.id === habitId)?.name}
                </span>
              {/if}
            {/each}
          </div>
        </div>
        
        <div class="problem-statement">
          <h3>Your Problem:</h3>
          <p>{problemStatement}</p>
        </div>
        
        <div class="tutor-section">
          <div class="tutor-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 0 0-16 0"></path>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </div>
          <div class="tutor-message">
            <h3>Your Thinking Process Guide</h3>
            <p>Instead of solving your problem for you, I'll guide you through questions that will help you develop your own solution while practicing valuable thinking habits.</p>
          </div>
        </div>
        
        <div class="response-content">
          <div class="response-text">
            {#each generatedResponse.split('\n') as paragraph}
              {#if paragraph.trim()}
                {#if paragraph.startsWith('**') && paragraph.endsWith('**')}
                  <h4>{paragraph.replace(/^\*\*|\*\*$/g, '')}</h4>
                {:else}
                  <p>{paragraph}</p>
                {/if}
              {/if}
            {/each}
          </div>
        </div>
        
        <div class="reflection-section highlight">
          <h3>Reflection Space</h3>
          <p>Use this space to write down your thoughts as you work through the questions above. This helps develop your metacognition (thinking about thinking).</p>
          <textarea 
            placeholder="Write your reflections here as you work through the problem..."
            rows="5"
            class="reflection-input"
          ></textarea>
        </div>
        
        <div class="habit-application">
          <h3>How You're Building These Habits</h3>
          <div class="habit-application-grid">
            {#each selectedHabits as habitId}
              {#if habits.find(h => h.id === habitId)}
                <div class="habit-application-item">
                  <h4>{habits.find(h => h.id === habitId)?.name}</h4>
                  <p>
                    {#if habitId === 1}
                      By working through difficult problems step by step, you're developing persistence.
                    {:else if habitId === 2}
                      By taking time to think before acting, you're managing impulsivity.
                    {:else if habitId === 3}
                      By considering different perspectives, you're practicing empathetic listening.
                    {:else if habitId === 4}
                      By exploring multiple approaches, you're building flexible thinking.
                    {:else if habitId === 5}
                      By reflecting on your thinking process, you're developing metacognition.
                    {:else if habitId === 6}
                      By checking your work carefully, you're striving for accuracy.
                    {:else if habitId === 7}
                      By asking deep questions, you're developing your questioning habit.
                    {:else if habitId === 8}
                      By connecting to previous knowledge, you're building transfer skills.
                    {:else if habitId === 9}
                      By expressing ideas precisely, you're developing clear communication.
                    {:else if habitId === 10}
                      By gathering information through multiple channels, you're using your senses.
                    {:else if habitId === 11}
                      By generating novel solutions, you're developing creativity.
                    {:else if habitId === 12}
                      By finding wonder in the problem, you're building appreciation.
                    {:else if habitId === 13}
                      By trying new approaches, you're taking responsible risks.
                    {:else if habitId === 14}
                      By maintaining perspective, you're finding appropriate humor.
                    {:else if habitId === 15}
                      By collaborating with others, you're thinking interdependently.
                    {:else if habitId === 16}
                      By being open to new ideas, you're practicing continuous learning.
                    {:else}
                      You're actively developing this habit through the problem-solving process.
                    {/if}
                  </p>
                </div>
              {/if}
            {/each}
          </div>
        </div>
        
        <div class="form-actions">
          <button class="btn btn-secondary" on:click={reset}>
            Start with a new problem
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
.problem-solver-container {
  width: 100%;
  padding-bottom: var(--spacing-3xl);
  position: relative;
}

.problem-header {
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
    margin: 0 auto;
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
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    top: -100px;
    right: -50px;
  }
  
  &.shape-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
    bottom: -50px;
    left: -50px;
  }
}

.problem-solver-content {
  max-width: 900px;
  margin: 0 auto;
}

.problem-form-container {
  display: grid;
  gap: var(--spacing-xl);
}

.tutor-introduction {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  .tutor-avatar {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: var(--primary-light);
    color: white;
    border-radius: 50%;
    
    svg {
      margin-top: 12px;
    }
  }
  
  .tutor-message {
    flex: 1;
    
    h3 {
      font-size: 1.4rem;
      margin-bottom: var(--spacing-sm);
      color: var(--text-color);
    }
    
    p {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
    }
    
    .tutorial-tip {
      margin-top: var(--spacing-md);
      
      h4 {
        font-size: 1rem;
        margin-bottom: var(--spacing-sm);
        color: var(--text-color);
      }
      
      ol {
        padding-left: var(--spacing-xl);
        margin: 0;
        
        li {
          margin-bottom: var(--spacing-xs);
          color: var(--text-secondary);
        }
      }
    }
  }
}

.problem-form, .response-card {
  padding: var(--spacing-xl);
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    color: var(--text-color);
  }
  
  .form-instruction {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
}

.problem-input, .reflection-input {
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--surface-color);
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-color);
  transition: all var(--transition-speed);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
  }
}

.thinking-tips {
  margin: var(--spacing-md) 0 var(--spacing-xl);
  
  h4 {
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
  
  ul {
    padding-left: var(--spacing-xl);
    margin: 0;
    
    li {
      margin-bottom: var(--spacing-xs);
      color: var(--text-secondary);
    }
  }
}

.habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.habit-chip {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-speed);
  background-color: var(--surface-color);
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-light);
    
    .habit-tooltip {
      visibility: visible;
      opacity: 1;
    }
  }
  
  &.selected {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    
    .habit-number {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
  
  .habit-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: var(--highlight-color);
    color: var(--primary-color);
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: var(--spacing-sm);
  }
  
  .habit-name {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .habit-tooltip {
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--surface-color);
    color: var(--text-color);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    box-shadow: var(--card-shadow);
    width: 250px;
    z-index: 100;
    opacity: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    font-size: 0.85rem;
    border: 1px solid var(--border-color);
    
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -8px;
      border-width: 8px;
      border-style: solid;
      border-color: var(--surface-color) transparent transparent transparent;
    }
  }
}

.form-actions {
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: center;
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

.response-card {
  .selected-habits, .problem-statement {
    margin-bottom: var(--spacing-xl);
  }
  
  .habit-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-sm);
  }
  
  .habit-tag {
    background-color: var(--highlight-color);
    color: var(--primary-color);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .problem-statement p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
    line-height: 1.6;
  }
  
  .tutor-section {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-md);
    background-color: var(--highlight-color);
    border-radius: var(--radius-md);
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
    
    .tutor-avatar {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 48px;
      height: 48px;
      background-color: var(--primary-light);
      color: white;
      border-radius: 50%;
      
      svg {
        margin-top: 6px;
      }
    }
    
    .tutor-message {
      flex: 1;
      
      h3 {
        margin-top: 0;
        font-size: 1.2rem;
        margin-bottom: var(--spacing-xs);
        color: var(--text-color);
      }
      
      p {
        margin: 0;
        color: var(--text-secondary);
      }
    }
  }
  
  .response-content {
    margin-bottom: var(--spacing-xl);
    
    .response-text {
      background-color: var(--surface-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      border: 1px solid var(--border-color);
      
      h4 {
        font-size: 1.1rem;
        margin-top: var(--spacing-lg);
        margin-bottom: var(--spacing-sm);
        color: var(--primary-color);
        
        &:first-child {
          margin-top: 0;
        }
      }
      
      p {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-md);
        line-height: 1.6;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  
  .reflection-section {
    margin-bottom: var(--spacing-xl);
    
    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      margin-bottom: var(--spacing-sm);
    }
    
    p {
      margin-bottom: var(--spacing-md);
      color: var(--text-secondary);
    }
  }
  
  .habit-application {
    margin-bottom: var(--spacing-xl);
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: var(--spacing-lg);
    }
    
    .habit-application-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    
    .habit-application-item {
      padding: var(--spacing-md);
      background-color: var(--highlight-color);
      border-radius: var(--radius-md);
      
      h4 {
        font-size: 1rem;
        margin-bottom: var(--spacing-sm);
        color: var(--primary-color);
      }
      
      p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.95rem;
      }
    }
  }
}

.highlight {
  background-color: var(--highlight-color);
  border-left: 4px solid var(--primary-color);
  padding: var(--spacing-md);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

@media (max-width: 768px) {
  .habits-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>