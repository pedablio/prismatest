-- InsertCustomers
INSERT INTO "customer" ("name", "cpfCnpj", "passwordHash", "createdAt", "balance")
SELECT
  CONCAT('Test ', "number") as "name",
  LPAD("number"::text, 11, '0') as "cpfCnpj",
  md5(random()::text) as "passwordHash",
  NOW() - (random() * (NOW()+'90 days' - NOW())) + '30 days' as "createdAt",
  0 as "balance"
FROM generate_series(1, 10000000) as "number";