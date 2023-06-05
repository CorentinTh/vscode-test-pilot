import { writeFile } from '../fs/fs.services';
import { getTestFileContents, getTestFileContentsNewContent, getTestFilePath } from './test-pilot.services';
import type { TestPilotConfig } from './test-pilot.types';

export { createTestForFunction };

async function createTestForFunction({ functionName, sourceFilePath, config }: { functionName: string; sourceFilePath: string; config: TestPilotConfig }) {
  const { testFileExtensionPrefix, addExtensionInImport, extraImportsForNewTestFiles } = config;

  const testFilePath = await getTestFilePath({ sourceFilePath, extensionPrefix: testFileExtensionPrefix });

  const testFileContents = await getTestFileContents({ testFilePath });

  const newTestFileContents = await getTestFileContentsNewContent({
    testFilePath,
    functionName,
    initialContent: testFileContents,
    sourceFilePath,
    addExtensionInImport,
    extraImports: extraImportsForNewTestFiles,
  });

  await writeFile({ filePath: testFilePath, content: newTestFileContents });

  return { testFilePath };
}
