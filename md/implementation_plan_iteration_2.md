# Implementation Plan — Aligning Events Labels & Component Accessibility with Best Practices

Walk through of all **Events section labels, interactive controls, calendar views, and detail modals**, identifying existing accessibility flaws and defining precise technical changes to align them with WCAG 2.2 AAA & WAI-ARIA standards.

---

## Identified Potential Accessibility Issues

### 1. Ambiguous "View Details" Button Labels in Event List View
- **File**: `app.js` (L700-L702)
- **Flaw**: Every event item in List View renders `<button ...>View Details</button>`. When screen reader users navigate by buttons (VoiceOver rotor, NVDA elements list), they hear 6 identical "View Details" buttons without knowing which event each button opens.
- **WCAG Impact**: WCAG 2.4.6 (Headings and Labels - Level AA), WCAG 4.1.2 (Name, Role, Value - Level A).

### 2. Category Color Encoding Missing from Event Chip Accessible Names
- **File**: `app.js` (L640-L645)
- **Flaw**: Event category (Keynote, Exhibition, Workshop, Panel, Webinar) is indicated visually via border color classes (`cat-keynote`, `cat-workshop`, etc.), but `evt.categoryName` is omitted from the button's `aria-label="${evt.title}, ${evt.time}"`. Screen reader users miss the event type entirely.
- **WCAG Impact**: WCAG 1.4.1 (Use of Color - Level A), WCAG 1.3.1 (Info and Relationships - Level A).

### 3. Inconsistent Accessible Name vs. Visible Text on View Toggle Buttons (Label in Name)
- **File**: `index.html` (L435-L442)
- **Flaw**: `<button id="btn-view-grid" aria-label="Grid View"><span>Grid</span></button>` uses `aria-label="Grid View"` while visible text is `"Grid"`. Speech-recognition and screen-reader users encounter mismatch between what is displayed and what ARIA announces.
- **WCAG Impact**: WCAG 2.5.3 (Label in Name - Level A).

### 4. Broken ARIA Grid Hierarchy in Calendar View
- **File**: `index.html` (L453-L465) & `app.js` (L615-L673)
- **Flaw**: 
  - `role="row"` and `role="columnheader"` are placed on `<div class="calendar-weekdays">`, which is outside `<div role="grid">`.
  - Grid cell elements (`.calendar-day-cell`) are flat children without row wrappers (`role="row"`).
  - Parent `<div role="gridcell" aria-label="August 5, 2026">` wraps interactive `<button>` chips, causing screen readers to misinterpret or swallow inner button names when navigating cells.
- **WCAG Impact**: WCAG 1.3.1 (Info and Relationships - Level A), WCAG 4.1.2 (Name, Role, Value - Level A).

### 5. Unannounced Date Abbreviation & Lack of Accessible Context in Date Badges
- **File**: `app.js` (L684-L685) & `index.html` (L663-L664)
- **Flaw**: Text `"AUG"` in list items is read as spelled-out letters `"A-U-G"` by screen readers without `<abbr title="August">` markup or explicit date labeling.

### 6. Event Modal Focus Trap & Action Button Labeling
- **File**: `app.js` (L765-L826) & `index.html` (L646-L702)
- **Flaw**: `#event-modal` lacks the keyboard focus trap (`Tab` wrap) present in `#project-modal`. Additionally, the "Add to Calendar" button lacks event context in its label and uses a non-accessible `alert()` notification.
- **WCAG Impact**: WCAG 2.1.2 (No Keyboard Trap - Level A), WCAG 4.1.2 (Name, Role, Value - Level A).

---

## Proposed Changes

### Component 1: Event List & Calendar Grid Rendering (`app.js`)

#### [MODIFY] [app.js](file:///c:/Users/glafi/Projects/ai-a11y-generation/app.js)
- Update `renderCalendar()` to generate unambiguous button labels:
  - Add `aria-label="View details for ${evt.title}"` to all list view "View Details" buttons.
  - Update grid chip buttons `aria-label` to include category: `aria-label="${evt.categoryName}: ${evt.title}, at ${evt.time}"`.
- Wrap date month abbreviations in `<abbr title="August">AUG</abbr>`.
- Fix calendar grid structure in JS by wrapping 7-day groups in proper `role="row"` elements.
- Add `aria-hidden="true"` to decorative location SVG icons and category dots.
- Implement full focus trap & escape key handler for `initEventModal()`.

---

### Component 2: HTML Markup (`index.html`)

#### [MODIFY] [index.html](file:///c:/Users/glafi/Projects/ai-a11y-generation/index.html)
- Remove `aria-label="Grid View"` and `aria-label="List View"` from view toggle buttons, relying on visible text `Grid` and `List` alongside `svg aria-hidden="true"` to satisfy WCAG Label in Name.
- Add `aria-hidden="true"` to visual category dots in filter pills (`<span class="category-dot ..."></span>`).
- Restructure calendar weekdays container into the calendar grid hierarchy so `role="row"` and `role="columnheader"` are properly enclosed within `role="grid"`.
- Update `#event-modal-add-cal` button with descriptive `aria-label` and screen reader live notification.

---

### Component 3: CSS Styles (`styles.css`)

#### [MODIFY] [styles.css](file:///c:/Users/glafi/Projects/ai-a11y-generation/styles.css)
- Ensure all category contrast ratios for event chips (`.cat-keynote`, `.cat-exhibition`, `.cat-workshop`, `.cat-panel`, `.cat-webinar`) meet WCAG AAA benchmarks (>= 7:1 for text, >= 3:1 for UI borders).
- Add crisp focus indicators for calendar event chips and date cells.

---

## User Review Required

> [!IMPORTANT]
> **Key Architectural Decision for Calendar ARIA Grid**:
> Re-structuring the calendar grid into a fully compliant WAI-ARIA grid pattern (`role="grid"` -> `role="row"` -> `role="gridcell" / role="columnheader"`) ensures screen reader table navigation works seamlessly across NVDA, JAWS, and VoiceOver.

---

## Verification Plan

### Automated / Syntax Tests
- Code linting and DOM attribute validation for valid ARIA roles and parent-child hierarchies.

### Manual Verification
- **Screen Reader Testing**: Navigate the Events section (Grid View and List View) using NVDA / VoiceOver to verify:
  1. Category names are explicitly announced for each event chip.
  2. "View Details" buttons announce full event titles.
  3. View mode buttons announce "Grid" and "List" matching visible labels.
  4. Abbreviated month names announce as "August".
  5. Event modal opens with focus trapped inside and restores focus upon closing.
