/**
 * API interface for OpenAI integration
 * Client-side implementation for demo purposes
 */

// For the demo, we'll use a mock OpenAI integration that works client-side
export async function callOpenAI(systemPrompt: string, userMessage: string): Promise<string> {
  console.log('Simulating API call to OpenAI with:', { systemPrompt, userMessage });
  
  // In a real implementation, this would call the OpenAI API
  // For the demo, we'll simulate a response with a delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a contextual response based on the prompt
      const response = simulateAIResponse(systemPrompt, userMessage);
      resolve(response);
    }, 1500); // Simulate network delay
  });
}

// This is only for the demo - in a real implementation, we would use the OpenAI API
function simulateAIResponse(systemPrompt: string, userMessage: string): string {
  // Extract key terms from the prompts to generate contextual responses
  const promptLower = systemPrompt.toLowerCase();
  const messageLower = userMessage.toLowerCase();
  
  // Check what type of prompt this is
  if (promptLower.includes('habit coach')) {
    return generateHabitCoachResponse(promptLower, messageLower);
  } else if (promptLower.includes('reflection')) {
    return generateReflectionResponse(promptLower, messageLower);
  } else if (promptLower.includes('lesson plan')) {
    return generateLessonPlanResponse(promptLower, messageLower);
  } else if (promptLower.includes('problem solver')) {
    return generateProblemSolverResponse(promptLower, messageLower);
  } else if (promptLower.includes('self-assessment')) {
    return generateSelfAssessmentResponse(promptLower, messageLower);
  }
  
  // Default response if we can't determine the type
  return "I'm here to help you develop your Habits of Mind. What specifically would you like to work on today?";
}

// Response generators for different tools
function generateHabitCoachResponse(promptLower: string, messageLower: string): string {
  let habitName = "persisting";
  
  // Try to determine which habit is being discussed
  if (promptLower.includes('managing impulsivity')) habitName = "managing impulsivity";
  else if (promptLower.includes('listening with understanding')) habitName = "listening with understanding and empathy";
  else if (promptLower.includes('thinking flexibly')) habitName = "thinking flexibly";
  else if (promptLower.includes('metacognition')) habitName = "thinking about thinking (metacognition)";
  else if (promptLower.includes('accuracy')) habitName = "striving for accuracy";
  else if (promptLower.includes('questioning')) habitName = "questioning and posing problems";
  else if (promptLower.includes('past knowledge')) habitName = "applying past knowledge to new situations";
  else if (promptLower.includes('clarity')) habitName = "thinking and communicating with clarity and precision";
  else if (promptLower.includes('senses')) habitName = "gathering data through all senses";
  else if (promptLower.includes('creating')) habitName = "creating, imagining, innovating";
  else if (promptLower.includes('wonderment')) habitName = "responding with wonderment and awe";
  else if (promptLower.includes('risks')) habitName = "taking responsible risks";
  else if (promptLower.includes('humor')) habitName = "finding humor";
  else if (promptLower.includes('interdependently')) habitName = "thinking interdependently";
  else if (promptLower.includes('continuous learning')) habitName = "remaining open to continuous learning";
  
  return `
I notice you're working on developing your **${habitName}** habit of mind. This is a great habit to focus on!

Rather than telling you what to do, let me ask you a few questions that might help you think more deeply:

1. What strategies have you already tried related to this situation?
2. How might you apply the habit of ${habitName} to overcome this challenge?
3. Can you think of a time when you successfully used this habit before?

Remember, ${habitName} is about ${getHabitDescription(habitName)}. 

What's one small step you could take right now to practice this habit?
  `.trim();
}

function generateReflectionResponse(promptLower: string, studentWork: string): string {
  return `
Thank you for sharing your work. I notice several aspects of your thinking that demonstrate Habits of Mind:

**Strengths I observed:**
- You showed persistence when tackling the complex parts of this task
- You communicated your ideas with clarity in several sections
- I noticed you applied previous knowledge effectively in your approach

**Opportunities for growth:**
- You might further develop flexible thinking by considering alternative perspectives
- Consider how you might gather more data through different sources or approaches

**Reflective questions to consider:**
1. What was the most challenging part of this work, and how did you approach it?
2. How might you approach this differently if you were to do it again?
3. Which Habit of Mind do you feel was most important for this particular task?

Keep developing these thinking habits - they'll serve you well beyond this assignment!
  `.trim();
}

