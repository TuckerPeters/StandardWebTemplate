<script lang="ts">
  import { slide, fade, fly } from 'svelte/transition';
  import { Link, useLocation } from "svelte-routing";
  
  export let isOpen: boolean;
  
  let location;
  $: pathname = location?.pathname || '/';
  
  // Navigation structure
  const navItems = [
    {
      title: 'Navigation',
      items: [
        { label: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: 'About', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
      ]
    },
    {
      title: 'Habits of Mind',
      items: [
        { label: 'Explore All Habits', path: '/habit-explorer', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { label: 'Habit Coach', path: '/habit-coach', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
      ]
    },
    {
      title: 'Thinking Tools',
      items: [
        { label: 'Problem Solver', path: '/thinking-tools/problem-solver', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
        { label: 'Reflection Tool', path: '/thinking-tools/reflection', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
        { label: 'Lesson Planner', path: '/thinking-tools/lesson-planner', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { label: 'Self-Assessment', path: '/thinking-tools/self-assessment', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' }
      ]
    }
  ];
  
  // Check if a path is active
  function isActive(path) {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  }
  
  // Handle closing sidebar on small screens when navigating
  function handleNavigate() {
    if (window.innerWidth <= 768) {
      // Dispatch a custom event to close the sidebar
      const event = new CustomEvent('closesidebar');
      window.dispatchEvent(event);
    }
  }
</script>

<div 
  class="sidebar-backdrop" 
  class:active={isOpen} 
  on:click={handleNavigate}
  on:keydown={e => e.key === 'Enter' && handleNavigate()}
  role="button"
  tabindex="0"
  aria-label="Close sidebar"
></div>

<aside class="sidebar" class:open={isOpen}>
  <div class="sidebar-header">
    <div class="logo">
      <span class="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.17C6.48 18.03 6.37 17.83 6.37 17.62C6.37 15.67 8.67 14 12 14C15.33 14 17.63 15.67 17.63 17.62C17.63 17.83 17.52 18.03 17.34 18.17C15.9 19.33 14.03 20 12 20Z" fill="currentColor"/>
        </svg>
      </span>
      <h2 class="logo-text">
        <span>Habits of</span>
        <span class="logo-accent">Mind AI</span>
      </h2>
    </div>
  </div>

  <nav class="sidebar-nav">
    {#if isOpen}
      {#each navItems as section, sectionIndex}
        <div 
          class="nav-section" 
          in:fly={{ x: -20, duration: 300, delay: 100 + (sectionIndex * 50) }}
        >
          <h3 class="section-title">{section.title}</h3>
          <ul class="nav-list">
            {#each section.items as item, itemIndex}
              <li class="nav-item" in:fly={{ x: -15, duration: 300, delay: 150 + (sectionIndex * 50) + (itemIndex * 30) }}>
                <Link 
                  to={item.path} 
                  class={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  on:click={handleNavigate}
                >
                  <span class="nav-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span class="nav-label">{item.label}</span>
                  {#if isActive(item.path)}
                    <span class="active-indicator"></span>
                  {/if}
                </Link>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    {/if}
    
    <div class="sidebar-footer" in:fade={{ duration: 300, delay: 500 }}>
      <p class="copyright">© {new Date().getFullYear()} HoM AI</p>
    </div>
  </nav>
</aside>
  
<style lang="scss">
  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-speed), visibility var(--transition-speed);
    
    &.active {
      opacity: 1;
      visibility: visible;
    }
    
    @media (min-width: 769px) {
      display: none;
    }
  }

  .sidebar {
    width: var(--sidebar-expanded-width);
    background-color: var(--surface-color);
    box-shadow: var(--card-shadow);
    height: 100%;
    position: fixed;
    top: 0;
    left: calc(-1 * var(--sidebar-expanded-width));
    z-index: 100;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    display: flex;
    flex-direction: column;
    
    &.open {
      transform: translateX(var(--sidebar-expanded-width));
    }
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-primary);
    border-radius: 10px;
    color: white;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  .logo-text {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }
  
  .logo-accent {
    color: var(--primary-color);
  }

  .sidebar-nav {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .section-title {
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin: 1.5rem 0 0.75rem;
    padding-left: 0.75rem;
  }
  
  .nav-section:first-child .section-title {
    margin-top: 0;
  }

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    margin-bottom: 0.25rem;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-speed);
    position: relative;
    font-size: 0.95rem;
    
    &:hover {
      color: var(--primary-color);
      background-color: var(--highlight-color);
    }
    
    &.active {
      color: var(--primary-color);
      background-color: var(--highlight-color);
      font-weight: 600;
    }
  }
  
  .active-indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 60%;
    background: var(--gradient-primary);
    border-radius: 0 3px 3px 0;
  }
  
  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 0.75rem;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  .sidebar-footer {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
    opacity: 0.7;
  }
  
  .copyright {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    text-align: center;
    margin: 0;
  }
</style>