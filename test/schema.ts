import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  user: UserTable
}

export interface UserTable {
  id: ColumnType<number, never, never>
  name: string
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
