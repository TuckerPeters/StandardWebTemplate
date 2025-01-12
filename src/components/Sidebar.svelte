<script lang="ts">
    import { slide } from 'svelte/transition';
    export let isOpen: boolean;
  </script>
  
  <aside class="sidebar {isOpen ? 'open' : ''}" transition:slide>
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3>Dashboard</h3>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#analytics">Analytics</a></li>
          <li><a href="#reports">Reports</a></li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h3>Settings</h3>
        <ul>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#preferences">Preferences</a></li>
          <li><a href="#security">Security</a></li>
        </ul>
      </div>
  
      <div class="nav-section">
        <h3>Resources</h3>
        <ul>
          <li><a href="#docs">Documentation</a></li>
          <li><a href="#help">Help Center</a></li>
          <li><a href="#api">API Reference</a></li>
        </ul>
      </div>
    </nav>
  </aside>
  
  <style lang="scss">
    .sidebar {
      width: 250px;
      background-color: var(--background-color);
      border-right: 1px solid var(--border-color);
      height: 100%;
      position: fixed;
      left: -250px;
      transition: left 0.3s ease;
      padding-top: 1rem;
      
      &.open {
        left: 0;
      }
    }
  
    .sidebar-nav {
      padding: 2rem 1rem;
      height: 100%;
      overflow-y: auto;
    }
  
    .nav-section {
      margin-bottom: 2rem;
  
      h3 {
        font-size: 0.875rem;
        text-transform: uppercase;
        color: var(--text-color);
        opacity: 0.7;
        margin-bottom: 1rem;
        padding-left: 0.5rem;
      }
  
      ul {
        list-style: none;
        padding: 0;
  
        li {
          margin-bottom: 0.5rem;
  
          a {
            color: var(--text-color);
            text-decoration: none;
            display: block;
            padding: 0.5rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
  
            &:hover {
              background-color: var(--border-color);
              padding-left: 1rem;
            }
  
            &.active {
              background-color: var(--primary-color);
              color: white;
            }
          }
        }
      }
    }
  </style>