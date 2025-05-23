const WORDS = [
  "/words/conjugacoes.txt",
  "/words/palavras.txt",
  "/words/verbos.txt",
  "/words/dicio.txt",
];

export const getRandomWord = async (): Promise<string> => {
  const randomFile = WORDS[Math.floor(Math.random() * WORDS.length)];
  const response = await fetch(randomFile);
  const text = await response.text();

  const words = text
    .split("\n")
    .map((word) => word.trim())
    .filter((word) => word.length === 6);

  return words[Math.floor(Math.random() * words.length)];
};

const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const checkWordExists = async (word: string): Promise<string | null> => {
  const normalizedWord = removeAccents(word.trim().toLowerCase());

  for (const filePath of WORDS) {
    const response = await fetch(filePath);
    const text = await response.text();

    const words = text.split("\n").map((w) => w.trim());

    const matchedWord = words.find(
      (w) => removeAccents(w.toLowerCase()) === normalizedWord
    );

    if (matchedWord) return matchedWord;
  }

  return null;
};

export const normalizeWord = (word: string): string => {
  return word
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.replace(/[^a-zA-Z]/g, "")
    ?.toLowerCase();
};

export const checkCorrectWord = (input: string, correct: string): boolean => {
  return normalizeWord(input) === normalizeWord(correct);
};
