import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createTestForFunction } from './test-pilot.usecases';

const createDirectory = () => mkdtemp(join(tmpdir(), 'test-pilot-'));
const removeDirectory = (path: string) => rm(path, { recursive: true });

describe('test-pilot usecases', () => {
  describe('createTestForFunction', () => {
    let testDirectoryPath: string;
    const getFileInTestDirectory = (fileName: string) => readFile(join(testDirectoryPath, fileName), 'utf-8');

    const defaultConfig = {
      testFileExtensionPrefix: 'test',
      addExtensionInImport: false,
      extraImportsForNewTestFiles: [],
    };

    beforeEach(async () => {
      testDirectoryPath = await createDirectory();
    });

    afterEach(async () => {
      await removeDirectory(testDirectoryPath);
    });

    describe('when their is no existing adjacent test file', () => {
      it('creates a test suite in a new file for a given function', async () => {
        await createTestForFunction({
          functionName: 'myFunction',
          sourceFilePath: join(testDirectoryPath, 'my-file.ts'),
          config: defaultConfig,
        });

        const testFileContents = await getFileInTestDirectory('my-file.test.ts');

        expect(testFileContents.trim()).toMatchInlineSnapshot(`
          "import { myFunction } from './my-file';

          describe('my-file', () => {
            describe('myFunction', () => {
              it('', () => {
                
              });
            });
          });"
        `);
      });

      it('the import statement as it\'s extension when addExtensionInImport flag is present', async () => {
        await createTestForFunction({
          functionName: 'myFunction',
          sourceFilePath: join(testDirectoryPath, 'my-file.ts'),
          config: { ...defaultConfig, addExtensionInImport: true },
        });

        const testFileContents = await getFileInTestDirectory('my-file.test.ts');

        expect(testFileContents.trim()).toMatchInlineSnapshot(`
          "import { myFunction } from './my-file.ts';

          describe('my-file', () => {
            describe('myFunction', () => {
              it('', () => {
                
              });
            });
          });"
        `);
      });

      it('creates a test suite with the extension prefix provided in testFileExtensionPrefix ', async () => {
        await createTestForFunction({
          functionName: 'myFunction',
          sourceFilePath: join(testDirectoryPath, 'my-file.ts'),
          config: { ...defaultConfig, testFileExtensionPrefix: 'spec' },
        });

        const testFileContents = await getFileInTestDirectory('my-file.spec.ts');

        expect(testFileContents.trim()).toMatchInlineSnapshot(`
          "import { myFunction } from './my-file';

          describe('my-file', () => {
            describe('myFunction', () => {
              it('', () => {
                
              });
            });
          });"
        `);
      });

      it('creates a test suite with the extra imports provided in extraImportsForNewTestFiles ', async () => {
        await createTestForFunction({
          functionName: 'myFunction',
          sourceFilePath: join(testDirectoryPath, 'my-file.ts'),
          config: { ...defaultConfig, extraImportsForNewTestFiles: ['import { expect } from \'./chai\';'] },
        });

        const testFileContents = await getFileInTestDirectory('my-file.test.ts');

        expect(testFileContents.trim()).toMatchInlineSnapshot(`
          "import { myFunction } from './my-file';
          import { expect } from './chai';

          describe('my-file', () => {
            describe('myFunction', () => {
              it('', () => {
                
              });
            });
          });"
        `);
      });
    });

    describe('when their is an existing adjacent test file', () => {
      it('adds the test suite to the existing file', async () => {
        await createTestForFunction({
          functionName: 'myFunction',
          sourceFilePath: join(testDirectoryPath, 'my-file.ts'),
          config: defaultConfig,
        });

        await createTestForFunction({
          functionName: 'myOtherFunction',
          sourceFilePath: join(testDirectoryPath, 'my-file.ts'),
          config: defaultConfig,
        });

        const testFileContents = await getFileInTestDirectory('my-file.test.ts');

        expect(testFileContents.trim()).toMatchInlineSnapshot(`
          "import { myOtherFunction } from './my-file';
          import { myFunction } from './my-file';

          describe('my-file', () => {
            describe('myFunction', () => {
              it('', () => {
                
              });
            });

            describe('myOtherFunction', () => {
              it('', () => {
                
              });
            });
          });"
        `);
      });
    });
  });
});
