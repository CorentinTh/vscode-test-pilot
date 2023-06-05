import { getFileName, getFileNameWithoutExtension } from '../fs/fs.models';

export { getSuiteName, buildTestFilePath, buildImportStatement };

function getSuiteName({ testFilePath }: { testFilePath: string }) {
  const testFileName = testFilePath.split('/').pop();

  if (!testFileName) {
    return '';
  }

  return testFileName
    .replace(/\.test|\.spec/, '')
    .split('.')
    .slice(0, -1)
    .join(' ');
}

function buildTestFilePath({ sourceFilePath, extensionPrefix = 'test' }: { sourceFilePath: string; extensionPrefix?: string }) {
  return sourceFilePath.replace(/\.([a-z]+)$/, `.${extensionPrefix}.$1`);
}

function buildImportStatement({ functionName, sourceFilePath: filePath, includeExtension = false }: { functionName: string; sourceFilePath: string; includeExtension?: boolean }) {
  const importSourceRelativePath = includeExtension ? getFileName({ filePath }) : getFileNameWithoutExtension({ filePath });

  return `import { ${functionName} } from './${importSourceRelativePath}';`;
}
