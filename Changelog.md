# CHANGELOG

## v2.0 — Final Submission (November 11, 2025)

### ✅ Added
- **Item removal**: Users can now delete menu items from the main menu using "Remove" button.
- **Filter screen**: New screen allowing guests to filter items by course (Appetizer, Main, Dessert).
- **Average price display**: Dynamically calculates and shows average menu price on MenuScreen.
- **Improved UI**: Added card shadows, consistent spacing, course/price labels, and color theme.
- **Code quality**: Used named exports, proper TypeScript types, and clean component structure.

### 🔧 Changed
- Fixed all import paths (now use `../components`, `../data`, etc.).
- Replaced default export with named export in `MenuItemCard`.
- Removed unused `JSX` import and pub/sub logic (simplified to static data).
- Added responsive button layout in FilterScreen.

### 📁 Files Updated
- `src/screens/MenuScreen.tsx`
- `src/screens/FilterScreen.tsx` (new)
- `src/components/MenuItemCard.tsx`
- `src/data/MenuData.ts`
- `src/types/MenuItem.ts`
- Created `CHANGELOG.md`