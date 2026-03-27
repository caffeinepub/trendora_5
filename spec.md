# TRENDORA

## Current State
Full fashion shopping website with products, cart, wishlist. Backend has product catalog, cart, and wishlist functions.

## Requested Changes (Diff)

### Add
- Backend: `recordVisit()` function that increments a visitor counter
- Backend: `getVisitorCount()` query function returning the total count
- Frontend: A visible visitor counter display on the site (e.g. in the footer or a floating badge)

### Modify
- App.tsx: Call `recordVisit()` once on page load
- Footer: Show total visitor count

### Remove
- Nothing

## Implementation Plan
1. Add `visitorCount` stable variable and `recordVisit`/`getVisitorCount` functions to main.mo
2. Update backend.d.ts with new function signatures
3. In App.tsx call `recordVisit()` once on mount
4. Display visitor count in the Footer component
