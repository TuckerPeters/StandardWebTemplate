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
  import HabitCoach from './routes/HabitCoach.svelte';
  import HabitExplorer from './routes/HabitExplorer.svelte';
  import ThinkingTools from './routes/ThinkingTools.svelte';
  import ProblemSolver from './routes/thinking-tools/ProblemSolver.svelte';
  import Reflection from './routes/thinking-tools/Reflection.svelte';
  import LessonPlanner from './routes/thinking-tools/LessonPlanner.svelte';
  import SelfAssessment from './routes/thinking-tools/SelfAssessment.svelte';
  import './app.css';
  
  export let url = "";
  let isSidebarOpen = false;
  let isDarkMode = false;
  let isPageLoaded = false;

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
    
    // Listen for custom event to close sidebar
    window.addEventListener('closesidebar', () => {
      isSidebarOpen = false;
    });
    
    // Listen for escape key to close sidebar
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        isSidebarOpen = false;
      }
    });
    
    // Set page as loaded after a short delay
    setTimeout(() => {
      isPageLoaded = true;
    }, 100);
    
    return () => {
      window.removeEventListener('closesidebar', () => {
        isSidebarOpen = false;
      });
      window.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isSidebarOpen) {
          isSidebarOpen = false;
        }
      });
    };
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
  <div class="app-container" class:loaded={isPageLoaded} transition:fade={{ duration: 300 }}>
    <Header {toggleSidebar} />
    
    <main class="main-content">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div class="content-wrapper" class:sidebar-open={isSidebarOpen}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/habit-coach" component={HabitCoach} />
        
        <!-- These pages will be implemented later -->
        <Route path="/habit-explorer" component={HabitExplorer} />
        <Route path="/thinking-tools/problem-solver" component={ProblemSolver} />
        <Route path="/thinking-tools/reflection" component={Reflection} />
        <Route path="/thinking-tools/lesson-planner" component={LessonPlanner} />
        <Route path="/thinking-tools/self-assessment" component={SelfAssessment} />
        <Route path="/thinking-tools" component={ThinkingTools} />
        <Route path="/thinking-tools/*"></Route>
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
    opacity: 0;
    transition: opacity 0.5s ease;
    
    &.loaded {
      opacity: 1;
    }
  }

  .main-content {
    display: flex;
    flex: 1;
    min-height: calc(100vh - var(--header-height));
    position: relative;
  }

  .content-wrapper {
    flex: 1;
    padding: var(--spacing-xl) 0;
    margin-left: 0;
    transition: all var(--transition-speed);
    width: 100%;

    &.sidebar-open {
      @media (min-width: 769px) {
        margin-left: var(--sidebar-expanded-width);
        width: calc(100% - var(--sidebar-expanded-width));
      }
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      padding: var(--spacing-md) 0;
    }
  }

  .coming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    text-align: center;
    padding: var(--spacing-xl);
    max-width: 600px;
    margin: 0 auto;
    
    h2 {
      font-size: 2rem;
      margin: var(--spacing-md) 0;
      color: var(--primary-color);
      font-weight: 700;
    }
    
    p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
    }
  }
  
  .coming-soon-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--highlight-color);
    border-radius: 50%;
    color: var(--primary-color);
    
    svg {
      width: 40px;
      height: 40px;
    }
  }
</style>