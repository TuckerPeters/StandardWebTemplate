<script lang="ts">
    import { fade } from 'svelte/transition';
  </script>
  
  <div class="home-container" transition:fade>
    <section class="hero">
      <h1>Welcome to Your Website</h1>
      <p>A professional and modern web template built with Svelte</p>
      <div class="cta-buttons">
        <button class="cta-button primary">Get Started</button>
        <button class="cta-button secondary">Learn More</button>
      </div>
    </section>
  
    <section class="features">
      <h2>Key Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <span class="feature-icon responsive"></span>
          <h3>Responsive Design</h3>
          <p>Looks great on all devices, from mobile to desktop</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon theme"></span>
          <h3>Dark Mode</h3>
          <p>Easy on the eyes with automatic theme switching</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon modular"></span>
          <h3>Component Based</h3>
          <p>Modular architecture for easy maintenance</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon performance"></span>
          <h3>High Performance</h3>
          <p>Optimized for speed and efficiency</p>
        </div>
      </div>
    </section>
  
    <section class="stats">
      <div class="stat-card">
        <h4>Users</h4>
        <p class="stat-number">10K+</p>
      </div>
      <div class="stat-card">
        <h4>Downloads</h4>
        <p class="stat-number">50K+</p>
      </div>
      <div class="stat-card">
        <h4>Countries</h4>
        <p class="stat-number">100+</p>
      </div>
      <div class="stat-card">
        <h4>Reviews</h4>
        <p class="stat-number">4.9/5</p>
      </div>
    </section>
  
    <section class="testimonials">
      <h2>What Our Users Say</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <span class="quote-icon"></span>
            <p>This template has everything we needed to launch our startup website quickly and professionally.</p>
          </div>
          <div class="testimonial-author">
            <img src="/api/placeholder/40/40" alt="User avatar" class="author-avatar" />
            <div class="author-info">
              <h4>Sarah Johnson</h4>
              <p>CEO, TechStart</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-content">
            <span class="quote-icon"></span>
            <p>The dark mode feature and responsive design made our website stand out from the competition.</p>
          </div>
          <div class="testimonial-author">
            <img src="/api/placeholder/40/40" alt="User avatar" class="author-avatar" />
            <div class="author-info">
              <h4>Michael Chen</h4>
              <p>Lead Developer, WebCraft</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  <style lang="scss">
    .home-container {
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
  
      p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.8;
      }
    }
  
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  
    .cta-button {
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.2s ease;
  
      &.primary {
        background-color: var(--primary-color);
        color: white;
  
        &:hover {
          transform: translateY(-2px);
          background-color: var(--secondary-color);
        }
      }
  
      &.secondary {
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
  
        &:hover {
          transform: translateY(-2px);
          background-color: var(--primary-color);
          color: white;
        }
      }
    }
  
    .features {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        margin-bottom: 3rem;
        font-size: 2rem;
      }
    }
  
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    .feature-card {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      text-align: center;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
  
      h3 {
        margin: 1rem 0;
      }
  
      p {
        opacity: 0.8;
      }
    }
  
    .feature-icon {
      display: block;
      width: 48px;
      height: 48px;
      margin: 0 auto;
      background-color: var(--primary-color);
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      padding: 4rem 0;
      text-align: center;
    }
  
    .stat-card {
      padding: 2rem;
      background-color: var(--background-color);
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
      h4 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        opacity: 0.8;
      }
  
      .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
      }
    }
  
    .testimonials {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        margin-bottom: 3rem;
        font-size: 2rem;
      }
    }
  
    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
  
    .testimonial-card {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
    }
  
    .testimonial-content {
      position: relative;
      margin-bottom: 1.5rem;
  
      .quote-icon {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 24px;
        height: 24px;
        background-color: var(--primary-color);
        opacity: 0.2;
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z'/%3E%3C/svg%3E");
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
      }
  
      p {
        font-style: italic;
        color: var(--text-color);
        opacity: 0.9;
        line-height: 1.6;
      }
    }
  
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  
    .author-info {
      h4 {
        font-size: 1rem;
        margin-bottom: 0.25rem;
      }
  
      p {
        font-size: 0.875rem;
        opacity: 0.7;
      }
    }
  
    .responsive {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'/%3E%3C/svg%3E");
    }
  
    .theme {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'/%3E%3C/svg%3E");
    }
  
    .modular {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'/%3E%3C/svg%3E");
    }
  
    .performance {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 10V3L4 14h7v7l9-11h-7z'/%3E%3C/svg%3E");
    }
  </style>