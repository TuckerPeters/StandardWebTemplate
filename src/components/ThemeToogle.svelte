<script lang="ts">
    export let isDarkMode: boolean;
    export let toggleTheme: () => void;
  </script>
  
  <button 
    class="theme-toggle"
    on:click={toggleTheme}
    aria-label="Toggle theme"
  >
    {#if isDarkMode}
      <span class="icon sun"></span>
    {:else}
      <span class="icon moon"></span>
    {/if}
  </button>
  
  <style lang="scss">
    .theme-toggle {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--background-color);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      transition: transform 0.2s ease;
  
      &:hover {
        transform: scale(1.1);
      }
  
      &:active {
        transform: scale(0.95);
      }
    }
  
    .icon {
      width: 24px;
      height: 24px;
      background-color: var(--text-color);
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      transition: transform 0.3s ease;
    }
  
    .sun {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
    }
  
    .moon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'/%3E%3C/svg%3E");
    }
  </style>