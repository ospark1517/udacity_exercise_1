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
const resize_1 = __importDefault(require("../../resize"));
const rename_1 = __importDefault(require("../../rename"));
const images = express_1.default.Router();
images.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = String(req.query.imageName);
    const imageWidth = Number(req.query.width);
    const imageHeight = Number(req.query.height);
    if (!imageName) {
        res.send(400);
        throw Error("IMAGE NAME NOT SPECIFIED");
    }
    if (!imageName.includes(".jpg")) {
        res.send(400);
        throw Error("Invalid file type. Must be .jpg");
    }
    if (!fs_1.default.existsSync(`/workspace/images/${imageName}`)) {
        res.send(404);
        throw Error("IMAGE DOES NOT EXIST");
    }
    if (!imageWidth) {
        res.send(400);
        throw Error("WIDTH NOT SPECIFIED");
    }
    if (!imageHeight) {
        res.send(400);
        throw Error("HEIGHT NOT SPECIFIED");
    }
    if (imageHeight <= 0 ||
        imageWidth <= 0 ||
        isNaN(imageHeight) ||
        isNaN(imageWidth)) {
        res.send(400);
        throw Error("INVALID DIMENSIONS");
    }
    yield (0, resize_1.default)(imageName, imageWidth, imageHeight);
    const newImageName = (0, rename_1.default)(imageName);
    res.sendFile(`/workspace/thumb/${newImageName}`);
    res.status(200);
}));
exports.default = images;
//# sourceMappingURL=image.js.map