export const beginAndEndKeys = (salt: number | string) => {
  const getSalt = salt ? Number(salt) : 0;

  if (getSalt < 3 || Number.isNaN(getSalt)) {
    throw new Error('Invalid Salt value.');
  }

  return {
    stringStart: `BEGIN KEY ${Array(getSalt)
      .fill('-')
      .join('')}`,
    stringEnd: `${Array(getSalt * 2)
      .fill('-')
      .join('')} END KEY`,
  };
};
