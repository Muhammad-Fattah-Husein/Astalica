import fs from 'fs/promises';
import path from 'path';

export interface SaveFileResult {
  success: boolean;
  filePath?: string; // Path relative to public, e.g., '/uploads/filename.webp'
  error?: string;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * Saves a file buffer locally into public/uploads with security validations.
 */
export async function saveFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<SaveFileResult> {
  try {
    // 1. Validate file type
    if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
      return {
        success: false,
        error: 'Format file tidak didukung. Harap unggah gambar JPG, PNG, atau WebP.',
      };
    }

    // 2. Validate file size
    if (fileBuffer.length > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: 'Ukuran file melebihi batas maksimal 5MB.',
      };
    }

    // 3. Generate sanitized unique filename
    const ext = path.extname(originalFilename).toLowerCase() || '.webp';
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.webp';
    const uniqueName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}${safeExt}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const destPath = path.join(uploadsDir, uniqueName);
    await fs.writeFile(destPath, fileBuffer);

    return {
      success: true,
      filePath: `/uploads/${uniqueName}`,
    };
  } catch (error: any) {
    console.error('Storage saveFile error:', error);
    if (error?.code === 'EROFS' || error?.code === 'EACCES') {
      return {
        success: false,
        error:
          'Disk server cloud bersifat hanya-baca (read-only). Untuk produksi di Vercel, silakan pilih gambar katalog yang tersedia atau hubungkan Cloud Storage (Cloudinary/Vercel Blob).',
      };
    }
    return {
      success: false,
      error: 'Gagal menyimpan berkas di server.',
    };
  }
}

/**
 * Deletes a file from public/uploads by its relative path.
 */
export async function deleteFile(relativeFilePath: string): Promise<boolean> {
  try {
    if (!relativeFilePath || !relativeFilePath.startsWith('/uploads/')) {
      return false;
    }

    const filename = path.basename(relativeFilePath);
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Verify it exists before attempting delete
    await fs.unlink(fullPath);
    return true;
  } catch (error) {
    console.warn('Storage deleteFile warning (file may already be deleted):', error);
    return false;
  }
}
