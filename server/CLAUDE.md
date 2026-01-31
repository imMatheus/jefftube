# Server Guidelines

## Package Manager

Always use **bun** for package management and running scripts:

- Install packages: `bun add <package>`
- Install dev dependencies: `bun add -d <package>`
- Run scripts: `bun run <script>`
- Execute files: `bun <file>`

## Database

Start the PostgreSQL database with Docker:
```bash
bun run db:start
```

Stop the database:
```bash
bun run db:stop
```

## Development

Start the development server with hot reload:
```bash
bun run dev
```

The server runs on port 3001 by default.
