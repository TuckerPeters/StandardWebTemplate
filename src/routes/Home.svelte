<script lang="ts">
  import { Link } from "svelte-routing";
  import { habits } from "../lib/habits";
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  // Animation control
  let sectionVisible = {
    hero: false,
    info: false,
    habits: false,
    tools: false
  };
  
  // For animation on scroll  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionVisible[entry.target.id] = true;
        }
      });
    }, { threshold: 0.2 });
    
    // Observe sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    // Immediately show hero
    sectionVisible.hero = true;
    
    return () => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.unobserve(section);
      });
    };
  });
  
  // Featured habits (first 3 for display)
  const featuredHabits = habits.slice(0, 3);
  
  // Tool data
  const tools = [
    {
      id: 'habit-coach',
      title: 'Habit Coach',
      description: 'Receive personalized guidance on applying specific habits to your learning challenges without being given direct answers.',
      path: '/habit-coach',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      id: 'problem-solver',
      title: 'Problem Solver\'s Workshop',
      description: 'Work through problems with guided prompts that help you apply Habits of Mind to your problem-solving approach.',
      path: '/thinking-tools/problem-solver',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    },
    {
      id: 'reflection-tool',
      title: 'Reflection Tool',
      description: 'Submit your work and receive feedback focused on how you\'re applying specific Habits of Mind, not on content correctness.',
      path: '/thinking-tools/reflection',
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
    },
    {
      id: 'lesson-planner',
      title: 'Lesson Planner',
      description: 'For educators: Create lesson plans that integrate Habits of Mind into your curriculum across any subject area.',
      path: '/thinking-tools/lesson-planner',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    }
  ];
  
  // Feature data
  const features = [
    {
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      title: 'Thinking Dispositions',
      description: 'The 16 Habits of Mind are intelligent behaviors that lead to productive actions when confronted with problems and situations where the answer is not immediately known.'
    },
    {
      icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
      title: 'AI as a Guide',
      description: 'Our tools use AI to guide students through their own thinking process, rather than simply providing answers, fostering metacognition and independent problem solving skills.'
    },
    {
      icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
      title: 'Lifelong Learning',
      description: 'Developed by Arthur L. Costa and Bena Kallick, these habits support academic and personal growth, preparing students for success in school and beyond.'
    },
    {
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Student & Teacher Tools',
      description: 'Whether you\'re a student wanting to improve your thinking skills or an educator integrating Habits of Mind into your classroom, our tools provide support.'
    }
  ];
</script>

