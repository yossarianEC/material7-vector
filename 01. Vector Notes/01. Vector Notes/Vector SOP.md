VECTOR SOP — CLIENT VENDING MACHINE / ODOO OPERATING SYSTEM

Last working direction:
Vector is not a collaborative workspace.
Vector is a client vending machine.

Client presses the right button.
System creates structured work.
Operator processes it.
Client sees simple status.
Billing controls access.
Approvals become state transitions.
Dead tasks leave the battlefield.

============================================================
1. CORE DOCTRINE
============================================================

Vector exists because normal client collaboration does not work reliably.

Notion became a task graveyard because it depends on clients behaving like trained collaborators. Most clients do not do that. They do not update tasks, read boards, understand databases, or follow project systems.

So Vector removes collaboration theater.

Client does not manage work.
Client requests work.

Operator does not chase chaos.
Operator processes structured inputs.

System does not beg.
System enforces states.

The client-facing experience should be extremely simple:

- Request something
- Upload something
- Approve something
- Choose A/B/C
- Pay something
- Download something
- Read a report

No open workspace.
No messy boards.
No infinite comment threads.
No “please provide feedback” unless it is converted into choices.

The killer mechanic:

Client approval is not conversation.
Client approval is a state transition.

============================================================
2. STACK STRATEGY
============================================================

Use each tool for what it is naturally good at.

Odoo:
- Business source of truth
- Clients
- Contacts
- Services
- Products
- Invoices
- Payments
- Account status
- Service status
- Request/task pipeline
- Approvals
- Billing locks
- Store/add-ons
- Internal operations

Vercel:
- Premium frontend
- Vector Nano tools
- Interactive experiences
- AI intake forms
- Beautiful dashboards
- Public tools
- Productized apps
- “Theme park” layer

Supabase:
- Fast app/session data
- Game leaderboards
- Nano tool results
- Logs
- Analytics events
- Temporary app state
- Experimental/crazy app data

Brevo / HighLevel:
- Outbound emails
- WhatsApp sequences
- Reminders
- Lead nurturing
- Campaign communication

Notion:
- Demoted
- Archive/reference only
- Optional internal documentation
- No longer client workflow source of truth

Architecture rule:

Odoo owns truth.
Vercel displays and interacts.
Supabase stores weird/fast app data.
Brevo/GHL sends messages.

Do not let multiple tools own the same truth.

Bad:
Odoo says paused.
Vercel says active.
Brevo sends wrong sequence.
Notion has old tasks.

Good:
Vercel asks Odoo, “What can this user do?”
Odoo answers.
Vercel displays it beautifully.

============================================================
3. PRODUCT SHAPE
============================================================

Vector has three layers:

1. Client Portal
Simple Fisher-Price interface.
Big actions.
No complexity.

2. Operator Pipeline
Internal Odoo task/request system.
Real state machine.
Only Material7 sees full complexity.

3. Admin / Control Layer
Billing, account state, service pause, closure, store, add-ons, sequences.

============================================================
4. CLIENT PORTAL STRUCTURE
============================================================

Recommended main modules:

Home
- Account status
- Active service
- Open requests
- Waiting on you
- Reports ready
- Pending invoice warning
- Quick buttons

Request Center
- Request new work
- Request revision
- Upload files
- Ask a question
- Request quote
- Report problem

Activities
- Read-only status cards
- No editing
- No full kanban
- No internal details

Approvals
- Only when client input is needed
- A/B/C choices
- One accountable approver

Reports
- PDFs
- Looms
- campaign reports
- delivered assets
- result summaries

Billing
- invoices
- payment status
- overdue warnings
- payment confirmation upload
- paused/closed account states

Store / Add-ons
- extra landing page
- extra creative
- emergency request
- CRM automation
- website maintenance
- report upgrade
- campaign setup

Resources
- guides
- templates
- onboarding docs
- help materials

============================================================
5. CLIENT HOME WIREFRAME
============================================================

Client home is a command panel, not a workspace.

Example:

[ Welcome to your panel, SP Importadora ]

Account status: ACTIVE
Service: CRM + Ads

Main action cards:

- Request new work
- Review activities
- Read reports
- Upload files
- Pay invoice
- Buy extra service

Status cards:

- Open requests: 03
- Waiting on you: 01
- Reports ready: 02
- Pending invoices: 00

If account is paused:

Replace normal home with:

SERVICE PAUSED

Your service and active advertising operations are paused because there is a pending invoice on the account.

Allowed actions:
- View invoice
- Send payment confirmation
- Contact billing/support
- View old reports

