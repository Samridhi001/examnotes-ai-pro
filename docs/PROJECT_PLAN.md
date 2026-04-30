# ExamNotesAI Pro Project Plan

ExamNotesAI Pro is being built as a full-stack AI-powered exam preparation platform.

This plan describes the intended product direction. The exact order and scope may evolve as the project grows.

## Product Vision

ExamNotesAI Pro helps students turn topics or study material into exam-ready learning resources.

The platform will support:

- AI-generated notes
- Revision summaries
- Flashcards
- Quiz questions
- Important questions
- Diagrams
- Charts
- Saved note history
- PDF and file exports
- User accounts
- Credit-based usage
- Payments for additional credits

## Core Milestones

### 1. Foundation

Set up the full-stack project structure.

Planned work:

- React frontend
- Express backend
- Environment configuration
- Routing
- Layout system
- API health checks

### 2. Authentication

Allow users to securely create and access accounts.

Planned work:

- Register
- Login
- Logout
- Current user API
- JWT with HTTP-only cookies
- Protected routes

### 3. AI Notes Generation

Generate structured exam material using Gemini.

Planned work:

- Prompt builder
- Gemini service
- AI response validation
- Offline fallback generator
- Notes generation API

### 4. Notes Management

Save and manage generated notes.

Planned work:

- Notes database model
- Saved notes history
- View previous notes
- Delete notes
- Search/filter notes

### 5. Study Tools

Turn generated notes into interactive study material.

Planned work:

- Flashcards
- Quiz questions
- Revision checklist
- Quick revision mode
- Important question sections

### 6. Visual Learning

Add visual study aids.

Planned work:

- Mermaid diagrams
- Chart data generation
- Recharts visualizations
- Diagram/chart validation

### 7. Exports

Allow users to download and reuse study material.

Planned work:

- PDF export
- Markdown export
- JSON export/import
- Print-friendly view

### 8. Credits And Payments

Add usage limits and paid credit purchase.

Planned work:

- Free starting credits
- Credit deduction on note generation
- Pricing page
- Stripe checkout
- Stripe webhook
- Payment success/failure pages

### 9. Quality And Deployment

Prepare the project for interviews and public deployment.

Planned work:

- Tests
- Error handling
- Loading states
- Empty states
- Accessibility
- Responsive polish
- README
- Deployment guide
- Architecture documentation

## Build Philosophy

- Build in small meaningful commits.
- Keep backend secrets out of the frontend.
- Prefer secure defaults.
- Make features explainable in interviews.
- Keep the app usable even if AI temporarily fails.
- Treat payments and authentication carefully.
