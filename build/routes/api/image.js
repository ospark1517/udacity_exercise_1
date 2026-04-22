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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("../../resize"));
const rename_1 = __importDefault(require("../../rename"));
const images = express_1.default.Router();
images.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = req.query.imageName;
    const imageWidth = Number(req.query.width);
    const imageHeight = Number(req.query.height);
    const imagesPath = path_1.default.join(__dirname, "../../../images");
    const thumbPath = path_1.default.join(__dirname, "../../../thumb");
    if (!imageName) {
        return res.status(400).send("IMAGE NAME NOT SPECIFIED");
    }
    if (!imageName.endsWith(".jpg")) {
        return res.status(400).send("Invalid file type. Must be .jpg");
    }
    if (!fs_1.default.existsSync(path_1.default.join(imagesPath, imageName))) {
        return res.status(404).send("IMAGE DOES NOT EXIST");
    }
    if (!req.query.width) {
        return res.status(400).send("WIDTH NOT SPECIFIED");
    }
    if (!req.query.height) {
        return res.status(400).send("HEIGHT NOT SPECIFIED");
    }
    if (imageHeight <= 0 ||
        imageWidth <= 0 ||
        isNaN(imageHeight) ||
        isNaN(imageWidth)) {
        return res.status(400).send("INVALID DIMENSIONS");
    }
    yield (0, resize_1.default)(imageName, imageWidth, imageHeight);
    const newImageName = (0, rename_1.default)(imageName);
    return res.sendFile(path_1.default.join(thumbPath, newImageName));
}));
exports.default = images;
//# sourceMappingURL=image.js.map