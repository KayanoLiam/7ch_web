const { execSync } = require('child_process');
const { writeFileSync, existsSync } = require('fs');
const { join, resolve } = require('path');

// 更新日志生成脚本：汇总前后端提交并写入 data/changelog.ts。
// Changelog generator: aggregates frontend/backend commits into data/changelog.ts.

// 配置项：前端/后端目录与输出文件路径。
// Configuration: frontend/backend paths and output file.
const FRONTEND_DIR = process.cwd();
const BACKEND_DIR = resolve(process.cwd(), '../backend_7ch');
const OUTPUT_FILE = join(process.cwd(), 'data/changelog.ts');

console.log('🔄 Generating changelog...');
console.log(`📂 Frontend: ${FRONTEND_DIR}`);
console.log(`📂 Backend:  ${existsSync(BACKEND_DIR) ? BACKEND_DIR : 'Not Found (Skipping)'}`);

// 读取指定目录的 git 提交记录并打标签。
// Read git log for a directory and prefix entries with label.
function getGitLog(cwd, label) {
    if (!existsSync(cwd)) return [];
    try {
        // Get last 50 commits
        // Format: hash|date|message
        const cmd = 'git log -n 50 --pretty=format:"%h|%ad|%s" --date=short';
        const output = execSync(cmd, { cwd, encoding: 'utf-8' });

        return output.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const [hash, date, msg] = line.split('|');
                return {
                    hash,
                    date, // YYYY-MM-DD
                    msg: `[${label}] ${msg}`,
                    rawDate: new Date(date)
                };
            });
    } catch (e) {
        console.warn(`⚠️  Failed to read git log from ${cwd}: ${e.message}`);
        return [];
    }
}

// 1) 读取提交 / Fetch commits
const frontendCommits = getGitLog(FRONTEND_DIR, 'Frontend');
const backendCommits = getGitLog(BACKEND_DIR, 'Backend');
const allCommits = [...frontendCommits, ...backendCommits];

// 2) 过滤与排序 / Filter & sort
// Filter out merge commits and trivial updates if needed, or keeping everything simple
const filteredCommits = allCommits.filter(c =>
    !c.msg.includes('Merge pull request') &&
    !c.msg.includes('Merge branch')
);

// Sort by date desc
filteredCommits.sort((a, b) => b.rawDate - a.rawDate);

// 3) 按日期分组 / Group by date
const groupedOptions = {}; // { '2026-02-04': [commits] }

filteredCommits.forEach(c => {
    const dateKey = c.date; // already YYYY-MM-DD
    if (!groupedOptions[dateKey]) {
        groupedOptions[dateKey] = [];
    }
    // Deduplicate messages per day
    if (!groupedOptions[dateKey].some(existing => existing.msg === c.msg)) {
        groupedOptions[dateKey].push(c);
    }
});

// 4) 转换为 TS 数据结构 / Format for TypeScript
// Transform map to array
const entries = Object.keys(groupedOptions)
    .sort((a, b) => new Date(b) - new Date(a)) // Sort days desc
    .map((date, index) => {
        // Generate a version number or title
        // Latest date gets a "Latest" tag, or just use Date
        const title = `Update ${date}`;
        // Mock version number relative to date for fun, or just placeholders
        const version = `build-${date.replace(/-/g, '')}`;

        // Format date to "Feb 4, 2026" style
        const dateObj = new Date(date);
        const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        return {
            date: dateStr,
            title: title,
            version: version,
            changes: groupedOptions[date].map(c => c.msg)
        };
    });

// 5) 写入文件 / Write file
const fileContent = `export interface ChangelogEntry {
  date: string;
  title: string;
  version: string;
  changes: string[];
}

export const changelogData: ChangelogEntry[] = ${JSON.stringify(entries, null, 2)};
`;

writeFileSync(OUTPUT_FILE, fileContent);
console.log(`✅ Changelog updated at ${OUTPUT_FILE}`);
