export default function renameThumb(oldName: string): string {
  const i: number = oldName.length - 4;

  const fileName: string = oldName.slice(0, i);

  if (fileName.length === 0) {
    throw Error("File must have valid name");
  }

  const jpg: string = oldName.slice(i);

  if (jpg !== ".jpg") {
    throw Error("Invalid file type. Only JPG supported.");
  }

  return `${fileName}_thumb${jpg}`;
}
