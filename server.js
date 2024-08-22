"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 5500;
app.use("/static", express_1.default.static(path_1.default.resolve(__dirname, "fe", "static")));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "fe", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
