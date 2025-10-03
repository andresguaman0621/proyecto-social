# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript single-page application for "Corazones en Acción" (Proyecto Bienestar Comunitario) - a community wellness initiative in Quito, Ecuador. The project showcases activities, phases, partners, and provides contact functionality for volunteers and donors.

## Tech Stack

- **React 19.1.1** with TypeScript
- **Tailwind CSS 3.4.1** for styling
- **lucide-react 0.544.0** for icons
- **Create React App** (react-scripts 5.0.1) for build tooling
- **Testing**: Jest with React Testing Library

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Run tests in interactive watch mode
npm test

# Build for production (outputs to ./build)
npm run build
```

## Architecture

This is a single-component application with all logic in `src/App.tsx`. The main component (`ProyectoSocialWeb`) contains:

- **State Management**:
  - `mobileMenuOpen`: Controls mobile navigation menu visibility
  - `formData`: Manages contact form inputs (nombre, email, telefono, mensaje)
  - `currentPartner`: Tracks current page in partners carousel
  - `itemsPerPage`: Responsive items per page in partners carousel (1/2/3 based on screen size)
  - `expandedQuarter`: Controls which timeline quarter is expanded

- **Custom Hooks**:
  - `useCounterAnimation`: Intersection Observer-based counter animation for statistics (src/App.tsx:38-72)

- **Data Structures**:
  - `actividades`: Array of 4 community activities with scheduling info
  - `componentes`: Three main wellness components (Physical Activity, Nutrition, Emotional Well-being)
  - `aliados`: 13 partner organizations with logos and contribution types
  - `trimestres`: 4 project phases (Norte, Centro, Sur, Rural) with nested month details

- **Key Sections**:
  - Navigation bar (fixed, responsive with mobile hamburger menu)
  - Hero section with CTA buttons
  - Statistics section with animated counters (700+ families, 10 GADs, 9 months, 12+ allies)
  - Project overview with components grid
  - Activities grid (4 activity cards)
  - Personal motivation section ("¿Por Qué Este Proyecto?")
  - Visual timeline with 4 expandable phases covering 9 months across 10 GAD parishes
  - Partners/allies carousel with auto-play (8s interval) and responsive layout
  - CTA section for volunteers and donations
  - Contact form with controlled inputs
  - Footer with links and contact info

## TypeScript Interfaces

The app defines 5 main interfaces (src/App.tsx:4-35):
- `Actividad`: Activity cards with icon, title, month, and description
- `Componente`: Wellness components with React icons (uses `React.ReactElement`)
- `Aliado`: Partner organizations with logo URLs
- `FormData`: Contact form state
- `Fase`: Timeline phases with color styling properties

## Styling Approach

- Tailwind CSS with utility-first classes
- Color scheme: emerald/teal gradient as primary, with color-coded phases (blue, emerald, teal, amber)
- Responsive design using `md:` and `lg:` breakpoints
- Hover effects with `transform` and `shadow` transitions
- Mobile-first approach with hamburger menu
- Custom color classes for timeline phases with coordinated backgrounds, text, and borders

## Important Notes

- The project uses TypeScript strict mode (`tsconfig.json`)
- All form submissions currently show an alert (no backend integration)
- Images are loaded from external CDNs (Unsplash, partner logos)
- The app is a single-page application with anchor navigation (hash navigation with `href="#section"`)
- No routing library is used
- Carousel features auto-play with 8-second intervals
- Counter animations trigger on scroll via Intersection Observer
- Logo files are stored in `/public` directory (logo.png, logo_1.png, logo_2.png)
