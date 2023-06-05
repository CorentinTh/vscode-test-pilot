export { getFileNameWithoutExtension, getFileName };

function getFileNameWithoutExtension({ filePath }: { filePath: string }) {
  const fileName = filePath.split('/').pop();

  if (!fileName) {
    return undefined;
  }

  if (!fileName.includes('.')) {
    return fileName;
  }

  return fileName.split('.').slice(0, -1).join('.');
}

function getFileName({ filePath }: { filePath: string }) {
  const fileName = filePath.split('/').pop();

  if (!fileName) {
    return undefined;
  }

  return fileName;
}
