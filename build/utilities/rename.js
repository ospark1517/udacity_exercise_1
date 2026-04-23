"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renameThumb;
function renameThumb(oldName) {
    const i = oldName.length - 4;
    const fileName = oldName.slice(0, i);
    if (fileName.length === 0) {
        throw Error("File must have valid name");
    }
    const jpg = oldName.slice(i);
    if (jpg !== ".jpg") {
        throw Error("Invalid file type. Only JPG supported.");
    }
    return `${fileName}_thumb${jpg}`;
}
//# sourceMappingURL=rename.js.map