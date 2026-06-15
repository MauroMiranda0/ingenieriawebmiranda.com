# Feature Specification: Recursos — Technical Content from Docs

**Feature Branch**: `001-recursos-docs-content`

**Created**: 2026-06-09

**Status**: Draft

**Input**: User description: "usa los archivcos de la carpeta docs"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Technical Resources (Priority: P1)

As a potential client visiting the site, I want to browse technical resources derived from the project documentation so that I can evaluate the team's technical expertise and methodology before requesting a diagnosis.

**Why this priority**: This is the core value of the feature — turning internal project documentation into client-facing trust signals. Without this, the recursos page remains empty ("en construcción"), which undermines credibility.

**Independent Test**: Can be fully tested by navigating to `/recursos/` and confirming at least 3 resource entries are displayed with titles, summaries, and readable content.

**Acceptance Scenarios**:

1. **Given** I am on any page of the site, **When** I click "Recursos" in the navigation, **Then** I am taken to `/recursos/` showing a list of technical resources
2. **Given** I am on the recursos listing page, **When** I click a resource title, **Then** the full content of that resource is displayed
3. **Given** I am viewing a resource, **When** I read its content, **Then** all headings, lists, and code blocks are properly formatted and readable

---

### User Story 2 - Resource Categorization (Priority: P2)

As a visitor browsing resources, I want resources grouped by category so that I can quickly find the type of information I need (methodology, technical reference, or architecture decisions).

**Why this priority**: Categorization improves findability without requiring search functionality. Moderate effort, high user experience value.

**Independent Test**: Can be fully tested by visiting `/recursos/` and verifying that resources appear under distinct category headings.

**Acceptance Scenarios**:

1. **Given** I am on the recursos listing page, **When** I scan the page, **Then** I see resources grouped under category headings (e.g., "Metodología", "Referencia Técnica", "Arquitectura")
2. **Given** I am on the recursos page, **When** I read a category heading, **Then** only resources belonging to that category appear underneath it

---

### User Story 3 - Downloadable Resources (Priority: P3)

As a visitor who wants to share or save technical information, I want to download key resources as print-friendly documents so that I can reference them offline or share with my team.

**Why this priority**: Adds tangible value but is not essential for the initial launch of the resources section. Can be deferred without impacting core functionality.

**Independent Test**: Can be fully tested by clicking a download button on any resource page and receiving a formatted document.

**Acceptance Scenarios**:

1. **Given** I am viewing a resource, **When** I click "Descargar PDF", **Then** a print-friendly document begins downloading
2. **Given** I download a resource, **When** I open the file, **Then** all content (headings, lists, code blocks) is preserved and readable offline

---

### Edge Cases

- What happens when a resource contains code blocks or technical diagrams?
- How does the system handle very long documents (e.g., SPECIFICATION.md at 240 lines)?
- What is shown when no download format is available for a specific resource?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The recursos page MUST display at least 3 technical resources derived from the docs folder content (CONSTITUTION.md, TECHNICAL_PLAN.md, SPECIFICATION.md)
- **FR-002**: Each resource MUST have a visible title, a 1–2 sentence summary, and access to its full content view
- **FR-003**: Resources MUST be grouped by category — at minimum "Metodología" and "Referencia Técnica"
- **FR-004**: The recursos listing page MUST follow the site's existing visual identity: no border-radius on cards, blueprint aesthetic, typography system (Playfair Display for headings, Inter for body)
- **FR-005**: Navigation to `/recursos/` MUST work from the site's main navigation bar on all 18 pages
- **FR-006**: Resource content MUST render headings, bullet lists, numbered lists, and code blocks with correct formatting
- **FR-007**: Each resource page MUST have unique `title`, `description`, `ogTitle`, and `ogDescription` metadata
- **FR-008**: Downloadable resources (P3) MUST be generated as static files — no server-side processing on page request

### Key Entities *(include if feature involves data)*

- **Resource**: A piece of technical content adapted from project docs. Attributes: title, summary, category, full content body, last-updated date, download URL (optional).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can browse all available resources within 2 clicks from the site home page
- **SC-002**: Each resource page renders fully in under 2 seconds (measured on a standard broadband connection)
- **SC-003**: All 3 primary resources (constitution, technical plan, specification) are published and navigable
- **SC-004**: Each resource page passes the same SEO metadata audit required by the site (unique title, description, OG tags)
- **SC-005**: Resource content is readable on mobile, tablet, and desktop viewports without horizontal scrolling

## Assumptions

- Content is static and hand-authored (adapted from docs, not auto-generated or synced at build time)
- The docs folder content is considered source material that will be edited and adapted for a public audience (not published verbatim)
- Internal session notes (`docs/contexto.md`) are excluded from public resources
- Downloadable format (P3) will be HTML-based print stylesheets, not true PDF generation, unless a build-time tool is added
- No authentication or access control is needed — all resources are public
