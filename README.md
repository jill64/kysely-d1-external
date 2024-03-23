<!----- BEGIN GHOST DOCS HEADER ----->
<!----- END GHOST DOCS HEADER ----->

## Installation

```sh
npm i kysely-d1-external
```

## Usage

```ts
import { D1ExternalDialect } from 'kysely-d1-external'
import { Kysely } from 'kysely'
import { fetch } from 'undici'

const db = new Kysely<Database>({
  dialect: new D1ExternalDialect({
    accountId: 'YOUR_CLOUDFLARE_ACCOUNT_ID',
    apiKey: 'YOUR_CLOUDFLARE_API_KEY',
    databaseUuid: 'YOUR_DATABASE_UUID'
  })
})
```

<!----- BEGIN GHOST DOCS FOOTER ----->
<!----- END GHOST DOCS FOOTER ----->
