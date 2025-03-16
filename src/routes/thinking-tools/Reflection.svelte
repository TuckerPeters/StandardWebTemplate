<script lang="ts">
import { onMount } from "svelte";
import { fade, fly } from "svelte/transition";
import { habits } from "../../lib/habits";
import { callOpenAI } from "../../lib/api";

let mounted = false;
let loading = false;
let studentWork = "";
let learningGoals = "";
let selectedHabits: number[] = [];
let generatedReflection = "";
let showReflection = false;

onMount(() => {
  setTimeout(() => {
    mounted = true;
  }, 100);
});

async function handleSubmit() {
  if (!studentWork.trim()) {
    alert("Please include student work to reflect on");
    return;
  }
  
  loading = true;
  
  try {
    // Get the names of selected habits
    const habitNames = selectedHabits.length > 0 
      ? selectedHabits.map(id => habits.find(h => h.id === id)?.name || "").filter(name => name)
      : habits.map(h => h.name); // Use all habits if none selected
    
    // Generate a response using the API
    const systemPrompt = `You are a reflection tool focusing on these Habits of Mind: ${habitNames.join(', ')}. 
    Learning goals: ${learningGoals || "General learning growth"}.`;
    const response = await callOpenAI(systemPrompt, studentWork);
    
    generatedReflection = response;
    showReflection = true;
  } catch (error) {
    console.error("Error generating reflection:", error);
    generatedReflection = "I'm sorry, there was an error generating the reflection. Please try again.";
    showReflection = true;
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
  studentWork = "";
  learningGoals = "";
  selectedHabits = [];
  generatedReflection = "";
  showReflection = false;
}
</script>

<div class="reflection-container">
  <!-- Header section -->
  <section class="reflection-header" in:fade={{ duration: 500, delay: 200 }}>
    <div class="header-shape shape-1"></div>
    <div class="header-shape shape-2"></div>
    
    <h1 class="section-title">Reflection Tool</h1>
    <p class="section-subtitle">
      Use the power of reflection to deepen learning and identify opportunities for growth.
      This tool helps educators provide thoughtful feedback through a Habits of Mind lens.
    </p>
  </section>
  
  <!-- Main content -->
  <div class="reflection-content container" in:fade={{ duration: 500, delay: 300 }}>
    {#if !showReflection}
      <div class="reflection-form card">
        <h2>Student Work Reflection</h2>
        <p class="form-instruction">
          Enter student work to reflect on. This could be an essay, problem solution, or project description.
        </p>
        
        <textarea 
          bind:value={studentWork}
          placeholder="Paste student work here..."
          rows="6"
          class="work-input"
        ></textarea>
        
        <div class="learning-goals">
          <h3>Learning Goals (Optional)</h3>
          <p class="form-instruction">
            What were the learning goals or objectives for this work?
          </p>
          <textarea 
            bind:value={learningGoals}
            placeholder="Describe learning goals or objectives..."
            rows="3"
            class="goals-input"
          ></textarea>
        </div>
        
        <div class="habits-selection">
          <h3>Focus on Specific Habits (Optional)</h3>
          <p class="form-instruction">
            Select specific Habits of Mind to focus on, or leave blank to consider all habits.
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
              </div>
            {/each}
          </div>
        </div>
        
        <div class="form-actions">
          <button 
            class="btn btn-lg" 
            on:click={handleSubmit}
            disabled={loading || !studentWork.trim()}
          >
            {#if loading}
              <span class="loading-spinner"></span>
              Generating reflection...
            {:else}
              Generate reflection
            {/if}
          </button>
        </div>
      </div>
    {:else}
      <div class="response-card card" in:fly={{ y: 20, duration: 500 }}>
        <h2>Thoughtful Reflection</h2>
        
        {#if selectedHabits.length > 0}
          <div class="selected-habits">
            <h3>Habits Considered:</h3>
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
        {/if}
        
        <div class="reflection-content">
          <h3>Reflection:</h3>
          <div class="reflection-text">
            {#each generatedReflection.split('\n') as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
        </div>
        
        <div class="form-actions">
          <button class="btn btn-secondary" on:click={reset}>
            Create another reflection
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
.reflection-container {
  width: 100%;
  padding-bottom: var(--spacing-3xl);
  position: relative;
}

.reflection-header {
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
    background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
    top: -100px;
    right: -50px;
  }
  
  &.shape-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, var(--accent-light), var(--accent-color));
    bottom: -50px;
    left: -50px;
  }
}

.reflection-content {
  max-width: 900px;
  margin: 0 auto;
}

.reflection-form, .response-card {
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

.work-input, .goals-input {
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
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
  }
}

.learning-goals {
  margin-top: var(--spacing-lg);
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
  
  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-light);
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
  .selected-habits {
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
  
  .reflection-text {
    padding: var(--spacing-md);
    background-color: var(--highlight-color);
    border-radius: var(--radius-md);
    margin-top: var(--spacing-sm);
    
    p {
      margin-bottom: var(--spacing-md);
      line-height: 1.6;
      color: var(--text-color);
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .habits-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>