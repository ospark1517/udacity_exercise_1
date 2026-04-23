"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resizeImage;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const rename_1 = __importDefault(require("./rename"));
function resizeImage(imageName, imageWidth, imageHeight) {
    return __awaiter(this, void 0, void 0, function* () {
        const thumbName = (0, rename_1.default)(imageName);
        const ext = path_1.default.extname(thumbName);
        const base = path_1.default.basename(thumbName, ext);
        const newName = `${base}_${imageWidth}_${imageHeight}${ext}`;
        const imagePath = path_1.default.join(__dirname, "../../images");
        const thumbPath = path_1.default.join(__dirname, "../../thumb");
        try {
            yield fs_1.promises.access(path_1.default.join(imagePath, imageName));
        }
        catch (_a) {
            throw new Error("IMAGE DOES NOT EXIST");
        }
        yield fs_1.promises.mkdir(thumbPath, { recursive: true });
        try {
            yield fs_1.promises.access(path_1.default.join(thumbPath, newName));
            return;
        }
        catch (_b) {
            yield (0, sharp_1.default)(path_1.default.join(imagePath, imageName))
                .resize(imageWidth, imageHeight)
                .toFile(path_1.default.join(thumbPath, newName));
        }
    });
}
//# sourceMappingURL=resize.js.map