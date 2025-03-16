<script lang="ts">
import { onMount } from "svelte";
import { fade, fly } from "svelte/transition";
import { Link } from "svelte-routing";
let mounted = false;
onMount(() => {
  setTimeout(() => {
    mounted = true;
  }, 100);
});
// Define the tools
const tools = [
  {
    id: "problem-solver",
    title: "Problem Solver's Workshop",
    description: "A guided thinking tool that helps you work through challenges using specific Habits of Mind.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>`,
    path: "/thinking-tools/problem-solver",
    bgClass: "bg-problem-solver",
    habits: ["Thinking flexibly", "Persisting", "Metacognition", "Questioning and posing problems"]
  },
  {
    id: "reflection",
    title: "Reflection Tool",
    description: "Analyze student work through a Habits of Mind lens to provide constructive, growth-oriented feedback.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>`,
    path: "/thinking-tools/reflection",
    bgClass: "bg-reflection",
    habits: ["Metacognition", "Communicating with clarity", "Listening with empathy", "Creating and innovating"]
  },
  {
    id: "lesson-planner",
    title: "Lesson Planner",
    description: "Create lesson plans that intentionally incorporate Habits of Mind to develop students' thinking dispositions.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>`,
    path: "/thinking-tools/lesson-planner",
    bgClass: "bg-lesson-planner",
    habits: ["Applying past knowledge", "Striving for accuracy", "Thinking interdependently", "Remaining open to learning"]
  },
  {
    id: "self-assessment",
    title: "Self-Assessment Tool",
    description: "Reflect on your Habits of Mind strengths and areas for growth with personalized improvement strategies.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z" />
          </svg>`,
    path: "/thinking-tools/self-assessment",
    bgClass: "bg-self-assessment",
    habits: ["Metacognition", "Striving for accuracy", "Remaining open to learning", "Taking responsible risks"]
  }
];
</script>
<div class="thinking-tools-container">
  <!-- Header section -->
  <section class="tools-header" in:fade={{ duration: 500, delay: 200 }}>
    <div class="header-shape shape-1"></div>
    <div class="header-shape shape-2"></div>
    <div class="header-shape shape-3"></div>
    
    <h1 class="section-title text-gradient">Thinking Tools</h1>
    <p class="section-subtitle">
      A collection of tools designed to develop and strengthen Habits of Mind through guided thinking processes.
      These tools support students and educators in applying habits to learning situations.
    </p>
  </section>
  
  <!-- Tools grid -->
  <section class="tools-grid-container container" in:fade={{ duration: 500, delay: 300 }}>
    <div class="tools-introduction highlight">
      <h2>How These Tools Support Learning</h2>
      <p>
        Rather than providing direct answers, these tools guide your thinking processes.
        By using them regularly, you'll develop the mental habits that lead to more effective learning, 
        problem-solving, and decision-making in any context.
      </p>
    </div>
    
    <div class="tools-grid">
      {#each tools as tool, i}
        <div in:fly={{ y: 20, delay: 300 + (i * 100), duration: 400 }}>
          <div class="card-container">
            <Link 
              to={tool.path} 
              class="tool-card card" 
            >
              <div class={`tool-icon ${tool.bgClass}`}>
                {@html tool.icon}
              </div>
              
              <h2 class="tool-title">{tool.title}</h2>
              <p class="tool-description">{tool.description}</p>
              
              <div class="tool-habits">
                <h3>Habits Used:</h3>
                <div class="habit-tags">
                  {#each tool.habits as habit}
                    <span class="habit-tag">{habit}</span>
                  {/each}
                </div>
              </div>
              
              <div class="tool-action">
                <span>Open Tool</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tool-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Benefits section -->
  <section class="benefits-section container" in:fade={{ duration: 500, delay: 400 }}>
    <h2 class="section-title">Benefits of Using Thinking Tools</h2>
    
    <div class="benefits-grid">
      <div class="benefit-card" in:fly={{ y: 20, delay: 500, duration: 400 }}>
        <div class="benefit-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3>Develop Critical Thinking</h3>
        <p>Strengthen your ability to analyze situations, evaluate options, and make thoughtful decisions.</p>
      </div>
      
      <div class="benefit-card" in:fly={{ y: 20, delay: 550, duration: 400 }}>
        <div class="benefit-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <h3>Build Transferable Skills</h3>
        <p>Learn strategies that apply across subjects, contexts, and life situations.</p>
      </div>
      
      <div class="benefit-card" in:fly={{ y: 20, delay: 600, duration: 400 }}>
        <div class="benefit-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3>Enhance Self-Regulation</h3>
        <p>Develop greater awareness and control of your thinking processes and learning strategies.</p>
      </div>
      
      <div class="benefit-card" in:fly={{ y: 20, delay: 650, duration: 400 }}>
        <div class="benefit-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3>Foster Collaboration</h3>
        <p>Learn to think interdependently, considering multiple perspectives and communicating effectively.</p>
      </div>
    </div>
  </section>
</div>
<style lang="scss">
.thinking-tools-container {
  width: 100%;
  padding-bottom: var(--spacing-3xl);
  position: relative;
}

.tools-header {
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  background: linear-gradient(180deg, var(--background-color) 0%, var(--highlight-color) 100%);
  
  .section-title {
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
    font-size: 3.5rem;
    font-weight: 800;
    position: relative;
    z-index: 2;
    letter-spacing: -0.02em;
  }
  
  .section-subtitle {
    color: var(--text-secondary);
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.25rem;
    position: relative;
    z-index: 2;
    line-height: 1.6;
  }
}

.header-shape {
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  filter: blur(60px);
  
  &.shape-1 {
    width: 500px;
    height: 500px;
    background: var(--primary-color);
    top: -250px;
    right: -100px;
    opacity: 0.15;
    
    html.dark & {
      opacity: 0.2;
    }
  }
  
  &.shape-2 {
    width: 300px;
    height: 300px;
    background: var(--accent-color);
    bottom: -100px;
    left: -50px;
    opacity: 0.15;
    
    html.dark & {
      opacity: 0.15;
    }
  }
  
  &.shape-3 {
    width: 200px;
    height: 200px;
    background: var(--secondary-color);
    top: 20%;
    left: 30%;
    opacity: 0.1;
    
    html.dark & {
      opacity: 0.1;
    }
  }
}

.tools-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.tools-introduction {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
    font-weight: 700;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-3xl);
  
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.tools-grid > div {
  height: 100%;
}

.card-container {
  height: 100%;
  transition: all var(--transition-speed);
  
  &:hover {
    transform: translateY(-8px);
    
    .tool-card {
      box-shadow: var(--card-shadow-hover);
    }
    
    .tool-action {
      color: var(--primary-color);
    }
    
    .tool-arrow {
      transform: translateX(5px);
    }
  }
}

.tool-card {
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  transition: all var(--transition-speed);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    z-index: 1;
  }
}

.tool-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  svg {
    width: 35px;
    height: 35px;
  }
}

.bg-problem-solver {
  background: linear-gradient(135deg, #3459e6, #4e6ff3);
}

.bg-reflection {
  background: linear-gradient(135deg, #34c8c8, #3cc1c1);
}

.bg-lesson-planner {
  background: linear-gradient(135deg, #ff7d3c, #ff9966);
}

.bg-self-assessment {
  background: linear-gradient(135deg, #6c8cff, #4e6ff3);
}

.tool-title {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
  font-weight: 700;
  line-height: 1.2;
}

.tool-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
  font-size: 1.05rem;
  flex-grow: 1;
}

.tool-habits {
  margin-bottom: var(--spacing-lg);
  
  h3 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--spacing-sm);
    color: var(--text-tertiary);
    font-weight: 600;
  }
  
  .habit-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  
  .habit-tag {
    background-color: var(--highlight-color);
    color: var(--primary-color);
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 500;
    transition: all var(--transition-speed);
    
    &:hover {
      background-color: var(--primary-light);
      color: white;
      transform: translateY(-2px);
    }
  }
}

.tool-action {
  display: flex;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-weight: 600;
  transition: all var(--transition-speed);
  margin-top: auto;
  
  span {
    margin-right: var(--spacing-md);
  }
  
  .tool-arrow {
    transition: transform var(--transition-speed);
  }
}

.benefits-section {
  max-width: 1200px;
  margin: 0 auto var(--spacing-3xl);
  padding: var(--spacing-xl);
  
  .section-title {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.25rem;
    font-weight: 700;
    position: relative;
    padding-bottom: var(--spacing-sm);
    
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--gradient-accent);
      border-radius: 2px;
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--surface-color);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: all var(--transition-speed);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--card-shadow);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--card-shadow-hover);
    
    .benefit-icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
  
  .benefit-icon {
    width: 70px;
    height: 70px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
    color: white;
    transition: all var(--transition-speed);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    svg {
      width: 35px;
      height: 35px;
    }
  }
  
  h3 {
    font-size: 1.35rem;
    margin-bottom: var(--spacing-lg);
    color: var(--text-color);
    font-weight: 700;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
  }
}

.highlight {
  background-color: var(--highlight-color);
  border-left: 4px solid var(--accent-color);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

@media (max-width: 768px) {
  .tools-header .section-title {
    font-size: 2.75rem;
  }
  
  .tools-header .section-subtitle {
    font-size: 1.1rem;
  }
  
  .benefits-section .section-title {
    font-size: 1.75rem;
  }
  
  .tools-introduction h2 {
    font-size: 1.5rem;
  }
  
  .tools-introduction p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .tools-header .section-title {
    font-size: 2.25rem;
  }
  
  .tools-header {
    padding-top: var(--spacing-2xl);
  }
  
  .tool-title {
    font-size: 1.5rem;
  }
  
  .benefit-card h3 {
    font-size: 1.25rem;
  }
}
</style>