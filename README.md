# StandardWebTemplate - Professional Svelte Application

A modern, responsive web template built with Svelte, TypeScript, and SCSS. This template provides a solid foundation for building professional web applications with features like dark mode support, responsive design, and component-based architecture.

![StandardWebTemplate Screenshot](https://placeholder.pics/svg/800x400/DEDEDE/555555/StandardWebTemplate)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Understanding Svelte](#understanding-svelte)
  - [What is Svelte?](#what-is-svelte)
  - [Component Structure](#component-structure)
  - [Reactivity](#reactivity)
  - [Styling in Svelte](#styling-in-svelte)
  - [Transitions and Animations](#transitions-and-animations)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modern Tech Stack**: Built with Svelte, TypeScript, and Vite for a lightning-fast development experience
- **Component-Based Architecture**: Modular design with reusable components
- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Dark Mode Support**: Built-in theme toggle with smooth transitions
- **SCSS Integration**: For powerful styling capabilities
- **TypeScript**: Type safety throughout the application
- **Routing**: Client-side navigation using svelte-routing
- **Toast Notifications**: Built-in notification system
- **Performance Optimized**: Fast loading and smooth interactions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- npm (usually comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/StandardWebTemplate.git
cd StandardWebTemplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server on `http://localhost:5173`. The app will automatically reload if you change any of the source files.

### Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
StandardWebTemplate/
├── index.html            # Entry HTML file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── src/
    ├── app.css           # Global CSS
    ├── App.svelte        # Root Svelte component
    ├── main.ts           # Application entry point
    ├── components/       # Reusable components
    │   ├── Footer.svelte
    │   ├── Header.svelte
    │   ├── Sidebar.svelte
    │   ├── ThemeToogle.svelte
    │   └── Toast.svelte
    └── routes/           # Page components
        ├── About.svelte
        ├── Contact.svelte
        ├── Features.svelte
        └── Home.svelte
```

## Understanding Svelte

### What is Svelte?

Svelte is a modern JavaScript framework for building user interfaces. Unlike traditional frameworks like React or Vue that do most of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. This results in highly-optimized vanilla JavaScript that directly manipulates the DOM, which can make Svelte apps very fast.

### Component Structure

In this template, Svelte components are used extensively. A typical Svelte component consists of three sections:

1. **Script**: Contains the JavaScript/TypeScript logic
```html
<script lang="ts">
  // Component logic goes here
  let count = 0;
  
  function increment() {
    count += 1;
  }
</script>
```

2. **HTML**: The markup template
```html
<button on:click={increment}>
  Clicked {count} times
</button>
```

3. **Style**: Component-specific CSS/SCSS
```html
<style lang="scss">
  button {
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5em 1em;
    
    &:hover {
      background-color: #ff6b31;
    }
  }
</style>
```

### Reactivity

Svelte's reactivity is based on variable assignments. When you update a variable that's used in your template, Svelte automatically updates the DOM to reflect the change:

```html
<script>
  let count = 0;
  
  function increment() {
    count += 1;  // This triggers an update!
  }
  
  $: doubled = count * 2;  // Reactive declarations
</script>

<p>{count} doubled is {doubled}</p>
<button on:click={increment}>Increment</button>
```

### Styling in Svelte

In this template, we use SCSS for styling components. Styles in Svelte are scoped by default, meaning they only apply to the component they're defined in. You can use the `:global()` modifier to apply styles globally.

```html
<style lang="scss">
  /* This only applies to <p> elements in this component */
  p {
    color: blue;
  }
  
  /* This applies to all .button elements in the app */
  :global(.button) {
    background-color: green;
  }
  
  /* You can use SCSS nesting */
  .card {
    padding: 1rem;
    
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    .title {
      font-weight: bold;
    }
  }
</style>
```

### Transitions and Animations

This template makes use of Svelte's built-in transition system. You can find examples in the route components:

```html
<script>
  import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 200 }}>
  This content will fade in and out
</div>
```

## Customization

### Themes

The template includes a dark and light theme. You can customize the colors in `App.svelte`:

```css
:global(html) {
  --primary-color: #2563eb;
  --secondary-color: #4f46e5;
  --background-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
  
  &.dark {
    --primary-color: #3b82f6;
    --secondary-color: #6366f1;
    --background-color: #111827;
    --text-color: #f3f4f6;
    --border-color: #374151;
  }
}
```

### Adding New Routes

1. Create a new component in the `src/routes/` directory
2. Add a new `<Route>` in `App.svelte`:

```html
<Route path="/new-page" component={NewPage} />
```

3. Add a link to the new route in `Header.svelte`:

```html
<Link to="/new-page">New Page</Link>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
