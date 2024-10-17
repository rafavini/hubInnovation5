CREATE TABLE USERS
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER
)

INSERT INTO users(name, age) 
VALUES
("rafael", 22),
("Niklas", 22)


drop table users