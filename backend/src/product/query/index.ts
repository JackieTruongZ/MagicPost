import { ProductDto } from '../dto';
import { User } from '@prisma/client';

const userFindAllProduct = () => {
  const query =
    `SELECT p.* ` +
    `FROM "users" u ` +
    `JOIN "UserProduct" up ON u.id = up."userId" ` +
    `JOIN "Product" p ON up."productId" = p.id ` +
    `WHERE u.id = $1;`;
  return query;
};

const userFindProductById = () => {
  const query =
    `SELECT p.* ` +
    `FROM "users" u ` +
    `JOIN "UserProduct" up ON u.id = up."userId" ` +
    `JOIN "Product" p ON up."productId" = p.id ` +
    `WHERE u.id = $1 AND p.id = $2;`;
  return query;
};

const userDeleteProductById = () => {
  const query =
    `DELETE FROM "UserProduct"` +
    `WHERE "userId" = $1 AND "productId" = $2` +
    `RETURNING *`;
  return query;
};

const userUpdateProductById = () => {
  const query =
    `UPDATE "Product" AS p ` +
    `SET name = $1 ` +
    `FROM "UserProduct" AS up ` +
    `JOIN "users" AS u ON u.id = up."userId" ` +
    `WHERE u.id = $2 AND p.id = $3 AND up."productId" = p.id`;
  return query;
};

module.exports = {
  userFindAllProduct,
  userFindProductById,
  userDeleteProductById,
  userUpdateProductById,
};
