# Data Model

## Overview

The MVP data model centers on products, batches, and immutable movement history. Product summaries and dashboard views are derived from these records.

## Entities

### Product

Represents a sellable or storable item.

Fields:

- `id`
- `name`
- `sku`
- `category`
- `unit`
- `isActive`
- `tracksExpiry`
- `defaultExpiryWarningDays`
- `minimumStockLevel`
- `createdAt`
- `updatedAt`
- `createdBy`

Invariants:

- `sku` is unique.
- `name` is required.
- `tracksExpiry` determines whether batches require an expiry date.
- `minimumStockLevel` is zero or greater.

### Batch

Represents a traceable lot of inventory for a single product.

Fields:

- `id`
- `productId`
- `batchCode`
- `receivedAt`
- `expiryDate`
- `initialQuantity`
- `onHandQuantity`
- `unitCost`
- `supplierName`
- `status`
- `locationId` or `locationCode`
- `createdAt`
- `updatedAt`
- `createdBy`

Invariants:

- A batch belongs to exactly one product.
- `batchCode` is unique per product.
- `initialQuantity` is greater than zero for received batches.
- `onHandQuantity` is derived from movements and should not go below zero.
- `expiryDate` is required when the related product tracks expiry.
- `status` is derived from quantity and expiry state, not manually set in most flows.

### InventoryMovement

Represents an immutable stock event against a specific batch.

Fields:

- `id`
- `productId`
- `batchId`
- `movementType`
- `quantity`
- `referenceType`
- `referenceId`
- `note`
- `performedAt`
- `performedBy`
- `createdAt`

Invariants:

- Every movement references a valid product and batch.
- `quantity` is always positive; the movement type determines whether it adds or removes stock.
- Movement records are append-only.
- `performedAt` uses server-generated time.

### Alert

Represents a system-generated operational alert.

Fields:

- `id`
- `alertType`
- `severity`
- `productId`
- `batchId`
- `message`
- `status`
- `acknowledgedAt`
- `acknowledgedBy`
- `createdAt`

Invariants:

- Alerts are generated from domain rules.
- `batchId` is optional only for product-level alerts such as low stock.
- Acknowledging an alert does not remove the source record.

### ReportSnapshot

Optional persisted summary for generated reports if caching is needed.

Fields:

- `id`
- `reportType`
- `filters`
- `generatedAt`
- `generatedBy`
- `payload`

Invariants:

- Source-of-truth reporting comes from products, batches, and movements.
- Snapshots are disposable caches and must not replace the underlying audit trail.

## Relationships

- One product has many batches.
- One batch has many inventory movements.
- One product has many inventory movements through its batches.
- One product can have many alerts.
- One batch can have many alerts.
- One user can create many products, batches, movements, alerts acknowledgements, and report snapshots.

## Derived Views

### Product Stock Summary

Derived from all non-empty active batches for a product.

Fields:

- `productId`
- `totalOnHand`
- `availableOnHand`
- `expiredQuantity`
- `expiringSoonQuantity`
- `batchCount`

### Expiry Dashboard Row

Derived from a batch plus product metadata.

Fields:

- `productId`
- `productName`
- `batchId`
- `batchCode`
- `expiryDate`
- `daysToExpiry`
- `onHandQuantity`
- `expiryStatus`

## Key Invariants

- Product totals are derived, not manually edited.
- Batch `onHandQuantity` must match the net effect of related movements.
- A movement cannot target a batch belonging to a different product.
- Expired inventory may remain on hand, but normal outbound workflows should treat it as restricted stock.
