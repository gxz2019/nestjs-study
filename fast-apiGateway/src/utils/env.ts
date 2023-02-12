import { parse } from "yaml";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const getEnv = () => {
  return process.env.RUNNING_ENV;
};

//添加读取 YAML 配置文件的方法

const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, "utf8");
  const config = parse(file);
  return config;
};

export { getConfig, getEnv };
