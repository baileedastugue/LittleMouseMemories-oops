import multer from 'multer';

// tells multer that to save the file to memory first
const storage = multer.memoryStorage();

// sets the storage option + specifies the field name multer should go to when it's looking for the file
const multerUploads = multer({ storage }).single('image');
export { multerUploads };
