# Vector System

## Core identity

Vector is the master product ecosystem for Material7.

Vector is not a single tool, campaign, website, template, or mini app.

Vector is the parent architecture that organizes Material7 products, product lines, modules, reusable templates, data models, renderers, shared assets, and generated client-facing experiences.

```text
Material7
└── Vector
    ├── Core
    ├── Products
    ├── Shared Assets
    ├── Shared Templates
    ├── Data
    ├── Scripts / Renderers
    └── Generated Outputs
```

## Product doctrine

Everything built inside Vector should be treated as a product or product component.

Examples of Vector products or product lines:

* Vector Nano
* business diagnostics
* client portals
* campaign guides
* commercial shotlists
* landing page modules
* lightweight software demos
* internal production tools
* generated client-facing reports

Vector Nano is a product inside Vector. It is not the main system.

Commercial shotlists are a Vector product or internal production product. They are not the main system.

## Product vs module

**Product**

A complete user-facing or operator-facing experience with a clear purpose.

Examples:

* Vector Nano
* Commercial Shotlist System
* Business Diagnostic Tool
* Client Portal System

**Module**

A reusable technical or strategic component that supports a product.

Examples:

* questionnaire flow
* scoring engine
* HTML renderer
* report template
* landing page section
* email capture block

## Source/output rule

Final generated files are output, not source of truth.

Source of truth lives in:

```text
data/vector/
templates/vector/
assets/vector/
scripts/vector/
docs/vector/
```

Generated public/client-facing files live in:

```text
output/vector/
```

Generated output should be rebuilt from source whenever possible.

## Folder roles

```text
docs/vector/core/          → Vector doctrine, principles, system rules
docs/vector/products/      → product specs and product-line docs
data/vector/products/      → structured product data
templates/vector/products/ → reusable product templates
assets/vector/shared/      → shared Vector assets
output/vector/products/    → generated product outputs
scripts/vector/            → build scripts, renderers, utilities
```

## Build order

The correct Vector build order is:

1. Vector doctrine
2. Product architecture
3. First product spec
4. Product data model
5. Product template
6. Manual renderer/build path
7. Generated output
8. Automation only after the manual pipeline works

## Rules

* Build one product at a time.
* Build the manual pipeline before automation.
* Rebuild generated output from source whenever possible.
* Keep `Vector Nano` as a product, not the parent system.
* Keep commercial shotlists as a product, not the parent system.
