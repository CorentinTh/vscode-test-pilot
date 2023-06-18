import type { Node } from 'acorn';
import { parse } from 'acorn-loose';

export { isFunctionName, getFunctionsNames };

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

function getFunctionsNames({ editorLine }: { editorLine: string }): string[] {
  const ast = parse(editorLine, { ecmaVersion: 2023 });

  const functionNames: string[] = [];

  const walk = (node: Node) => {
    if (node.type === 'FunctionDeclaration') {
      functionNames.push(node.id.name);
    }

    if (node.type === 'VariableDeclaration') {
      node.declarations.forEach(declaration => {
        if (declaration.type === 'VariableDeclarator' && declaration.id.type === 'Identifier') {
          functionNames.push(declaration.id.name);
        }
      });
    }

    if (node.type === 'AssignmentExpression' && node.left.type === 'Identifier') {
      functionNames.push(node.left.name);
    }

    if (node.type === 'Property' && node.key.type === 'Identifier') {
      

  return [];
}
