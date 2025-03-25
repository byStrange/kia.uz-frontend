export const useDownload = () => {
  const downloadFile = function (url: string | null | undefined, filename: string = "price-list") {
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return { downloadFile }
}
