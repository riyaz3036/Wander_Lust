import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const logger = new Logger('FileUtils');
const uploadsDir = path.join(process.cwd(), 'uploads');

/**
 * Deletes a file from the uploads directory.
 * 
 * @param filePath - Relative path, absolute path, or filename inside `uploads/`
 * @returns boolean indicating success or failure
 */
export const deleteFile = async (filePath: string): Promise<boolean> => {
    try {
        let fullPath: string;

        // Resolve full path
        if (path.isAbsolute(filePath)) {
            fullPath = filePath;
        } else if (filePath.startsWith('uploads/')) {
            fullPath = path.join(process.cwd(), filePath);
        } else {
            fullPath = path.join(uploadsDir, filePath);
        }

        // Prevent deleting outside the uploads directory
        const normalizedPath = path.normalize(fullPath);
        if (!normalizedPath.startsWith(uploadsDir)) {
            logger.warn(`Attempted to delete file outside uploads directory: ${filePath}`);
            return false;
        }

        // Delete file if it exists
        if (fs.existsSync(fullPath)) {
            await fs.promises.unlink(fullPath);
            logger.log(`Successfully deleted file: ${fullPath}`);
            return true;
        } else {
            logger.warn(`File not found: ${fullPath}`);
            return false;
        }
    } catch (error) {
        logger.error(`Error deleting file: ${filePath}`, error);
        return false;
    }
};
