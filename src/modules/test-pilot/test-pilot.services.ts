import { fileExists, readFile } from '../fs/fs.services';
import { buildImportStatement, buildTestFilePath, getSuiteName } from './test-pilot.models';

export { getAdjacentTestFile, getTestFilePath, getTestFileContents, getTestFileContentsNewContent };

async function getTestFilePath({ sourceFilePath, extensionPrefix }: { sourceFilePath: string; extensionPrefix: string }) {
  const adjacentTestFile = await getAdjacentTestFile({ sourceFilePath, extensionPrefix });

  if (adjacentTestFile) {
    return adjacentTestFile;
  }

  const testFilePath = buildTestFilePath({ sourceFilePath, extensionPrefix });

  return testFilePath;
}

async function getAdjacentTestFile({ sourceFilePath, extensionPrefix }: { sourceFilePath: string; extensionPrefix: string }): Promise<string | undefined> {
  const testFilePath = buildTestFilePath({ sourceFilePath, extensionPrefix: 'test' });
  const specFilePath = buildTestFilePath({ sourceFilePath, extensionPrefix: 'spec' });
  const customFilePath = buildTestFilePath({ sourceFilePath, extensionPrefix });

  if (await fileExists({ filePath: testFilePath })) {
    return testFilePath;
  }

  if (await fileExists({ filePath: specFilePath })) {
    return specFilePath;
  }

  if (await fileExists({ filePath: customFilePath })) {
    return customFilePath;
  }
}

async function getTestFileContents({ testFilePath }: { testFilePath: string }) {
  if (!(await fileExists({ filePath: testFilePath }))) {
    return '';
  }

  const testFileContents = await readFile({ filePath: testFilePath });

  return testFileContents;
}

async function getTestFileContentsNewContent({
  testFilePath,
  functionName,
  initialContent,
  sourceFilePath,
  addExtensionInImport = false,
  extraImports = [],
}: {
  testFilePath: string
  functionName: string
  initialContent: string
  sourceFilePath: string
  addExtensionInImport?: boolean
  extraImports?: string[]
}) {
  const importStatement = buildImportStatement({ functionName, sourceFilePath, includeExtension: addExtensionInImport });
  const importStatements = [importStatement, ...extraImports].join('\n');
  const newSuite = `describe('${functionName}', () => {\n    it('', () => {\n      \n    });\n  });`;

  if (initialContent.includes('describe(')) {
    // only add new import, not the extra ones
    return [importStatement, initialContent.replace(/(.*)\}\);\s*$/gms, `$1\n  ${newSuite}\n});\n`)].join('\n');
  }

  const suiteName = getSuiteName({ testFilePath });

  return [importStatements, initialContent, `describe('${suiteName}', () => {\n  ${newSuite}\n});\n`].join('\n');
}
