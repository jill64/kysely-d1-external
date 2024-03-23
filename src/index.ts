import { D1 } from 'd1-driver'
import {
  CompiledQuery,
  DatabaseConnection,
  DatabaseIntrospector,
  Dialect,
  Driver,
  Kysely,
  QueryCompiler,
  QueryResult,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler
} from 'kysely'

export interface D1ExternalDialectConfig {
  accountId: string
  apyKey: string
  databaseUuid: string
  fetch?: typeof fetch
}

export class D1ExternalDialect implements Dialect {
  private config

  constructor(config: D1ExternalDialectConfig) {
    this.config = config
  }

  createAdapter() {
    return new SqliteAdapter()
  }

  createDriver(): Driver {
    return new D1ExternalDriver(this.config)
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createIntrospector<T>(db: Kysely<T>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
}

class D1ExternalDriver implements Driver {
  private config

  constructor(config: D1ExternalDialectConfig) {
    this.config = config
  }

  async init(): Promise<void> {}

  async acquireConnection(): Promise<DatabaseConnection> {
    return new D1ExternalConnection(this.config)
  }

  async beginTransaction(conn: D1ExternalConnection): Promise<void> {
    return await conn.beginTransaction()
  }

  async commitTransaction(conn: D1ExternalConnection): Promise<void> {
    return await conn.commitTransaction()
  }

  async rollbackTransaction(conn: D1ExternalConnection): Promise<void> {
    return await conn.rollbackTransaction()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async releaseConnection(_conn: D1ExternalConnection): Promise<void> {}

  async destroy(): Promise<void> {}
}

class D1ExternalConnection implements DatabaseConnection {
  private config
  private d1

  constructor(config: D1ExternalDialectConfig) {
    this.config = config
    this.d1 = new D1(config.accountId, config.apyKey, config.fetch)
  }

  async executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
    const results = await this.d1.query(
      this.config.databaseUuid,
      compiledQuery.sql,
      compiledQuery.parameters as string[]
    )

    const firstResult = results.result.length ? results.result[0] : null

    const numAffectedRows =
      firstResult && firstResult.meta.changes > 0
        ? BigInt(firstResult.meta.changes)
        : undefined

    return {
      insertId:
        firstResult?.meta.last_row_id === undefined ||
        firstResult.meta.last_row_id === null
          ? undefined
          : BigInt(firstResult.meta.last_row_id),
      rows: (firstResult?.results ?? []) as O[],
      numAffectedRows,
      numUpdatedOrDeletedRows: numAffectedRows
    }
  }

  async beginTransaction() {
    throw new Error('D1ExternalDialect: Transactions are not supported.')
  }

  async commitTransaction() {
    throw new Error('D1ExternalDialect: Transactions are not supported.')
  }

  async rollbackTransaction() {
    throw new Error('D1ExternalDialect: Transactions are not supported.')
  }

  async *streamQuery<O>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _compiledQuery: CompiledQuery,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _chunkSize: number
  ): AsyncIterableIterator<QueryResult<O>> {
    throw new Error('D1ExternalDialect: Streaming is not supported.')
  }
}
