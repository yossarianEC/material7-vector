# Commercial Shotlist Intake Builder

Start from `_system/commercial-shotlists/intake/_starter-intake.json`.

Required copy blocks:

- `aperturas`
- `beneficios`
- `ctas`

Optional modifier blocks use this shape:

```json
"modifiers": [
  {
    "label": "Proof insert label",
    "usage": "When to use this optional insert.",
    "variations": [
      {
        "label": "M1A",
        "text": "Optional proof line."
      }
    ]
  }
]
```

Leave `modifiers` empty or omit it for standard short commercials. The renderer hides the modifier section unless at least one modifier group exists.
