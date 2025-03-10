<!----- BEGIN GHOST DOCS HEADER ----->

# kysely-d1-external

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://npmjs.com/package/kysely-d1-external"><img src="https://img.shields.io/npm/v/kysely-d1-external" alt="npm-version" /></a> <a href="https://npmjs.com/package/kysely-d1-external"><img src="https://img.shields.io/npm/l/kysely-d1-external" alt="npm-license" /></a> <a href="https://npmjs.com/package/kysely-d1-external"><img src="https://img.shields.io/npm/dm/kysely-d1-external" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/kysely-d1-external"><img src="https://img.shields.io/bundlephobia/min/kysely-d1-external" alt="npm-min-size" /></a>

<!----- END GHOST DOCS BADGES ----->

🌤️ Kysely D1 Dialect for external fetch

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

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->
