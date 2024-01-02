import {
  char,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const city = pgTable('city', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
})

export const plateInspection = pgTable(
  'plate_inspection',
  {
    id: uuid('id').primaryKey(),
    plate: char('plate', { length: 7 }).notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull(),
    number: integer('number').notNull(),
    sequential: integer('sequential').notNull(),
    cityId: integer('cityId')
      .notNull()
      .references(() => city.id),
  },
  (table) => ({
    uniqueCitySequential: unique().on(table.cityId, table.sequential),
    indexPlate: index().on(table.plate, table.sequential, table.cityId),
  }),
)
