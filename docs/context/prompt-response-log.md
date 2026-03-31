# Prompt / Response Validation Log

## Purpose

Document one explicit iteration showing how the context pack should guide model output before implementation.

## Context Supplied

Files provided to the agent:

- `docs/context/domain.md`
- `docs/context/data-model.md`
- `docs/context/security.md`
- `docs/context/api-contracts.md`
- `PROJECT_RULES.md`
- `AGENTS.md`

## Validation Prompt

```text
Using the attached context files, propose the Convex mutation contract for `movements.record`.

Requirements:
- Respect batch-level inventory rules.
- Use movement-only updates.
- Enforce server-side auth using the authenticated identity.
- Reject invalid product/batch combinations.
- Reject insufficient stock.
- Block normal outbound movement from expired batches.
- Return stable application errors that match the API contract.

Respond with:
1. mutation purpose
2. args shape
3. validation steps in order
4. expected error codes
5. fields written or updated
```

## Expected Good Response

A correct response should include all of the following:

- `productId` and `batchId` use typed Convex ids, not raw strings.
- `quantity` is positive and the movement type determines add vs remove semantics.
- Authorization is derived from `ctx.auth.getUserIdentity()` and a server-side role lookup.
- The batch is checked to ensure it belongs to the specified product.
- Stock reduction fails if quantity exceeds allowed on-hand quantity.
- Expired batches are blocked for normal outbound movement.
- A new immutable movement record is inserted.
- Batch `onHandQuantity` is updated transactionally to stay aligned with movement history.
- Returned errors match the contract in `docs/context/api-contracts.md`.

## Sample Response Summary

Below is the kind of answer that should pass validation:

```text
Purpose:
Record an immutable stock movement against a batch and atomically update the batch on-hand quantity.

Args:
- productId: Id<"products">
- batchId: Id<"batches">
- movementType: "adjustment_add" | "adjustment_remove" | "sale" | "waste" | "transfer_in" | "transfer_out"
- quantity: number
- referenceType?: string
- referenceId?: string
- note?: string

Validation order:
1. Require authenticated identity from ctx.auth.getUserIdentity().
2. Resolve server-side role and check permission to record this movement type.
3. Validate quantity > 0.
4. Load product and batch.
5. Fail if product or batch does not exist.
6. Fail if batch.productId does not equal productId.
7. If outbound movement, fail on expired batch unless privileged override exists.
8. Compute next on-hand quantity and fail on insufficient stock.
9. Insert movement record with performedBy and performedAt.
10. Patch batch onHandQuantity and updatedAt in the same mutation.

Errors:
UNAUTHENTICATED, FORBIDDEN, PRODUCT_NOT_FOUND, BATCH_NOT_FOUND, BATCH_PRODUCT_MISMATCH, INVALID_MOVEMENT_TYPE, INVALID_QUANTITY, INSUFFICIENT_STOCK, EXPIRED_BATCH_RESTRICTED
```

## Alignment Check

This prompt/response pair is valid only if it stays consistent with the context pack:

- `domain.md`: confirms movement-only updates, append-only history, expiry restrictions, and no negative stock.
- `data-model.md`: confirms entity boundaries, relationships, and batch/product invariants.
- `security.md`: confirms server-side auth, role enforcement, and actor-linked audit metadata.
- `api-contracts.md`: confirms the contract name, argument expectations, and stable error codes.

## Review Outcome

This iteration passes if the generated design:

- preserves immutable movement history
- uses authenticated server identity
- keeps batch quantity consistent with movement history
- rejects mismatched product and batch references
- returns only documented error codes

It fails if the generated design:

- accepts `userId` or `role` from the client
- directly edits product totals
- overwrites stock without a movement record
- allows negative stock as a default behavior
- ignores expiry restrictions for outbound movements
