<script lang="ts">
    import { Link } from "svelte-routing";
    export let toggleSidebar: () => void;
  </script>
  
  <header class="header">
    <div class="header-content">
      <button class="menu-button" on:click={toggleSidebar}>
        <span class="menu-icon"></span>
      </button>
      
      <nav class="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
      </nav>
  
      <div class="header-actions">
        <button class="search-button">
          <span class="search-icon"></span>
        </button>
        <button class="user-menu">
          <span class="user-icon"></span>
        </button>
      </div>
    </div>
  </header>
  
  <style lang="scss">
    .header {
      background-color: var(--background-color);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }
  
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .nav-links {
      display: flex;
      gap: 2rem;
  
      :global(a) {
        color: var(--text-color);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
  
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  
    .header-actions {
      display: flex;
      gap: 1rem;
    }
  
    .menu-icon, .search-icon, .user-icon {
      display: block;
      width: 24px;
      height: 24px;
      background-color: var(--text-color);
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  
    .menu-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'/%3E%3C/svg%3E");
    }
  
    .search-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/%3E%3C/svg%3E");
    }
  
    .user-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/%3E%3C/svg%3E");
    }
  </style>