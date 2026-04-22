"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
require("jasmine");
(0, node_test_1.describe)("Testing all endpoints described in index.ts", () => {
    const app = (0, express_1.default)();
    (0, node_test_1.it)("Should return the main endpoint correctly", () => {
        (0, supertest_1.default)(app).get("/").expect(200);
    });
});
//# sourceMappingURL=indexSpecs.js.map