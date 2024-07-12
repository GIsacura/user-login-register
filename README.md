## Installation

### Front end

Install with npm

```bash
  cd frontend
  npm install
  npm run dev
```

### Backend

Install with pnpm and run docker

```bash
  cd backend
  pnpm install
  docker-compose up -d mongo
  pnpm run start:dev
```

In case you don't have pnpm installed

```bash
  npm install -g pnpm
```
