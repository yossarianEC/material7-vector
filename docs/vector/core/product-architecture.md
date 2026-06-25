# Vector Product Architecture

## Core idea

Vector is the master product ecosystem for Material7.

Vector is the parent architecture. Everything else is a product, product line, module, shared component, or generated output inside Vector.

Vector should be treated like an operating ecosystem, not like a single app.

## Hierarchy

Use this hierarchy:

```text
Material7
└── Vector
    ├── Core
    ├── Product Lines
    ├── Shared Components
    ├── Data Models
    ├── Templates
    ├── Renderers / Scripts
    └── Generated Outputs
```

## Vector Core

Vector Core contains the rules, patterns, shared doctrine, shared language, and technical conventions that all Vector products follow.

Vector Core is not client-facing by default.

It defines:

* product principles
* design rules
* naming rules
* data/output rules
* reusable interaction patterns
* shared build patterns
* shared publishing rules

## Product lines

Vector products should be grouped into product lines.

Initial product lines:

### Vector Nano

Small, fast, campaign-friendly product experiences.

Nano products are lightweight drops, diagnostics, demos, or mini-tools.

Vector Nano is a product line inside Vector. It is not the parent system.

### Vector Client Systems

Client-facing or internal systems built for specific business operations.

Examples:

* client portals
* resident portals
* operations panels
* admin dashboards
* onboarding flows

### Vector Diagnostics

Tools that help diagnose business, marketing, funnel, design, or operational problems.

Examples:

* business diagnostics
* landing page diagnostics
* funnel diagnostics
* offer diagnostics
* campaign readiness checks

### Vector Campaign Systems

Systems that support marketing campaigns and production workflows.

Examples:

* commercial shotlists
* recording guides
* campaign briefs
* ad copy matrices
* launch checklists

### Vector Publishing Systems

Systems that turn structured data and templates into generated output.

Examples:

* HTML report generators
* PDF-ready guides
* landing page generators
* client-facing document generators

## Product vs module vs component

### Product

A complete user-facing or operator-facing experience with a clear promise.

Examples:

* Vector Nano
* Commercial Shotlist System
* Business Diagnostic Tool
* Client Portal System

### Module

A reusable part of a product.

Examples:

* questionnaire flow
* scoring engine
* report builder
* CTA block
* results screen
* email capture flow

### Component

A smaller reusable building block.

Examples:

* button
* card
* form field
* progress bar
* icon treatment
* layout shell

## Source/output rule

Source files are edited by operators and systems.

Output files are generated for users, clients, or public delivery.

Source belongs in:

```text
data/vector/
templates/vector/
assets/vector/
scripts/vector/
docs/vector/
```

Output belongs in:

```text
output/vector/
```

Generated output should be rebuilt from source whenever possible.

## Build sequence for any Vector product

Every Vector product should be built in this order:

1. Product spec
2. Data model
3. Template or UI structure
4. Manual prototype
5. Renderer or build path
6. Generated output
7. QA checklist
8. Automation

Automate only after the manual pipeline works.

## Current priority

The current priority is to define the Vector architecture clearly before building the first product.

The next document after this should define the first product line or first product spec.