Blocked actions:
- New work
- Revisions
- Campaign changes
- New deliverables
- Meetings
- Emergency requests

============================================================
6. REQUEST CENTER
============================================================

The client should not create “tasks.”
The client creates requests.

Main prompt:

“What do you need?”

Buttons:

- New work
- Revision / adjustment
- Upload files
- Ask a question
- Request quote
- Report a problem

Simple request form:

Title:
What do you need?

Fields:
- Big description box
- Related service
- Urgency
- Upload files
- Submit request

Do not use too many fields.
If the form has 18 fields, they will fail.

Recommended urgency:

- Normal
- This week
- Urgent / extra cost may apply

============================================================
7. AI INTAKE, LATER
============================================================

AI should not be the foundation.
AI should improve intake after the basic system works.

AI flow:

Client writes messy request.

Example:
“I need a campaign for Father’s Day with three posts and maybe a promo.”

AI converts into:

Type: Campaign request
Service: Ads / CRM
Priority: This week
Summary: Father’s Day campaign with three posts and promotional angle.
Missing info:
1. What product/service is being promoted?
2. What is the offer?
3. What date should the campaign start?
4. Do you have images?

Then client confirms.

Odoo creates clean request.

============================================================
8. INTERNAL ODOO MODEL: VECTOR REQUESTS
============================================================

Main model:
x_vector_solicitud

Label:
Solicitudes Vector

Purpose:
Main work/request record.

Core fields:

x_name
- Nombre de la solicitud

x_cliente
- Cliente / contacto

x_empresa
- Empresa

x_servicio
- Servicio relacionado

x_tipo_solicitud
- Tipo de solicitud

x_descripcion
- Descripción

x_archivos
- Archivos / enlaces

x_prioridad
- Prioridad

x_stage_id
- Estado interno

x_estado_cliente
- Estado visible para cliente

x_categoria_flujo
- Categoría de flujo

x_responsable
- Responsable interno

x_fecha_solicitud
- Fecha de solicitud

x_fecha_activacion
- Fecha de activación

x_fecha_limite
- Fecha límite interna

x_fecha_ultimo_movimiento
- Fecha de último movimiento

x_requiere_cotizacion
- Requiere cotización

x_monto_estimado
- Monto estimado

x_factura_relacionada
- Factura relacionada

x_pago_requerido
- Pago requerido

x_aprobado_cliente
- Aprobado por cliente

x_entregable_url
- Link de entrega

x_notas_internas
- Notas internas

x_resumen_ai
- Resumen operativo generado

x_siguiente_accion
- Siguiente acción

x_cuenta_como_activo
- Cuenta contra límite activo

x_esperando_desde
- Esperando desde

x_fecha_limite_espera
- Fecha límite de espera

x_motivo_espera
- Motivo de espera

x_faltante_requerido
- Faltante requerido

x_dias_en_espera
- Días en espera

x_dias_sin_movimiento
- Días sin movimiento

x_debe_pasar_a_standby
- Debe pasar a standby

============================================================
9. INTERNAL PIPELINE
============================================================

Internal stages:

Nuevo
Triage
En cola
Activo
Esperando cliente
Listo para aprobación
Revisión solicitada
Entregado
Completado
Standby
Cancelado
Archivado
Pausado por pago

Alternative expanded stages:

Nuevo
Revisión interna
Esperando información
Cotización requerida
Esperando aprobación
Aprobado
En producción
Revisión interna final
Listo para cliente
Entregado
Completado
Pausado por pago
Cancelado
Cerrado

Important:
Do not expose all internal stages to the client.

Client sees simplified statuses:

Received
In review
Waiting on you
Queued
In progress
Ready to review
Delivered
Paused
Closed

============================================================
10. FLOW CATEGORIES
============================================================

Use a separate flow category field to make filtering sane.

x_categoria_flujo options:

Inbox
Queue
Active
Waiting
Standby
Archive

This is critical.

The stage can be detailed.
The flow category keeps the system readable.

Default daily view should show Active only.

============================================================
11. TASK FLOW CONTROL
============================================================

Vector is not just a task manager.
Vector is flow control.

Main rule:

No client gets infinite open loops.

Max active tasks per client:

5

Only 5 tasks per client can be in real production at the same time.

If active limit is reached, new approved tasks go to Queue.

Active is protected.

Things that can count as active:

- Activo
- En producción
- Revisión interna final
- Listo para aprobación
- Revisión solicitada

Things that should not count as active forever:

- Esperando cliente
- Standby
- Completado
- Cancelado
- Archivado
- Pausado por pago

============================================================
12. WAITING ON CLIENT / STANDBY RULE
============================================================

