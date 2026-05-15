# Vector Shotlist System SOP

Version: 1.0

Vector is the Material 7 client operations panel. Studio is the publishing surface.

## Purpose

Create two connected documents from one source of structured campaign data:

- Blue internal shotlist: Material 7 production control document.
- Green client guide: client/talent-facing recording guide derived from the blue data.

## Operating Rule

Generate the blue internal shotlist first. The green guide is a simplified breakoff from the same data.

If the green guide is requested without internal shotlist data, ask for the internal shotlist data first.

## Required Input

- Client/company name
- Shoot date
- Location
- Start time
- Campaign, product, or service context

Useful optional input:

- Confirmed claims
- Do-not-say list
- Preferred CTA
- Product/model list
- Brand tone or personality
- Known shots

## Claim Safety

Do not invent:

- Free
- Cheapest
- Best in market
- Guaranteed outcomes
- Discounts
- Promotions
- Technical specs
- Stock availability

If uncertain, use:

```txt
Consulte por modelos específicos y disponibilidad actual.
```

## Production Logic

Shoot by block, not final ad order:

- Block 1: all intros
- Block 2: all benefits
- Block 3: all CTAs
- Block 4: b-roll

This reduces lighting resets, movement, confusion, and editing friction.

## File Naming

Use lowercase, hyphens, no accents, and MM-DD-YYYY dates.

```txt
client-project-shotlist-mm-dd-yyyy.html
client-project-client-guide-mm-dd-yyyy.html
```

## Publishing

Save generated files inside:

```txt
/shotlists/
```

The public URL becomes:

```txt
https://studio.material7.com/shotlists/file-name.html
```

## Template Standard

Use:

```txt
/shotlist-system/templates/blue.html
/shotlist-system/templates/green.html
/shotlist-system/styles/material7-shotlist.css
```

Do not recreate the layout from memory. Preserve:

- six-page document structure
- fixed 1080px x 1920px print layout
- mobile responsive screen layout
- toolbar print button
- top gradient bars
- page footer pagination
- pills, cards, take cards, tips, and warning cards

## Green Guide Standard

The green guide should:

- reduce reading load
- preserve exact lines to say
- remove internal strategy
- include one Pro tip per main section
- use respectful, simple Spanish for external people

## Blue Shotlist Standard

The blue shotlist should:

- help Stefano run the shoot
- include production-relevant b-roll
- include safe internal notes
- avoid empty take instructions
- avoid fake claims and fake quote attributions
