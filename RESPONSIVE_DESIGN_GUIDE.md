# Responsive Design Implementation Guide

## Overview

Your project is now configured with comprehensive responsive design support. This guide explains how to use the responsive utilities and best practices for different components.

---

## 1. Import Responsive Utils

Add this to your `main.jsx` or import it in specific component files:

```javascript
import "../styles/responsive-utils.css";
```

Or in your component CSS files:

```css
@import "../styles/responsive-utils.css";
```

---

## 2. Breakpoints

```
Mobile:    320px - 480px
Tablet:    481px - 768px
Desktop:   769px - 1024px
Large:     1025px+
```

---

## 3. Using Responsive Utilities

### Containers

```jsx
// Use container for centered content with padding
<div className="container">
  <h1>Your Content</h1>
</div>

// Smaller container
<div className="container-sm">
  <p>Form content</p>
</div>

// Larger container
<div className="container-lg">
  <p>Full width content</p>
</div>
```

### Grid Layouts

```jsx
// 2-column grid (1 column on mobile)
<div className="grid-2">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
</div>

// 3-column grid (2 on tablet, 1 on mobile)
<div className="grid-3">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>

// Auto-fit grid (responsive columns)
<div className="grid-auto">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>
```

### Flexbox Layouts

```jsx
// Center items
<div className="flex-center">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// Space between items
<div className="flex-between">
  <span>Left</span>
  <span>Right</span>
</div>

// Column layout (responsive)
<div className="flex-col">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Wrap items
<div className="flex-wrap">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
</div>
```

### Spacing Classes

```jsx
// Margin bottom
<div className="mb-1">Small margin</div>  <!-- 8px -->
<div className="mb-2">Medium margin</div> <!-- 16px -->
<div className="mb-3">Large margin</div>  <!-- 24px -->
<div className="mb-4">Extra large</div>   <!-- 32px -->

// Padding
<div className="p-1">Small padding</div>   <!-- 8px -->
<div className="p-2">Medium padding</div>  <!-- 16px -->
<div className="p-3">Large padding</div>   <!-- 24px -->
```

### Show/Hide on Different Screens

```jsx
// Hide on mobile, show on desktop
<div className="hide-mobile">Desktop only</div>

// Show on mobile, hide on desktop
<div className="show-mobile">Mobile only</div>

// Hide on tablet
<div className="hide-tablet">Tablet hidden</div>
```

### Responsive Buttons

```jsx
// Standard button
<button className="btn">Click Me</button>

// Small button
<button className="btn btn-sm">Small</button>

// Large button
<button className="btn btn-lg">Large</button>

// Full width button
<button className="btn btn-block">Full Width</button>
```

### Responsive Forms

```jsx
<div className="form-group">
  <label className="form-label">Email</label>
  <input className="form-control" type="email" />
</div>

<div className="form-group">
  <label className="form-label">Password</label>
  <input className="form-control" type="password" />
</div>
```

### Responsive Tables

```jsx
// For mobile: make table scrollable
<div className="table-responsive">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>john@example.com</td>
      </tr>
    </tbody>
  </table>
</div>

// Alternative: Stack table on mobile
<table className="table-stacked">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">John</td>
      <td data-label="Email">john@example.com</td>
      <td data-label="Status">Active</td>
    </tr>
  </tbody>
</table>
```

---

## 4. Component-Specific Examples

### Header/Navigation - Responsive

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .nav-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: #fff;
    padding: 20px;
    display: none; /* Hidden by default on mobile */
  }

  .nav-menu.active {
    display: flex;
  }

  .hamburger {
    display: block;
    cursor: pointer;
  }
}

