# Instagram clone coding

# 프로젝트 실행 방법

## 환경변수

### .env

- 도커용

```
# PostgreSQL 설정
DATABASE_URL=postgresql://[myuser]:[mypassword]@db:5432/[mydb]
POSTGRES_USER=[myuser]
POSTGRES_PASSWORD=[mypassword]
POSTGRES_DB=[mydb]
```

### .env.local

- 로컬용(도커로만 개발해도 prisma 명령어 때문에 필요)

```
DATABASE_URL=postgresql://[myuser]:[mypassword]@localhost:5432/[mydb]
```

## 실행명령어 (Docker 사용)

처음 셋업 후 실행할 때:

```
docker-compose up --build
```

개발할 때:

```
docker-compose up
```

DB 초기화하고 싶을 때:

```
docker-compose down -v
docker-compose up
```

## Prisma 관련 명령어

### Prisma client code

```
docker compose exec npx prisma generate
```

### DB migrate(기존 npx prisma migrate 명령어)

```
docker compose exec web npx prisma migrate dev --name init
```

### Prisma studio

```
docker compose exec web npx prisma generate
```
