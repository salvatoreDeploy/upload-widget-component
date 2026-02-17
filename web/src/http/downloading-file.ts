import axios from "axios"
import type { Upload } from "../store-states/uploads";

interface downloadFIleInterface {
  upload: Upload
}


export async function handleDownload({ upload }: downloadFIleInterface) {

  if (!upload.remoteUrl) {
      throw new Error("Remote URL is not available");
  }

  const response = await axios.get(upload.remoteUrl, {
      responseType: "blob",
  });

    const blobUrl = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "imagem-comprimida.jpg";
    a.click();
    URL.revokeObjectURL(blobUrl);
}