import * as vscode from 'vscode';
import { isFunctionName } from './modules/language/language.models';
import type { TestPilotConfig } from './modules/test-pilot/test-pilot.types';
import { createTestForFunction } from './modules/test-pilot/test-pilot.usecases';
import { openFileAtLastLine } from './modules/vscode/vscode.services';

const commandName = 'testPilot.createTest';

class FunctionNameCodeActionProvider implements vscode.CodeActionProvider {
  provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection): vscode.ProviderResult<(vscode.Command | vscode.CodeAction)[]> {
    const functionNameRange = document.getWordRangeAtPosition(range.start);
    const functionName = document.getText(functionNameRange);

    if (!functionNameRange) {
      return;
    }

    const cursorIsOnFunctionName = isFunctionName({
      editorLine: document.lineAt(range.start.line).text,
      maybeFunctionName: functionName,
    });

    if (!cursorIsOnFunctionName) {
      return;
    }

    const codeAction = new vscode.CodeAction(`Create tests for ${functionName}`, vscode.CodeActionKind.QuickFix);

    codeAction.command = {
      command: commandName,
      title: 'Create Test',
      arguments: [{ functionName, sourceFilePath: document.fileName }],
    };

    return [codeAction];
  }
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.languages.registerCodeActionsProvider(
    ['javascript', 'typescript'].map(language => ({ language, scheme: 'file' })),
    new FunctionNameCodeActionProvider(),
    { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] },
  );

  context.subscriptions.push(disposable);

  vscode.commands.registerCommand(commandName, async ({ functionName, sourceFilePath }: { functionName: string; sourceFilePath: string }) => {
    const vscodeConfig = vscode.workspace.getConfiguration('testPilot');

    const config: TestPilotConfig = {
      addExtensionInImport: vscodeConfig.get('addExtensionInImport', false),
      extraImportsForNewTestFiles: vscodeConfig.get('extraImportsForNewTestFiles', []),
      testFileExtensionPrefix: vscodeConfig.get('testFileExtensionPrefix', 'test'),
    };

    const { testFilePath } = await createTestForFunction({
      functionName,
      sourceFilePath,
      config,
    });

    await openFileAtLastLine({ filePath: testFilePath });
  });
}
