
# How to run ??

```typescript
yarn // install

change url database : DATABASE_URL="postgresql://<username>:<password>@localhost:<Port of Database>/<Name Database>?schema=public"

npx prisma migrate deploy // deploy data module on database
yarn db:dev:restart // start postgres in docker and push migrations
yarn start:dev // start api in dev mode
```
