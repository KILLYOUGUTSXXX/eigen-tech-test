// Aidil Febrian

function longest(text = "") {
  // split by space
  const splitText = text.split(" ");

  const long = splitText.reduce(
    (a, b) => ({
      length: b.length > a.length ? b.length : a.length,
      sent: b.length > a.length ? b : a.sent,
    }),
    { length: 0, sent: "" }
  );

  console.log(`${long.sent}: ${long.length} characters.`);
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";

longest(sentence);
