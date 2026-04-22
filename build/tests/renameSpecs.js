"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rename_1 = __importDefault(require("../rename"));
describe("Testing rename function", () => {
    it("Should be defined", () => {
        expect(rename_1.default).toBeDefined();
    });
    it("Should properly rename a correct image name", () => {
        expect((0, rename_1.default)("test.jpg")).toEqual("test_thumb.jpg");
    });
    it("Should throw error if filename is invalid", () => {
        expect(() => (0, rename_1.default)(".jpg")).toThrowError("File must have valid name");
    });
    it("Should throw error if file is not JPG", () => {
        expect(() => (0, rename_1.default)("test.png")).toThrowError("Invalid file type. Only JPG supported.");
    });
});
//# sourceMappingURL=renameSpecs.js.map