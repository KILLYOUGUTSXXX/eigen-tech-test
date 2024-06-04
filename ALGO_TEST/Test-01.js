// Aidil Febrian

const text = "NEGIE1";

const numbers = text.replace(/[^\d]/g, "");
const alpha = text.replace(/[\d]/g, "").split("").reverse().join("");

console.log(`Hasil = ${alpha}${numbers}`);
