# Maker Store Tools Doc

## Contents

- [Maker Store Tools Doc](#maker-store-tools-doc)
  - [Contents](#contents)
  - [1. Project Overview](#1-project-overview)
    - [1.1 Overview](#11-overview)
    - [1.2 Development Approach](#12-development-approach)
      - [1.2.1 Flask](#121-flask)
      - [1.2.2 Next.js](#122-nextjs)
  - [2. Project Scope](#2-project-scope)
    - [2.1. Initial Scope](#21-initial-scope)
      - [2.1.1 User Interface Development](#211-user-interface-development)
      - [2.1.2 Authentication System](#212-authentication-system)
      - [2.1.3 Global Style and Layout Setup](#213-global-style-and-layout-setup)
    - [2.2. Sub Projects (Mini-Apps)](#22-sub-projects-mini-apps)
      - [2.2.1 CNC Technical AI Chatbot (page.tsx)](#221-cnc-technical-ai-chatbot-pagetsx)
      - [2.2.2 Box Shipping Calculator (page.tsx)](#222-box-shipping-calculator-pagetsx)
      - [2.2.3 CNC Calibration Tool (page.tsx and Sections)](#223-cnc-calibration-tool-pagetsx-and-sections)
      - [2.2.4 20-Series Extrusions (page.tsx)](#224-20-series-extrusions-pagetsx)
      - [2.2.5 40-Series Extrusions (page.tsx)](#225-40-series-extrusions-pagetsx)
      - [2.2.6 Enclosure Calculator (page.tsx)](#226-enclosure-calculator-pagetsx)
      - [2.2.7 Price Difference Tool (page.tsx)](#227-price-difference-tool-pagetsx)
  - [3. Deliverables](#3-deliverables)
    - [3.1 Usage Documentation](#31-usage-documentation)
    - [3.2 Diagrams](#32-diagrams)
  - [4. Application Architecture](#4-application-architecture)
    - [4.1. Infrastructure and Technologies](#41-infrastructure-and-technologies)
    - [4.2. Frameworks](#42-frameworks)
    - [4.3. Documentation Standards](#43-documentation-standards)
  - [5. Dev Ops](#5-dev-ops)
    - [5.1. Hosting](#51-hosting)
    - [5.2. Security, Performance, and Scalability](#52-security-performance-and-scalability)
    - [5.3. Sandbox Implementation](#53-sandbox-implementation)
    - [5.4. Version Control System](#54-version-control-system)
  - [6. Appendices](#6-appendices)
    - [6.1. Reference Materials](#61-reference-materials)
    - [6.2. Glossary](#62-glossary)

---

## 1. Project Overview

### 1.1 Overview

I designed the Maker Store Tools app to enhance the efficiency of our team at the Maker Store. It's primarily aimed at simplifying daily operations for our sales and customer service staff. Initially focused on internal use, I'm considering including features for customers in the future.

### 1.2 Development Approach

I chose Flask and Next.js for this project due to their unique benefits that align with my specific needs:

#### 1.2.1 Flask

I selected Flask for its simplicity and security, making it ideal for our app's backend. As a lightweight Python framework, it aligns well with my need to utilize Python's AI-focused packages and simplifies connecting to databases and APIs.

#### 1.2.2 Next.js

I chose Next.js partially because of being react based so it provides improved developer experience and single page app benefits, but also because it is a static site generator so static code is output which is great for SEO and load speeds.

By integrating Flask's backend capabilities with Next.js' frontend efficiency, we can create an app that's robust, user-friendly, and optimized for performance and search engine visibility.

---

## 2. Project Scope

### 2.1. Initial Scope

The initial phase is focused on setting up the primary interface elements such as the home page, navbar, and footer. It also includes preparing the framework for future integration of mini-apps.

#### 2.1.1 User Interface Development

- Developing the main entry points like the home page, navigation bar (navbar), and footer.

#### 2.1.2 Authentication System

- Implementing an authentication system using Netlify Identity.
- Integrating this system within the app to manage user access and personalization.

#### 2.1.3 Global Style and Layout Setup

- Utilizing a custom Bootstrap implementation for consistent styling across the app.
- Incorporating custom CSS for specific styling needs as required.
- Establishing a global style guideline using `globals.scss`.
- Setting up a common layout structure that can be utilized by all mini-apps.

### 2.2. Sub Projects (Mini-Apps)

Each mini-app within the project targets a specific functionality:

#### 2.2.1 CNC Technical AI Chatbot (page.tsx)

- An AI chatbot for assisting with CNC-related technical queries.

#### 2.2.2 Box Shipping Calculator (page.tsx)

- A tool for optimizing box shipping configurations.

#### 2.2.3 CNC Calibration Tool (page.tsx and Sections)

- A comprehensive tool for calibrating CNC machines, including specific sections like `FlowCompensationSection`, `StartupGcodeGeneratorSection`, and `StepsPerMmSection`.

#### 2.2.4 20-Series Extrusions (page.tsx)

- A dedicated calculator and guide for 20-series extrusions.

#### 2.2.5 40-Series Extrusions (page.tsx)

- A similar tool as above but for 40-series extrusions.

#### 2.2.6 Enclosure Calculator (page.tsx)

- A calculator for determining the dimensions and specifications of enclosures.

#### 2.2.7 Price Difference Tool (page.tsx)

- A tool to calculate and compare price differences in products or services.

---

## 3. Deliverables

### 3.1 Usage Documentation

- User manuals and integration guides

### 3.2 Diagrams

- System architecture and workflow diagrams

---

## 4. Application Architecture

### 4.1. Infrastructure and Technologies

- Description of the Flask and Next.js technology stack supporting the Product Listing Agent.

### 4.2. Frameworks

- Rationale behind chosen frameworks for the Product Listing Agent, ensuring compatibility with existing structures.

### 4.3. Documentation Standards

- Standards for code documentation, API documentation, and update logs.

---

## 5. Dev Ops

### 5.1. Hosting

- Hosted on Heroku and Netlify.

### 5.2. Security, Performance, and Scalability

- Measures to ensure data security, optimize performance, and plan for scalability.

### 5.3. Sandbox Implementation

- Use of sandbox environments for development and testing.

### 5.4. Version Control System

- Main and dev branches on Git, with strategies for branching and merging.

---

## 6. Appendices

### 6.1. Reference Materials

- Collection of resources and articles related to product listing systems and eCommerce applications.

### 6.2. Glossary

- Definitions of technical terms and jargon in web development.
