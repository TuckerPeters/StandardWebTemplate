<script lang="ts">
    import { fade } from 'svelte/transition';
  
    const teamMembers = [
      {
        name: 'John Doe',
        role: 'Founder & CEO',
        image: '/api/placeholder/120/120',
        bio: 'Experienced leader with a passion for innovation and technology.'
      },
      {
        name: 'Jane Smith',
        role: 'Head of Design',
        image: '/api/placeholder/120/120',
        bio: 'Creative professional focused on user experience and interface design.'
      },
      {
        name: 'Mike Johnson',
        role: 'Lead Developer',
        image: '/api/placeholder/120/120',
        bio: 'Full-stack developer with expertise in modern web technologies.'
      }
    ];
  
    const milestones = [
      {
        year: '2020',
        title: 'Company Founded',
        description: 'Started with a vision to create innovative web solutions.'
      },
      {
        year: '2021',
        title: 'First Major Release',
        description: 'Launched our flagship product to great success.'
      },
      {
        year: '2022',
        title: 'Global Expansion',
        description: 'Expanded our services to reach customers worldwide.'
      },
      {
        year: '2023',
        title: 'Innovation Award',
        description: 'Recognized for excellence in web development and design.'
      }
    ];
  </script>
  
  <div class="about-container" transition:fade>
    <section class="hero">
      <h1>About Us</h1>
      <p class="subtitle">Building the future of web development</p>
    </section>
  
    <section class="mission">
      <div class="mission-content">
        <h2>Our Mission</h2>
        <p>We strive to create exceptional web experiences that empower businesses and individuals to achieve their goals. Through innovation, dedication, and expertise, we deliver solutions that make a difference.</p>
      </div>
      <div class="mission-stats">
        <div class="stat">
          <span class="stat-number">5+</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat">
          <span class="stat-number">500+</span>
          <span class="stat-label">Projects Completed</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Client Satisfaction</span>
        </div>
      </div>
    </section>
  
    <section class="team">
      <h2>Our Team</h2>
      <div class="team-grid">
        {#each teamMembers as member}
          <div class="team-card">
            <img src={member.image} alt={member.name} class="team-member-image" />
            <h3>{member.name}</h3>
            <span class="role">{member.role}</span>
            <p class="bio">{member.bio}</p>
            <div class="social-links">
              <a href="#" class="social-link linkedin"></a>
              <a href="#" class="social-link twitter"></a>
              <a href="#" class="social-link github"></a>
            </div>
          </div>
        {/each}
      </div>
    </section>
  
    <section class="timeline">
      <h2>Our Journey</h2>
      <div class="timeline-grid">
        {#each milestones as milestone}
          <div class="timeline-card">
            <div class="year">{milestone.year}</div>
            <h3>{milestone.title}</h3>
            <p>{milestone.description}</p>
          </div>
        {/each}
      </div>
    </section>
  
    <section class="values">
      <h2>Our Values</h2>
      <div class="values-grid">
        <div class="value-card">
          <span class="value-icon innovation"></span>
          <h3>Innovation</h3>
          <p>Constantly pushing boundaries and exploring new technologies</p>
        </div>
        <div class="value-card">
          <span class="value-icon quality"></span>
          <h3>Quality</h3>
          <p>Committed to delivering excellence in every project</p>
        </div>
        <div class="value-card">
          <span class="value-icon collaboration"></span>
          <h3>Collaboration</h3>
          <p>Working together to achieve exceptional results</p>
        </div>
      </div>
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
      }
  
      p {
        font-size: 1.1rem;
        line-height: 1.6;
        opacity: 0.8;
      }
    }
  
    .mission-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
    }
  
    .stat {
      text-align: center;
  
      .stat-number {
        display: block;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
  
      .stat-label {
        font-size: 0.875rem;
        opacity: 0.8;
      }
    }
  
    .team {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
      }
    }
  
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
  
    .team-card {
      text-align: center;
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
  
      .team-member-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-bottom: 1.5rem;
        object-fit: cover;
      }
  
      h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
  
      .role {
        display: block;
        color: var(--primary-color);
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }
  
      .bio {
        font-size: 0.875rem;
        opacity: 0.8;
        margin-bottom: 1.5rem;
      }
    }
  
    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  
    .social-link {
      display: block;
      width: 24px;
      height: 24px;
      background-color: var(--text-color);
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      transition: background-color 0.2s ease;
  
      &:hover {
        background-color: var(--primary-color);
      }
    }
  
    .linkedin {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z'/%3E%3C/svg%3E");
    }
  
    .twitter {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'/%3E%3C/svg%3E");
    }
  
    .github {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'/%3E%3C/svg%3E");
    }
  
    .timeline {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
      }
    }
  
    .timeline-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    .timeline-card {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      position: relative;
  
      .year {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: var(--primary-color);
        color: white;
        border-radius: 0.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
  
      h3 {
        margin-bottom: 0.5rem;
      }
  
      p {
        opacity: 0.8;
      }
    }
  
    .values {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
      }
    }
  
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    .value-card {
      text-align: center;
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
  
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
  
      h3 {
        margin-bottom: 1rem;
      }
  
      p {
        opacity: 0.8;
      }
    }
  
    .innovation {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 10V3L4 14h7v7l9-11h-7z'/%3E%3C/svg%3E");
    }
  
    .quality {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
    }
  
    .collaboration {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/%3E%3C/svg%3E");
    }
</style>