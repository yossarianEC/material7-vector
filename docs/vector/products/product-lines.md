# Vector Product Lines

## Purpose

This document defines the first product-line map for Vector.

Vector is the master product ecosystem for Material7.

Product lines are the major families of products that live inside Vector.

A product line can contain many individual products, modules, templates, data models, and generated outputs.

## Core hierarchy

```text
Material7
└── Vector
    ├── Core
    ├── Product Lines
    │   ├── Vector Nano
    │   ├── Vector Client Systems
    │   ├── Vector Diagnostics
    │   ├── Vector Campaign Systems
    │   ├── Vector Publishing Systems
    │   └── Vector Operator Tools
    ├── Shared Components
    ├── Data Models
    ├── Templates
    ├── Scripts / Renderers
    └── Generated Outputs
```

## Product line: Vector Nano

Vector Nano is a product line for small, fast, campaign-friendly product experiences.

Nano products are lightweight drops, diagnostics, demos, calculators, mini-tools, or playful strategic experiences.

Vector Nano is not the parent system.

Vector Nano is one product line inside Vector.

Examples:

* seasonal mini-tools
* campaign drops
* lightweight diagnostics
* quiz-like strategy tools
* interactive lead magnets
* client-only activations

## Product line: Vector Client Systems

Vector Client Systems are client-facing or internal business systems built for specific operations.

Examples:

* client portals
* resident portals
* admin dashboards
* onboarding systems
* operations panels
* appointment or reservation flows
* support hubs

## Product line: Vector Diagnostics

Vector Diagnostics are tools that help diagnose business, marketing, funnel, design, or operational problems.

Examples:

* business diagnostics
* landing page diagnostics
* funnel diagnostics
* offer diagnostics
* ad readiness checks
* conversion audits

## Product line: Vector Campaign Systems

Vector Campaign Systems support marketing campaigns, sales campaigns, and production workflows.

Examples:

* campaign briefs
* commercial shotlists
* recording guides
* ad copy matrices
* launch checklists
* offer builders
* creative direction guides

## Product line: Vector Publishing Systems

Vector Publishing Systems transform structured data and reusable templates into polished outputs.

Examples:

* HTML generators
* PDF-ready guide generators
* landing page generators
* report generators
* client-facing document systems

## Product line: Vector Operator Tools

Vector Operator Tools are internal tools for Material7 operators.

They help build, manage, review, publish, or improve client work.

Examples:

* copy review tools
* shotlist builders
* QA checklists
* deployment checkers
* asset organizers
* content planning tools

## Product line rules

Each product line should have:

* a clear purpose
* a clear audience
* examples of products
* source folders
* output folders
* documentation
* build rules

## Product rules

Each individual product should eventually define:

* promise
* audience
* input
* output
* data model
* template or UI structure
* renderer/build path
* QA rules
* publishing path

## Rules

* Build one product line at a time.
* Keep Vector Nano as a product line, not the parent system.
* Keep commercial shotlists as a product, not the parent system.
* Define the product spec before generating output.
* Automate only after the manual product pipeline works.

## Current status

Vector product lines are being defined before implementation.

The next step after this document is to choose the first product line to spec in detail.
