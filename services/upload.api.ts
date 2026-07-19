import { mockResponse } from "@/lib/api";

export type UploadKind = "image" | "pdf" | "video" | "document";

export interface UploadedFile {
  id: string;
  url: string;
  kind: UploadKind;
  sizeBytes: number;
  originalName: string;
}

/**
 * Prepared for future cloud storage providers (S3/Cloudinary/GCS/etc).
 * Production implementation should request a signed upload URL from the
 * backend, PUT the file directly to storage, then confirm with the backend
 * - this keeps large files off the API server entirely.
 */
export const UploadApi = {
  /**
   * POST /uploads/sign
   * Body: { fileName, contentType, kind }
   * Returns a signed URL the client uploads directly to (S3-style flow).
   */
  async getSignedUploadUrl(fileName: string, _kind: UploadKind): Promise<{ uploadUrl: string; fileId: string }> {
    return mockResponse({ uploadUrl: `mock://uploads/${fileName}`, fileId: `file_${Date.now()}` });
  },

  /**
   * POST /uploads/:fileId/confirm - called after the direct-to-storage PUT
   * succeeds, so the backend can persist metadata.
   */
  async confirmUpload(fileId: string, file: File, kind: UploadKind): Promise<UploadedFile> {
    return mockResponse({
      id: fileId,
      url: `mock://cdn/${file.name}`,
      kind,
      sizeBytes: file.size,
      originalName: file.name,
    });
  },
};
