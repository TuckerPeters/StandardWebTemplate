<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="about-container" transition:fade>
  <section class="hero">
    <h1>About Habits of Mind AI</h1>
    <p class="subtitle">Using AI to develop essential thinking dispositions</p>
  </section>

  <section class="mission">
    <div class="mission-content">
      <h2>Our Mission</h2>
      <p>
        Habits of Mind AI was created to help students develop essential thinking dispositions 
        while learning to solve problems. Our platform uses artificial intelligence to guide 
        students in developing the 16 Habits of Mind, not by providing answers, but by 
        encouraging deeper thinking and metacognition.
      </p>
    </div>
    <div class="mission-stats">
      <div class="stat">
        <span class="stat-number">16</span>
        <span class="stat-label">Habits of Mind</span>
      </div>
      <div class="stat">
        <span class="stat-number">4</span>
        <span class="stat-label">Interactive Tools</span>
      </div>
      <div class="stat">
        <span class="stat-number">∞</span>
        <span class="stat-label">Learning Potential</span>
      </div>
    </div>
  </section>

  <section class="values">
    <h2>What are the Habits of Mind?</h2>
    <div class="values-grid">
      <div class="value-card">
        <span class="value-icon persist"></span>
        <h3>Persistence</h3>
        <p>Sticking to a task until completion, even when challenges arise</p>
      </div>
      <div class="value-card">
        <span class="value-icon flex"></span>
        <h3>Thinking Flexibly</h3>
        <p>Considering alternative viewpoints and approaches to problems</p>
      </div>
      <div class="value-card">
        <span class="value-icon meta"></span>
        <h3>Metacognition</h3>
        <p>Being aware of your own thoughts and thinking processes</p>
      </div>
      <div class="value-card">
        <span class="value-icon collab"></span>
        <h3>Thinking Interdependently</h3>
        <p>Learning from and working effectively with others</p>
      </div>
    </div>
    <div class="more-info">
      <a href="/habit-explorer" class="more-link">Explore all 16 Habits →</a>
    </div>
  </section>

  <section class="approach">
    <h2>Our Approach</h2>
    <div class="approach-grid">
      <div class="approach-card">
        <h3>Guide, Don't Answer</h3>
        <p>Instead of using AI to provide answers or solutions, we use it to guide students through their own problem-solving process by asking thoughtful questions and providing scaffolding.</p>
      </div>
      <div class="approach-card">
        <h3>Focus on Process</h3>
        <p>We emphasize the thinking process rather than the final answer, helping students develop intellectual behaviors that will serve them across all subjects and throughout life.</p>
      </div>
      <div class="approach-card">
        <h3>Personalized Learning</h3>
        <p>Our tools adapt to different experience levels and focus on specific habits that students want to develop, creating a personalized learning experience.</p>
      </div>
      <div class="approach-card">
        <h3>Integrate Into Curriculum</h3>
        <p>For educators, we provide tools to integrate Habits of Mind into lesson plans across any subject area, helping develop these thinking dispositions alongside content knowledge.</p>
      </div>
    </div>
  </section>

  <section class="credits">
    <h2>Acknowledgments</h2>
    <p>
      This project is a proof of concept demonstration combining the Habits of Mind framework 
      with educational technology. The Habits of Mind framework was developed by 
      Arthur L. Costa and Bena Kallick. Learn more about their work at 
      <a href="https://www.habitsofmindinstitute.org/" target="_blank" rel="noopener">The Institute for Habits of Mind</a>.
    </p>
  </section>
</div>

<style lang="scss">
  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .hero {
    text-align: center;
    padding: 4rem 0;

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      color: transparent;
    }

    .subtitle {
      font-size: 1.25rem;
      opacity: 0.8;
    }
  }

  .mission {
    padding: 4rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: var(--primary-color);
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  .mission-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
  }

  .stat {
    text-align: center;
    background-color: var(--card-bg-color);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .stat-number {
      display: block;
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--light-text-color);
    }
  }

  .values, .approach {
    padding: 4rem 0;

    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
      color: var(--primary-color);
    }
  }

  .values-grid, .approach-grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .values-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .approach-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .value-card, .approach-card {
    padding: 2rem;
    background-color: var(--card-bg-color);
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    p {
      color: var(--text-color);
      line-height: 1.6;
    }
  }
  
  .value-card {
    text-align: center;
    
    .value-icon {
      display: block;
      width: 48px;
      height: 48px;
      margin: 0 auto 1.5rem;
      background-color: var(--primary-color);
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  }
  
  .approach-card {
    border-left: 3px solid var(--accent-color);
  }

  .persist {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'/%3E%3C/svg%3E");
  }

  .flex {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'/%3E%3C/svg%3E");
  }

  .meta {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'/%3E%3C/svg%3E");
  }

  .collab {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/%3E%3C/svg%3E");
  }

  .more-info {
    text-align: center;
  }

  .more-link {
    display: inline-block;
    color: var(--primary-color);
    font-weight: 500;
    text-decoration: none;
    font-size: 1.1rem;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .credits {
    padding: 3rem;
    background-color: var(--card-bg-color);
    border-radius: 0.5rem;
    margin: 4rem 0;
    text-align: center;
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    
    p {
      line-height: 1.6;
      max-width: 700px;
      margin: 0 auto;
    }
    
    a {
      color: var(--primary-color);
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>