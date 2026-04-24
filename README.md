# sellline CRM

Ein AI-native CRM-System für moderne Vertriebs- und Marketingteams.

## Tech-Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: NestJS 10, TypeScript, Prisma 5
- **Datenbank**: PostgreSQL 15 mit pgvector Extension
- **Cache/Queue**: Redis 7, BullMQ 5
- **Realtime**: Socket.io 4
- **Authentifizierung**: NextAuth.js 4, JWT
- **Dateispeicher**: MinIO (S3-kompatibel)
- **KI**: OpenAI SDK, Serper.dev
- **API-Dokumentation**: Swagger/OpenAPI 3.1
- **Testing**: Jest 29, Playwright 1
- **CI/CD**: GitHub Actions
- **Monorepo**: Turborepo

## Setup

1. Repository klonen:
   ```bash
   git clone <repository-url>
   cd sellline-crm
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Entwicklungsumgebung starten:
   ```bash
   # In einem Terminal
   docker-compose up -d
   
   # In einem zweiten Terminal
   npm run dev
   ```

4. Anwendung öffnen:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001/api](http://localhost:3001/api)

## Struktur

Das Projekt ist als Monorepo organisiert:

```
sellline-crm/
├── apps/
│   ├── web/          # Next.js Frontend
│   └── api/          # NestJS Backend
├── packages/
│   ├── shared-types/ # Gemeinsame Typdefinitionen
│   └── ui-components/ # Wiederverwendbare UI-Komponenten
└── docs/
    └── sessions/     # Session-Summaries
```

## Entwicklung

Alle Commits folgen dem Format: `type(session-X): description`

Mögliche Types: `feat`, `fix`, `chore`, `docs`, `test`

Beispiel: `feat(session-2): Authentifizierung implementieren`

## Weitere Informationen

Für detaillierte Informationen zum Projekt siehe [CLAUDE.md](./CLAUDE.md).

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](./LICENSE).