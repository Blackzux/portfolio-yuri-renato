import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectsPath = resolve(projectRoot, "data", "projects.json");
const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

if (!existsSync(projectsPath)) {
  fail("data/projects.json não existe.");
}

let projects = [];
try {
  projects = JSON.parse(readFileSync(projectsPath, "utf8"));
} catch (error) {
  fail(`data/projects.json não é um JSON válido: ${error.message}`);
}

if (!Array.isArray(projects) || projects.length === 0) {
  fail("O catálogo precisa conter pelo menos um projeto.");
}

const ids = new Set();
const referencedAssets = new Set();
const requiredTextFields = ["id", "title", "category", "year", "work", "cover"];

for (const [index, project] of projects.entries()) {
  const label = project?.title || `projeto ${index + 1}`;

  for (const field of requiredTextFields) {
    if (typeof project?.[field] !== "string" || project[field].trim() === "") {
      fail(`${label}: campo obrigatório "${field}" ausente.`);
    }
  }

  if (ids.has(project.id)) fail(`${label}: id repetido "${project.id}".`);
  ids.add(project.id);

  if (!Array.isArray(project.description) && typeof project.description !== "string") {
    fail(`${label}: description precisa ser texto ou lista de textos.`);
  }
  if (!Array.isArray(project.tools) || project.tools.length === 0) {
    fail(`${label}: informe pelo menos uma ferramenta em tools.`);
  }
  if (!Array.isArray(project.gallery) || project.gallery.length === 0) {
    fail(`${label}: a galeria está vazia.`);
  }

  for (const asset of [project.cover, ...(project.gallery || []).flatMap((item) => [item.src, item.poster])]) {
    if (typeof asset !== "string" || /^https?:\/\//i.test(asset)) continue;
    referencedAssets.add(asset.replace(/^\.\//, ""));
  }
}

referencedAssets.add("downloads/curriculo-yuri-renato.pdf");

for (const asset of referencedAssets) {
  const absolutePath = resolve(projectRoot, asset);
  if (!absolutePath.startsWith(projectRoot) || !existsSync(absolutePath)) {
    fail(`Arquivo referenciado não encontrado: ${asset}`);
  }
}

const walk = (folder) => {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const absolutePath = resolve(folder, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    const size = statSync(absolutePath).size;
    const displayPath = relative(projectRoot, absolutePath).replaceAll("\\", "/");
    if (size >= 100 * 1024 * 1024) fail(`${displayPath} ultrapassa o limite de 100 MB do GitHub.`);
    else if (size >= 25 * 1024 * 1024) warn(`${displayPath} tem ${(size / 1024 / 1024).toFixed(1)} MB e merece otimização futura.`);

    if ([".html", ".js", ".css", ".json", ".md", ".txt"].includes(extname(entry.name).toLowerCase())) {
      const content = readFileSync(absolutePath, "utf8");
      if (/[A-Z]:\\Users\\/i.test(content)) fail(`${displayPath} contém um caminho local do computador.`);
    }
  }
};

walk(projectRoot);

const indexHtml = readFileSync(resolve(projectRoot, "index.html"), "utf8");
if (!indexHtml.includes("bootstrap.js")) fail("index.html não carrega bootstrap.js.");
if (!existsSync(resolve(projectRoot, ".nojekyll"))) fail("Arquivo .nojekyll ausente.");

for (const message of warnings) console.warn(`AVISO: ${message}`);
for (const message of errors) console.error(`ERRO: ${message}`);

if (errors.length > 0) process.exitCode = 1;
else console.log(`Tudo certo: ${projects.length} projetos e ${referencedAssets.size} arquivos referenciados validados.`);
