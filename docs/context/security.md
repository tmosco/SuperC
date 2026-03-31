# Security

## Principles

- Authentication is required for all non-public operational data.
- Authorization is enforced server-side in Convex functions.
- Client requests must never decide their own permission scope.
- All inventory-changing operations must be attributable to an authenticated user.

## Roles

### Admin

- Full access to products, batches, movements, alerts, dashboard, and reports.
- Can manage users and operational settings if those features are added later.
- Can perform stock adjustments and acknowledge alerts.

### Manager

- Can read all inventory views and reports.
- Can create products and batches.
- Can record receive, transfer, sale, waste, and adjustment movements.
- Can acknowledge alerts.
- Cannot change system-level auth or role assignments unless explicitly added later.

### Staff

- Can read inventory, expiry dashboard, and assigned operational views.
- Can record routine movements such as receive or sale if allowed by business policy.
- Cannot perform privileged adjustments or destructive administrative actions by default.

### Viewer

- Read-only access to dashboard, alerts, and reports.
- Cannot create or mutate products, batches, or movements.

## Permission Matrix

| Capability | Admin | Manager | Staff | Viewer |
| --- | --- | --- | --- | --- |
| View products and batches | Yes | Yes | Yes | Yes |
| Create or edit product master data | Yes | Yes | No | No |
| Receive new batch stock | Yes | Yes | Yes | No |
| Record sale or waste movement | Yes | Yes | Yes | No |
| Record stock adjustment | Yes | Yes | No | No |
| Acknowledge alerts | Yes | Yes | Optional | No |
| View reports | Yes | Yes | Optional | Yes |
| Manage roles or auth settings | Yes | No | No | No |

## Server-Side Enforcement Rules

- Determine the current user from `ctx.auth.getUserIdentity()`.
- Use server-side role lookup tied to the authenticated identity.
- Prefer `identity.tokenIdentifier` as the stable auth-linked key.
- Never accept `userId`, `role`, `isAdmin`, or similar authorization fields from the client as trusted input.
- Validate that the caller has permission before reading sensitive records or applying mutations.
- Re-check permissions inside every mutation and action, even if the UI already hides the control.

## Inventory-Specific Enforcement Rules

- Only authorized roles can create products or modify product master data.
- Only authorized roles can create batches or record inventory movements.
- Outbound movements must validate that the target batch exists, belongs to the specified product, and has enough allowed stock.
- Expired-batch overrides, if introduced later, must require explicit privileged permissions and produce audit metadata.
- Alert acknowledgement must record who acknowledged the alert and when.

## Audit And Logging Expectations

- Every mutation that changes inventory state must write actor-linked audit metadata.
- Security-sensitive failures should return safe error messages to clients while preserving useful server logs.
- Reports and dashboard data should exclude unauthorized records rather than returning partial sensitive details.
