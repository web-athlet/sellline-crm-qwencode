# sellline CRM — CLAUDE.md
> Kontext-Dokument für Claude Code. Bei Session-Start IMMER zuerst lesen.

## Projekt-Übersicht
AI-natives CRM. Monorepo (Turborepo): apps/web (Next.js 14) + apps/api (NestJS 10). Ziel: 18 Dev-Sessions, 10 Module + 3 KI-Agenten.

## Tech-Stack
- Frontend: Next.js 14 App Router, React 18, TS, Tailwind, shadcn/ui, Zustand, React Query
- Backend: NestJS 10, TS, Prisma 5, PostgreSQL 15 (+ pgvector), Redis 7, BullMQ 5, Socket.io 4
- AI: OpenAI GPT-4o + Serper.dev (Web-Search)
- Auth: NextAuth.js + JWT (Access 15 min / Refresh 30 d)
- File Storage: MinIO

## Abgeschlossene Sessions
- [x] Session 0: Scaffolding, Monorepo, WebSocket-Gateway, Docker, Husky, CLAUDE.md
- [ ] Session 1: DB-Schema & Prisma
- [ ] Session 2: Authentication
- [ ] Session 3: Navigation & Layout
- [ ] Session 4: Kontakte (M8)
- [ ] Session 5: Deals & Kanban (M3)
- [ ] Session 6: Pulse-Feed (M1)
- [ ] Session 7: Aktivitäten (M7)
- [ ] Session 8: Leads (M2)
- [ ] Session 9: Produkte (M10)
- [ ] Session 10: Projekte (M4)
- [ ] Session 11: E-Mail-Inbox (M6)
- [ ] Session 12: Campaigns (M5)
- [ ] Session 13: Insights (M9)
- [ ] Session 14: KI-Agenten
- [ ] Session 15: Security & DSGVO
- [ ] Session 16a: Testing & Performance
- [ ] Session 16b: PWA & CI/CD

## Wichtige Konventionen (Stand: Session 0)
- Alle API-Routen: `/api/v1/...`
- Soft-Delete: `deletedAt` auf allen Haupt-Entitäten
- Error-Format: `{ success: false, error: "MESSAGE", code: "ERROR_CODE" }`
- Success-Format: `{ success: true, data: {...}, meta?: {...} }`
- WebSocket-Events: kommen in Session 6+ (geplant: `activity:created`, `activity:completed`, `deal:updated`, `deal:rot_indicator`, `lead:enriched`)
- DSGVO: E-Mail-Bodies IMMER verschlüsselt speichern (AES-256-GCM)
- BullMQ-Queues: `lead-enrichment`, `deal-scoring`, `ghosting-detection`
- Commit-Format: `type(session-X): description` (feat/fix/chore/docs/test)
- Branch-Format: `feature/session-X-name`

## Verzeichnis-Map
- `apps/web/app/(dashboard)/` → alle CRM-Seiten
- `apps/web/components/{ui,layout,shared}/` → UI-Komponenten
- `apps/web/lib/{api.ts,store,hooks}/` → Client-Logic
- `apps/api/src/modules/` → NestJS-Module (ein Ordner pro Domäne)
- `apps/api/src/workers/` → BullMQ-Worker
- `apps/api/src/websocket/` → Socket.io-Gateway
- `apps/api/src/shared/` → Guards, Decorators, Filters, Interceptors
- `apps/api/prisma/` → Schema + Migrations + Seed
- `docs/sessions/` → Session-Summaries (eine .md pro Session)

## Known Issues / TODOs
- (noch keine — Session 0 abgeschlossen)

## Test-Konten (Seed ab Session 1)
- admin@demo.de / Demo1234!
- manager@demo.de / Demo1234!
- sales@demo.de / Demo1234!