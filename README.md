![Banner](https://github.com/CorentinTh/vscode-test-pilot/blob/main/assets/readme-banner.png?raw=1)

![Demo presentation gif](https://github.com/CorentinTh/vscode-test-pilot/blob/main/assets/demo-presentation.gif?raw=1)

# VsCode Test Pilot

This extension permits to easily create test boilerplate for given functions.

Find the extension on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=cthmsst.test-pilot).

## Features
- Trigger the refactor on a function name
- Create test boilerplate for a given function
- Update tests when a test file is already present


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