If a task needs files, info, or a decision:

Move to:
Esperando cliente

Set:
x_esperando_desde = today
x_fecha_limite_espera = today + 14 days

If client responds:
Move task back to Queue or Active depending on active limit.

If 14 days pass with no response:
Move task to Standby.

Standby means:

- We are not actively tracking this.
- It does not occupy production attention.
- It does not count as active work.
- It can be reactivated when the client provides missing input.
- Reactivated tasks return to Queue, not automatically Active.

Client-facing copy:

“This request is on standby because we are waiting for required information, files, or approval.

Once you provide the missing items, the request can be reactivated and placed back into the work queue.”

============================================================
13. TASK GRAVEYARD
============================================================

Internal nickname:
Task Graveyard

Official name:
Archivo operativo

Contains:

- Completed
- Cancelled
- Closed
- Expired standby
- Rejected
- Duplicate
- Out of scope

Purpose:
Keep dead work out of daily view.

Default system view should never be “all tasks.”

Views needed:

1. Active Work
Only current live work.

2. Waiting on Client
Grouped by waiting age:
- 0–3 days
- 4–7 days
- 8–13 days
- 14+ days → Standby

3. Queue
Approved but not active yet.

4. Standby
Blocked long enough to remove from daily attention.

5. Archive / Graveyard
Completed/dead work.

============================================================
14. APPROVALS WITH CHOICES
============================================================

Approvals are not feedback.
Approvals are instructions.

Each approval gate should have:

- Clear question
- Limited options
- One accountable approver
- Timestamp
- Result
- Next state

Main idea:

Work starts.
Internal task moves through pipeline.
Milestone reached.
Client input required.
Client chooses A/B/C.
System records approval.
Task advances automatically.

Do not ask:
“What do you think?”

Ask:
“Choose one: A, B, or C.”

Examples:

“Where should we place the photos?”

A) Outside the column
B) Inside the column
C) Material7 decides

“Which campaign direction should we continue?”

A) Cleaner and more premium
B) Louder and more promotional
C) More trustworthy and corporate

“Which offer should we use?”

A) Current offer
B) New offer
C) Help me define the offer

============================================================
15. ODOO MODEL: VECTOR APPROVALS
============================================================

Child model:
x_vector_approval

Purpose:
Decision/approval gates attached to a Vector request.

Fields:

x_solicitud_id
- Solicitud relacionada

x_pregunta
- Pregunta

x_opcion_a
- Opción A

x_opcion_b
- Opción B

x_opcion_c
- Opción C

x_respuesta_seleccionada
- Respuesta seleccionada

x_contacto_aprobador
- Contacto aprobador

x_fecha_aprobacion
- Fecha de aprobación

x_estado
- Pendiente / Aprobado / Expirado / Cancelado

x_notas_cliente
- Notas del cliente

x_avanzar_a_etapa
- Avanzar a etapa

x_requiere_decision_cliente
- Requiere decisión cliente

x_pregunta_cliente
- Pregunta visible cliente

Internal button:
Request client decision

When clicked:
- Create approval gate
- Set request to Waiting on client / Waiting decision
- Notify/show client prompt

When client chooses:
- Record choice
- Mark approval approved
- Move task to next state
- Log approver and timestamp

============================================================
16. ONE APPROVER RULE
============================================================

Only one person approves.

Do not allow group voting in V1.

Client account should define:

Primary approver
Backup approver
Can request work
Can approve work
Can approve purchases

This prevents group chat chaos.

If multiple people can comment, fine.
Only one person’s approval counts.

============================================================
17. BUGSMASH / FEEDBACK
============================================================

Feedback and bug reports are separate from approvals.

Use Bugsmash or separate feedback mechanism for messy feedback.

Vector approvals should stay clean:

A/B/C
Approve/reject
Continue/pause
Use this/use another

Bugsmash handles:
- bug reports
- visual comments
- small corrections
- messy feedback

Vector handles:
- state transitions
- decisions
- approvals
- account flow

============================================================
18. BILLING ENFORCEMENT
============================================================

Payment sequence:

Day 1:
Invoice sent.

Day 4:
Email reminder.

Day 7:
Manual WhatsApp bill push.
Later can be automated.

Day 15:
Everything stops until payment.
Service paused.
Ads paused.

Day 30:
Account closed.
Services stopped.
Account removed from active systems.
Materials/data deleted or archived according to policy.

Email templates already created/planned:

Day 4:
Recordatorio Facturación - 4 días

Day 15:
Servicio y anuncios pausados - 15 días

Day 30:
Cierre de cuenta - 30 días

