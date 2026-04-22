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
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const resize_1 = __importDefault(require("../resize"));
const rename_1 = __importDefault(require("../rename"));
describe("Testing resize function", () => {
    const imageName = "palmtunnel.jpg";
    const width = 200;
    const height = 300;
    const outputName = (0, rename_1.default)(imageName);
    const outputPath = `/workspace/thumb/${outputName}`;
    beforeAll(() => {
        if (fs_1.default.existsSync(outputPath)) {
            fs_1.default.unlinkSync(outputPath);
        }
    });
    it('should reject when an image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resize_1.default)("doesntexist.jpg", 200, 200))
            .toBeRejectedWithError("IMAGE DOES NOT EXIST");
    }));
    it("Should properly resize an image", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resize_1.default)(imageName, width, height);
        expect(fs_1.default.existsSync(outputPath)).toBeTrue();
        const metadata = yield (0, sharp_1.default)(outputPath).metadata();
        expect(metadata.width).toEqual(width);
        expect(metadata.height).toEqual(height);
    }));
    it("should not recreate the thumbnail if it already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resize_1.default)(imageName, width, height);
        const firstStat = fs_1.default.statSync(outputPath);
        const firstModified = firstStat.mtimeMs;
        yield (0, resize_1.default)(imageName, width, height);
        const secondStat = fs_1.default.statSync(outputPath);
        const secondModified = secondStat.mtimeMs;
        expect(secondModified).toEqual(firstModified);
    }));
});
//# sourceMappingURL=resizeSpecs.js.map