<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export let isDarkMode: boolean;
  export let toggleTheme: () => void;
  
  let isVisible = false;
  
  onMount(() => {
    // Small delay before showing the toggle button
    setTimeout(() => {
      isVisible = true;
    }, 800);
  });
</script>

{#if isVisible}
  <div class="theme-toggle-container" in:fade={{ duration: 300 }}>
    <button 
      class="theme-toggle"
      class:dark-mode={isDarkMode}
      on:click={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      in:fly={{ y: 20, duration: 500 }}
    >
      <div class="toggle-track">
        <div class="toggle-icons">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </div>
        <div class="toggle-thumb"></div>
      </div>
      
      <span class="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
    
    <div class="mode-label" in:fade={{ delay: 200, duration: 300 }}>
      {isDarkMode ? "Dark Mode" : "Light Mode"}
    </div>
  </div>
{/if}
  
<style lang="scss">
  .theme-toggle-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 1000;
  }
  
  .theme-toggle {
    width: 56px;
    height: 28px;
    border-radius: 999px;
    background-color: var(--surface-color);
    box-shadow: var(--card-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: none;
    cursor: pointer;
    transition: all var(--transition-speed);
    padding: 0;
    
    &:hover {
      box-shadow: var(--card-shadow-hover);
      transform: translateY(-2px);
      
      .toggle-thumb {
        box-shadow: 0 0 10px 1px var(--primary-light);
      }
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  .toggle-track {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2px;
    border-radius: 999px;
    overflow: hidden;
    transition: all var(--transition-speed);
  }
  
  .toggle-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    z-index: 1;
    pointer-events: none;
  }
  
  .sun-icon, .moon-icon {
    width: 16px;
    height: 16px;
    color: var(--text-tertiary);
    transition: all var(--transition-speed);
  }
  
  .sun-icon {
    color: #f59e0b;
    opacity: 0.7;
  }
  
  .moon-icon {
    color: #6c8cff;
    opacity: 0.7;
  }
  
  .toggle-thumb {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--gradient-primary);
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  
  .dark-mode {
    .toggle-thumb {
      transform: translateX(28px);
    }
    
    .sun-icon {
      opacity: 0.4;
    }
    
    .moon-icon {
      opacity: 1;
    }
  }
  
  .mode-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-tertiary);
    transition: color var(--transition-speed);
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>