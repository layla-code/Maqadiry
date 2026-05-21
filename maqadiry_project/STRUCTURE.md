# Project structure

- `js/core`: shared constants, DOM helpers, storage, general UI helpers
- `js/data`: static application data
- `js/components`: shared layout and modal components
- `js/pages`: page-specific rendering logic
- `js/main.js`: bootstraps the app on page load

This refactor keeps the same pages and behavior while reducing duplication and improving maintainability.
