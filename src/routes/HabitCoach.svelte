<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { habits } from '../lib/habits';
  import { generateHabitCoachPrompt } from '../lib/prompts';
  import { callOpenAI } from '../lib/api';

  // State
  let selectedHabitId: number = 1;
  let userLevel: string = "intermediate";
  let userQuestion: string = "";
  let aiResponse: string = "";
  let isLoading: boolean = false;
  let hasInteracted: boolean = false;
  let chatHistory = [];
  
  // Transition state
  let visible = false;

  // Helper functions to get details for the selected habit
  $: selectedHabit = habits.find(h => h.id === selectedHabitId) || habits[0];
  
  onMount(() => {
    // Slight delay for transition
    setTimeout(() => {
      visible = true;
    }, 100);
  });
  
  async function handleSubmit() {
    if (!userQuestion.trim()) return;
    
    isLoading = true;
    hasInteracted = true;
    
    // Save the current question
    const currentQuestion = userQuestion;
    
    // Clear the input field immediately after submitting
    userQuestion = "";
    
    try {
      // Generate the system prompt based on selected habit and user level
      const systemPrompt = generateHabitCoachPrompt(selectedHabitId, userLevel, currentQuestion);
      
      // Call the AI API
      const response = await callOpenAI(systemPrompt, currentQuestion);
      
      // Add to chat history
      chatHistory = [...chatHistory, 
        { type: 'user', text: currentQuestion },
        { type: 'ai', text: response }
      ];
      
      // Update the AI response
      aiResponse = response;
    } catch (error) {
      console.error('Error calling AI:', error);
      
      // Add error message to chat history
      chatHistory = [...chatHistory, 
        { type: 'user', text: currentQuestion },
        { type: 'error', text: "Sorry, I encountered an error processing your request. Please try again." }
      ];
      
      aiResponse = "Sorry, I encountered an error processing your request. Please try again.";
    } finally {
      isLoading = false;
      
      // Scroll chat window to bottom after rendering
      setTimeout(() => {
        const chatWindow = document.querySelector('.chat-messages');
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 100);
    }
  }
  
  // Function to change habit focus
  function changeHabit() {
    if (isLoading) return;
    
    // If user has interacted, add a system message about changing habits
    if (hasInteracted) {
      chatHistory = [...chatHistory, 
        { 
          type: 'system', 
          text: `You've changed your focus to "${selectedHabit.name}". Your previous conversation is still visible above.` 
        }
      ];
    }
  }
  
  // Watch for habit changes
  $: if (selectedHabit) {
    changeHabit();
  }
  
  // Generate example questions based on selected habit
  $: exampleQuestions = [
    `How can I apply ${selectedHabit.name} when I'm stuck on a difficult math problem?`,
    `What are some ways to practice ${selectedHabit.name} in my daily studies?`,
    `How might ${selectedHabit.name} help me with a group project where teammates aren't contributing equally?`
  ];
</script>

<div class="habit-coach-container" transition:fade={{ duration: 300 }}>
  <!-- Page Header with Gradient Background -->
  <div class="page-header">
    <div class="header-content">
      {#if visible}
        <h1 class="page-title" in:fly={{ y: -20, duration: 500 }}>
          <span class="title-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </span>
          Habit Coach
        </h1>
        <p class="page-description" in:fly={{ y: -10, duration: 500, delay: 100 }}>
          Get personalized guidance on applying the Habits of Mind to your specific learning challenges without being given direct answers.
        </p>
      {/if}
    </div>
    <div class="header-backdrop">
      <div class="header-shape shape-1"></div>
      <div class="header-shape shape-2"></div>
    </div>
  </div>
  
  <!-- Main Coach Interface -->
  <div class="coach-interface container">
    <!-- Left Sidebar - Options Panel -->
    <div class="options-panel card">
      {#if visible}
        <div class="panel-section" in:fly={{ x: -20, duration: 500, delay: 200 }}>
          <h3 class="section-title">Select a Habit of Mind</h3>
          <div class="custom-select">
            <select 
              id="habit-select" 
              bind:value={selectedHabitId}
              class="habit-select"
              aria-label="Select a Habit of Mind"
            >
              {#each habits as habit}
                <option value={habit.id}>{habit.name}</option>
              {/each}
            </select>
            <div class="select-arrow"></div>
          </div>
        </div>

        <div class="panel-section habit-info" in:fly={{ x: -20, duration: 500, delay: 300 }}>
          <div class="habit-badge">Habit {selectedHabit.id} of 16</div>
          <h3 class="habit-title">{selectedHabit.name}</h3>
          <p class="habit-description">{selectedHabit.description}</p>
          
          <div class="examples-section">
            <h4 class="examples-title">Examples:</h4>
            <ul class="examples-list">
              {#each selectedHabit.examples as example}
                <li>{example}</li>
              {/each}
            </ul>
          </div>
        </div>

        <div class="panel-section" in:fly={{ x: -20, duration: 500, delay: 400 }}>
          <h3 class="section-title">Your Experience Level</h3>
          <div class="experience-selector">
            <label class="experience-option">
              <input type="radio" name="level" value="beginner" bind:group={userLevel}>
              <span class="experience-label">Beginner</span>
            </label>
            <label class="experience-option">
              <input type="radio" name="level" value="intermediate" bind:group={userLevel}>
              <span class="experience-label">Intermediate</span>
            </label>
            <label class="experience-option">
              <input type="radio" name="level" value="advanced" bind:group={userLevel}>
              <span class="experience-label">Advanced</span>
            </label>
          </div>
        </div>
      {/if}
    </div>

    <!-- Right Panel - Chat Interface -->
    <div class="chat-panel card">
      <div class="chat-header">
        <div class="chat-title">
          <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h2>Ask Your Question</h2>
        </div>
        <div class="status-indicator">
          <span class="status-dot active"></span>
          <span class="status-text">{isLoading ? 'Thinking...' : 'Ready'}</span>
        </div>
      </div>

      <div class="chat-window">
        <div class="chat-messages" class:has-messages={hasInteracted}>
          {#if !hasInteracted}
            <div class="empty-state" in:fly={{ y: 20, duration: 500, delay: 500 }}>
              <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3 class="empty-title">How can I help you with {selectedHabit.name}?</h3>
              <p class="empty-description">
                Ask a question about a learning challenge or situation where you'd like to apply this habit.
              </p>
              
              <div class="example-questions">
                <h4 class="examples-title">Try asking:</h4>
                {#each exampleQuestions as question}
                  <button class="example-question" on:click={() => userQuestion = question}>
                    "{question}"
                  </button>
                {/each}
              </div>
              
              <div class="tip-card">
                <div class="tip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div class="tip-content">
                  <h4 class="tip-title">Tip:</h4>
                  <p class="tip-text">I won't give you direct answers to problems. Instead, I'll help you think through challenges using the Habits of Mind.</p>
                </div>
              </div>
            </div>
          {:else}
            <!-- Chat History -->
            {#each chatHistory as message, i}
              {#if message.type === 'user'}
                <div class="chat-message user-message" in:fly={{ y: 10, duration: 300, delay: i * 50 }}>
                  <div class="message-avatar user">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div class="message-bubble">
                    <p>{message.text}</p>
                  </div>
                </div>
              {:else if message.type === 'ai'}
                <div class="chat-message ai-message" in:fly={{ y: 10, duration: 300, delay: i * 50 }}>
                  <div class="message-avatar ai">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                    </svg>
                  </div>
                  <div class="message-bubble">
                    {@html message.text.replace(/\n/g, '<br>')}
                  </div>
                </div>
              {:else if message.type === 'system'}
                <div class="chat-message system-message" in:fly={{ y: 10, duration: 300, delay: i * 50 }}>
                  <div class="system-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-6-6z"/>
                      <path d="M14 3v6h6"/>
                    </svg>
                  </div>
                  <div class="system-text">{message.text}</div>
                </div>
              {:else if message.type === 'error'}
                <div class="chat-message error-message" in:fly={{ y: 10, duration: 300, delay: i * 50 }}>
                  <div class="message-avatar error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div class="message-bubble">
                    <p>{message.text}</p>
                  </div>
                </div>
              {/if}
            {/each}
            
            <!-- Loading indicator -->
            {#if isLoading}
              <div class="chat-message ai-message loading" in:fly={{ y: 10, duration: 300 }}>
                <div class="message-avatar ai">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                </div>
                <div class="message-bubble">
                  <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            {/if}
          {/if}
        </div>
      </div>

      <div class="chat-input">
        <form on:submit|preventDefault={handleSubmit} class="input-form">
          <textarea
            bind:value={userQuestion}
            placeholder={`Ask about applying "${selectedHabit.name}" to your learning...`}
            rows="3"
            class="message-input"
            disabled={isLoading}
          ></textarea>
          <button 
            type="submit" 
            class="send-button" 
            disabled={isLoading || !userQuestion.trim()}
            aria-label="Send message"
          >
            {#if isLoading}
              <span class="spinner"></span>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .habit-coach-container {
    width: 100%;
  }

  /* Page Header */
  .page-header {
    position: relative;
    padding: var(--spacing-2xl) var(--spacing-xl);
    overflow: hidden;
    margin-bottom: var(--spacing-xl);
    
    @media (max-width: 768px) {
      padding: var(--spacing-xl) var(--spacing-md);
    }
  }
  
  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .page-title {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    
    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
  }
  
  .title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--gradient-primary);
    border-radius: 12px;
    color: white;
    
    svg {
      width: 28px;
      height: 28px;
    }
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  
  .page-description {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }
  
  .header-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  .header-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.1;
    
    html.dark & {
      opacity: 0.05;
    }
    
    &.shape-1 {
      background: var(--primary-color);
      width: 300px;
      height: 300px;
      top: -150px;
      right: 10%;
    }
    
    &.shape-2 {
      background: var(--accent-color);
      width: 200px;
      height: 200px;
      bottom: -100px;
      left: 10%;
    }
  }
  
  /* Main Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-xl);
    
    @media (max-width: 768px) {
      padding: 0 var(--spacing-md);
    }
  }
  
  .coach-interface {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: var(--spacing-xl);
    min-height: 700px;
    margin-bottom: var(--spacing-2xl);
    
    @media (max-width: 1024px) {
      grid-template-columns: 280px 1fr;
    }
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
  }
  
  /* Options Panel (Left Sidebar) */
  .options-panel {
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    height: fit-content;
    
    @media (max-width: 768px) {
      order: 2;
    }
  }
  
  .panel-section {
    margin-bottom: var(--spacing-lg);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .section-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  /* Custom Select Styling */
  .custom-select {
    position: relative;
  }
  
  select {
    appearance: none;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    color: var(--text-color);
    cursor: pointer;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.1);
    }
  }
  
  .select-arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--text-color);
    pointer-events: none;
  }
  
  /* Habit Info Section */
  .habit-info {
    padding: var(--spacing-lg);
    background-color: var(--highlight-color);
    border-radius: var(--radius-md);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: var(--gradient-primary);
    }
  }
  
  .habit-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: var(--primary-color);
    color: white;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  
  .habit-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
  
  .habit-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  .examples-section {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: var(--spacing-md);
    
    html.dark & {
      border-top-color: rgba(255, 255, 255, 0.05);
    }
  }
  
  .examples-title {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
  }
  
  .examples-list {
    padding-left: 1.25rem;
    margin: 0;
    
    li {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      line-height: 1.5;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  /* Experience Level Selector */
  .experience-selector {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .experience-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background-color var(--transition-speed);
    
    &:hover {
      background-color: var(--highlight-color);
    }
    
    input[type="radio"] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      margin: 0;
      position: relative;
      
      &:checked {
        border-color: var(--primary-color);
        
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--primary-color);
        }
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.1);
      }
    }
  }
  
  .experience-label {
    font-size: 0.95rem;
  }
  
  /* Chat Panel */
  .chat-panel {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-md);
    overflow: hidden;
    height: 700px;
    
    @media (max-width: 768px) {
      order: 1;
      height: 500px;
    }
  }
  
  .chat-header {
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .chat-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }
  }
  
  .chat-icon {
    width: 20px;
    height: 20px;
    color: var(--primary-color);
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--border-color);
    
    &.active {
      background-color: var(--success-color);
    }
  }
  
  .chat-window {
    flex: 1;
    overflow: hidden;
    position: relative;
    background-color: var(--background-color);
  }
  
  .chat-messages {
    height: 100%;
    overflow-y: auto;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    
    &.has-messages {
      justify-content: flex-start;
      align-items: stretch;
    }
  }
  
  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 600px;
    margin: auto;
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .empty-icon {
    width: 56px;
    height: 56px;
    background-color: var(--highlight-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    
    svg {
      width: 30px;
      height: 30px;
      color: var(--primary-color);
    }
  }
  
  .empty-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  .empty-description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    max-width: 500px;
  }
  
  .example-questions {
    width: 100%;
    margin-bottom: var(--spacing-lg);
    
    .examples-title {
      margin-bottom: var(--spacing-sm);
      font-size: 1rem;
    }
  }
  
  .example-question {
    width: 100%;
    text-align: left;
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    color: var(--text-color);
    transition: all var(--transition-speed);
    cursor: pointer;
    
    &:hover {
      background-color: var(--highlight-color);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  .tip-card {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    background-color: var(--highlight-color);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    width: 100%;
    text-align: left;
  }
  
  .tip-icon {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  .tip-content {
    flex: 1;
  }
  
  .tip-title {
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    font-size: 1rem;
  }
  
  .tip-text {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-secondary);
    margin: 0;
  }
  
  /* Chat Messages */
  .chat-message {
    display: flex;
    margin-bottom: var(--spacing-md);
    align-items: flex-start;
    max-width: 85%;
    
    &.user-message {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    
    &.system-message {
      align-self: center;
      width: 100%;
      background-color: var(--highlight-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-sm) var(--spacing-md);
      margin: var(--spacing-md) 0;
      gap: var(--spacing-sm);
    }
    
    &.error-message {
      .message-avatar {
        background-color: var(--error-color);
      }
      
      .message-bubble {
        background-color: rgba(239, 68, 68, 0.05);
        border: 1px solid rgba(239, 68, 68, 0.2);
        
        p {
          color: var(--error-color);
        }
      }
    }
  }
  
  .message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 var(--spacing-sm);
    
    svg {
      width: 20px;
      height: 20px;
      color: white;
    }
    
    &.user {
      background-color: var(--accent-color);
    }
    
    &.ai {
      background-color: var(--primary-color);
    }
  }
  
  .system-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 18px;
      height: 18px;
      color: var(--text-secondary);
    }
  }
  
  .system-text {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-style: italic;
  }
  
  .message-bubble {
    background-color: var(--surface-color);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    
    p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-color);
      white-space: pre-wrap;
    }
    
    :global(strong) {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    :global(ul), :global(ol) {
      padding-left: 1.5rem;
      margin: var(--spacing-sm) 0;
    }
    
    :global(li) {
      margin-bottom: var(--spacing-xs);
    }
    
    :global(h3), :global(h4) {
      margin: var(--spacing-md) 0 var(--spacing-sm);
      font-weight: 600;
    }
  }
  
  /* Loading Animation for AI Response */
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--text-tertiary);
      animation: typing 1.5s infinite ease-in-out;
      
      &:nth-child(1) {
        animation-delay: 0s;
      }
      
      &:nth-child(2) {
        animation-delay: 0.3s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    30% {
      transform: translateY(-5px);
      opacity: 1;
    }
  }
  
  /* Chat Input */
  .chat-input {
    padding: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    background-color: var(--card-bg-color);
  }
  
  .input-form {
    display: flex;
    gap: var(--spacing-md);
    position: relative;
  }
  
  .message-input {
    flex: 1;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    color: var(--text-color);
    resize: none;
    font-family: inherit;
    font-size: 0.95rem;
    line-height: 1.5;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.1);
    }
    
    &::placeholder {
      color: var(--text-tertiary);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  
  .send-button {
    width: 48px;
    height: 48px;
    align-self: flex-end;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all var(--transition-speed);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      background: var(--border-color);
      cursor: not-allowed;
      transform: translateY(0);
      box-shadow: none;
    }
  }
  
  /* Spinner Animation */
  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .page-title {
      font-size: 2.5rem;
    }
    
    .page-description {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 768px) {
    .chat-messages {
      max-height: 350px;
    }
    
    .chat-message {
      max-width: 90%;
    }
  }
  
  @media (max-width: 480px) {
    .chat-message {
      max-width: 95%;
    }
    
    .message-avatar {
      width: 32px;
      height: 32px;
      
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
</style>