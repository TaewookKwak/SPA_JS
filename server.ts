import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 5500;

app.use("/static", express.static(path.resolve(__dirname, "fe", "static")));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "fe", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
