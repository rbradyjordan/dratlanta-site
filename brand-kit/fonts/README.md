# Newsreader, trimmed

Source: Newsreader variable (latin subset) from Google Fonts, © 2020 The Newsreader Project Authors, SIL Open Font License 1.1, no reserved font name.

Trimmed with `fonttools varLib.instancer` so the page only downloads what it draws:

| File | Weight axis | Optical size axis | Size | Was |
|---|---|---|---|---|
| newsreader-upright.woff2 | 300 to 400 | 12 to 72 | 85 KB | 129 KB |
| newsreader-italic.woff2 | pinned at 300 | 12 to 72 | 59 KB | 144 KB |

The site uses the serif at weights 300 and 400 only, and the italic at 300 only. If a design change needs a heavier serif, regenerate from the Google Fonts file with a wider `wght` range:

    instancer.instantiateVariableFont(font, {'wght': (300, 400), 'opsz': (12, 72)})
