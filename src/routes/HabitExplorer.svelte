<script lang="ts">
import { onMount } from "svelte";
import { Link } from "svelte-routing";
import { fade, fly } from "svelte/transition";
import { habits } from "../lib/habits";

// State for controlling animations
let mounted = false;
let selectedHabit = null;
let showDetails = false;
let filteredHabits = [...habits];
let searchTerm = "";

// Animate elements when component mounts
onMount(() => {
  setTimeout(() => {
    mounted = true;
  }, 100);
});

// Handle habit card click
function handleHabitClick(habit) {
  selectedHabit = habit;
  showDetails = true;
}

// Close detail view
function closeDetails() {
  showDetails = false;
  setTimeout(() => {
    selectedHabit = null;
  }, 300); // Wait for animation to complete
}

// Search functionality
function handleSearch() {
  if (!searchTerm.trim()) {
    filteredHabits = [...habits];
    return;
  }
  
  const term = searchTerm.toLowerCase();
  filteredHabits = habits.filter(habit => 
    habit.name.toLowerCase().includes(term) || 
    habit.description.toLowerCase().includes(term)
  );
}

// Reset search
function clearSearch() {
  searchTerm = "";
  filteredHabits = [...habits];
}
</script>

<div class="habit-explorer-container">
  <!-- Header section -->
  <section class="explorer-header" in:fade={{ duration: 500, delay: 200 }}>
    <div class="header-shape shape-1"></div>
    <div class="header-shape shape-2"></div>
    
    <h1 class="section-title">Habits of Mind Explorer</h1>
    <p class="section-subtitle">Explore all 16 Habits of Mind developed by Costa & Kallick</p>
    
    <!-- Search bar -->
    <div class="search-container" in:fade={{ duration: 500, delay: 400 }}>
      <input 
        type="text" 
        placeholder="Search habits..." 
        bind:value={searchTerm}
        on:input={handleSearch}
        class="search-input"
      />
      {#if searchTerm}
        <button class="clear-search" on:click={clearSearch}>×</button>
      {/if}
    </div>
  </section>
  
  <!-- Habits grid -->
  <section class="habits-grid-container" in:fade={{ duration: 500, delay: 300 }}>
    {#if filteredHabits.length === 0}
      <div class="no-results" in:fade>
        <h3>No habits found</h3>
        <p>Try another search term or <button class="reset-btn" on:click={clearSearch}>view all habits</button></p>
      </div>
    {:else}
      <div class="habits-grid">
        {#each filteredHabits as habit, i}
          <div 
            class="habit-card card card-interactive" 
            in:fly={{ y: 20, delay: 150 + (i * 50), duration: 400 }}
            on:click={() => handleHabitClick(habit)}
            on:keydown={e => e.key === 'Enter' && handleHabitClick(habit)}
            class:visible={mounted}
            role="button"
            tabindex="0"
            aria-label={`Learn more about ${habit.name}`}
          >
            <span class="habit-number">{habit.id}</span>
            <h3 class="habit-title">{habit.name}</h3>
            <p class="habit-preview">{habit.description.substring(0, 100)}...</p>
            <div class="card-footer">
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
  
  <!-- Habit detail modal -->
  {#if selectedHabit}
    <div 
      class="modal-backdrop" 
      class:show={showDetails}
      on:click={closeDetails}
      on:keydown={e => e.key === 'Enter' && closeDetails()}
      in:fade={{ duration: 300 }}
      role="button"
      tabindex="0"
      aria-label="Close details"
    ></div>
    
    <div class="habit-detail-modal" class:show={showDetails} in:fly={{ y: 20, duration: 400 }}>
      <button class="close-btn" on:click={closeDetails}>×</button>
      
      <div class="habit-detail-content">
        <span class="habit-number big">{selectedHabit.id}</span>
        <h2 class="habit-title">{selectedHabit.name}</h2>
        <div class="habit-description">
          <p>{selectedHabit.description}</p>
        </div>
        
        <h3 class="examples-title">Examples</h3>
        <ul class="examples-list">
          {#each selectedHabit.examples as example}
            <li>{example}</li>
          {/each}
        </ul>
        
        <h3 class="section-title small">How to develop this habit</h3>
        <div class="development-tips">
          <p>Practice this habit by deliberately incorporating it into your daily routines. Notice opportunities where you can apply it and reflect on the results.</p>
          <p>Create reminders or visual cues to help you remember to use this habit in challenging situations.</p>
        </div>
        
        <div class="related-content">
          <h3 class="section-title small">Related Content</h3>
          <div class="related-links">
            <Link to="/habit-coach" class="related-link">
              <span>Practice with Habit Coach</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link to="/thinking-tools/problem-solver" class="related-link">
              <span>Use in Problem Solver</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
.habit-explorer-container {
  width: 100%;
  padding-bottom: var(--spacing-3xl);
  position: relative;
}

.explorer-header {
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
    max-width: 600px;
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

.search-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  
  .search-input {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 30px;
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    font-size: 1rem;
    transition: all var(--transition-speed);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    &:focus {
      outline: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: var(--primary-light);
    }
  }
  
  .clear-search {
    position: absolute;
    right: var(--spacing-md);
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-tertiary);
    font-size: 1.5rem;
    cursor: pointer;
    
    &:hover {
      color: var(--text-color);
    }
  }
}

.habits-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.habit-card {
  position: relative;
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  background-color: var(--surface-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
    
    .learn-more-btn {
      background-color: var(--primary-color);
      color: white;
    }
  }
  
  .habit-number {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-light);
    opacity: 0.2;
  }
  
  .habit-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-md);
    font-weight: 600;
    color: var(--text-color);
  }
  
  .habit-preview {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    font-size: 0.95rem;
    flex-grow: 1;
  }
  
  .card-footer {
    margin-top: auto;
  }
  
  .learn-more-btn {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-size: 0.9rem;
    transition: all var(--transition-speed);
  }
}

.no-results {
  text-align: center;
  padding: var(--spacing-2xl) 0;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  p {
    color: var(--text-secondary);
  }
  
  .reset-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  
  &.show {
    opacity: 1;
    pointer-events: all;
  }
}

.habit-detail-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background-color: var(--surface-color);
  border-radius: var(--radius-lg);
  z-index: 101;
  padding: var(--spacing-xl);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  overflow-y: auto;
  
  &.show {
    opacity: 1;
    pointer-events: all;
    transform: translate(-50%, -50%) scale(1);
  }
  
  .close-btn {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    font-size: 1.5rem;
    background: none;
    border: none;
    color: var(--text-tertiary);
    cursor: pointer;
    z-index: 2;
    
    &:hover {
      color: var(--text-color);
    }
  }
}

