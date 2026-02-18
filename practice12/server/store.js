import fs from "fs";

const FILE = new URL("./data.json", import.meta.url);

export const read = () => {
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
};

export const write = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};
