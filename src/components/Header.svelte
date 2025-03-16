<script lang="ts">
  import { Link, useLocation } from "svelte-routing";
  import { onMount } from 'svelte';
  
  export let toggleSidebar: () => void;
  
  let scrolled = false;
  let location: { pathname: string };
  
  // Get current route for active link highlighting
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  $: pathname = location?.pathname || '/';
  
  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/habit-explorer', label: 'Habit Explorer' },
    { path: '/habit-coach', label: 'Habit Coach' },
    { path: '/thinking-tools', label: 'Thinking Tools' },
    { path: '/about', label: 'About' }
  ];
</script>

<header class="header" class:scrolled>
  <div class="header-content">
    <div class="logo-section">
      <button class="menu-button" on:click={toggleSidebar} aria-label="Toggle sidebar">
        <span class="menu-icon"></span>
      </button>
      <Link to="/" class="logo-link">
        <div class="logo">
          <span class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.17C6.48 18.03 6.37 17.83 6.37 17.62C6.37 15.67 8.67 14 12 14C15.33 14 17.63 15.67 17.63 17.62C17.63 17.83 17.52 18.03 17.34 18.17C15.9 19.33 14.03 20 12 20Z" fill="currentColor"/>
            </svg>
          </span>
          <h1 class="site-title">
            <span class="site-title-text">Habits of Mind</span>
            <span class="site-title-accent">AI</span>
          </h1>
        </div>
      </Link>
    </div>
    
    <nav class="nav-links" aria-label="Main navigation">
      <ul class="nav-list">
        {#each navItems as item}
          <li class="nav-item">
            <Link 
              to={item.path} 
              class={`nav-link ${pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)) ? 'active' : ''}`}
            >
              {item.label}
              {#if pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))}
                <span class="active-indicator"></span>
              {/if}
            </Link>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="header-actions">
      <button class="search-button" aria-label="Search">
        <span class="search-icon"></span>
      </button>
      <Link to="/habit-coach" class="get-started-btn hide-on-mobile">Get Started</Link>
    </div>
  </div>
</header>

<style lang="scss">
  .header {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid transparent;
    padding: 0.75rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all var(--transition-speed);
    height: var(--header-height);
    
    // Dark mode styles
    html.dark & {
      background-color: rgba(15, 23, 42, 0.8);
    }
    
    &.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border-bottom: 1px solid var(--border-color);
      background-color: var(--surface-color);
      
      html.dark & {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--gradient-primary);
    border-radius: 10px;
    color: white;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }

  .site-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-color);
    display: flex;
    gap: 0.25rem;
  }
  
  .site-title-accent {
    color: var(--primary-color);
  }

  .nav-list {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  
  .nav-item {
    position: relative;
  }
  
  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0;
    transition: color var(--transition-speed);
    position: relative;
    font-size: 0.95rem;
    
    &:hover {
      color: var(--primary-color);
    }
    
    &.active {
      color: var(--primary-color);
      font-weight: 600;
    }
  }
  
  .active-indicator {
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
    border-radius: 2px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .menu-button, .search-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all var(--transition-speed);
    color: var(--text-color);

    &:hover {
      background-color: var(--highlight-color);
      color: var(--primary-color);
    }
  }

  .menu-icon, .search-icon {
    display: block;
    width: 22px;
    height: 22px;
    background-color: currentColor;
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
  
  .get-started-btn {
    background: var(--gradient-accent);
    color: white;
    padding: 0.6rem 1.25rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all var(--transition-speed);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  @media (max-width: 950px) {
    .nav-links {
      display: none;
    }

    .header-content {
      justify-content: space-between;
    }
    
    .site-title {
      font-size: 1.125rem;
    }
  }
  
  @media (max-width: 480px) {
    .header {
      padding: 0.75rem 1rem;
    }
    
    .logo-icon {
      width: 32px;
      height: 32px;
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>