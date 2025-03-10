import { expect, test } from 'bun:test'
import 'dotenv/config'
import { Kysely } from 'kysely'
import { env } from 'node:process'
import { D1ExternalDialect } from '../src'
import type { Database } from './schema'

test('E2E', async () => {
  const db = new Kysely<Database>({
    dialect: new D1ExternalDialect({
      accountId: env.CLOUDFLARE_ACCOUNT_ID!,
      apiKey: env.CLOUDFLARE_API_KEY!,
      databaseUuid: env.CLOUDFLARE_D1_UUID!
    })
  })

  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  try {
    const create_result = await db
      .insertInto('user')
      .values({
        name: 'Alice'
      })
      .executeTakeFirstOrThrow()

    console.log('create_result', create_result)

    const query_result = await db
      .selectFrom('user')
      .selectAll()
      .executeTakeFirstOrThrow()

    console.log('query_result', query_result)

    expect(query_result.id).toBe(1)
    expect(query_result.name).toBe('Alice')
  } catch (e) {
    await db.schema.dropTable('user').execute()
    throw e
  }

  await db.schema.dropTable('user').execute()
})
