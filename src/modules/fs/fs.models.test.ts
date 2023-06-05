import { describe, expect, it } from 'vitest';
import { getFileName, getFileNameWithoutExtension } from './fs.models';

describe('fs models', () => {
  describe('getFileNameWithoutExtension', () => {
    it('retrieve the filename from a path without the extension', () => {
      expect(getFileNameWithoutExtension({ filePath: 'src/modules/test-pilot/test-pilot.models.test.ts' })).toEqual('test-pilot.models.test');
      expect(getFileNameWithoutExtension({ filePath: 'test-pilot.models.test.ts' })).toEqual('test-pilot.models.test');
      expect(getFileNameWithoutExtension({ filePath: 'test-pilot.models.ts' })).toEqual('test-pilot.models');
      expect(getFileNameWithoutExtension({ filePath: 'test-pilot.ts' })).toEqual('test-pilot');
      expect(getFileNameWithoutExtension({ filePath: 'test-pilot' })).toEqual('test-pilot');
    });

    it('if the path contains no filename the filename is undefined', () => {
      expect(getFileNameWithoutExtension({ filePath: 'src/modules/test-pilot/' })).toEqual(undefined);
      expect(getFileNameWithoutExtension({ filePath: '/' })).toEqual(undefined);
      expect(getFileNameWithoutExtension({ filePath: '' })).toEqual(undefined);
    });
  });

  describe('getFileName', () => {
    it('retrieve the filename from a path', () => {
      expect(getFileName({ filePath: 'src/modules/test-pilot/test-pilot.models.test.ts' })).toEqual('test-pilot.models.test.ts');
      expect(getFileName({ filePath: 'test-pilot.models.test.ts' })).toEqual('test-pilot.models.test.ts');
      expect(getFileName({ filePath: 'test-pilot.models.ts' })).toEqual('test-pilot.models.ts');
      expect(getFileName({ filePath: 'test-pilot.ts' })).toEqual('test-pilot.ts');
      expect(getFileName({ filePath: 'test-pilot' })).toEqual('test-pilot');
    });

    it('if the path contains no filename the filename is undefined', () => {
      expect(getFileName({ filePath: 'src/modules/test-pilot/' })).toEqual(undefined);
      expect(getFileName({ filePath: '/' })).toEqual(undefined);
      expect(getFileName({ filePath: '' })).toEqual(undefined);
    });
  });
});
