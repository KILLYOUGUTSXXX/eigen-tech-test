// Aidil Febrian

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

const calcs = QUERY.reduce(
  (a, b) => a.concat([INPUT.filter((x) => x === b).length]),
  []
);

console.log(`OUTPUT = ${JSON.stringify(calcs)}`);
