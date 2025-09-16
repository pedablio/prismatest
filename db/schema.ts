import { relations } from 'drizzle-orm'
import { foreignKey, integer, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const City = pgTable('city', {
	id: integer('id').notNull().primaryKey(),
	name: text('name').notNull(),
	state: text('state').notNull()
});

export const PlateInspection = pgTable('plate_inspection', {
	id: text('id').notNull().primaryKey(),
	plate: text('plate').notNull(),
	createdAt: timestamp('createdAt', { precision: 3 }).notNull(),
	number: integer('number').notNull(),
	sequential: integer('sequential').notNull(),
	cityId: integer('cityId').notNull()
}, (PlateInspection) => ({
	'plate_inspection_city_fkey': foreignKey({
		name: 'plate_inspection_city_fkey',
		columns: [PlateInspection.cityId],
		foreignColumns: [City.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade'),
	'PlateInspection_cityId_sequential_unique_idx': uniqueIndex('PlateInspection_cityId_sequential_key')
		.on(PlateInspection.cityId, PlateInspection.sequential)
}));

export const CityRelations = relations(City, ({ many }) => ({
	plateInspections: many(PlateInspection, {
		relationName: 'CityToPlateInspection'
	})
}));

export const PlateInspectionRelations = relations(PlateInspection, ({ one }) => ({
	city: one(City, {
		relationName: 'CityToPlateInspection',
		fields: [PlateInspection.cityId],
		references: [City.id]
	})
}));