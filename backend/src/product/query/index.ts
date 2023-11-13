const userFindAllProduct = (userId: number) => {
  const query =
    `SELECT p.*\n ` +
    `FROM "users" u ` +
    `JOIN "UserProduct" up ON u.id = up."userId" ` +
    `JOIN "Product" p ON up."productId" = p.id ` +
    `WHERE u.id = ${userId};`;
  return query;
};

module.exports = {
  userFindAllProduct
};