Billing doctrine:

You pay, you play.
No payment, machine turns off.

Important:
Use calm administrative language.
Do not sound angry.
The system is scarier when it is procedural.

============================================================
19. CLIENT PAUSED STATE
============================================================

If account is unpaid/paused:

Client portal should show:

“Service paused”

Message:

“Your service and active advertising operations are paused because there is a pending invoice on the account.

To reactivate the service, please complete the pending payment.”

Allowed:
- View invoice
- Send payment confirmation
- Contact billing/support
- View old reports

Blocked:
- New work
- Revisions
- Campaign changes
- New deliverables
- Meetings
- Emergency requests

Internal state:
Pausado por pago

Ads state:
Paused

Service state:
Paused

============================================================
20. STORE / ADD-ONS
============================================================

Odoo is useful here because it can handle products, quotes, orders, invoices, payments.

First version can be quote-based, not full checkout.

Add-ons:

- Extra landing page
- Extra ad creative
- CRM automation
- Emergency request
- Monthly report upgrade
- Website maintenance
- Campaign setup
- Extra revision round
- Video edit
- Funnel audit

Client-facing store:

Add-on card:
- Name
- Short description
- From price or “Request quote”
- Button

Button creates:
- quote request
- Vector request
- optional quotation/invoice

Future:
Use Odoo eCommerce or Vercel storefront linking into Odoo checkout.

============================================================
21. ODOO VS VERCEL IMPLEMENTATION
============================================================

For Material7 agency clients:
Use Odoo Website + existing Cenit UI methods.

Reason:
- small client count
- max around 4 serious clients
- existing Odoo UI/UX battle already won
- billing and state enforcement matter more than insane frontend

For Vector Nano / productized vertical apps:
Use Vercel frontend + Odoo backend mule.

Reason:
- frontend can feel like theme park
- Odoo handles operations
- Supabase handles weird app data

Mental model:

Odoo = engine room
Vercel = Disneyland
Supabase = energy cell for weird app data
Brevo/GHL = messenger

============================================================
22. POSSIBLE PRODUCTIZED USE CASES
============================================================

Restaurant software example:

Vercel frontend:
- Today’s orders
- Menu changes
- Reservations
- Promotions
- Inventory alerts
- Staff tasks
- Sales report
- Customer messages
- Loyalty campaign

Odoo backend:
- customers
- products/menu items
- sales orders
- invoices
- payments
- inventory
- subscriptions
- account status

Supabase:
- live table status
- leaderboard/game mechanics
- fast UI state
- logs/events
- campaign interactions

Pattern:

User clicks beautiful thing in Vercel.
Vercel sends request to Odoo.
Odoo creates/updates business record.
Odoo runs workflow/state/billing.
Vercel displays clean output.

============================================================
23. BUILD ORDER
============================================================

Do not start with AI.
Do not start with beautiful Vercel shell.
Do not build 30 features.

Build the state machine first.

Recommended V1:

1. x_vector_solicitud model
2. Flow category field
3. Internal pipeline stages
4. Active task limit
5. Waiting-on-client timer
6. Standby state
7. Default active-only view
8. Archive/graveyard view
9. Client request form
10. Client activities read-only page
11. Basic approval gate model
12. Billing pause lock

Recommended V2:

13. Store/add-ons
14. Better client portal home
15. Report archive
16. Approval choices UI
17. Email/WhatsApp automation hooks

Recommended V3:

18. AI request intake
19. Vercel interactive layer
20. Supabase logs/session/event layer
21. Vector Nano integration
22. Productized vertical apps

============================================================
24. FIRST BUILD TARGET
============================================================

Build:
Vector Work Queue in Odoo.

Not:
Full client portal.
Not:
AI system.
Not:
Vercel dashboard.

First deliverable:

An internal Odoo request/task system that prevents cemetery behavior.

Must include:

- max 5 active tasks per client
- queue for overflow
- waiting-on-client timer
- auto-standby after 14 days
- archive/graveyard
- approval gates with A/B/C decisions
- client-visible simplified status
- billing pause state

Success condition:

When opening the system daily, Stefano sees only live work unless he chooses otherwise.

No completed task clutter.
No abandoned task clutter.
No client-blocked tasks pretending to be active.
No infinite open loops.

============================================================
25. INTERNAL VIEWS TO CREATE
============================================================

View 1:
Active Work

Filter:
x_categoria_flujo = Active

Purpose:
Daily battlefield.

View 2:
Waiting on Client

Filter:
x_categoria_flujo = Waiting

Group by:
days waiting / deadline bucket

Purpose:
See blockers.

