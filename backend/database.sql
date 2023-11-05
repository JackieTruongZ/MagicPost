CREATE DATABASE magicpost;

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    id_product VARCHAR(255),
    name_product VARCHAR(255),
    description VARCHAR(255)
);

CREATE INDEX idx_id_product ON product (id_product);
