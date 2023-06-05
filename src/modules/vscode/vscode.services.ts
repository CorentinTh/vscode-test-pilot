import * as vscode from 'vscode';

export { openFileAtLastLine };

async function openFileAtLastLine({ filePath }: { filePath: string }) {
  const document = await vscode.workspace.openTextDocument(filePath);

  const lastLine = document.lineCount - 1;
  const position = new vscode.Position(lastLine, 0);
  const selection = new vscode.Selection(position, position);

  await vscode.window.showTextDocument(document, {
    selection,
    viewColumn: vscode.ViewColumn.Beside,
  });
}
