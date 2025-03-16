/**
 * Habits of Mind by Arthur L. Costa and Bena Kallick
 * This file contains the core 16 habits and their descriptions
 */

export interface Habit {
  id: number;
  name: string;
  description: string;
  examples: string[];
}

export const habits: Habit[] = [
  {
    id: 1,
    name: "Persisting",
    description: "Stick to it! Persevering in task through to completion; remaining focused; looking for ways to reach your goal when stuck; not giving up.",
    examples: [
      "Continuing to work on a math problem despite difficulties",
      "Revising a paper multiple times to improve quality",
      "Practicing a skill regularly to master it"
    ]
  },
  {
    id: 2,
    name: "Managing impulsivity",
    description: "Take your time! Thinking before acting; remaining calm, thoughtful and deliberative; being aware of your thoughts and feelings.",
    examples: [
      "Considering multiple options before making a decision",
      "Taking time to fully understand directions before starting",
      "Thinking through consequences before responding to a situation"
    ]
  },
  {
    id: 3,
    name: "Listening with understanding and empathy",
    description: "Understand others! Devoting mental energy to another person's thoughts and ideas; making an effort to perceive another's point of view and emotions.",
    examples: [
      "Asking clarifying questions when others speak",
      "Considering perspectives different from your own",
      "Giving full attention during conversations"
    ]
  },
  {
    id: 4,
    name: "Thinking flexibly",
    description: "Look at it another way! Being able to change perspectives, generate alternatives, consider options; looking at a situation from multiple angles.",
    examples: [
      "Finding multiple approaches to solve a problem",
      "Adapting strategies when circumstances change",
      "Considering different viewpoints in a debate"
    ]
  },
  {
    id: 5,
    name: "Thinking about thinking (metacognition)",
    description: "Know your knowing! Being aware of your own thoughts, strategies, feelings and actions; knowing how your thoughts affect your actions.",
    examples: [
      "Reflecting on learning processes and outcomes",
      "Being aware of personal strengths and weaknesses",
      "Monitoring understanding while reading"
    ]
  },
  {
    id: 6,
    name: "Striving for accuracy",
    description: "Check it again! Setting high standards; checking for errors; being precise; reviewing rules and directions.",
    examples: [
      "Double-checking calculations in math problems",
      "Proofreading written work for errors",
      "Verifying information before presenting it"
    ]
  },
  {
    id: 7,
    name: "Questioning and posing problems",
    description: "How do you know? Asking yourself, 'How can I find out?'; developing questioning strategies; finding problems to solve.",
    examples: [
      "Asking 'why' and 'what if' questions",
      "Identifying gaps in understanding",
      "Formulating questions that deepen learning"
    ]
  },
  {
    id: 8,
    name: "Applying past knowledge to new situations",
    description: "Use what you learn! Accessing prior knowledge; transferring knowledge beyond the situation in which it was learned.",
    examples: [
      "Using math concepts to solve real-world problems",
      "Applying research skills from one project to another",
      "Drawing on previous experiences to handle new challenges"
    ]
  },
  {
    id: 9,
    name: "Thinking and communicating with clarity and precision",
    description: "Be clear! Striving for accurate communication in both written and oral form; avoiding over-generalizations, distortions, deletions and exaggerations.",
    examples: [
      "Using specific terminology when explaining concepts",
      "Organizing thoughts before speaking or writing",
      "Being precise in measurements and descriptions"
    ]
  },
  {
    id: 10,
    name: "Gathering data through all senses",
    description: "Use your natural pathways! Paying attention to the world around you; gathering data through all the sensory paths—touch, taste, smell, hearing, seeing.",
    examples: [
      "Observing details in the environment",
      "Using hands-on experiences to understand concepts",
      "Incorporating multiple senses in learning"
    ]
  },
  {
    id: 11,
    name: "Creating, imagining, innovating",
    description: "Try a different way! Generating new and novel ideas; seeking fluency, originality, flexibility, and elaboration.",
    examples: [
      "Brainstorming multiple solutions to a problem",
      "Developing original approaches to assignments",
      "Combining ideas in unique ways"
    ]
  },
  {
    id: 12,
    name: "Responding with wonderment and awe",
    description: "Have fun figuring it out! Finding the world awesome, mysterious, and being intrigued with phenomena and beauty.",
    examples: [
      "Expressing curiosity about natural phenomena",
      "Finding joy in discovering new ideas",
      "Appreciating the beauty in complex systems"
    ]
  },
  {
    id: 13,
    name: "Taking responsible risks",
    description: "Venture out! Being adventuresome; living on the edge of your competence; trying new things constantly.",
    examples: [
      "Volunteering answers even when unsure",
      "Attempting challenging tasks outside comfort zone",
      "Sharing personal work for feedback"
    ]
  },
  {
    id: 14,
    name: "Finding humor",
    description: "Laugh a little! Being able to laugh at yourself and with others; looking for the whimsical, incongruous, and unexpected in life.",
    examples: [
      "Using humor to reduce tension in difficult situations",
      "Appreciating jokes related to learning content",
      "Finding absurdities in complex problems"
    ]
  },
  {
    id: 15,
    name: "Thinking interdependently",
    description: "Work together! Being able to work in and learn from others; working in reciprocal relationships; teamwork.",
    examples: [
      "Contributing ideas in group discussions",
      "Building on others' suggestions in collaborative work",
      "Sharing responsibilities in team projects"
    ]
  },
  {
    id: 16,
    name: "Remaining open to continuous learning",
    description: "Learn from experiences! Having humility and pride when admitting you don't know; resisting complacency.",
    examples: [
      "Seeking feedback to improve performance",
      "Modifying understanding based on new information",
      "Approaching challenges as opportunities to grow"
    ]
  }
];