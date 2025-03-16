<script lang="ts">
import { onMount } from "svelte";
import { fade, fly } from "svelte/transition";
import { habits } from "../../lib/habits";
import { callOpenAI } from "../../lib/api";

let mounted = false;
let loading = false;
let lessonTitle = "";
let gradeLevel = "";
let subject = "";
let objectives = "";
let lessonDescription = "";
let selectedHabits: number[] = [];
let generatedPlan = "";
let showPlan = false;

onMount(() => {
  setTimeout(() => {
    mounted = true;
  }, 100);
});

async function handleSubmit() {
  if (!lessonTitle.trim() || !objectives.trim() || !lessonDescription.trim()) {
    alert("Please fill out all required fields");
    return;
  }
  
  if (selectedHabits.length === 0) {
    alert("Please select at least one habit to incorporate");
    return;
  }
  
  loading = true;
  
  try {
    // Get the names of selected habits
    const habitNames = selectedHabits.map(id => 
      habits.find(h => h.id === id)?.name || ""
    ).filter(name => name);
    
    // Generate a response using the API
    const systemPrompt = `You are a lesson planner tool. Create a lesson plan for "${lessonTitle}" 
    for grade level: ${gradeLevel}, subject: ${subject}, focusing on these Habits of Mind: ${habitNames.join(', ')}.
    Learning objectives: ${objectives}`;
    const response = await callOpenAI(systemPrompt, lessonDescription);
    
    generatedPlan = response;
    showPlan = true;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    generatedPlan = "I'm sorry, there was an error generating the lesson plan. Please try again.";
    showPlan = true;
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
  lessonTitle = "";
  gradeLevel = "";
  subject = "";
  objectives = "";
  lessonDescription = "";
  selectedHabits = [];
  generatedPlan = "";
  showPlan = false;
}
</script>

<div class="lesson-planner-container">
  <!-- Header section -->
  <section class="planner-header" in:fade={{ duration: 500, delay: 200 }}>
    <div class="header-shape shape-1"></div>
    <div class="header-shape shape-2"></div>
    
    <h1 class="section-title">Lesson Planner</h1>
    <p class="section-subtitle">
      Design engaging lessons that incorporate Habits of Mind principles.
      This tool will help you create lesson plans that develop critical thinking skills.
    </p>
  </section>
  
  <!-- Main content -->
  <div class="planner-content container" in:fade={{ duration: 500, delay: 300 }}>
    {#if !showPlan}
      <div class="planner-form card">
        <h2>Create a Lesson Plan</h2>
        <p class="form-instruction">
          Fill out the information below to generate a lesson plan that incorporates Habits of Mind.
        </p>
        
        <div class="form-group">
          <label for="lesson-title">Lesson Title<span class="required">*</span></label>
          <input 
            type="text" 
            id="lesson-title"
            bind:value={lessonTitle}
            placeholder="Enter a title for your lesson"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="grade-level">Grade Level</label>
            <input 
              type="text" 
              id="grade-level"
              bind:value={gradeLevel}
              placeholder="e.g., K-2, 3-5, 6-8, 9-12"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="subject">Subject Area</label>
            <input 
              type="text" 
              id="subject"
              bind:value={subject}
              placeholder="e.g., Math, Science, Language Arts"
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="objectives">Learning Objectives<span class="required">*</span></label>
          <textarea 
            id="objectives"
            bind:value={objectives}
            placeholder="What should students learn or be able to do after this lesson?"
            rows="3"
            class="form-input"
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="description">Lesson Description<span class="required">*</span></label>
          <textarea 
            id="description"
            bind:value={lessonDescription}
            placeholder="Describe your lesson idea, activities, or content you plan to cover."
            rows="5"
            class="form-input"
            required
          ></textarea>
        </div>
        
        <div class="habits-selection">
          <h3>Select Habits to Incorporate<span class="required">*</span></h3>
          <p class="form-instruction">
            Choose one or more Habits of Mind to intentionally include in your lesson plan.
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
            disabled={loading || !lessonTitle.trim() || !objectives.trim() || !lessonDescription.trim() || selectedHabits.length === 0}
          >
            {#if loading}
              <span class="loading-spinner"></span>
              Generating lesson plan...
            {:else}
              Generate lesson plan
            {/if}
          </button>
        </div>
      </div>
    {:else}
      <div class="plan-card card" in:fly={{ y: 20, duration: 500 }}>
        <h2>{lessonTitle}</h2>
        
        <div class="plan-meta">
          {#if gradeLevel}
            <div class="meta-item">
              <span class="meta-label">Grade Level:</span>
              <span class="meta-value">{gradeLevel}</span>
            </div>
          {/if}
          
          {#if subject}
            <div class="meta-item">
              <span class="meta-label">Subject:</span>
              <span class="meta-value">{subject}</span>
            </div>
          {/if}
          
          <div class="meta-item">
            <span class="meta-label">Habits of Mind:</span>
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
        </div>
        
        <div class="plan-content">
          <div class="plan-text">
            {#each generatedPlan.split('\n') as paragraph}
              {#if paragraph.trim()}
                {#if paragraph.startsWith('#')}
                  <h3>{paragraph.replace(/^#+\s/, '')}</h3>
                {:else}
                  <p>{paragraph}</p>
                {/if}
              {/if}
            {/each}
          </div>
        </div>
        
        <div class="form-actions">
          <button class="btn btn-secondary" on:click={reset}>
            Create another lesson plan
          </button>
          <button class="btn" on:click={() => {
            const blob = new Blob([generatedPlan], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-lesson-plan.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download plan
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
.lesson-planner-container {
  width: 100%;
  padding-bottom: var(--spacing-3xl);
  position: relative;
}

.planner-header {
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

.planner-content {
  max-width: 900px;
  margin: 0 auto;
}

.planner-form, .plan-card {
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
    margin-bottom: var(--spacing-lg);
  }
}

.form-group {
  margin-bottom: var(--spacing-md);
  
  label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
    color: var(--text-color);
  }
  
  .required {
    color: var(--accent-color);
    margin-left: 4px;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.form-input {
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--surface-color);
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
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
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

.plan-card {
  h2 {
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    color: var(--primary-color);
  }
}

.plan-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  
  .meta-item {
    display: flex;
    align-items: flex-start;
    margin-right: var(--spacing-lg);
    
    @media (max-width: 768px) {
      flex-direction: column;
      margin-bottom: var(--spacing-sm);
    }
  }
  
  .meta-label {
    font-weight: 600;
    color: var(--text-color);
    margin-right: var(--spacing-xs);
  }
  
  .meta-value {
    color: var(--text-secondary);
  }
  
  .habit-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  
  .habit-tag {
    background-color: var(--highlight-color);
    color: var(--primary-color);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.plan-content {
  margin-bottom: var(--spacing-xl);
  
  .plan-text {
    h3 {
      font-size: 1.3rem;
      margin-top: var(--spacing-xl);
      margin-bottom: var(--spacing-md);
      color: var(--text-color);
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: var(--spacing-xs);
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    p {
      margin-bottom: var(--spacing-md);
      line-height: 1.6;
      color: var(--text-secondary);
    }
  }
}

@media (max-width: 768px) {
  .habits-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .form-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>