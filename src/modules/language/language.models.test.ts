import { describe, expect, it } from 'vitest';

import { isFunctionName } from './language.models';

describe('language models', () => {
  describe('isFunctionName', () => {
    it('checks if a given keyword is a function name', () => {
      expect(
        isFunctionName({
          editorLine: 'function functionName() {',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName = function() {',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName = (',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName(',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName: function() {',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName = async function() {',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName = async (',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      expect(
        isFunctionName({
          editorLine: 'functionName: async function() {',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(true);

      // non functions

      expect(
        isFunctionName({
          editorLine: 'functionName = 1',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(false);

      expect(
        isFunctionName({
          editorLine: 'functionName',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(false);

      expect(
        isFunctionName({
          editorLine: 'const functionName = ""',
          maybeFunctionName: 'functionName',
        }),
      ).toEqual(false);
    });
  });
});
