# Next.js Template

A modern, production-ready Next.js template with a comprehensive development setup including custom component generation, type-safe CSS modules, and robust error handling.

## 🚀 Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) with App Router
-   **Language**: TypeScript
-   **Styling**: CSS Modules with PostCSS
-   **State Management**: [TanStack Query](https://tanstack.com/query) (React Query)
-   **Testing**: [Vitest](https://vitest.dev/) with React Testing Library
-   **Linting/Formatting**: [Biome](https://biomejs.dev/)
-   **Git Hooks**: Husky with Commitlint
-   **Package Manager**: pnpm
-   **Node Version**: 22.20.0 (managed via Volta)

## 📋 Prerequisites

-   Node.js 22.20.0 (or use [Volta](https://volta.sh/) for automatic version management)
-   pnpm 8.x or higher

## 🛠️ Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run tests in watch mode
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Generate coverage report

# Code Quality
pnpm format           # Check formatting
pnpm format:write     # Fix formatting
pnpm check            # Lint and check code
pnpm check:write      # Lint and auto-fix

# Component Generation
pnpm generate         # Interactive component generator
```

## 🏗️ Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable components
│   │   └── SmartErrorBoundary/ # Error boundary with retry logic
│   ├── lib/                    # Utility functions
│   │   └── class-selectors.ts  # Type-safe CSS module helpers
│   ├── providers/              # React context providers
│   │   └── QueryProvider.tsx   # TanStack Query setup
│   └── styles/                 # Global styles
│       ├── globals.css         # CSS variables & reset
│       └── utilities.module.css # Utility classes
├── scripts/
│   └── generate-component/     # Component generator
│       ├── index.ts            # Generator CLI
│       └── templates/          # Component templates
└── public/                     # Static assets
```

## 🎨 Component Generator

Generate new components quickly with the custom CLI:

```bash
# Basic server component
pnpm generate MyComponent

# Client component with styles
pnpm generate MyButton --client --styles

# Component with props
pnpm generate UserCard --props "name: string; age: number; email: string"

# Custom directory (relative to /src)
pnpm generate Header --directory "components/layout"

# Force overwrite existing component
pnpm generate MyComponent --force
```

### Generator Options

-   `-c, --client` - Generate client component (default: server component)
-   `-s, --styles` - Generate CSS module file
-   `-p, --props <props>` - Define component props (format: `"name: type; name2: type2"`)
-   `-d, --directory <path>` - Target directory relative to `/src` (default: `components`)
-   `-f, --force` - Overwrite existing component

### Generated Files

Each component includes:

-   `component-name.tsx` - Component file
-   `component-name.module.css` - CSS module (if `--styles` flag used)
-   `index.ts` - Barrel export for cleaner imports

## 🎯 Code Conventions

### CSS Modules

Type-safe CSS module usage with custom selectors:

```tsx
import { createStrictClassSelector } from "@/lib/class-selectors";
import styles from "./component.module.css";

const css = createStrictClassSelector(styles);

function Component() {
    return <div className={css("container")}>Content</div>;
}
```

### Utility Classes

Reusable utility classes are available in `utilities.module.css`:

```tsx
import utilities from "@/styles/utilities.module.css";

const cssUtils = createStrictClassSelector(utilities);

<div className={cssUtils("flex", "itemsCenter")} />;
```

### Error Boundaries

Use `SmartErrorBoundary` for robust error handling:

```tsx
import SmartErrorBoundary from "@/components/SmartErrorBoundary";

<SmartErrorBoundary context="UserProfile" level="component" maxRetries={3} enableNavigation={false}>
    <UserProfile />
</SmartErrorBoundary>;
```

**Levels:**

-   `component` - Local component errors
-   `page` - Page-level errors (adds navigation buttons)
-   `app` - Application-level errors (adds reload/home buttons)

## 🧪 Testing

Tests are powered by Vitest and React Testing Library:

```bash
# Run tests
pnpm test

# Watch mode with UI
pnpm test:ui

# Generate coverage
pnpm test:coverage
```

Example test:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./component";

describe("Component", () => {
    it("renders correctly", () => {
        render(<Component />);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
```

## 📝 Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint.

### Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

-   `feat` - New feature
-   `fix` - Bug fix
-   `docs` - Documentation changes
-   `style` - Code style changes (formatting, etc.)
-   `refactor` - Code refactoring
-   `perf` - Performance improvements
-   `test` - Adding or updating tests
-   `chore` - Maintenance tasks
-   `ci` - CI/CD changes
-   `build` - Build system changes
-   `revert` - Revert previous commit

### Scopes

Scopes must be UPPERCASE:

-   `CORE` - Core functionality
-   `API` - API related
-   `UI` - User interface
-   `DB` - Database
-   `CONFIG` - Configuration
-   `AUTH` - Authentication
-   `SEARCH` - Search functionality
-   `CHECKOUT` - Checkout process
-   `CI` - CI/CD
-   `BUILD` - Build process
-   Branch name (automatically detected)

### Examples

```bash
git commit -m "feat(UI): add user profile component"
git commit -m "fix(API): resolve authentication timeout"
git commit -m "docs(CORE): update README with new features"
```

## 🎨 Styling System

### CSS Custom Properties

All design tokens are defined in `globals.css`:

```css
/* Colors */
--color-primary
--color-secondary
--color-text-primary
--color-text-secondary
--color-action-primary

/* Spacing */
--spacing-xs to --spacing-2xl

/* Border Radius */
--radius-sm to --radius-xl

/* Font Sizes */
--font-size-xs to --font-size-4xl

/* Font Weights */
--font-weight-normal to --font-weight-bold
```

### Dark Mode

Dark mode is automatically supported via `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-main: hsl(0, 0%, 10%);
        /* ... */
    }
}
```

## 🔧 Configuration

### Editor Setup (VS Code)

The project includes VS Code settings for:

-   Auto-format on save with Biome
-   Organize imports automatically
-   CSS validation
-   TypeScript integration

### PostCSS

Configured with:

-   `postcss-custom-media` - Custom media queries
-   `autoprefixer` - Vendor prefixes

### Biome Configuration

Format and lint settings in `biome.json`:

-   120 character line width
-   Tabs for indentation (4 spaces)
-   Double quotes
-   ES5 trailing commas

## 📚 Learn More

### Next.js Resources

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Learn Next.js](https://nextjs.org/learn)
-   [Next.js GitHub](https://github.com/vercel/next.js)

### Additional Resources

-   [TanStack Query Docs](https://tanstack.com/query/latest)
-   [Biome Documentation](https://biomejs.dev/)
-   [Vitest Documentation](https://vitest.dev/)

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Vercel will auto-detect Next.js and configure deployment
4. Your app will be live!

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## 🤝 Contributing

1. Follow the commit conventions
2. Run `pnpm check:write` before committing (automated via Husky)
3. Write tests for new features
4. Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
