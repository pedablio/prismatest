-- Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- InsertCities
INSERT INTO "city" ("id", "name", "state")
SELECT
  "number" as "id",
  CONCAT('City ', "number") as "name",
  (array['RO', 'SP', 'SC', 'PB', 'ES', 'BA', 'PE', 'RJ', 'RN', 'TO'])["number"] as "state"
FROM generate_series(1, 10) as "number";

-- InsertInspections
INSERT INTO "plate_inspection" ("id", "plate", "createdAt", "number", "sequential", "cityId")
SELECT
  uuid_generate_v4() as "id",
  CONCAT(
    substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ', round(random() * 25 + 1)::integer, 1),
    substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ', round(random() * 25 + 1)::integer, 1),
    substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ', round(random() * 25 + 1)::integer, 1),
    substring('0123456789', round(random() * 9 + 1)::integer, 1),
    substring('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', round(random() * 34 + 1)::integer, 1),
    substring('0123456789', round(random() * 9 + 1)::integer, 1),
    substring('0123456789', round(random() * 9 + 1)::integer, 1)
  ) as "plate",
  NOW() - '1 second'::INTERVAL * ROUND(RANDOM() * 100000000) as "createdAt",
  ROUND(RANDOM() * 1) + 1 as "number",
  "number" as "sequential",
  ROUND(RANDOM() * 9) + 1 as "cityId"
FROM generate_series(1, 10000000) as "number";