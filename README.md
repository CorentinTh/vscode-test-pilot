![Banner](./assets/readme-banner.png)

![Demo presentation gif](./assets/demo-presentation.gif)

# VsCode Test Pilot

This extension permits to easily create test boilerplate for given functions.

## Configuration

You can configure the extension with the following settings:

```js
{
  // Prefix for test files, default: 'test'
  "testPilot.testFileExtensionPrefix": "spec",

  // Add the extension in the import statement, default: false
  "testPilot.addExtensionInImport": true,

  // Extra imports to add in the new test file, default: []
  "testPilot.extraImportsForNewTestFiles": ["import { expect } from 'chai';"]
}
```

## Credits

Coded with love by [Corentin Thomasset](https://github.com/CorentinTh).

Green chemistry icon used in the logo created by [Fazrian Zahrawani - Flaticon](https://www.flaticon.com/free-icon/green-chemistry_8181284?term=green+chemistry&page=1&position=20&origin=search&related_id=8181284 'Green chemistry icons')
