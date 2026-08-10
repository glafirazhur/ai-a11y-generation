# Implementation Plan — HTML, JS & CSS Quality and Accessibility Refactoring

Comprehensive refactoring of the portfolio website to fix markup flaws, correct screen reader announcements, modernize `<dialog>` modal implementations, resolve JavaScript event listener edge cases, and eliminate CSS layout constraints.

## User Review Required

> [!IMPORTANT]
> The changes clean up non-standard `<div class="modal-backdrop">` overlays inside `<dialog>` tags and rely on native browser `dialog::backdrop` top-layer rendering. This ensures true modern accessibility compliance across screen readers and keyboard navigation without custom z-index workarounds.

## Proposed Changes

---

### Markup & Accessibility Enhancements

#### [MODIFY] [index.html](file:///c:/Users/glafi/Projects/ai-a11y-generation/index.html)

- **Search Status Live Region Fix**: Remove `aria-live="polite"` from `#search-results-count` to prevent screen readers from announcing duplicate search filter messages when `#a11y-announcer` also updates.
- **Calendar Layout View Toggle ARIA Fix**: Replace `role="radiogroup"` and `role="radio"` on `#btn-view-grid` and `#btn-view-list` buttons with standard accessible state attributes (`aria-pressed="true|false"`) to align with keyboard navigation expectations.
- **Modal Structure Cleanup**: Remove inner `<div class="modal-backdrop">` from both `#project-modal` and `#event-modal`, leveraging native CSS `dialog::backdrop`.
- **Form Error Accessibility**: Remove `class="hidden"` from static `aria-describedby` error span targets so screen readers do not attempt to parse `display: none` elements on initial input focus, dynamically controlling error text visibility.

---

### JavaScript Logic & Event Handling

#### [MODIFY] [app.js](file:///c:/Users/glafi/Projects/ai-a11y-generation/app.js)

- **Modal External Link Population**: Update `openModal(id)` to set `document.getElementById('modal-external-link').href` from `PROJECTS_DATA[id].link`.
- **Native `<dialog>` Cancel Event Listeners**: Attach native `cancel` event listeners to both `#project-modal` and `#event-modal` to ensure state cleanup, focus restoration (`lastFocusedElement.focus()`), and class removal occur seamlessly when closing dialogs via native `Escape` key.
- **Search Keyboard Shortcut**: Add an `Escape` keypress listener on `#project-search-input` to quickly clear active searches.
- **Mobile Navigation Outside Click & Escape Handlers**: Add global click-outside and `Escape` keydown handlers to close `#primary-navigation` when open on mobile viewports.
- **Form Error Management**: Update `validateSingleField()` to dynamically manage `aria-describedby` association when field errors occur.

---

### CSS & Layout Improvements

#### [MODIFY] [styles.css](file:///c:/Users/glafi/Projects/ai-a11y-generation/styles.css)

- **Native `<dialog>` & Backdrop Styling**: Replace fixed full-viewport `position: fixed` overrides on `.project-modal` with native browser `<dialog>` styling (`margin: auto; width: calc(100vw - 2rem); max-width: 780px; border: none;`) and style `.project-modal::backdrop` with glassmorphic backdrop blur.
- **Card Description Height Relaxation**: Change `height: 4.65em` on `.card-description` to `max-height: 4.65em` (or rely on `-webkit-line-clamp: 3`), allowing descriptions with shorter text to fit naturally without empty gaps.
- **Focus Outline Reliability**: Ensure `:focus-visible` styling gracefully falls back for keyboard navigation without breaking default focus indicators.

---

## Verification Plan

### Automated Verification
- Run a local static analysis / lint check on HTML, CSS, and JS files if available.

### Manual Verification
- **Search Filtering**: Type into `#project-search-input`, test clearing with `clearBtn` and `Escape`, verify screen reader announcer text is declared once without duplicates.
- **Dialog Testing**: Trigger project detail modals and event modals, verify backdrop blur, test closing via close button, backdrop click, and `Escape` key, ensuring focus is restored to the initiating button.
- **View Toggle & Mobile Navigation**: Test grid/list view toggles on calendar section and test opening/closing mobile navigation menu using hamburger toggle, `Escape` key, and outside clicks.
- **Contact Form Validation**: Submit empty fields, verify live validation error messages and smooth focus management.
