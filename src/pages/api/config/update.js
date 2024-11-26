import { writeFile } from "utils/config/config";

export default function handler(req, res) {
  const data = JSON.parse(req.body);
  const conf = data.config;
  const file = data.file;
  const written = writeFile(conf, file);
  res.send(written);
}
