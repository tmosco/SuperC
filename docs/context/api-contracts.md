# API Contracts

These are the intended MVP Convex contracts for the inventory domain. They describe the target surface area even though the current codebase only contains baseline sample queries.

## Product Queries And Mutations

### `products.list`

Purpose:

- Return a bounded list of active products with derived stock summary fields.

Args:

- `search?: string`
- `isActive?: boolean`
- `cursor?: string | null`
- `limit?: number`

Returns:

- Paginated product rows with summary totals.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `INVALID_PAGINATION`

### `products.create`

Purpose:

- Create a new product definition.

Args:

- `name: string`
- `sku: string`
- `category?: string`
- `unit: string`
- `tracksExpiry: boolean`
- `defaultExpiryWarningDays?: number`
- `minimumStockLevel?: number`

Returns:

- `{ productId }`

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `SKU_ALREADY_EXISTS`
- `VALIDATION_ERROR`

## Batch Queries And Mutations

### `batches.listByProduct`

Purpose:

- Return bounded batches for a given product in expiry order.

Args:

- `productId: Id<"products">`
- `includeEmpty?: boolean`
- `cursor?: string | null`
- `limit?: number`

Returns:

- Paginated batch rows with expiry status and on-hand quantity.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `PRODUCT_NOT_FOUND`
- `INVALID_PAGINATION`

### `batches.receive`

Purpose:

- Create a new batch and record the initial receive movement.

Args:

- `productId: Id<"products">`
- `batchCode: string`
- `receivedAt?: string`
- `expiryDate?: string`
- `quantity: number`
- `unitCost?: number`
- `supplierName?: string`
- `locationCode?: string`
- `note?: string`

Returns:

- `{ batchId, movementId }`

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `PRODUCT_NOT_FOUND`
- `BATCH_ALREADY_EXISTS`
- `EXPIRY_DATE_REQUIRED`
- `INVALID_QUANTITY`
- `VALIDATION_ERROR`

## Movement Queries And Mutations

### `movements.list`

Purpose:

- Return a bounded history of movement events with filters.

Args:

- `productId?: Id<"products">`
- `batchId?: Id<"batches">`
- `movementType?: string`
- `dateFrom?: string`
- `dateTo?: string`
- `cursor?: string | null`
- `limit?: number`

Returns:

- Paginated immutable movement records.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `INVALID_FILTER`
- `INVALID_PAGINATION`

### `movements.record`

Purpose:

- Record a stock movement against an existing batch.

Args:

- `productId: Id<"products">`
- `batchId: Id<"batches">`
- `movementType: "adjustment_add" | "adjustment_remove" | "sale" | "waste" | "transfer_in" | "transfer_out"`
- `quantity: number`
- `referenceType?: string`
- `referenceId?: string`
- `note?: string`

Returns:

- `{ movementId, updatedOnHandQuantity }`

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `PRODUCT_NOT_FOUND`
- `BATCH_NOT_FOUND`
- `BATCH_PRODUCT_MISMATCH`
- `INVALID_MOVEMENT_TYPE`
- `INVALID_QUANTITY`
- `INSUFFICIENT_STOCK`
- `EXPIRED_BATCH_RESTRICTED`
- `VALIDATION_ERROR`

## Expiry Dashboard Queries

### `dashboard.getExpiryOverview`

Purpose:

- Return aggregate counts for fresh, expiring soon, and expired inventory.

Args:

- `warningDays?: number`

Returns:

- `{ freshCount, expiringSoonCount, expiredCount, atRiskQuantity }`

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `VALIDATION_ERROR`

### `dashboard.listExpiringBatches`

Purpose:

- Return bounded expiry rows ordered by nearest expiry date.

Args:

- `status?: "expiring_soon" | "expired"`
- `warningDays?: number`
- `cursor?: string | null`
- `limit?: number`

Returns:

- Paginated expiry dashboard rows.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `INVALID_PAGINATION`

## Alerts Queries And Mutations

### `alerts.list`

Purpose:

- Return current operational alerts.

Args:

- `status?: "open" | "acknowledged"`
- `alertType?: string`
- `cursor?: string | null`
- `limit?: number`

Returns:

- Paginated alert rows.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `INVALID_PAGINATION`

### `alerts.acknowledge`

Purpose:

- Mark an alert as acknowledged.

Args:

- `alertId: Id<"alerts">`

Returns:

- `{ alertId, status: "acknowledged", acknowledgedAt }`

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `ALERT_NOT_FOUND`
- `ALREADY_ACKNOWLEDGED`

## Reports Queries

### `reports.stockSummary`

Purpose:

- Return current stock totals grouped by product.

Args:

- `category?: string`
- `includeInactive?: boolean`

Returns:

- Array of product stock summary rows.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `VALIDATION_ERROR`

### `reports.expiryRisk`

Purpose:

- Return inventory at risk by expiry window.

Args:

- `warningDays?: number`
- `category?: string`

Returns:

- Array of grouped expiry-risk rows by product and batch.

Expected errors:

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `VALIDATION_ERROR`

## Cross-Cutting Contract Rules

- All list endpoints should return bounded collections or paginated results.
- All mutations must derive actor identity on the server.
- All contracts should use typed Convex ids rather than raw strings for entity references.
- Errors should be stable and predictable so the UI can render actionable states.
