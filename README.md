# 💠 SOVEREIGN X: The Autonomous AI Workforce & Revenue OS for Enterprises

**Welcome to the future of enterprise operations.** SOVEREIGN X is a full-stack, production-ready SaaS platform designed to revolutionize how businesses operate by deploying an autonomous AI workforce. This system aims to replace 60-80% of operational staff across sales, marketing, customer support, logistics, analytics, finance forecasting, and growth optimization, driving unprecedented efficiency and revenue growth.

## 🚀 Vision

SOVEREIGN X is built to scale to $100M/month in revenue through enterprise SaaS subscriptions ($50K–$500K/month per client), innovative revenue-share models, and usage-based AI compute billing. It's not just a tool; it's a mission-critical operating system for the next generation of businesses.

## ✨ Core Product Concept

SOVEREIGN X empowers enterprises with dedicated AI teams:
*   **AI Sales Team:** Automates lead generation, qualification, nurturing, and closing.
*   **AI Marketing Team:** Develops campaigns, creates content, manages ads, and optimizes outreach.
*   **AI Support Team:** Provides instant, intelligent customer service and issue resolution.
*   **AI CFO:** Manages expenses, optimizes profit, forecasts cash flow, and models investments.
*   **AI Data Analyst:** Extracts insights, identifies trends, and provides strategic recommendations.
*   **AI Growth Hacker:** Identifies growth levers, runs autonomous A/B tests, and optimizes funnels.

Each AI agent is:
*   **Autonomous:** Operates independently based on defined goals.
*   **Memory-enabled:** Learns and adapts over time, retaining context.
*   **Goal-driven:** Aligns actions with enterprise objectives and KPIs.
*   **Revenue-optimized:** Focused on maximizing financial outcomes.

## 🧠 Tech Stack (Mandatory)

### Frontend
*   **Next.js 15 (App Router):** Modern React framework for server-side rendering and client-side interactivity.
*   **React Server Components:** For optimal performance and data fetching.
*   **TailwindCSS + Framer Motion:** For a highly customized, ultra-modern, and fluid UI with advanced animations.
*   **ShadCN UI (Styled Primitives):** Utilizing Radix UI primitives styled with Tailwind for a consistent, high-quality component library without ShadCN wrappers.
*   **CSS 3D / SVG Animations:** For stunning visual effects in the hero section, replacing traditional Three.js libraries to ensure build stability.
*   **Fully Responsive:** Optimized for all devices and screen sizes.
*   **Dark Luxury Enterprise Theme:** Black, deep blue gradients, and gold accents for a premium feel.

### Backend
*   **Next.js API Routes (Serverless Functions):** For robust, scalable API endpoints.
*   **PostgreSQL (Conceptual / ORM Integration):** Relational database for structured data.
*   **Redis (Conceptual / Caching & AI Memory):** High-performance data store for caching and AI agent short-term memory.
*   **Stripe (Conceptual Integration):** For enterprise subscriptions, metered billing, and invoicing.
*   **WebSockets (Conceptual):** Real-time communication for AI agent logs and dashboard updates.
*   **OpenAI API (Conceptual Integration):** Powers the multi-agent AI system.
*   **Background Job Queue (Conceptual):** For asynchronous AI tasks and long-running operations.

### Infrastructure
*   **Dockerized (Conceptual):** Containerized deployment for consistency and portability.
*   **Deployed on Vercel (Frontend) + Railway (Backend - Conceptual):** Modern cloud platforms for scalability and ease of deployment.
*   **Scalable Architecture:** Designed for high concurrency and enterprise-level loads.
*   **Role-based Authentication:** Secure access control.
*   **Multi-tenant SaaS Structure:** Isolates data and configurations for each enterprise client.

## 🧩 Core Pages & Functionality

1.  **Landing Page (`/`):**
    *   Hero with animated AI network globe (CSS 3D / SVG).
    *   Headline: "Your Company. Fully Autonomous."
    *   Explainer video, enterprise logos, revenue calculator, testimonials, pricing tiers.
    *   CTA: "Deploy Your AI Workforce"

2.  **Authentication System (`/login`, `/register`, `/forgot-password`):**
    *   Secure login, registration, and password recovery.
    *   Role-based dashboard access.
    *   OAuth (Google + Apple - Conceptual).

