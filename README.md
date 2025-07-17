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

3.  **Create database environment variables:**
    Create a file named `.env` in the `database/` directory:
    ```
    # database/.env
    AWS_ACCESS_KEY_ID=accessKeyId
    AWS_SECRET_ACCESS_KEY=accessKey
    AWS_REGION=region
    DYNAMODB_ENDPOINT=http://localhost:8000
    ```

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
