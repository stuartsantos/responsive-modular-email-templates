# Responsive Modular Email Templates

## Overview

This is a modular library of reusable, responsive HTML email components designed to be mixed and matched to create custom email templates. The library provides a flexible, component-based architecture that allows you to build complex email layouts by combining simple, pre-styled building blocks.

## Architecture

The library follows a hierarchical structure with four main layers:

### 1. Wrappers (Outermost Layer)
Located in `src/html/wrappers/`

Wrappers provide the foundational HTML structure and define the overall layout behavior:
- `default.html` - Standard responsive wrapper with preheader and footer
- `full-width.html` - Full-width layout wrapper
- `outlook.html` - Outlook-specific wrapper for compatibility

Each wrapper includes:
- Complete HTML document structure
- Body and table-based layout
- Preheader and footer sections
- Placeholder for main content

### 2. Sections & Headers (Container Layer)
Located in `src/html/sections/` and `src/html/headers/`

Sections provide styled containers that organize your content:
- `container.html` - Generic content container
- `blue.html` - Container with blue background styling
- Various header templates for branding (aig.html, aig-white.html, etc.)

### 3. Columns (Layout Layer)
Located in `src/html/columns/`

Column components define the content layout structure:
- `1col.html` - Single column layout
- `2col.html` - Two column layout
- `3col.html` - Three column layout

Each column provides placeholder areas where you can insert components.

### 4. Components (Content Layer)
Located in `src/html/components/`

The most granular level - reusable content blocks:

**Text & Typography:**
- `heading.html` - Main headings
- `subheading.html` - Subheadings
- `text.html` - Body text
- `quote.html` - Blockquote
- `pull-quote.html` - Highlighted pull quote
- `highlight.html` - Highlighted text block

**Images:**
- `img-full-width.html` - Full width image
- `img-1col.html`, `img-2col.html`, `img-3col.html` - Column-specific images

**Interactive Elements:**
- `button.html` - Call-to-action button
- `video.html` - Video embed

**Lists & Tables:**
- `ul.html` - Unordered list
- `ul-checked.html` - Checklist
- `ol.html` - Ordered list
- `table.html` - Data table

**Special Elements:**
- `social.html` - Social media icons
- `icon-left.html`, `icon-right.html`, `icon-top.html` - Icon layouts

## Styling System

The project uses a sophisticated styling approach optimized for email clients:

### SCSS Source Files
Located in `src/sass/`

All styles are written in SCSS and organized to mirror the component hierarchy:
- `src/sass/wrappers/` - Wrapper styles
- `src/sass/sections/` - Section styles
- `src/sass/columns/` - Column layout styles
- `src/sass/components/` - Component styles
- `src/sass/partials/` - Shared mixins and variables

### Responsive Styles
Each component has responsive variants in `responsive/` subdirectories that use media queries for mobile optimization.

### Microsoft Outlook Support
Special MSO-specific styles in `src/sass/components/mso/` ensure compatibility with Outlook's rendering engine.

### CSS Compilation
SCSS files are compiled to CSS in `src/css/` using Compass, then inlined into HTML during the build process.

## How to Mix and Match Components

The modular design allows you to create custom email templates by nesting components in this order:

```
1. Start with a Wrapper
   └── 2. Add Sections or Headers
       └── 3. Insert Column layouts
           └── 4. Place Components in columns
```

### Example Template Structure

```html
<!-- 1. Wrapper: default.html -->
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <table class="main">
    <tr>
      <td>

        <!-- 2. Header: aig.html -->
        <table class="header">
          ...
        </table>

        <!-- 2. Section: container.html -->
        <table class="container">
          <tr>
            <td>

              <!-- 3. Columns: 2col.html -->
              <table class="columns">
                <tr>
                  <td class="col-2">

                    <!-- 4. Components: img-2col.html -->
                    <img src="..." />

                    <!-- 4. Components: heading.html -->
                    <h1>Title</h1>

                    <!-- 4. Components: text.html -->
                    <p>Body text...</p>

                  </td>
                  <td class="col-2">
                    <!-- More components -->
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
```

### Usage Workflow

1. Choose a wrapper that matches your layout needs
2. Insert sections to create visual breaks or background colors
3. Add column layouts to structure content horizontally
4. Drop in components with your actual content
5. Each component automatically includes its CSS via `<link>` tags

## Setup Instructions

### Prerequisites