function generateLessonPlanResponse(promptLower: string, messageLower: string): string {
  // Extract some context from the prompt
  let subject = "science";
  if (promptLower.includes('subject: math')) subject = "math";
  else if (promptLower.includes('subject: english')) subject = "English";
  else if (promptLower.includes('subject: history')) subject = "history";
  
  return `
# Lesson Plan: ${subject.charAt(0).toUpperCase() + subject.slice(1)} with Habits of Mind Integration

## Introduction (5-7 minutes)
Connect today's content with the selected Habits of Mind by discussing how professionals in this field use these thinking habits in their work.

## Learning Activities

### Activity 1: Collaborative Exploration (15-20 minutes)
Students work in small groups to investigate a problem that requires both content knowledge and the application of the Habits of Mind.

**Teacher Prompts:**
- "How might you persevere when you encounter difficulty in this task?"
- "What strategies could help you think more flexibly about this problem?"
- "How can you apply what you already know to this new situation?"

### Activity 2: Reflective Analysis (15 minutes)
Students individually analyze their thinking process during the first activity, identifying which habits they used and how.

## Formative Assessment
Students create a "Thinking Map" that shows both their content understanding and how they applied specific Habits of Mind to reach their conclusions.

## Extension Activities
- Students can create a guide for future students on how to apply these habits in this subject area
- Challenge students to identify real-world situations where these habits would be valuable

## Reflection Questions
End the lesson by having students discuss which habit was most valuable today and why.
  `.trim();
}

function generateProblemSolverResponse(promptLower: string, messageLower: string): string {
  return `
Let's approach this problem using specific Habits of Mind to guide your thinking:

**Persisting**
- What's your first reaction when looking at this problem? 
- If you get stuck, what strategies could help you persist rather than give up?

**Thinking Flexibly**
- Can you think of at least two different approaches to this problem?
- What would happen if you looked at this from a completely different angle?

**Applying Past Knowledge**
- Have you solved anything similar to this before?
- What specific knowledge or skills from previous work might be helpful here?

**Striving for Accuracy**
- Once you have a possible solution, how will you check if it's correct?
- What details might be important to pay attention to?

Remember, the goal isn't to find the answer immediately, but to develop your thinking process. Which habit would you like to focus on first as you approach this problem?
  `.trim();
}

function generateSelfAssessmentResponse(promptLower: string, messageLower: string): string {
  return `
Thank you for your thoughtful self-assessment. Here's my feedback:

**Strengths:**
- You demonstrate awareness of how this habit appears in your daily life
- You've identified specific situations where you already apply this habit
- Your reflection shows you understand the value of this habit in your learning

**Growth Opportunities:**
- Consider how you might apply this habit more consistently across different subjects
- You could develop strategies for using this habit when under pressure or stress
- Think about how this habit connects with other Habits of Mind

**Action Steps:**
1. Set a specific goal to practice this habit this week in a challenging subject
2. Create a visual reminder (like a small note on your desk) to prompt you to use this habit
3. Partner with a classmate to give each other feedback on using this habit

**Reflection Question:**
How might becoming stronger in this habit change your approach to learning in the future?

This habit will be particularly valuable when you face complex problems in both academic and real-world settings. Keep developing it!
  `.trim();
}

// Helper function to get habit descriptions
function getHabitDescription(habitName: string): string {
  const descriptions: {[key: string]: string} = {
    "persisting": "sticking to a task until completion, even when challenges arise",
    "managing impulsivity": "taking time to think before acting and considering outcomes",
    "listening with understanding and empathy": "making an effort to understand others' perspectives",
    "thinking flexibly": "considering alternative viewpoints and approaches to problems",
    "thinking about thinking (metacognition)": "being aware of your own thoughts and thinking processes",
    "striving for accuracy": "checking your work and setting high standards",
    "questioning and posing problems": "developing a curious mindset and asking deep questions",
    "applying past knowledge to new situations": "using what you already know to tackle new challenges",
    "thinking and communicating with clarity and precision": "being clear in your language and avoiding vagueness",
    "gathering data through all senses": "using all available information sources to understand",
    "creating, imagining, innovating": "generating new ideas and approaches",
    "responding with wonderment and awe": "finding joy and curiosity in learning",
    "taking responsible risks": "being willing to try new approaches and learn from mistakes",
    "finding humor": "maintaining perspective and enjoying the learning process",
    "thinking interdependently": "collaborating effectively with others",
    "remaining open to continuous learning": "always being ready to learn and grow"
  };
  
  return descriptions[habitName] || "developing effective thinking patterns";
}