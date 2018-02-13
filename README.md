# wealthica-cryptos-addon

This add-on provides the Cryptocurrencies widget that displays latest pricing for the most popular cryptocurrencies in Wealthica Dashboard.

This repo also serves as an example of building add-ons for Wealthica using [Vue](https://vuejs.org), [webpack](https://webpack.js.org/).

## Installation ##

This project uses [`yarn`](https://yarnpkg.com/en/docs/install) for dependency management, but equivalent `npm` commands can be used instead.

### Install dependencies

`yarn install` (or `npm install`)

### Build

`yarn build` (or `npm run-script build`)

Build result will show up under `dist/`

## Build directory hierarchy

An add-on can contain more than 1 widget. Each widget needs to be placed under `dist/widgets/WIDGET_ID`.


### Example build hierarchy

(\*) are required entries.

    dist
    ├── addon.json (*)
    ├── icon.png (*)
    └── widgets (*)
        └── cryptocurrencies (*)
            ├── assets
            │   ├── css
            │   │   ├── app.css
            │   │   └── app.css
            │   ├── favicon.png
            │   ├── img
            │   │   ├── img1.png
            │   │   └── img2.svg
            │   └── js
            │       ├── app.js
            │       ├── app.js.map
            │       ├── vendor.js
            │       └── vendor.js.map
            ├── icon.png (*)
            └── index.html (*)

### addon.json

This file provides the add-on's information. Example:

    {
      "author_name": "Wealthica Financial Technology Inc.",
      "full_description": {
        "en": "Track your cryptocurrencies investments.",
        "fr": "Suivez vos investissements en cryptomonnaies."
      },
      "preview_images": [
        "data:image/jpeg;base64,...",
        "data:image/jpeg;base64,..."
      ]
    }