3.  **Main Dashboard (`/dashboard`):**
    *   Sidebar navigation (Overview, AI Agents, Revenue, Automation Flows, Data Intelligence, Billing, Settings).
    *   Real-time revenue counter, AI performance metrics, task automation logs, growth predictions, risk alerts.

4.  **AI Agents Page (`/dashboard/agents`):**
    *   Deploy new agents, choose roles, set goals, define KPIs, manage permissions.
    *   View real-time reasoning logs.
    *   Each agent includes a prompt system, memory layer, action system, and revenue tracking.

5.  **Automation Builder (`/dashboard/automations`):**
    *   Visual drag-and-drop workflow builder.
    *   Define triggers (e.g., new lead), AI actions, CRM updates, email sends, follow-up logic, analytics tracking.

6.  **Revenue Intelligence Page (`/dashboard/revenue`):**
    *   Charts: MRR, Churn Prediction, Customer LTV, Upsell Probability, Market Forecast.
    *   AI-driven revenue insights, strategic suggestions, cost reduction analysis.

7.  **AI CFO Page (`/dashboard/cfo`):**
    *   Expense tracking, profit optimization, cash flow forecasting, scenario simulations, investment modeling.

8.  **Enterprise Admin Panel (`/admin`):**
    *   **Functional Login Modal:** PIN input and validation.
    *   View all companies, revenue tracking, usage-based billing control, AI token consumption.
    *   Account suspension, feature flags.
    *   **Booking Management:** CRUD operations for client deployments/bookings (as per prompt carry-over), including DELETE functionality to `https://ammoue-ai.vercel.app/api/booking`.

## 💰 Monetization Model

*   **Tier 1:** $4,999/month
*   **Tier 2:** $19,999/month
*   **Tier 3:** $49,999/month
*   **Enterprise:** Custom (Revenue Share 5–10%)
*   **Usage Billing:** Dynamic billing for AI tokens, automation executions, and API calls.
*   **Stripe Integration (Conceptual):** Handles subscriptions, usage-based billing, and enterprise invoicing.

## 🧠 AI System Architecture

*   **Multi-Agent System:** Each agent has a unique system prompt, memory (stored in DB/Redis), tool-calling capabilities, workflow execution, and analytics access.
*   **Tool Calling:** Agents can interact with external APIs and internal systems.
*   **Vector Database (Conceptual):** For long-term memory and context retrieval.
*   **Autonomous Task Loops:** Agents operate in continuous loops, perceiving, reasoning, planning, and acting.
*   **Goal Completion Scoring:** Quantifiable metrics for agent performance.

## 📊 Analytics Engine

*   Event tracking system.
*   Behavioral tracking for user and AI agent interactions.
*   Real-time dashboard updates.
*   Predictive revenue modeling.

## 🔐 Security

*   JWT authentication (conceptual).
*   Role-based permissions (RBAC).
*   Multi-tenant data isolation.
*   Rate limiting on API endpoints.
*   Encrypted secrets for sensitive data.
*   Robust API validation.
*   Comprehensive audit logs.

## 🧬 Advanced Features

*   AI self-improving loops.
*   Agent performance leaderboard.
*   Revenue gamification.
*   AI A/B testing engine.
*   Autonomous email outreach & paid ads generators.
*   CRM auto-sync.
*   Live AI reasoning panel for transparency.

## 🧾 Database Structure (Conceptual PostgreSQL)

