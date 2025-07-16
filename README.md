# My Monorepo App

This is a monorepo containing a Next.js frontend, a Next.js backend API, a shared React components library, and a local DynamoDB setup.

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
