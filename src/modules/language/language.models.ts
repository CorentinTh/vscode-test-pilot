export { isFunctionName };

function isFunctionName({ maybeFunctionName, editorLine }: { maybeFunctionName: string; editorLine: string }): boolean {
  return [
    `function ${maybeFunctionName}`,
    `${maybeFunctionName}\\s*=\\s*(async )?function`,
    `${maybeFunctionName}\\s*=\\s*\\(`,
    `${maybeFunctionName}\\s*\\(`,
    `${maybeFunctionName}:\\s*(async )?function`,
    `${maybeFunctionName}\\s*=\\s*(async )?\\(`,
    `${maybeFunctionName}:\\s*(async )?\\(`,
  ].some(regexString => new RegExp(regexString).test(editorLine));
}
