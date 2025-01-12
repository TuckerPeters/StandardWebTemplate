<script lang="ts">
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Company</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
  
      <div class="footer-section">
        <h3>Resources</h3>
        <ul>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/documentation">Documentation</a></li>
          <li><a href="/support">Support</a></li>
        </ul>
      </div>
  
      <div class="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/cookies">Cookie Policy</a></li>
        </ul>
      </div>
  
      <div class="footer-section social">
        <h3>Connect</h3>
        <div class="social-links">
          <a href="#" class="social-icon twitter"></a>
          <a href="#" class="social-icon linkedin"></a>
          <a href="#" class="social-icon github"></a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {currentYear} Your Company. All rights reserved.</p>
    </div>
  </footer>
  
  <style lang="scss">
    .footer {
      background-color: var(--background-color);
      border-top: 1px solid var(--border-color);
      padding: 4rem 2rem 2rem;
      margin-top: auto;
    }
  
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 3rem;
    }
  
    .footer-section {
      h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: var(--text-color);
      }
  
      ul {
        list-style: none;
        padding: 0;
  
        li {
          margin-bottom: 0.5rem;
  
          a {
            color: var(--text-color);
            opacity: 0.8;
            text-decoration: none;
            transition: opacity 0.2s ease;
  
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  
    .social-links {
      display: flex;
      gap: 1rem;
    }
  
    .social-icon {
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
  
    .twitter {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'/%3E%3C/svg%3E");
    }
  
    .linkedin {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z'/%3E%3C/svg%3E");
    }
  
    .github {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'/%3E%3C/svg%3E");
    }
  
    .footer-bottom {
      max-width: 1200px;
      margin: 2rem auto 0;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      text-align: center;
      color: var(--text-color);
      opacity: 0.8;
    }
  </style>