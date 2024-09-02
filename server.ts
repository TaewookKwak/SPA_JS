import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 5500;

// 정적 파일 제공
app.use(
  "/dist",
  express.static(path.resolve(__dirname, "fe", "dist"), {
    setHeaders: (res) => {
      // res.setHeader("Cache-Control", "max-age=3600"); // 1시간 동안 캐시
    },
  })
);

// 정적 파일 제공
app.use(
  "/static/css",
  express.static(path.resolve(__dirname, "fe", "static/css"), {
    setHeaders: (res) => {
      // res.setHeader("Cache-Control", "max-age=3600"); // 1시간 동안 캐시
    },
  })
);

app.get("/*", (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-cache"); // 항상 새로고침
  res.sendFile(path.resolve(__dirname, "fe", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
