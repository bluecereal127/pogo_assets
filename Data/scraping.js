const fs = require('fs');
const path = require('path');
const baseStatPath = path.join(__dirname, 'baseStatTotals.js');
let baseStatData = {};

const puppeteer = require('puppeteer');

const pokemonNames = require('./pokemonNames.js');
const totalPokemon = pokemonNames.length;

const outputPath = path.join(__dirname, 'pvpRankings.js');
const backupDir = path.join(__dirname, 'backups');

// Initialize output file if missing
if (!fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, 'pvpRankings = {\n');
}

// Load existing results
let existingResults = {};
try {
    const raw = fs.readFileSync(outputPath, 'utf-8');
    const statProductRankings = raw
        .replace(/^.*?pvpRankings\s*=\s*/, '')
        .trim()
        .replace(/;$/, '');
    existingResults = eval(`[${statProductRankings}]`);
    console.log(`📁 Loaded ${Object.keys(existingResults).length} existing entries.`);
} catch (err) {
    console.warn('⚠️ Could not parse pvpRankings.js — continuing with fresh scrape.');
}

// Utility: Convert IVs to 12-bit binary
function ivsToBinary(ivs) {
    const [atk, def, sta] = ivs.split('/').map(Number);
    return parseInt(
        atk.toString(2).padStart(4, '0') +
        def.toString(2).padStart(4, '0') +
        sta.toString(2).padStart(4, '0'),
        2
    );
}

// Append one entry
function appendToRankingsFile(pokemon, result) {
    const line = `  "${pokemon}": ${result},\n`;
    fs.appendFileSync(outputPath, line);
}

// Backup current file
function makeBackup() {
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '_');
    const backupFile = path.join(backupDir, `pvpRankings-${timestamp}.js`);
    fs.copyFileSync(outputPath, backupFile);
    console.log(`📦 Backup saved to ${backupFile}`);
}

// Main scraper logic
async function processAll() {
    console.time('⏱️ Total time');
    let alreadyDone = 0;

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
    });
    const page = await browser.newPage();

    for (const pokemon of pokemonNames) {
        if (existingResults[pokemon]) {
            alreadyDone++;
            continue;
        }

        const url = `https://www.stadiumgaming.gg/rank-checker?pokemon=${pokemon.toLowerCase()}`;
        const start = Date.now();

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
            await page.waitForSelector('#rankDataContainer .row.data', { timeout: 10000 });
            await page.waitForSelector('.baseStats', { timeout: 1000 });

            const stats = await page.evaluate(() => {
                const statEl = document.querySelector('.baseStats');
                if (!statEl) return null;

                const att = parseInt(statEl.querySelector('.att')?.textContent.trim() || '0', 10);
                const def = parseInt(statEl.querySelector('.def')?.textContent.trim() || '0', 10);
                const sta = parseInt(statEl.querySelector('.sta')?.textContent.trim() || '0', 10);

                return [att, def, sta];
            });
            if (!stats || stats.some(n => isNaN(n))) {
                console.warn(`⚠️ ${pokemon} missing base stats`);
                continue;
            }
            baseStatData[pokemon] = stats;
            const baseStatOutput = 'const baseStats = {\n' + 
                Object.entries(baseStatData)
                    .map(([name, stats]) => `  "${name}": [${stats.join(',')}],`)
                    .join('\n') + '\n};\n';

            fs.writeFileSync(baseStatPath, baseStatOutput);
            console.log(`📦 baseStatTotals.js saved with ${Object.keys(baseStatData).length} entries.`);



            const ranks = await page.evaluate(() => {
                const results = [];
                const rows = document.querySelectorAll('#rankDataContainer .row.data');
                for (const row of rows) {
                    const rankEl = row.querySelector('.cell.rank');
                    const ivsEl = row.querySelector('.cell.ivs');
                    if (rankEl && ivsEl) {
                        const rank = parseInt(rankEl.textContent.trim());
                        const ivs = ivsEl.textContent.trim();
                        if (!isNaN(rank) && ivs.includes('/') && rank <= 10) {
                            results.push({ rank, ivs });
                        }
                        if (results.length >= 10) break;
                    }
                }
                return results;
            });

            if (ranks.length < 10) {
                console.warn(`⚠️ ${pokemon} has insufficient rank data`);
                continue;
            }

            const binaryRanks = Array(10);
            for (const entry of ranks) {
                binaryRanks[entry.rank - 1] = ivsToBinary(entry.ivs);
            }

            const resultString = `[${binaryRanks.join(', ')}]`;
            existingResults[pokemon] = resultString;
            appendToRankingsFile(pokemon, resultString);

            const time = ((Date.now() - start) / 1000).toFixed(2);
            console.log(`✅ ${pokemon} (${time}s)`);

        } catch (err) {
            console.error(`❌ Failed to process ${pokemon}: ${err.message}`);
            const html = await page.content();
            fs.writeFileSync(`debug-${pokemon}.html`, html);
        }
    }

    await browser.close();

    console.log(`⏭️ Skipped ${alreadyDone} already-processed Pokémon`);

    // Backup and finalize
    makeBackup();
    const finalRaw = fs.readFileSync(outputPath, 'utf-8');
    const cleaned = finalRaw.trim().replace(/,\s*$/, '') + '\n};\n';
    fs.writeFileSync(outputPath, cleaned);

    console.log(`✅ Finalized pvpRankings.js with ${Object.keys(existingResults).length} entries.`);
    console.timeEnd('⏱️ Total time');
}

processAll();
