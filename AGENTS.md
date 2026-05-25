# Repository Guidelines

## Important Notes
This workspace is currently SQL-first: the main project artifact is [`Ecommerce-KMDsql.sql`](D:/projects/kmd-ecommerce/Ecommerce-KMDsql.sql). There is no application source tree, automated test suite, or build pipeline in the repository at this time.

The schema appears aimed at PostgreSQL-style usage, but `uuid()` defaults should be reviewed before deployment because standard PostgreSQL typically uses `gen_random_uuid()` or application-generated UUIDs instead.

Git metadata is not available in this workspace, so commit conventions below are recommended defaults rather than patterns derived from repository history.

## Project Structure & Module Organization
This repository currently contains a single database schema file: [`Ecommerce-KMDsql.sql`](D:/projects/kmd-ecommerce/Ecommerce-KMDsql.sql). It defines the e-commerce data model, including users, addresses, notifications, categories, and related tables.

Keep schema changes centralized in this file unless the project later adopts a migrations directory. Group related tables together, and place constraints or indexes close to the tables they support.

## Build, Test, and Development Commands
There is no application build pipeline in this workspace today. Typical local validation is SQL-focused:

```powershell
Get-Content .\Ecommerce-KMDsql.sql -TotalCount 40
```
Reviews the file header before editing.

```powershell
psql -f .\Ecommerce-KMDsql.sql
```
Applies the schema to a PostgreSQL-compatible database for validation.

```powershell
rg "CREATE TABLE|ALTER TABLE" .\Ecommerce-KMDsql.sql
```
Checks table and constraint definitions quickly.

## Coding Style & Naming Conventions
Use uppercase SQL keywords (`CREATE TABLE`, `PRIMARY KEY`) and keep identifiers in `snake_case`, matching the existing schema (`full_name`, `created_at`, `b2b_profiles`). Preserve the current quoting style for identifiers and use consistent two-space indentation inside table definitions.

Add one column per line, keep trailing commas aligned, and prefer descriptive constraint names if explicit names are introduced later.

## Testing Guidelines
No automated test suite is present in this repository. Validate every schema change by loading the SQL into a local database and checking:

- table creation succeeds from a clean database
- foreign keys and unique constraints apply correctly
- default values and nullable rules match the intended behavior

If seed data or migration tests are added later, place them in a dedicated `tests/` or `migrations/` directory and name files by feature, for example `orders_schema_test.sql`.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so no established commit convention can be inferred. Use short, imperative commit messages such as `Add product inventory constraints` or `Normalize address fields`.

Pull requests should summarize schema changes, list affected tables, describe any backward-incompatible updates, and include example SQL or screenshots from the database tool when useful.

## Security & Configuration Tips
Do not commit real credentials, production dumps, or customer data. Use sanitized sample data only, and review destructive statements carefully before merging.
