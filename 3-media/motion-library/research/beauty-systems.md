# Public design systems relevant to a lash/facial booking site

Method: web search results only (WebFetch not used). Pages were not opened in full, so "what it offers" comes from search snippets. Date: 2026-10-01.

## Q1. Beauty/wellness/salon booking brands with public design or brand docs

Honest answer: almost nothing. No beauty or salon booking product (Fresha, Vagaro, Booksy, Square Appointments, Acuity, Glossier, Aesop, Sephora, Rhode, Heyday) turned up a public design system, and none turned up a motion guideline. Only Mindbody has a public brand page, and it covers logo use only. Cal.com is a booking product with open code, not a design system. Calendly and the beauty brands were not found (not confirmed absent).

| Name | Link | What it offers | Motion section | Confidence |
|---|---|---|---|---|
| Mindbody Brand Resources | https://www.mindbodyonline.com/company/brand | Logo downloads and usage rules (clear space). Logo only. | No | Medium (snippet only) |
| Mindbody Developers branding requirements | https://developers.mindbodyonline.com/Resources/BrandingRequirements | Partner branding rules for the logo | No | Medium |
| Cal.com Atoms (booker, DatePicker, TimeSelector, ContactForm) | https://cal.com/docs/atoms/introduction | Open-source React booking components; real working reference for the pick-date, pick-time, details flow. Not a documented design system. | Not found | Medium |
| Fresha, Vagaro, Booksy, Square Appointments, Acuity, Calendly | not found | No public brand or design docs found | n/a | Low (absence from one search is not proof) |
| Glossier, Aesop, Sephora, Rhode, Heyday | not searched in depth | Nothing surfaced. Presumed no public design system. | n/a | Low, unverified |

## Q2. General design systems with booking-flow patterns

| Name | Link | What it offers | Motion section | Confidence |
|---|---|---|---|---|
| Shopify Polaris, Date picking pattern | https://polaris.shopify.com/patterns/date-picking | Smart defaults, close after a single date, always offer a text-entry alternative (accessibility) | Not found | High (snippet) |
| Shopify Polaris, Date picker component | https://polaris.shopify.com/components/date-picker | Single date, multiple dates, ranges, disabled dates before or after a limit | Not found | High |
| GOV.UK, Date input | https://design-system.service.gov.uk/components/date-input/ | Three-field accessible date entry (for memorable dates) | No | High |
| GOV.UK, Confirmation pages | https://design-system.service.gov.uk/patterns/confirmation-pages | Required content: reference number, what happens next and when, contact details, a way to save a record | No | High |
| GOV.UK, Question pages | https://design-system.service.gov.uk/patterns/question-pages/ | One question per page; good basis for step flows | No | Medium |
| GOV.UK, Step by step navigation | https://design-system.service.gov.uk/patterns/step-by-step-navigation/ | Step navigation pattern (more about content journeys than checkout) | No | Medium |
| Material 3, Easing and duration | https://m3.material.io/styles/motion/easing-and-duration | Emphasized easing, durations: 500 ms on-screen transitions, 400 ms enter (decelerate), 200 ms exit (accelerate); the real motion reference | Yes | High |
| Material 3, Components (date and time pickers) | https://m3.material.io/components | Date and time picker components; modal dialog on mobile | Partly (via motion section) | Medium |
| Material 2, Time pickers | https://m2.material.io/components/time-pickers | Older time picker guidance | No | Medium |
| Carbon, Progress indicator | https://carbondesignsystem.com/components/progress-indicator/usage/ | Step progress with 7 states (complete, current, not started, error, disabled, hover, focus) | No | High |
| Carbon, Loading pattern | https://v10.carbondesignsystem.com/patterns/loading-pattern/ | When to show loading indicators vs progress | No | High |
| Carbon, Progress bar | https://carbondesignsystem.com/components/progress-bar/usage/ | Determinate vs indeterminate bars | No | High |
| Atlassian Design, Components overview | https://atlassian.design/components | Progress tracker (steps in a journey), spinner; has a separate motion utilities section | Yes (motion utilities) | Medium (snippet only; exact motion URL not verified) |
| eBay Playbook, Motion tokens | https://playbook.ebay.com/design-system/tokens/motion-tokens | Motion tokens (named durations and easings) | Yes | Medium |

## Gaps and advice
- No public system documents a salon-specific booking flow end to end. Combine: Cal.com Atoms (structure), Polaris (date picking rules), Carbon (step indicator), GOV.UK (confirmation content), Material 3 (timings).
- Loading guidance: Carbon only. Confirmation motion: none documented anywhere found.
- Not verified: Atlassian motion URL, whether Calendly or the beauty brands publish anything, any content beyond search snippets.
