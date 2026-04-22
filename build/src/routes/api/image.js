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
const sharp_1 = __importDefault(require("sharp"));
const images = express_1.default.Router();
const fs = require("fs");
images.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = String(req.query.imageName);
    const imageWidth = Number(req.query.width);
    const imageHeight = Number(req.query.height);
    if (!imageName) {
        res.send(400);
        throw Error("IMAGE NAME AINT INCLUDED");
    }
    if (!fs.existsSync(`/workspace/images/${imageName}`)) {
        res.send(404);
        throw Error("BRO THIS IMAGE DOES NOT EXIST");
    }
    if (!imageWidth) {
        res.send(400);
        throw Error("WIDTH AINT INCLUDED");
    }
    if (!imageHeight) {
        res.send(400);
        throw Error("HEIGHT AINT INCLUDED");
    }
    if (imageHeight <= 0 ||
        imageWidth <= 0 ||
        isNaN(imageHeight) ||
        isNaN(imageWidth)) {
        res.send(400);
        throw Error("INVALID DIMENSIONS");
    }
    if (!fs.existsSync(`/workspace/thumb/${imageName}`)) {
        yield (0, sharp_1.default)(`/workspace/images/${imageName}`)
            .resize(imageWidth, imageHeight)
            .toFile(`/workspace/thumb/${imageName}`);
    }
    res.sendFile(`/workspace/thumb/${imageName}`);
    res.status(200);
}));
exports.default = images;
//# sourceMappingURL=image.js.map