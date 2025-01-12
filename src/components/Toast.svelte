<script lang="ts">
    import { fade } from 'svelte/transition';
    
    export let message = '';
    export let type: 'success' | 'error' | 'info' = 'info';
    export let duration = 3000;
    
    let visible = false;
    
    const show = (msg: string, type: 'success' | 'error' | 'info') => {
      message = msg;
      visible = true;
      setTimeout(() => {
        visible = false;
      }, duration);
    };
  </script>
  
  {#if visible}
    <div 
      class="toast {type}"
      transition:fade={{ duration: 200 }}
    >
      <span class="icon"></span>
      <span class="message">{message}</span>
    </div>
  {/if}
  
  <style lang="scss">
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: var(--background-color);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      z-index: 1000;
      min-width: 300px;
      max-width: 400px;
      
      &.success {
        border-left: 4px solid #10b981;
        .icon {
          background-color: #10b981;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clip-rule='evenodd'/%3E%3C/svg%3E");
        }
      }
      
      &.error {
        border-left: 4px solid #ef4444;
        .icon {
          background-color: #ef4444;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clip-rule='evenodd'/%3E%3C/svg%3E");
        }
      }
      
      &.info {
        border-left: 4px solid var(--primary-color);
        .icon {
          background-color: var(--primary-color);
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z' clip-rule='evenodd'/%3E%3C/svg%3E");
        }
      }
    }
  
    .icon {
      width: 20px;
      height: 20px;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  
    .message {
      flex: 1;
      color: var(--text-color);
      font-size: 0.875rem;
    }
  </style>