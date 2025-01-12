<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { fade } from 'svelte/transition';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Toast from './components/Toast.svelte';
  import ThemeToggle from './components/ThemeToogle.svelte';  // Fixed typo in filename
  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Features from './routes/Features.svelte';
  import Contact from './routes/Contact.svelte';
  
  export let url = "";
  let isSidebarOpen = false;
  let isDarkMode = false;

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };

  const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
  };
</script>

<Router {url}>
  <div class="app-container {isDarkMode ? 'dark' : ''}" transition:fade>
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
  :global(html) {
    --primary-color: #2563eb;
    --secondary-color: #4f46e5;
    --background-color: #ffffff;
    --text-color: #1f2937;
    --border-color: #e5e7eb;
    --sidebar-width: 250px;
    
    &.dark {
      --primary-color: #3b82f6;
      --secondary-color: #6366f1;
      --background-color: #111827;
      --text-color: #f3f4f6;
      --border-color: #374151;
    }
  }

  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  :global(button) {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  .app-container {
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all 0.3s ease;
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

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(.fade-enter) {
    opacity: 0;
  }

  :global(.fade-enter-active) {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  :global(.fade-exit) {
    opacity: 1;
  }

  :global(.fade-exit-active) {
    opacity: 0;
    transition: opacity 200ms ease-in;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    color: var(--text-color);
    line-height: 1.2;
  }

  :global(p) {
    line-height: 1.6;
  }

  :global(img) {
    max-width: 100%;
    height: auto;
  }

  :global(input) {
    font-family: inherit;
    font-size: inherit;
    color: var(--text-color);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    padding: 0.5rem;
    transition: all 0.2s ease;
  }

  :global(textarea) {
    font-family: inherit;
    font-size: inherit;
    color: var(--text-color);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    padding: 0.5rem;
    transition: all 0.2s ease;
  }

  :global(input:focus) {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  :global(textarea:focus) {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
</style>