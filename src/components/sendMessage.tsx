import { getBackendUrl } from './getBackendUrl.ts';

export interface ServiceResponse {
  text: string | null;
  file: Blob | null;
}

export const sendMessage = async (prompt: string, file?: File): Promise<ServiceResponse> => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    if (file) formData.append('file', file);

    const response = await fetch(getBackendUrl('/route'), {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return { text: data.text || data.message || null, file: null };
    }

    return { text: 'Unexpected response format.', file: null };
  } catch (err) {
    console.error('sendMessage failed:', err);
    return { text: 'Failed to send message.', file: null };
  }
};

export const downloadPdf = (fileBlob: Blob | null) => {
  if (fileBlob) {
    const url = window.URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'question_paper.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } else {
    console.error('No file to download.');
  }
};
