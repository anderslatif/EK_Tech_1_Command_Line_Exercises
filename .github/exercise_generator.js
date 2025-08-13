const words = [
	"cater", "pioneer", "rider", "beat", "support", "plane", "medal", "identity",
	"advantage", "discover", "needle", "nerve", "pray", "shot", "rain", "shallow",
	"advice", "panel", "salvation", "terminal", "cousin", "surprise", "ditch",
	"responsibility", "hill", "evaluate", "proportion", "architecture", "regret",
	"speculate", "recommend", "relative", "stock", "difficulty", "bay", "ethics",
	"on", "recession", "depression", "correspondence", "pen", "degree", "interference",
	"banish", "honor", "experienced", "sister", "excuse", "appreciate"
];

const amountOfExercise = 350;
const SAFE_DIR = 'cli_sandbox';

const commands = [
	// Safety / Navigation (always within SAFE_DIR)
	`Create a folder named "${SAFE_DIR}".`,
	`Change directory to "${SAFE_DIR}".`,
	`If already inside "${SAFE_DIR}", create a directory "$WORD" and move into the directory.`,
	`If there are any directories in the current folder, then move inside any one of them.`,
	`Create two directories "$WORD" and "$WORD2" and move into "$WORD2".`,
	`Move one level up (stay inside "${SAFE_DIR}").`,
	`Move two folders up (but never leave "${SAFE_DIR}").`,

	// File Handling
	`Use: echo "$WORDS" > "$WORD.txt" to create or overwrite "$WORD.txt".`,
	`Create a file called "$WORD.txt".`,
	`Write something in a file called "$WORD.txt".`,
	`Output the content of any file in the directory.`,
	`Open a file in the terminal and see the content.`,

	// Counting / Sorting / Unique
	`Create a file called "$WORD.txt" containing these words (one per line): "$WORDS_DUP". Then count the lines.`,
	`Create a file "$WORD.txt" containing: "$WORDS_DUP". Then output the unique lines.`,
	`Create a file "$WORD.txt" containing: "$WORDS_DUP". Then output the sorted lines.`,
	`Create a file "$WORD.txt" containing: "$WORDS_WITH_WORD". Then search recursively for "$WORD".`,

	// Deletion (scoped, safe)
	`Create a directory "$WORD" and then delete it.`,
	`Create a file called "$WORD.txt" and immediately delete it.`,
	`Delete the last file you created.`,
	`Delete the last folder you created.`,

	// Listing
	`Output what's in the directory.`,
	`Output the sizes of the files in the directory.`,
	`Output hidden files.`,

	// Misc
	`Output who the active user is.`,
	`Output the full path you are on.`
];

// useful commands: cd, ls -l, ls -la, touch, cat, nano, pwd, whoami
// also used: rm -rf, echo "WORD" > file.txt, wc, uniq, sort, grep

console.log(`IMPORTANT: Do ALL exercises inside ~/${SAFE_DIR} to avoid changing important files. Start with:\n1) mkdir -p ~/${SAFE_DIR}\n2) cd ~/${SAFE_DIR}\n`);

for (let i = 1; i <= amountOfExercise; i++) {
	let command = commands[getRandom(commands.length)];

	const primary = getAWord();
	const secondary = getAWord();
	const wordsAny = getWords();
	const wordsDup = getWordsWithDuplicates();
	const wordsWithPrimary = getWordsIncluding(primary);

	command = command
		.replaceAll('$WORDS_WITH_WORD', wordsWithPrimary)
		.replaceAll('$WORDS_DUP', wordsDup)
		.replaceAll('$WORDS', wordsAny)
		.replaceAll('$WORD2', secondary)
		.replaceAll('$WORD', primary);

	console.log(i + ': ' + command);
	console.log();
}

function getAWord() {
	return words[getRandom(words.length)];
}

function getWords(count = 5) {
	const newWords = [];
	for (let i = 0; i < count; i++) newWords.push(getAWord());
	return newWords.join(' ');
}

function getWordsWithDuplicates() {
	const a = getAWord();
	const b = getAWord();
	const c = getAWord();
	// ensure a appears multiple times
	return [a, b, a, c, a].join(' ');
}

function getWordsIncluding(required) {
	const filler = getWords(4).split(' ');
	// ensure 'required' is present
	filler.splice(getRandom(filler.length + 1), 0, required);
	return filler.join(' ');
}

function getRandom(max) {
	return Math.floor(Math.random() * max);
}
