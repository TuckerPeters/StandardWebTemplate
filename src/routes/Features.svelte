<script lang="ts">
    import { fade } from 'svelte/transition';
  
    const features = [
      {
        title: 'Responsive Design',
        description: 'Perfectly adapts to any screen size, from mobile to desktop.',
        icon: 'responsive',
        benefits: [
          'Mobile-first approach',
          'Fluid layouts',
          'Optimized images',
          'Touch-friendly interfaces'
        ]
      },
      {
        title: 'Dark Mode Support',
        description: 'Easy on the eyes with automatic theme switching capability.',
        icon: 'theme',
        benefits: [
          'Automatic theme detection',
          'Smooth transitions',
          'Customizable colors',
          'Improved readability'
        ]
      },
      {
        title: 'Component Architecture',
        description: 'Built with reusable components for maximum flexibility.',
        icon: 'modular',
        benefits: [
          'Modular design',
          'Easy maintenance',
          'Consistent styling',
          'Rapid development'
        ]
      },
      {
        title: 'Performance Optimized',
        description: 'Lightning-fast loading and smooth interactions.',
        icon: 'performance',
        benefits: [
          'Code splitting',
          'Lazy loading',
          'Optimized assets',
          'Efficient updates'
        ]
      }
    ];
  
    const techStack = [
      {
        category: 'Frontend',
        items: ['Svelte', 'TypeScript', 'SCSS', 'Vite']
      },
      {
        category: 'Design',
        items: ['Responsive', 'Dark Mode', 'Animations', 'SVG Icons']
      },
      {
        category: 'Performance',
        items: ['Code Splitting', 'Asset Optimization', 'Lazy Loading', 'Caching']
      },
      {
        category: 'Development',
        items: ['Component Based', 'Type Safe', 'Modern Tooling', 'Best Practices']
      }
    ];
  
    let activeFeatureIndex = 0;
    
    function setActiveFeature(index: number) {
      activeFeatureIndex = index;
    }
  </script>
  
  <div class="features-container" transition:fade>
    <section class="hero">
      <h1>Features</h1>
      <p class="subtitle">Everything you need to build amazing websites</p>
    </section>
  
    <section class="feature-showcase">
      <div class="feature-nav">
        {#each features as feature, i}
          <button
            class="feature-nav-item {i === activeFeatureIndex ? 'active' : ''}"
            on:click={() => setActiveFeature(i)}
          >
            <span class="feature-icon {feature.icon}"></span>
            <span class="feature-title">{feature.title}</span>
          </button>
        {/each}
      </div>
  
      <div class="feature-content">
        {#each [features[activeFeatureIndex]] as feature (activeFeatureIndex)}
          <div class="feature-details" transition:fade>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <ul class="benefits-list">
              {#each feature.benefits as benefit}
                <li>{benefit}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>
  
    <section class="tech-stack">
      <h2>Technology Stack</h2>
      <div class="tech-grid">
        {#each techStack as category}
          <div class="tech-card">
            <h3>{category.category}</h3>
            <ul>
              {#each category.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>
  
    <section class="cta-section">
      <div class="cta-content">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of developers building amazing websites with our template.</p>
        <div class="cta-buttons">
          <button class="cta-button primary">Start Building</button>
          <button class="cta-button secondary">View Documentation</button>
        </div>
      </div>
    </section>
  </div>
  
  <style lang="scss">
    .features-container {
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
  
    .feature-showcase {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 3rem;
      margin: 4rem 0;
      min-height: 400px;
  
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  
    .feature-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .feature-nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
      text-align: left;
      width: 100%;
  
      &:hover {
        transform: translateX(5px);
      }
  
      &.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
  
        .feature-icon {
          background-color: white;
        }
      }
    }
  
    .feature-icon {
      width: 24px;
      height: 24px;
      background-color: var(--text-color);
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  
    .feature-title {
      font-weight: 500;
    }
  
    .feature-content {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
    }
  
    .feature-details {
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
  
      p {
        font-size: 1.1rem;
        line-height: 1.6;
        opacity: 0.8;
        margin-bottom: 2rem;
      }
    }
  
    .benefits-list {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
  
      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
  
        &::before {
          content: '';
          display: block;
          width: 16px;
          height: 16px;
          background-color: var(--primary-color);
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
      }
    }
  
    .tech-stack {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
      }
    }
  
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    .tech-card {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
  
      h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
      }
  
      ul {
        list-style: none;
        padding: 0;
  
        li {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
  
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  
    .cta-section {
      padding: 4rem 0;
      text-align: center;
  
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
  
      p {
        font-size: 1.1rem;
        opacity: 0.8;
        margin-bottom: 2rem;
      }
    }
  
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
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