import { once } from "events";
import PDFParser from "pdf2json";
import { RootObject, Text } from "./PDFData";
import { inRange } from "lodash-es";
import { readdir, readFile, writeFile } from "fs/promises";

async function processPDF(name: string) {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", errData => console.error(errData));

    pdfParser.loadPDF(name);
    const pdfData: RootObject = (await once(pdfParser, "pdfParser_dataReady"))[0];

    const result = pdfData.Pages
        .map(page => page.Texts
            .filter(text => inRange(text.x, 0, page.Width) && inRange(text.y, 0, page.Height))
            .filter(text => text.R.every(r => !r.T.match(deleteByStrings)))
            .reduce((acc, curr) => {
                const line = acc.find(line => Math.abs(curr.x - line[0].x) < 1);
                if (line)
                    line.push(curr);
                else
                    acc.push([curr]);
                return acc;
            }, [] as Text[][])
            .sort((line1, line2) => line2[0].x - line1[0].x)
            .map(line => line.sort((text1, text2) => text1.y - text2.y))
            .map(line => line.map(text => decodeURIComponent(text.R[0].T)).join(""))
            .join("")
        )
        .join("")
        .replaceAll(new RegExp("[" + [...replaceMap.keys()].join("") + "]", "gsu"), match => replaceMap.get(match)!);

    await writeFile(`./${name.slice(0, -4)}.txt`, result);
}

const deleteByStrings = new RegExp(
    (await readFile("./drop.txt", "utf8"))
        .split(/\r?\n/s)
        .map(s => `(${s})`)
        .join("|"),
    "gsu");
const replaceMap = new Map([
    ["﹂", "\" "],
    ["﹁", " \""],
    ["　", "\n　"],
    ["︑", ", "],
    ["︒", ". "]
]);

await Promise.all((await readdir(".", { withFileTypes: true }))
    .filter(entry => entry.isFile() && entry.name.endsWith(".pdf"))
    .map(({ name }) => processPDF(name)));