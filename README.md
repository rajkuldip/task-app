# Task Management Application

This is a modern task management application built with Next.js, React, and styled-components, designed with a focus on accessibility and a robust project structure.

---

## Features

* **Task Management:** Create, read, update, and delete tasks.
* **Filtering & Sorting:** Efficiently organize tasks by applying various filters and sorting options (e.g., by status, priority, due date).
* **Theming:** Supports light and dark modes for a personalized user experience.
* **Responsive Design:** Optimized for various screen sizes, from mobile to desktop.
* **Accessibility (A11y) Focused:**
    * **Keyboard Navigation:** Enhanced keyboard accessibility, including "Skip to Content" links for efficient navigation.
    * **ARIA Attributes:** Proper use of ARIA roles and attributes for semantic clarity for assistive technologies.
    * **Semantic HTML:** Utilization of semantic HTML5 elements for improved structure and readability by screen readers.
    * **Focus Management:** Careful handling of focus, especially within modal dialogs, to ensure a smooth user experience for keyboard users.

---

## Micro Frontend Architecture Overview
This project follows modern Micro Frontend architecture principles to enable modular, scalable, and independently deployable frontend and backend applications within a monorepo structure.

### Key Architectural Features
#### Monorepo Structure:
The repository is organized using pnpm workspaces into multiple packages and apps:
```
- **/** (root)
  - `apps/`
    - `frontend/` – Next.js frontend app
    - `backend/` – Next.js backend/API server
  - `packages/`
    - `components/` – Shared React UI components
  - `database/` – Database schema and related code
  - `pnpm-workspace.yaml`
  - `package.json`
  - `README.md`
```

#### Domain-Driven Modularization:
Each app (frontend, backend) and package (components) represents a distinct domain or responsibility, allowing isolated development and maintenance.

#### Isolated Deployability:
The frontend and backend apps can be built, tested, and deployed independently, enabling faster release cycles and better scalability.

#### Shared Component Library:
Common UI elements and utilities are placed in the packages/components package, promoting code reuse and consistent design across apps.

#### Technology Agnostic Boundaries:
The architecture supports multiple frontend or backend frameworks if needed, allowing future integration of additional micro frontends or services.

### Benefits of This Architecture
**Scalability:** Easily add new apps or services without impacting existing ones.

**Independent Development:** Teams can work autonomously on different domains or apps.

**Better Maintainability:** Clear separation of concerns reduces codebase complexity.

**Flexible Deployment:** Deploy parts of the system separately for faster iteration.

---

## Getting Started

Follow these steps to set up and run the application.

### 1. Prerequisites

Make sure you have these installed:

* **Node.js** (v18.x or higher)
* **pnpm** (v8.x or higher - `npm install -g pnpm`)
* **Docker Desktop** (for DynamoDB Local)

### 2. Initial Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rajkuldip/task-app.git](https://github.com/rajkuldip/task-app.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**
    This project uses environment variables for configuration. You'll find `.env.example` files in the following directories:
    * `/backend`
    * `/database`

    For local development, **copy the `.env.example` file from each of these directories to a new file named `.env.local`** in the *same* directory. Then, populate these `.env.local` files with your actual credentials or configurations (e.g., AWS keys, database endpoints).

    For example, in `/backend`, copy `backend/.env.example` to `backend/.env.local`.
    ```bash
    cp backend/.env.example backend/.env.local
    cp database/.env.example database/.env
    ```

    Make sure to fill in the necessary values in your `.env and .env.local` files.
    

### 3. Running the Application

1.  **Start Local DynamoDB:**
    ```bash
    cd database/local-dynamodb
    docker-compose up -d
    ```

2.  **Start All Apps (Frontend & Backend):**
    ```bash
    pnpm run task-app
    ```
    * Frontend will be at `http://localhost:3000`
    * Backend API will be at `http://localhost:3001`

---

## Useful Commands

Run these commands from the monorepo root:

* **Install/Reinstall All:** `pnpm install`
* **Build Components:** `pnpm --filter @my-monorepo/components build`
* **Start Frontend Only:** `pnpm --filter @my-monorepo/frontend dev`
* **Start Backend Only:** `pnpm --filter @my-monorepo/backend dev`

---

## Database Management

To clear local DynamoDB data and re-create tables:

1.  Stop DynamoDB: `cd database/local-dynamodb && docker-compose down`
2.  Clear data: `rm -rf docker/dynamodb/*`
3.  Restart DynamoDB: `docker-compose up -d`

---

## Testing

The project includes unit tests using **React Testing Library** and **Jest** to ensure component functionality and user interaction flows.

### Running Tests

```bash
pnpm --filter frontend test
