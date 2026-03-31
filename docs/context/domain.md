# Domain

## MVP Scope

This application manages perishable inventory with batch-level traceability. The MVP covers:

- Products
- Batches
- Stock movements
- Expiry dashboard
- Alerts list
- Reports

The system is optimized for auditability and operational correctness over convenience shortcuts.

## Batch-Level Rules

- Inventory is tracked at the batch level, not only at the product level.
- Every stock-affecting change must reference a batch.
- A batch belongs to exactly one product.
- A batch has one received quantity and one running on-hand quantity.
- A batch may be split across many downstream movements, but its identity does not change.
- Product-level totals are derived from batch-level state, not edited directly.

## Movement Model

- Stock changes are movement-only updates.
- Do not overwrite inventory counts directly when recording normal operations.
- Every increase or decrease in stock must be represented as a movement event.
- Allowed MVP movement types:
  - `receive`
  - `adjustment_add`
  - `adjustment_remove`
  - `sale`
  - `waste`
  - `transfer_out`
  - `transfer_in`
- A movement must include a reason or note when the type is an adjustment or waste event.
- A movement must be append-only after creation. Corrections should be modeled as compensating movements, not silent edits.

## Expiry Handling

- Every batch must store an expiry date unless the product is explicitly marked as non-expiring.
- Expiry status is derived from the current date and the batch expiry date.
- MVP expiry states:
  - `fresh`
  - `expiring_soon`
  - `expired`
- `expiring_soon` should be computed from a configurable threshold in days.
- Expired stock should remain visible for reporting and audit even when it should no longer be available for normal outbound movements.
- The expiry dashboard should prioritize visibility into:
  - batches already expired
  - batches expiring within the threshold
  - products with the highest at-risk quantity

## Alerts Expectations

- Alerts are generated from domain conditions, not entered manually as the primary workflow.
- MVP alert types:
  - `expiry_soon`
  - `expired_batch`
  - `low_stock`
  - `negative_stock_attempt`
- Alerts should reference the affected product and batch where applicable.
- Alerts may be marked acknowledged, but acknowledgement must not delete the underlying event history.

## Compliance And Audit Expectations

- Every material inventory change must be attributable to an authenticated actor.
- Server time is the source of truth for audit timestamps.
- Audit history must be reconstructable from stored entities and movement records.
- Destructive deletes should be avoided for operational records once they have affected stock.
- Reports must be reproducible from persisted data, not only cached summaries.
- User-supplied authorization context must never be trusted; permissions are enforced server-side.

## Operational Invariants

- On-hand quantity for a batch must never drift from its movement history.
- A movement that would violate business rules must fail instead of partially applying.
- Negative stock is disallowed unless an explicit future rule enables it for a controlled workflow.
- Expired batches should be blocked from normal sale movements unless a privileged override flow is added.