@media (min-width: 769px) {
  .hamburger {
    display: none;
  }
}
```

### Worker Card - Responsive

```css
.worker-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.worker-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.worker-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 768px) {
  .worker-card {
    padding: 15px;
  }

  .worker-image {
    height: 150px;
    margin-bottom: 10px;
  }

  .worker-info {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .worker-card {
    padding: 12px;
  }

  .worker-image {
    height: 120px;
  }
}
```

### Dashboard - Responsive

```css
.dashboard {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  min-height: 100vh;
}

.sidebar {
  background: #2c3e50;
  padding: 20px;
  border-radius: 8px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Tablet: Sidebar on top */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .sidebar {
    padding: 15px;
  }
}

/* Mobile: Full width */
@media (max-width: 768px) {
  .sidebar {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px;
    border-radius: 0;
  }

  .sidebar nav {
    display: flex;
    gap: 5px;
  }

  .main-content {
    gap: 15px;
    padding: 0 10px;
  }
}
```

---

## 5. Best Practices

### Do's ✅

- Use `max-width` instead of `width` for flexible layouts
- Use `padding` instead of `margin` for spacing inside components
- Test on actual devices (not just DevTools)
- Use mobile-first approach (base styles for mobile, then add for larger screens)
- Always include viewport meta tag
- Use relative units (%, rem, em) instead of fixed pixels

### Don'ts ❌

- Don't use fixed widths (e.g., `width: 250px;` without `max-width`)
- Don't use hardcoded breakpoints; use consistent values
- Don't forget to test touch interactions on mobile
- Don't make text too small on mobile (min 12px-14px)
- Don't use tables for layout
- Don't forget about overflow on small screens

---

## 6. Testing Responsive Design

### Using DevTools (F12)

1. Press `F12` to open DevTools
2. Click the device toggle icon (top-left)
3. Test these breakpoints:
   - iPhone 12 (390px)
   - iPad (768px)
   - Desktop (1024px)
   - Large Desktop (1440px)

### Manual Testing

```bash
# Start your dev server
npm run dev

# Test on different devices:
# - Phone (iOS & Android)
# - Tablet
# - Desktop (different zoom levels)
```

---

## 7. CSS Media Query Syntax

```css
/* Mobile first approach */
.component {
  /* Default mobile styles */
  width: 100%;
  padding: 10px;
}

/* Tablets and up */
@media (min-width: 768px) {
  .component {
    width: 50%;
    padding: 15px;
  }
}

/* Desktops and up */
@media (min-width: 1024px) {
  .component {
    width: 33.333%;
    padding: 20px;
  }
}

/* Landscape orientation */
@media (orientation: landscape) {
  .component {
    height: 100vh;
  }
}

/* Combine multiple conditions */
@media (min-width: 768px) and (max-width: 1024px) {
  .component {
    width: 50%;
  }
}
```

---

## 8. Common Responsive Patterns

### 1. Hero Section

```jsx
<div className="hero">
  <div className="hero-content">
    <h1>Welcome</h1>
    <p>Responsive hero section</p>
  </div>
</div>
```

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  color: white;
}

@media (max-width: 768px) {
  .hero {
    min-height: 60vh;
    padding: 30px 15px;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 50vh;
    padding: 20px 10px;
  }
}
```

### 2. Feature Cards Grid

```jsx
<div className="features-grid">
  <div className="feature-card">
    <h3>Feature 1</h3>
    <p>Description</p>
  </div>
  <div className="feature-card">
    <h3>Feature 2</h3>
    <p>Description</p>
  </div>
</div>
```

```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 40px 20px;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 30px 15px;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px 10px;
  }
}
```

---

## 9. Troubleshooting

### Issue: Content overflows on mobile

**Solution**: Check for fixed widths, add `max-width: 100%` and `box-sizing: border-box`

### Issue: Text too small on mobile

**Solution**: Increase font size in mobile media queries (min 14px)

### Issue: Images distorted

**Solution**: Use `width: 100%; height: auto;` or set aspect ratio

### Issue: Hamburger menu doesn't work

**Solution**: Ensure JavaScript is properly handling menu toggle

### Issue: Desktop view looks broken

**Solution**: Use `min-width` for desktop styles, not `max-width`

---

## 10. Next Steps

1. **Update all components** to use responsive utilities
2. **Test on real devices** (phone, tablet, desktop)
3. **Fix any specific issues** for your components
4. **Consider Tailwind CSS** for more utility-first approach (optional)
5. **Setup PWA** for better mobile support (optional)

---

## Quick Reference: CSS Classes

```
Grid:       .grid, .grid-2, .grid-3, .grid-4, .grid-auto
Flex:       .flex-center, .flex-between, .flex-wrap, .flex-col
Spacing:    .mb-1/2/3/4, .mt-1/2/3/4, .p-1/2/3/4
Text:       .text-center, .text-left, .text-right, .text-truncate
Display:    .hide-mobile, .show-mobile, .hide-tablet, .show-tablet
Buttons:    .btn, .btn-sm, .btn-lg, .btn-block
Forms:      .form-group, .form-label, .form-control
Tables:     .table-responsive, .table-stacked
```

---

**Happy Building! 🚀**
