<script lang="ts">
  import { Link } from "svelte-routing";
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-wave">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,144C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
  
  <div class="footer-content">
    <div class="footer-main">
      <div class="footer-branding">
        <div class="footer-logo">
          <div class="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.17C6.48 18.03 6.37 17.83 6.37 17.62C6.37 15.67 8.67 14 12 14C15.33 14 17.63 15.67 17.63 17.62C17.63 17.83 17.52 18.03 17.34 18.17C15.9 19.33 14.03 20 12 20Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="footer-title">Habits of Mind AI</h3>
        </div>
        <p class="footer-description">
          Developing thinking dispositions for success in learning and life through AI-assisted coaching.
        </p>
        <div class="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="footer-links">
        <div class="footer-section">
          <h4 class="footer-heading">Navigate</h4>
          <ul class="footer-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/habit-explorer">Explore Habits</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
    
        <div class="footer-section">
          <h4 class="footer-heading">Learning Tools</h4>
          <ul class="footer-list">
            <li><Link to="/habit-coach">Habit Coach</Link></li>
            <li><Link to="/thinking-tools/problem-solver">Problem Solver</Link></li>
            <li><Link to="/thinking-tools/reflection">Reflection Tool</Link></li>
            <li><Link to="/thinking-tools/lesson-planner">For Educators</Link></li>
          </ul>
        </div>
    
        <div class="footer-section">
          <h4 class="footer-heading">Resources</h4>
          <ul class="footer-list">
            <li><a href="https://www.habitsofmindinstitute.org/" target="_blank" rel="noopener">Habits of Mind Institute</a></li>
            <li><a href="https://www.amazon.com/Learning-Leading-Habits-Mind-Characteristics/dp/1416607412" target="_blank" rel="noopener">Books by Costa & Kallick</a></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">&copy; {currentYear} Habits of Mind AI</p>
      <p class="tagline">Fostering intelligent behaviors for lifelong learning</p>
    </div>
  </div>
</footer>

<style lang="scss">
  .footer {
    position: relative;
    margin-top: 6rem;
    background-color: var(--primary-dark);
    color: white;
    padding: 5rem 2rem 2rem;
    overflow: hidden;
  }
  
  .footer-wave {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    line-height: 0;
    transform: rotate(180deg);
    
    svg {
      width: 100%;
      height: 120px;
      
      path {
        fill: var(--background-color);
      }
    }
  }

  .footer-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
  
  .footer-branding {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo-mark {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 8px;
    
    svg {
      width: 24px;
      height: 24px;
      color: white;
    }
  }
  
  .footer-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }
  
  .footer-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .footer-heading {
    position: relative;
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1.25rem;
    padding-bottom: 0.75rem;
    color: white;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: var(--accent-color);
    }
  }

  .footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.75rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        font-size: 0.95rem;
        transition: all var(--transition-speed);
        
        &:hover {
          color: white;
          transform: translateX(3px);
        }
      }
    }
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all var(--transition-speed);
    
    svg {
      width: 18px;
      height: 18px;
    }
    
    &:hover {
      background-color: var(--accent-color);
      transform: translateY(-3px);
    }
  }

  .footer-bottom {
    margin-top: 4rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  .copyright, .tagline {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
</style>