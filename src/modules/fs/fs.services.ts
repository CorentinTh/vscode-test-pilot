import { constants } from 'node:fs';
import { access, readFile as readFileFs, writeFile as writeFileFs } from 'node:fs/promises';

export { fileExists, writeFile, readFile };

async function fileExists({ filePath }: { filePath: string }): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  }
  catch {
    return false;
  }
}

async function writeFile({ filePath, content }: { filePath: string; content: string }) {
  return writeFileFs(filePath, content, 'utf-8');
}

async function readFile({ filePath }: { filePath: string }) {
  return readFileFs(filePath, 'utf-8');
}
