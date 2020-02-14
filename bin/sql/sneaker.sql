CREATE TABLE sneaker(
    id              SERIAL PRIMARY KEY,
    "sneakerName"   VARCHAR(64) NOT NULL,
    quantity        INTEGER NOT NULL,
    "amountSold"    INTEGER NOT NULL,
    "sneakerinfo"   TEXT,
    "brandId"       INTEGER, 
    FOREIGN KEY     ("brandId") REFERENCES brand(id)   
);