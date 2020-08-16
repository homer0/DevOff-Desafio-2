const encrypt = (phrase, strength) => {
  const rows = phrase
  .split('')
  .reduce(
    (acc, item, index) => {
      if (!(index % strength)) {
        acc.push([]);
      }
      acc[acc.length - 1].push(item);
      return acc;
    },
    [],
  );

  const last = rows[rows.length - 1];
  if (last.length < strength) {
    last.push(...new Array(strength - last.length).fill(' '));
  }

  return new Array(strength)
  .fill('')
  .map((_, index) => rows.map((row) => row[index]))
  .reduce((acc, row) => [...acc, ...row], [])
  .join('')
  .trim();
};

const decrypt = (phrase, strength) => {
  const columns = Math.ceil(phrase.length / strength);
  return new Array(columns)
  .fill('')
  .map((ignore, index) => (
    new Array(strength)
    .fill('')
    .map((subIgnore, subIndex) => phrase[(columns * subIndex) + index])
  ))
  .reduce((acc, row) => [...acc, ...row], [])
  .join('')
  .trim();
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
