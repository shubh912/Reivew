# Review page integration

The Google Review flow from the `Review-page` project is integrated directly into Saketpackers.

## Customer URL

`/review`

Example:

`https://saketpackers.vercel.app/review`

## Behaviour

- `/review` is a hidden route and is not added to the normal site navigation.
- The normal Saketpackers header, footer, mobile CTA and WhatsApp floating button are not rendered on the review route.
- The Review-page generator remains inside the Saketpackers deployment; there is no iframe and no redirect to another site.
- The generated review text is copied to the clipboard and the Google review page is opened for the customer to paste/edit and submit themselves.
- The QR code should point directly to `/review`.
