
---

## 🔧 Troubleshooting

### Issue: pnpm not found
**Error**: `pnpm: The term 'pnpm' is not recognized`

**Solution**:
```bash
npm install -g pnpm@latest
```

pnpm is required because npm doesn't support the workspace protocol (`workspace:*`) used in this monorepo.

### Issue: Cannot find module '@eumetise/theme-contracts'
**Error**: `Cannot find module '@eumetise/theme-contracts'`

**Solution**:
```bash
pnpm install
```

Make sure you've run `pnpm install` from the workspace root, not from individual app directories.

### Issue: CSS variables not applied at runtime
**Symptom**: Page renders without themed colors (shows default black/white)

**Diagnostic**:
```javascript
// In DevTools Console:
const style = getComputedStyle(document.documentElement);
const primaryColor = style.getPropertyValue('--color-primary');
console.log(primaryColor); // Should be '#0066cc', not empty
```

**Solutions**:
1. Check that `globals.css` is imported in `app/layout.tsx`
2. Verify browser DevTools shows CSS variables in `<html>` element styles
3. Ensure `theme-initializer.tsx` is marked with `"use client"` at module level
4. Check console for errors: `[Theme] Applied theme for tenant: ...`

### Issue: Theme changes don't appear in dev server
**Symptom**: Updated theme JSON file, but page doesn't reflect changes

**Note**: This is expected. pnpm doesn't watch theme files for changes. To test new themes:
1. Restart dev server: `npm run dev`
2. Or use localhost controller: `mutateCSSVariable('--color-primary', '#newcolor')`

### Issue: Build validation fails with invalid theme
**Error**: `❌ Theme validation failed for acme-corp.json`

**Check**:
```bash
pnpm validate-themes
```

**Common issues**:
- Missing required field (e.g., `tenantId`)
- Color not in hex/rgb format (e.g., `blue` instead of `#0066cc`)
- Incomplete arrays (e.g., only 4 spacing values instead of 7)
- Missing nested properties (e.g., missing `colors.primary`)

**Solution**: Review `packages/theme-contracts/src/index.ts` for exact schema, then update theme file.

### Issue: "Attempted to call useThemeBootstrap() from the server"
**Error**: `Attempted to call useThemeBootstrap() from the server but useThemeBootstrap is on the client`

**Cause**: `"use client"` directive is inside a component function, not at module top.

**Solution**: Ensure client-only code is in separate file with `"use client"` at line 1:
```typescript
// ❌ WRONG - in layout.tsx
function ThemeInitializer() {
  "use client";  // Should be at module level, not inside function
  useThemeBootstrap();
}

// ✅ CORRECT - in theme-initializer.tsx
"use client";  // At top of file
export function ThemeInitializer() {
  useThemeBootstrap();
}
```

---

## ❓ FAQ

### Q: Can I have different themes for different users/pages?
**A**: Yes. The `tenantId` is extracted per-request in `layout.tsx`:
```typescript
const tenantId = extractTenantFromRequest(req); // Or from env
<ThemeInitializer tenantId={tenantId} />
```

Each request gets its own `resolveThemeForTenant()` call, so different requests can render different themes.

### Q: How do I add a new color to the theme?
**A**: Follow these steps:

1. **Update contract** (`packages/theme-contracts/src/index.ts`):
   ```typescript
   colors: {
     primary: string;
     secondary: string;
     myNewColor: string;  // Add here
   }
   ```

2. **Update default theme** (`packages/theme-registry/src/default-theme.ts`):
   ```typescript
   colors: {
     primary: '#0066cc',
     secondary: '#f0f0f0',
     myNewColor: '#aabbcc',  // Add here
   }
   ```

3. **Update globals.css** (`apps/command-center/src/app/globals.css`):
   ```css
   --color-my-new-color: #aabbcc;
   ```

4. **Update Tailwind config** (`apps/command-center/tailwind.config.js`):
   ```javascript
   colors: {
     primary: 'var(--color-primary)',
     secondary: 'var(--color-secondary)',
     myNewColor: 'var(--color-my-new-color)',  // Add here
   }
   ```

5. **Update all tenant theme files** (e.g., `themes/acme-corp.json`):
   ```json
   "colors": {
     "primary": "#0066cc",
     "myNewColor": "#your-color-here"
   }
   ```

6. **Validate**: `pnpm validate-themes` should pass

### Q: Can I use rgba() colors?
**A**: Yes. The validator accepts hex (`#ffffff`) and rgb/rgba formats:
```json
"colors": {
  "primary": "#0066cc",
  "transparent": "rgba(0, 0, 0, 0.5)"
}
```

### Q: What's the performance impact of CSS variables?
**A**: Minimal. CSS variables are:
- Resolved by browser engine (hardware accelerated on modern browsers)
- Not recalculated per element (cached by CSS parser)
- Same performance as hardcoded values in modern browsers (Chrome 49+, Firefox 31+, Safari 9.1+)

### Q: How do I customize the theme for specific components?
**A**: Use Tailwind's semantic color classes:
```jsx
<div className="bg-primary text-white">
  Primary color background with white text
</div>
```

Don't inline CSS variables. Use the semantic classes that reference them.

### Q: Can I make themes with animations or transitions?
**A**: CSS variables only store static values. For animations/transitions, define them in a separate CSS file (not in globals.css) and import as needed. Themes are for design tokens only.

### Q: How do I test theme changes locally?
**A**: Use the localhost controller in DevTools:
```javascript
// Enable localhost mutations (dev-only)
window.enableLocalhostController();

// Update a color in real-time
window.mutateCSSVariable('--color-primary', '#ff0000');

// Check applied values
const style = getComputedStyle(document.documentElement);
console.log(style.getPropertyValue('--color-primary')); // #ff0000

// Reset to original
window.resetLocalhostOverrides();
```

### Q: Can I export themes as variables for other platforms?
**A**: Yes. Theme files are plain JSON. You can:
- Parse `themes/acme-corp.json` in any language/platform
- Export to CSS: use `validate-themes.ts` as reference
- Export to SCSS/Less: read colors and generate variables
- Export to JSON for mobile apps

### Q: What happens if a tenant's theme file is missing?
**A**: `resolveThemeForTenant()` returns `DEFAULT_THEME`. The app never breaks. This is build-safe by design.

```typescript
resolveThemeForTenant('unknown-tenant') // Returns DEFAULT_THEME, not error
```

---

## 📚 Additional Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture guide
- [STRUCTURE.md](./STRUCTURE.md) - File structure documentation
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Deployment checklist
- [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md) - Build verification results

---

## 🤝 Contributing

When adding features or fixing bugs:

1. **Type Safety**: Ensure all changes are TypeScript strict-mode compliant
2. **Contract Compliance**: Update theme contracts if adding design tokens
3. **Validation**: Run `pnpm validate-themes` and `pnpm validate-contracts`
4. **Testing**: Test with `pnpm dev` locally before committing

---

## 📄 License

This project is proprietary. All rights reserved.
