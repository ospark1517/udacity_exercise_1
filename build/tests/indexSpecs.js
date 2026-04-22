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
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
require("jasmine");
const request = (0, supertest_1.default)(index_1.default);
(0, node_test_1.describe)("Testing all endpoints described in index.ts", () => {
    (0, node_test_1.it)("returns 200 for the home route", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/").expect(200);
    }));
    (0, node_test_1.it)("returns 200 for a valid image resize request", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get("/images")
            .query({
            imageName: "fjord.jpg",
            width: 200,
            height: 200
        })
            .expect(200);
    }));
    (0, node_test_1.it)("returns 400 when imageName is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/images")
            .query({
            width: 200,
            height: 200
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("IMAGE NAME NOT SPECIFIED");
    }));
    (0, node_test_1.it)("returns 400 for invalid file type", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/images")
            .query({
            imageName: "fjord.png",
            width: 200,
            height: 200
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("Invalid file type. Must be .jpg");
    }));
    (0, node_test_1.it)("returns 400 for missing width", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/images")
            .query({
            imageName: "fjord.jpg",
            height: 200
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("WIDTH NOT SPECIFIED");
    }));
    (0, node_test_1.it)("returns 400 for missing height", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/images")
            .query({
            imageName: "fjord.jpg",
            width: 200
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("HEIGHT NOT SPECIFIED");
    }));
    (0, node_test_1.it)("returns 400 for invalid dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/images")
            .query({
            imageName: "fjord.jpg",
            width: -1,
            height: 200
        });
        expect(response.status).toBe(400);
        expect(response.text).toContain("INVALID DIMENSIONS");
    }));
    (0, node_test_1.it)("returns 404 when the image does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/images")
            .query({
            imageName: "doesnotexist.jpg",
            width: 200,
            height: 200
        });
        expect(response.status).toBe(404);
        expect(response.text).toContain("IMAGE DOES NOT EXIST");
    }));
});
//# sourceMappingURL=indexSpecs.js.map