<div class="home-container" transition:fade>
  <!-- Hero Section -->
  <section id="hero" class="hero-section">
    <div class="hero-content">
      {#if sectionVisible.hero}
        <div in:fly={{ y: 30, duration: 800, delay: 200 }}>
          <h1 class="hero-title">
            Develop the <span class="text-gradient">16 Habits of Mind</span>
          </h1>
          <p class="hero-subtitle">
            Leverage AI to help students develop thinking dispositions for success in learning and life
          </p>
          <div class="cta-buttons">
            <Link to="/habit-explorer" class="btn btn-lg">Explore Habits</Link>
            <Link to="/habit-coach" class="btn btn-secondary btn-lg">Start Learning</Link>
          </div>
        </div>
      {/if}
    </div>
    <div class="hero-backdrop">
      <div class="hero-shape shape-1"></div>
      <div class="hero-shape shape-2"></div>
      <div class="hero-shape shape-3"></div>
    </div>
  </section>

  <!-- What are Habits of Mind Section -->
  <section id="info" class="info-section container">
    <div class="section-header">
      {#if sectionVisible.info}
        <h2 class="section-title" in:fly={{ y: 20, duration: 600 }}>What are Habits of Mind?</h2>
        <p class="section-description" in:fly={{ y: 20, duration: 600, delay: 100 }}>
          Intelligent behaviors that empower learners to solve problems creatively and effectively
        </p>
      {/if}
    </div>
    
    <div class="feature-grid">
      {#if sectionVisible.info}
        {#each features as feature, i}
          <div class="feature-card card card-interactive" in:fly={{ y: 20, duration: 500, delay: 150 + i * 100 }}>
            <div class="feature-icon-wrapper">
              <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon} />
              </svg>
            </div>
            <h3 class="feature-title">{feature.title}</h3>
            <p class="feature-description">{feature.description}</p>
          </div>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Featured Habits Section -->
  <section id="habits" class="habits-section">
    <div class="container">
      <div class="section-header">
        {#if sectionVisible.habits}
          <h2 class="section-title" in:fly={{ y: 20, duration: 600 }}>Featured Habits</h2>
          <p class="section-description" in:fly={{ y: 20, duration: 600, delay: 100 }}>
            Explore some of the key mental dispositions that drive success
          </p>
        {/if}
      </div>
      
      <div class="habits-grid">
        {#if sectionVisible.habits}
          {#each featuredHabits as habit, i}
            <div class="habit-card card card-interactive" in:fly={{ y: 20, duration: 500, delay: 150 + i * 100 }}>
              <div class="habit-number">{habit.id}</div>
              <h3 class="habit-title">{habit.name}</h3>
              <p class="habit-description">{habit.description}</p>
              <Link to={`/habit-explorer/${habit.id}`} class="habit-link">
                Learn more
                <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </Link>
            </div>
          {/each}
        {/if}
      </div>
      
      {#if sectionVisible.habits}
        <div class="view-all" in:fly={{ y: 20, duration: 500, delay: 450 }}>
          <Link to="/habit-explorer" class="view-all-link">
            View all 16 Habits of Mind
            <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </Link>
        </div>
      {/if}
    </div>
  </section>

  <!-- Learning Tools Section -->
  <section id="tools" class="tools-section container">
    <div class="section-header">
      {#if sectionVisible.tools}
        <h2 class="section-title" in:fly={{ y: 20, duration: 600 }}>Learning Tools</h2>
        <p class="section-description" in:fly={{ y: 20, duration: 600, delay: 100 }}>
          Interactive AI-powered resources to help develop thinking habits
        </p>
      {/if}
    </div>
    
    <div class="tools-grid">
      {#if sectionVisible.tools}
        {#each tools as tool, i}
          <div class="tool-card card card-interactive" in:fly={{ y: 20, duration: 500, delay: 150 + i * 100 }}>
            <div class="tool-icon-wrapper">
              <svg class="tool-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tool.icon} />
              </svg>
            </div>
            <h3 class="tool-title">{tool.title}</h3>
            <p class="tool-description">{tool.description}</p>
            <Link to={tool.path} class="tool-link btn btn-sm">
              Try {tool.title.split("'")[0]}
              <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </Link>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</div>

<style lang="scss">
  .home-container {
    width: 100%;
    overflow-x: hidden;
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    min-height: 650px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--spacing-3xl) var(--spacing-xl);
    overflow: hidden;
    
    @media (max-width: 768px) {
      min-height: 500px;
      padding: var(--spacing-2xl) var(--spacing-md);
    }
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: var(--spacing-xl);
  }
  
  .hero-title {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--spacing-lg);
    
    @media (max-width: 768px) {
      font-size: 2.75rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2.25rem;
    }
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: var(--spacing-xl);
    color: var(--text-secondary);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  .hero-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
  }
  
  .hero-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    
    &.shape-1 {
      background: var(--primary-color);
      width: 500px;
      height: 500px;
      top: -100px;
      right: -100px;
      
      html.dark & {
        opacity: 0.2;
      }
    }
    
    &.shape-2 {
      background: var(--accent-color);
      width: 300px;
      height: 300px;
      bottom: -50px;
      left: -50px;
      
      html.dark & {
        opacity: 0.15;
      }
    }
    
    &.shape-3 {
      background: var(--secondary-color);
      width: 200px;
      height: 200px;
      bottom: 100px;
      right: 20%;
      
      html.dark & {
        opacity: 0.1;
      }
    }
  }
  
  .cta-buttons {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    margin-top: var(--spacing-xl);
    
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
  
  /* Section Styling */
  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
  }
  
  .section-description {
    color: var(--text-secondary);
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-xl);
    
    @media (max-width: 768px) {
      padding: 0 var(--spacing-md);
    }
  }
  
  /* Info Section */
  .info-section {
    padding: var(--spacing-3xl) 0;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    
    /* Center the last item when it's alone in its row */
    & > *:last-child:nth-child(odd):nth-last-child(1) {
      grid-column: 1 / -1;
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  .feature-card {
    padding: var(--spacing-xl);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
  }
  
  .feature-icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: var(--highlight-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    color: var(--primary-color);
  }
  
  .feature-icon {
    width: 30px;
    height: 30px;
  }
  
  .feature-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
  
  .feature-description {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
  }
  
  /* Habits Section */
  .habits-section {
    padding: var(--spacing-3xl) 0;
    background-color: var(--highlight-color);
    position: relative;
    
    html.dark & {
      background-color: rgba(30, 64, 175, 0.05);
    }
  }
  
  .habits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    
    /* Center the last item when it's alone in its row */
    & > *:last-child:nth-child(odd):nth-last-child(1) {
      grid-column: 1 / -1;
      max-width: 320px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  .habit-card {
    padding: var(--spacing-xl);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    overflow: hidden;
    border-top: 4px solid var(--primary-color);
    height: 100%;
  }
  
  .habit-number {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1rem;
  }
  
  .habit-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  .habit-description {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
    flex-grow: 1;
  }
  
  .habit-link {
    display: inline-flex;
    align-items: center;
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: none;
    transition: all var(--transition-speed);
    
    &:hover {
      color: var(--primary-dark);
      transform: translateX(4px);
    }
  }
  
  .view-all {
    text-align: center;
    margin-top: var(--spacing-2xl);
  }
  
  .view-all-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-weight: 600;
    color: var(--primary-color);
    text-decoration: none;
    transition: all var(--transition-speed);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    
    &:hover {
      background-color: var(--surface-color);
      transform: translateY(-2px);
    }
  }
  
  /* Tools Section */
  .tools-section {
    padding: var(--spacing-3xl) 0;
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    
    /* Center the last item when it's alone in its row */
    & > *:last-child:nth-child(odd):nth-last-child(1) {
      grid-column: 1 / -1;
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  .tool-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-md);
    padding: var(--spacing-xl);
    height: 100%;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient-accent);
    }
  }
  
  .tool-icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: var(--highlight-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    color: var(--accent-color);
  }
  
  .tool-icon {
    width: 30px;
    height: 30px;
  }
  
  .tool-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
  }
  
  .tool-description {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: var(--spacing-lg);
  }
  
  .tool-link {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: auto;
    background: var(--gradient-accent);
  }
  
  /* Helper Classes */
  .icon-arrow {
    width: 16px;
    height: 16px;
    margin-left: var(--spacing-xs);
    transition: transform var(--transition-speed);
  }
  
  a:hover .icon-arrow {
    transform: translateX(3px);
  }
</style>