View 3:
Queue

Filter:
x_categoria_flujo = Queue

Purpose:
Next work after active slots open.

View 4:
Standby

Filter:
x_categoria_flujo = Standby

Purpose:
Client failed to provide info/files/decision in time.

View 5:
Archive / Graveyard

Filter:
x_categoria_flujo = Archive

Purpose:
Completed/dead work.

View 6:
Paused by Payment

Filter:
stage = Pausado por pago

Purpose:
See financial blockers.

============================================================
26. AUTOMATIONS TO BUILD
============================================================

Automation 1:
Set waiting clock

Trigger:
When stage becomes Esperando cliente

Actions:
x_esperando_desde = today
x_fecha_limite_espera = today + 14 days
x_categoria_flujo = Waiting

Automation 2:
Auto-standby

Trigger:
Daily scheduled action

Condition:
stage = Esperando cliente
and today > x_fecha_limite_espera

Actions:
stage = Standby
x_categoria_flujo = Standby

Automation 3:
Active limit guardrail

Trigger:
When moving task to Active

Condition:
client already has 5 active tasks

Actions:
move to Queue instead
x_categoria_flujo = Queue

Note:
If Odoo Online automation cannot block/save cleanly, use softer version:
scheduled correction or warning field.

Automation 4:
Reactivate standby

Trigger:
Client uploads missing files/info or operator clicks Reactivate

Actions:
stage = En cola
x_categoria_flujo = Queue
clear waiting fields

Important:
Do not move directly to Active.

Automation 5:
Archive completed

Trigger:
Completed for 7 or 14 days

Actions:
stage = Archivado
x_categoria_flujo = Archive

Automation 6:
Payment pause

Trigger:
Account/service status becomes unpaid/paused

Actions:
active requests move to Pausado por pago or are locked
client request creation blocked
ads status paused

============================================================
27. UI / UX RULES
============================================================

Use Cenit UI kit patterns, modified for Vector.

Do not reinvent UI now.

Use:
- app launcher
- cards
- badges
- status pills
- selected states
- top navigation
- mobile patterns
- dark/light logic if needed

Client pages should be brutally simple.

Every screen should answer:

What is happening?
What do I need to do?
Which button do I press?

Avoid:
- open-ended feedback
- task boards for clients
- complex tables
- too many fields
- “workspace” language

Prefer:
- choices
- buttons
- status cards
- short copy
- one action per state

============================================================
28. LANGUAGE DOCTRINE
============================================================

Client language:
formal usted in Spanish when client-facing.

Internal language:
can be direct.

Client-facing status copy should be calm and procedural.

Examples:

“Necesitamos una decisión para continuar.”

“Seleccione una opción para avanzar.”

“Esta solicitud está en espera porque necesitamos información adicional.”

“Esta solicitud pasó a standby porque no recibimos los archivos requeridos dentro del plazo.”

“Su servicio está pausado por factura pendiente.”

“Para reactivar el servicio, regularice el pago pendiente.”

No drama.
No begging.
No emotional labor.

============================================================
29. CORE INSIGHT
============================================================

Notion says:
“Here is the whole workspace.”

Vector says:
“Press A or B.”

That is the product.

The system should make client limitations irrelevant.

They do not need to understand project management.
They do not need to understand Notion.
They do not need to understand the full pipeline.
They do not need to know how hard the work is.

They need to:
- pay
- request
- approve
- choose
- upload
- read

Everything else is operator work.

============================================================
30. NEXT PICKUP STEP
============================================================

When resuming this project, start here:

Build Odoo model:
x_vector_solicitud

Then build:
x_vector_approval

Then configure:
stages
flow categories
views
active limit logic
waiting timer
standby logic
archive logic

Only after the internal machine works, build the client portal pages.

First client portal pages:

1. /vector
Home

2. /vector/solicitar
Request Center

3. /vector/actividades
Activities read-only

4. /vector/aprobaciones
Approval gates

5. /vector/facturacion
Billing and paused state

============================================================
31. CERTAINTY / CURRENT VERDICT
============================================================

Certainty: high.

This is a strong system direction because it came from observed pain:

- clients do not use Notion
- open tasks become a cemetery
- feedback is too vague
- approvals need choices
- billing needs enforcement
- Odoo is useful as state machine
- Vercel is useful as interactive layer
- Supabase is useful for weird app data
- Brevo/GHL are useful for outbound communication

Main risk:
Overbuilding before the state machine works.

Main discipline:
Odoo owns truth.

Main first build:
Vector Work Queue in Odoo.

Final doctrine:
Build the guardrails first.
Make it beautiful later.