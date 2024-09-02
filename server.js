"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 5500;
// 정적 파일 제공
app.use("/dist", express_1.default.static(path_1.default.resolve(__dirname, "fe", "dist"), {
    setHeaders: (res) => {
        // res.setHeader("Cache-Control", "max-age=3600"); // 1시간 동안 캐시
    },
}));
// 정적 파일 제공
app.use("/static/css", express_1.default.static(path_1.default.resolve(__dirname, "fe", "static/css"), {
    setHeaders: (res) => {
        // res.setHeader("Cache-Control", "max-age=3600"); // 1시간 동안 캐시
    },
}));
app.get("/*", (req, res) => {
    res.setHeader("Cache-Control", "no-cache"); // 항상 새로고침
    res.sendFile(path_1.default.resolve(__dirname, "fe", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
