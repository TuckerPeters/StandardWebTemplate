<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Toast from './components/Toast.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Features from './routes/Features.svelte';
  import Contact from './routes/Contact.svelte';
  import './app.css';
  
  export let url = "";
  let isSidebarOpen = false;
  let isDarkMode = false;

  // Apply the theme to the html element
  function applyTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onMount(() => {
    // Check if user has previously selected dark mode
    const storedDarkMode = localStorage.getItem('darkMode');
    
    // Check for system preference if no stored preference
    if (storedDarkMode === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode = true;
      localStorage.setItem('darkMode', 'true');
    } else {
      isDarkMode = storedDarkMode === 'true';
    }

    // Apply the theme immediately
    applyTheme(isDarkMode);
    
    // Add listener for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (localStorage.getItem('darkMode') === null) {
        isDarkMode = event.matches;
        applyTheme(isDarkMode);
      }
    });
  });

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };

  const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    applyTheme(isDarkMode);
    
    // Save user preference
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  };
</script>

<Router {url}>
  <div class="app-container" transition:fade={{ duration: 200 }}>
    <Header {toggleSidebar} />
    
    <main class="main-content">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div class="content-wrapper" class:sidebar-open={isSidebarOpen}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/features" component={Features} />
        <Route path="/contact" component={Contact} />
      </div>
    </main>

    <Footer />
    <ThemeToggle {isDarkMode} {toggleTheme} />
    <Toast />
  </div>
</Router>

<style lang="scss">
  .app-container {
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
  }

  .main-content {
    display: flex;
    flex: 1;
    min-height: calc(100vh - 140px);
    position: relative;
  }

  .content-wrapper {
    flex: 1;
    padding: 2rem;
    margin-left: 0;
    transition: margin-left 0.3s ease;
    width: 100%;

    &.sidebar-open {
      @media (min-width: 768px) {
        margin-left: var(--sidebar-width);
        width: calc(100% - var(--sidebar-width));
      }
    }
  }

  @media (max-width: 767px) {
    .content-wrapper {
      padding: 1rem;
    }
  }

  // Keep all global styles in app.css
</style>