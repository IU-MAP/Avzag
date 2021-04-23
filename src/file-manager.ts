const link = document.createElement("a");

export function downloadFile(
  content: string,
  filename: string,
  promptExtension?: string
) {
  if (promptExtension) {
    filename = window.prompt("Save file as", filename) ?? "";
    if (filename) filename += promptExtension;
    else return;
  }
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
  link.download = filename;
  link.click();
}

const reader = new FileReader();
const input = document.createElement("input");
input.type = "file";

export function uploadFile(
  onload: (content: string, name: string) => void,
  accept = ".json"
) {
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    reader.onload = ({ target }) => onload(target?.result as string, file.name);
    reader.readAsText(file);
  };
  input.accept = accept;
  input.click();
}
