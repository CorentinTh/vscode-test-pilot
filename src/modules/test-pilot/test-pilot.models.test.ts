import { describe, expect, it } from 'vitest';
import { buildImportStatement, buildTestFilePath, getSuiteName } from './test-pilot.models';

describe('test-pilot models', () => {
  describe('getSuiteName', () => {
    it('generates a test suite name from a file path', () => {
      expect(getSuiteName({ testFilePath: 'src/modules/test-pilot/test-pilot.models.test.ts' })).toEqual('test-pilot models');
      expect(getSuiteName({ testFilePath: 'test-pilot.models.test.ts' })).toEqual('test-pilot models');
      expect(getSuiteName({ testFilePath: 'test-pilot.models.ts' })).toEqual('test-pilot models');
      expect(getSuiteName({ testFilePath: 'test-pilot.ts' })).toEqual('test-pilot');
    });
  });

  describe('buildTestFilePath', () => {
    it('generates the path for test file of a given src file', () => {
      expect(buildTestFilePath({ sourceFilePath: 'src/modules/test-pilot/test-pilot.models.ts' })).toEqual('src/modules/test-pilot/test-pilot.models.test.ts');
      expect(buildTestFilePath({ sourceFilePath: 'test-pilot.models.ts' })).toEqual('test-pilot.models.test.ts');
      expect(buildTestFilePath({ sourceFilePath: 'test-pilot.ts' })).toEqual('test-pilot.test.ts');
    });

    it('the extension prefix (test by default) can be customized', () => {
      expect(buildTestFilePath({ sourceFilePath: 'test-pilot.ts', extensionPrefix: 'spec' })).toEqual('test-pilot.spec.ts');
    });
  });

  describe('buildImportStatement', () => {
    it('generates an import statement for a given function and it\'s source file', () => {
      expect(buildImportStatement({ functionName: 'myFunction', sourceFilePath: 'src/modules/test-pilot/test-pilot.models.ts' })).toEqual('import { myFunction } from \'./test-pilot.models\';');
      expect(buildImportStatement({ functionName: 'myFunction', sourceFilePath: 'test-pilot.models.ts' })).toEqual('import { myFunction } from \'./test-pilot.models\';');
      expect(buildImportStatement({ functionName: 'myFunction', sourceFilePath: 'test-pilot.ts' })).toEqual('import { myFunction } from \'./test-pilot\';');
    });

    it('the extension can be included in the import statement with a flag argument', () => {
      expect(buildImportStatement({ functionName: 'myFunction', sourceFilePath: 'src/modules/test-pilot/test-pilot.models.ts', includeExtension: true })).toEqual(
        'import { myFunction } from \'./test-pilot.models.ts\';',
      );
    });
  });
});
