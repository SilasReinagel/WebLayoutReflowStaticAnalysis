const fs = require('fs');
const search = require('search-in-file');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Required syntax: node index [sourceDirPath]');
  process.exit(-1);
}

const targetDir = args[0];
const searchOptions = { recursive: true, searchResults: 'lineNo' };

if (!fs.existsSync('report'))
  fs.mkdirSync('report');

// Reflow List Of Elements To Watch Out For From
// https://gist.github.com/paulirish/5d52fb081b3570c81e3a

const searchTerms = [
  // Element Values
  '.offsetLeft',
  '.offsetTop',
  '.offsetWidth',
  '.offsetHeight',
  '.offsetParent',
  '.clientLeft',
  '.clientTop',
  '.clientWidth',
  '.clientHeight',
  '.getClientRects(',
  '.getBoundingClientRect(',
  '.computedRole',
  '.computedName',
  '.innerText',

  // Scroll Stuff
  '.scrollBy(',
  '.scrollTo(',
  '.scrollIntoView(',
  '.scrollIntoViewIfNeeded(',
  '.scrollWidth',
  '.scrollHeight',
  '.scrollLeft',
  '.scrollTop',

  // Window Values
  'window.scrollX',
  'window.scrollY',
  'window.innerHeight', 
  'window.innerWidth',
  'window.visualViewport.height',
  'window.visualViewport.width',
  'window.visualViewport.offsetTop',
  'window.visualViewport.offsetLeft',
  'window.getComputedStyle(',

  // Document Values
  'document.scrollingElement',
  'document.elementFromPoint',

  // Selection and Focus
  '.focus()',
  '.select()',
];

let issuesCount = 0;
const report = [];

searchTerms.forEach(s => search.fileSearch([ targetDir ], s, searchOptions)
  .then(v => v
    .filter(x => x.length > 0)
    .forEach(x => {
      const issueNumber = ++issuesCount;
      const reflowIssue = ({ 
        issueNumber, 
        lines: x.map(f => ({ ...f, filePath: f.filePath.replaceAll(targetDir, '.') })) 
      });
      console.warn(reflowIssue);
      report.push(reflowIssue);
      fs.writeFileSync('report/reflow-layout-report.json', JSON.stringify(report));
    }))); 