.habit-detail-content {
  position: relative;
  
  .habit-number.big {
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 8rem;
    font-weight: 800;
    color: var(--primary-color);
    opacity: 0.05;
    z-index: 1;
  }
  
  .habit-title {
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    color: var(--text-color);
    position: relative;
    z-index: 2;
  }
  
  .habit-description {
    margin-bottom: var(--spacing-xl);
    color: var(--text-color);
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .examples-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  .examples-list {
    margin-bottom: var(--spacing-xl);
    padding-left: var(--spacing-xl);
    
    li {
      margin-bottom: var(--spacing-sm);
      color: var(--text-secondary);
    }
  }
  
  .section-title.small {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  .development-tips {
    margin-bottom: var(--spacing-xl);
    
    p {
      margin-bottom: var(--spacing-md);
      color: var(--text-secondary);
    }
  }
  
  .related-content {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
  }
  
  .related-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }
  
  .related-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--highlight-color);
    border-radius: var(--radius-sm);
    color: var(--primary-color);
    font-weight: 500;
    transition: all var(--transition-speed);
    
    &:hover {
      transform: translateY(-2px);
      
      .icon-arrow {
        transform: translateX(3px);
      }
    }
    
    .icon-arrow {
      transition: transform var(--transition-speed);
    }
  }
}

@media (max-width: 768px) {
  .habits-grid {
    grid-template-columns: 1fr;
  }
  
  .habit-detail-modal {
    width: 95%;
    padding: var(--spacing-lg);
  }
  
  .habit-detail-content {
    .habit-title {
      font-size: 1.5rem;
    }
    
    .habit-number.big {
      font-size: 6rem;
    }
  }
  
  .related-links {
    flex-direction: column;
  }
}
</style>