```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    company_id UUID REFERENCES Companies(id),
    role VARCHAR(50) NOT NULL, -- 'admin', 'company_admin', 'user'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    plan_id UUID REFERENCES Subscriptions(id),
    stripe_customer_id VARCHAR(255),
    api_key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    plan_name VARCHAR(100) NOT NULL, -- e.g., 'Tier 1', 'Enterprise'
    monthly_price DECIMAL(10, 2) NOT NULL,
    revenue_share_percentage DECIMAL(5, 2), -- For Enterprise plans
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'trial'
    stripe_subscription_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE AI_Agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL, -- 'Sales', 'Marketing', 'CFO', etc.
    status VARCHAR(50) NOT NULL, -- 'active', 'paused', 'deploying'
    system_prompt TEXT NOT NULL,
    goals JSONB, -- e.g., { "primary": "Increase MRR by 10%", "secondary": "Reduce churn by 5%" }
    kpis JSONB, -- e.g., { "mr_rate": 0.10, "churn_rate": 0.05 }
    permissions JSONB, -- e.g., { "can_send_emails": true, "can_update_crm": false }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Agent_Memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES AI_Agents(id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(50) NOT NULL, -- 'observation', 'thought', 'action_result'
    content TEXT NOT NULL,
    embedding VECTOR(1536) -- Placeholder for vector embeddings
);

CREATE TABLE Revenue_Logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    type VARCHAR(50) NOT NULL, -- 'subscription_payment', 'usage_billing', 'revenue_share'
    description TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Automations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    name VARCHAR(255) NOT NULL,
    workflow_definition JSONB NOT NULL, -- Stores the drag-and-drop workflow logic
    status VARCHAR(50) NOT NULL, -- 'active', 'paused', 'draft'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    agent_id UUID REFERENCES AI_Agents(id),
    event_type VARCHAR(100) NOT NULL, -- e.g., 'lead_generated', 'email_sent', 'crm_updated', 'sale_closed'
    payload JSONB, -- Detailed event data
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE API_Usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    agent_id UUID REFERENCES AI_Agents(id), -- Optional, for agent-specific usage
    api_service VARCHAR(100) NOT NULL, -- e.g., 'openai', 'crm_api', 'email_api'
    endpoint VARCHAR(255),
    tokens_consumed INT,
    cost DECIMAL(10, 4),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Billing_Records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id),
    invoice_id VARCHAR(255) UNIQUE NOT NULL,
    amount_due DECIMAL(10, 2) NOT NULL,
    amount_paid DECIMAL(10, 2),
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    due_date DATE NOT NULL,
    payment_date DATE,
    status VARCHAR(50) NOT NULL, -- 'pending', 'paid', 'overdue', 'refunded'
    details JSONB, -- Breakdown of subscription, usage, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Specific for Admin Panel's Booking Management (as per carry-over from prompt)
CREATE TABLE Bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES Companies(id), -- Link to a company or can be internal
    client_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(255) NOT NULL, -- e.g., "AI Agent Deployment", "Consultation", "Demo"
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🌍 Scalability Requirements

*   **Asynchronous Processing:** All long-running tasks, especially AI calls, will be processed asynchronously using background workers (e.g., BullMQ for Redis).
*   **Caching:** Extensive use of Redis for API responses, frequently accessed analytics data, and AI agent memory snapshots.
*   **Horizontal Scaling:** Frontend (Vercel) and Backend (Railway - conceptual) are designed for horizontal scaling, allowing easy addition of more instances to handle increased load.
*   **Database Sharding/Clustering:** PostgreSQL (conceptual) will be configured for high availability and read replicas, with a strategy for sharding as tenant count grows.

## 📈 Target Outcome

SOVEREIGN X is engineered to be a game-changer:
*   **Automating Sales Pipelines:** Streamlining lead-to-close processes.
*   **Increasing Enterprise Revenue:** Through optimized operations and AI-driven growth.
*   **Becoming Mission-Critical:** Indispensable to daily enterprise functions.
*   **Charging Enterprise-Level Pricing:** Justified by immense value delivery.
*   **Scaling to $100M/month:** The architecture is designed for hyper-growth.

## ⚙️ Development & Deployment

### Environment Variables
Create a `.env.local` file in the root of your project:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgres://user:password@host:port/database"
REDIS_URL="redis://localhost:6379"
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
JWT_SECRET=YOUR_SECURE_JWT_SECRET
ADMIN_PIN=1234
```
*Note: For production, use secure environment management for these variables.*

### Local Development
1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd sovereign-x
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment (Conceptual)
*   **Frontend (Vercel):** The Next.js application can be deployed directly to Vercel. Ensure `NEXT_PUBLIC_APP_URL` is set to your production domain.
*   **Backend (Railway / Cloud Provider):** The conceptual Node.js/Express backend (or more extensive Next.js API routes) would be deployed to a platform like Railway, AWS, GCP, or Azure. Database and Redis instances would be provisioned separately.

## License

(To be defined)

---
*SOVEREIGN X: Autonomy. Intelligence. Revenue.*
---