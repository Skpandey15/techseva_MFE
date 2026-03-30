# 🚀 TechSeva Micro-Frontend Platform

![Monorepo](https://img.shields.io/badge/Architecture-Monorepo-blue)
![Micro-Frontend](https://img.shields.io/badge/Architecture-Micro--Frontend-orange)
![pnpm](https://img.shields.io/badge/PackageManager-pnpm-yellow)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Module Federation](https://img.shields.io/badge/MFE-Module%20Federation-purple)
![Kubernetes](https://img.shields.io/badge/Deployment-Kubernetes-326CE5)

---

## 🧠 What is This?

**TechSeva** is a **production-style Micro-Frontend platform** built using a **monorepo architecture**, designed to simulate real-world frontend scaling challenges.

It demonstrates:

* Independent feature ownership via MFEs
* Shared platform layers (UI, state, types)
* Scalable frontend architecture
* Kubernetes-ready deployment mindset

---

## 🏗️ Architecture Diagram

### 🔷 High-Level Architecture

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AIzQQIOi81F3sDy51005PuQ.jpeg)

![Image](https://miro.medium.com/1%2Arvr08wFAWOk-9ZoiyPlBrQ.png)

![Image](https://res.cloudinary.com/rangle/image/upload/w_auto%2Cq_auto%2Cdpr_auto/v1659111835/rangle.io/blogs/module-federation-federated-application-architectures/42.svg)

![Image](https://res.cloudinary.com/rangle/image/upload/w_auto%2Cq_auto%2Cdpr_auto/v1659111833/rangle.io/blogs/module-federation-federated-application-architectures/36.svg)

---

### 🔧 Logical Flow (Simplified)

```id="zj2b8v"
                ┌────────────────────┐
                │       Shell        │
                │  (Host Container)  │
                └────────┬───────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
 ┌────────────┐  ┌──────────────┐  ┌──────────────┐
 │ mfe-auth   │  │ mfe-admin     │  │ mfe-jobseeker│
 │ (Remote)   │  │ (Remote)      │  │ (Remote)     │
 └─────┬──────┘  └──────┬───────┘  └──────┬───────┘
       │                │                │
       └────────────┬───┴────────────┬───┘
                    │                │
         ┌──────────────┐   ┌──────────────┐
         │ shared-types │   │ shared-ui    │
         └──────────────┘   └──────────────┘
                    │
             ┌──────────────┐
             │ shared-store │
             └──────────────┘
```

---

## 📁 Project Structure

```id="ykc3c1"
.
├── apps/
│   ├── shell                    # Host container (entry point)
│   ├── mfe-auth                # Authentication domain
│   ├── mfe-dashboard-admin     # Admin domain
│   ├── mfe-dashboard-jobseeker # Jobseeker domain
│
├── packages/
│   ├── shared-ui               # Design system (components, tokens)
│   ├── shared-types            # Contracts & TypeScript models
│   ├── shared-store            # Global state (auth/session)
│
├── pnpm-workspace.yaml
├── package.json
└── k3d-cluster.yaml
```

---

## ⚙️ Tech Stack

| Layer            | Technology                |
| ---------------- | ------------------------- |
| Monorepo         | pnpm                      |
| MFE Architecture | Module Federation         |
| Frontend         | React                     |
| Bundler          | Webpack / Vite            |
| State            | Shared store              |
| Deployment       | Docker + k3d (Kubernetes) |

---

## 📦 Platform Packages

### 🧩 shared-types

* Central contract layer
* API schemas & domain models
* Prevents runtime breakage between MFEs

---

### 🎨 shared-ui

* Reusable UI components
* Design consistency across MFEs
* Foundation for a scalable design system

---

### 🧠 shared-store

* Global app state (auth/session)
* Lightweight and controlled
* Avoids duplication across MFEs

---

## 🚀 Getting Started

### Install dependencies

```bash id="p1a8cj"
pnpm install
```

---

### Run Shell

```bash id="6ptq6o"
pnpm dev:shell
```

---

### Run MFEs

```bash id="9f2f2q"
pnpm dev:auth
pnpm dev:admin
pnpm dev:jobseeker
```

---

### Run All Remotes

```bash id="4g5d1f"
pnpm dev:remotes
```

---

### Build Everything

```bash id="x1d8h3"
pnpm build:all
```

---

## ☸️ Kubernetes (Local)

```bash id="n3sk9m"
k3d cluster create --config k3d-cluster.yaml
```

---

## 🧠 Key Engineering Decisions

### ✅ Micro-Frontend Isolation

Each domain is independently deployable and scalable.

---

### ✅ Shared Contract Layer

`shared-types` enforces type-safe communication across MFEs.

---

### ✅ Design System Approach

`shared-ui` ensures consistent UX across distributed apps.

---

### ✅ Monorepo Efficiency

pnpm workspace enables:

* faster installs
* shared dependency graph
* simplified CI/CD

---

## ⚠️ Engineering Challenges Solved

* Avoiding dependency duplication (singleton strategy)
* Managing cross-MFE communication safely
* Structuring scalable frontend domains
* Preparing for distributed deployments

---

## 🧪 Testing Strategy (Recommended)

* Unit tests per MFE
* Contract tests via shared-types
* E2E tests via shell

---

## 📈 Roadmap / Improvements

* [ ] Add `packages/api` (central API layer)
* [ ] Introduce observability (logging, tracing)
* [ ] Storybook for shared-ui
* [ ] CI/CD per MFE
* [ ] Runtime config management

---

## 💼 Why This Project Matters (Portfolio Impact)

This project demonstrates:

* 🧠 Advanced frontend architecture (Micro-Frontends)
* 🏗️ Platform engineering mindset
* 🔄 Scalable monorepo design
* ☸️ Kubernetes awareness
* 🧩 Separation of concerns at scale

👉 This is **not just a frontend app** — it’s a **frontend platform system**.

---

## 🤝 Contributing

* Maintain separation between MFEs
* Avoid tight coupling via shared-store
* Keep shared packages generic
* Follow semantic versioning

---

## 📄 License

MIT

---
