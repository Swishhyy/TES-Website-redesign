# Trinity Episcopal School — website redesign proposal

A simpler, informative website proposal for Trinity Episcopal School in Marshall, Texas, prepared for school review. This project is independent of the current school website and is not an official replacement.

## What is included

- Seven complete pages: Home, About, Programs, Admissions, Parent Resources, Calendar, and Contact, plus a custom 404 page.
- The original mission and vision wording from the school’s About page.
- School photographs and the existing fleur-de-lis brand mark.
- Readable 2026–2027 tuition tables and key calendar dates, with the original published schedules available.
- Existing FACTS applications, returning-student enrollment, parent portal, donation, and school document links.
- Responsive navigation, keyboard support, a skip link, print styling, and reduced-motion support.

## Run locally

Node.js 18 or later and Python 3 are sufficient. No npm packages are required.

```sh
npm run build
npm run check
npm run serve
```

Open `http://localhost:8080`.

## Editing

- `scripts/build.mjs` contains the content, shared header/footer, and page templates.
- `dist/styles.css` contains the responsive visual design.
- `dist/site.js` contains the mobile menu and print action.
- `dist/assets/` contains the existing school assets.
- Run `npm run build` after changing page content. CSS and JavaScript are served directly from `dist/`.

The checked-in `dist/` directory can be hosted on any static web server. `.openai/hosting.json` identifies the private proposal preview on Sites.

## Proposal boundary

The preview is private and marked `noindex`. The contact and tour buttons open email or phone apps; they do not imply a message has been sent or a tour confirmed. Enrollment, payments, donations, school documents, and the parent portal continue through the school’s existing services. No student records or credentials are stored here.

Before an official launch, the school should approve the wording and image use, confirm staff names, tuition and calendar details, provide the current handbook (the existing website currently links a 2025–2026 version), choose a content-editing workflow, and configure its domain. A newsletter or contact-form service can be added if the school chooses one.

See `CONTENT_SOURCES.md` for the source inventory and preservation notes.