- Node.js and npm
- Ruby (for Compass/SASS compilation)
- Grunt CLI: `npm install -g grunt-cli`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stuartsantos/responsive-modular-email-templates.git
cd responsive-modular-email-templates
```

2. Install dependencies:
```bash
npm install
```

### Development Workflow

#### Option 1: Development with Live Reload

Start the development server with auto-compilation and browser sync:

```bash
grunt
```

This will:
- Compile SCSS to CSS when files change
- Inline CSS into HTML when templates change
- Start a local server
- Auto-refresh your browser on changes

#### Option 2: Build Only

To compile and inline CSS without the dev server:

```bash
grunt inline
```

### Build Process

The build system performs these steps:

1. **SCSS Compilation** (via Compass)
   - Compiles `src/sass/**/*.scss` to `src/css/**/*.css`
   - Adds vendor prefixes
   - Optimizes for email clients

2. **Email Building** (via grunt-email-builder)
   - Reads HTML files from `src/html/`
   - Inlines CSS referenced via `<link>` tags
   - Optimizes for email delivery
   - Outputs production-ready files to `build/html/`

3. **File Watching**
   - Monitors SCSS files and triggers Compass compilation
   - Monitors HTML and CSS files and triggers email building
   - Uses `grunt-newer` to only rebuild changed files

### Output

Compiled, production-ready email templates are generated in:
```
build/html/
├── components/
├── columns/
├── headers/
├── sections/
└── wrappers/
```

These files have all CSS inlined and are ready to use in email campaigns.

## Email Client Targets

Components are designed and tested for compatibility with:
- **iPhone Mail** (latest iOS)
- **Android Mail app**
- **Gmail mobile apps** (iOS & Android)
- **Desktop Gmail** (web)
- **Apple Mail**
- **Outlook 2016**

## Responsive & Dark Mode Requirements

### Desktop Layout
- Maximum width: 600px
- Centered layout with side gutters
- All styles must be inlined for Gmail compatibility

### Mobile Breakpoint
```css
@media (max-width: 600px) {
  /* Mobile-specific styles */
}
```
- Full-width layout on mobile devices
- Columns stack vertically
- Touch-friendly button sizes
- Optimized font sizes for readability

### Dark Mode Support
- CSS classes and media queries for dark mode detection
- Contrast-appropriate color schemes
- Background colors that adapt to dark themes
- Test in iOS Mail, Gmail, and Outlook dark modes

## Coding Standards

### Critical Requirements

1. **Inline All Styles**
   - Gmail strips `<style>` tags from emails
   - All CSS must be inlined as style attributes
   - Build process handles inlining automatically via grunt-email-builder

2. **Table-Based Layouts**
   - Use tables for layout structure (not divs)
   - Essential for Outlook 2016 compatibility
   - Nested tables for complex layouts

3. **Image Accessibility**
   - All images require `alt` attributes
   - Descriptive alt text for screen readers
   - Consider what displays when images are blocked

4. **MSO Conditionals**
   - Use MSO conditional comments for Outlook-specific fixes
   ```html
   <!--[if mso]>
     <table>...</table>
   <![endif]-->
   ```

5. **Font Stack**
   - Recommended: `'Noto Sans', 'Source Sans Pro', Arial, sans-serif`
   - Web-safe fallbacks required
   - Test font rendering across email clients

### Brand Color Palette Example

When implementing branded emails, define your color palette clearly. Example from Zurich Travel Insurance project:

```css
Navy: #003d6e
Zurich Blue: #0076be
Purple: #302261
Teal: #64c5b9
Pink: #db5989
Red Accent: #af0827
```

Use CSS variables or SCSS variables for consistent color application across components.

## Key Features

### Responsive Design
All components include mobile-optimized styles that adapt to small screens using media queries and fluid layouts.

### Email Client Compatibility
- Table-based layouts for maximum compatibility across all clients
- All CSS inlined automatically (Gmail requirement)
- MSO conditional comments for Outlook 2016
- Dark mode support via media queries and CSS classes
- Tested across iPhone Mail, Android Mail, Gmail, Apple Mail, and Outlook

### Modular & DRY
- Each component is self-contained with its own styles
- Reusable across different templates
- No duplicate code
- Easy to maintain and update

### Flexibility
Mix and match components to create unlimited template variations without writing new HTML or CSS.

## Testing

The `test/` directory can be used for testing email templates. Send test emails to various email clients to ensure compatibility.

## Contributing

When adding new components:

1. Create the HTML file in the appropriate directory (`components/`, `columns/`, etc.)
2. Create matching SCSS file in `src/sass/` with the same directory structure
3. Include a `<link>` tag in the HTML pointing to the compiled CSS
4. Add responsive styles in a `responsive/` subdirectory if needed
5. Test across multiple email clients
6. Build and verify the output in `build/html/`

## License

MIT License - See LICENSE.md for details

## Author

Stuart Santos
