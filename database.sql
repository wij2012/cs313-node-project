--first create the new database
CREATE DATABASE helpreviews;
--connect to database and then see relations and tables
\c helpreviews
\dt

--create a new user to allow some access from the app instead of administrator permissions
CREATE USER helpreviewsUser WITH PASSWORD 'iamhelpreviewsuser';
GRANT SELECT, INSERT, UPDATE ON users, games, reviews, help, replies TO helpreviewsUser;

--grant helreviewsUsers permission to auto-increment the id column when creating new data in any 
--given one of the tables in the database
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO helpreviewsUser;
GRANT USAGE, SELECT ON SEQUENCE games_id_seq TO helpreviewsUser;
GRANT USAGE, SELECT ON SEQUENCE reviews_id_seq TO helpreviewsUser;
GRANT USAGE, SELECT ON SEQUENCE help_id_seq TO helpreviewsUser;
GRANT USAGE, SELECT ON SEQUENCE replies_id_seq TO helpreviewsUser;

--create tables for dataabase
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL
);

INSERT INTO users(username) VALUES ('user_name');
INSERT INTO users(username) VALUES ('user_2');
INSERT INTO users(username) VALUES ('i_am_user');

CREATE TABLE games
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    esrbrating VARCHAR(5),
    userrating INT
    --maybe add another column for usrbrating description...
);

INSERT INTO games(name, esrbrating) VALUES ('Halo: Combat Evolved', 'M');
INSERT INTO games(name, esrbrating) VALUES ('Mass Effect 3', 'M');
INSERT INTO games(name, esrbrating) VALUES ('The Elder Scrolls V: Skyrim', 'M');
INSERT INTO games(name, esrbrating) VALUES ('Lego Star Wars II: The Original Trilogy', 'E10+');

CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY,
    created_by INT REFERENCES users(id) NOT NULL,
    game_id INT REFERENCES games(id) NOT NULL,
    rating INT NOT NULL, --player rating of game quality
    comment VARCHAR(250)
);

INSERT INTO reviews(created_by, game_id, rating, comment) VALUES ('1', '3', '5', 'This is a highly addictive game. By far the best one that bethesda has released yet. 5/5 to SKyrim!!');
INSERT INTO reviews(created_by, game_id, rating, comment) VALUES ('3', '2', '3', 'The ending was terrible! I feel like i just spent three games making my own character just to get this cookie-cutter garbage.');

CREATE TABLE help
(
    id SERIAL PRIMARY KEY,
    created_by INT REFERENCES users(id) NOT NULL,
    game_id INT REFERENCES games(id) NOT NULL,
    comment VARCHAR(250) NOT NULL
);

INSERT INTO help(created_by, game_id, comment) VALUES ('2', '3', 'I am in the theives guild and have tried to find Runes real name but no one in the game can answer me. Is it possible to find out his real name? If so wehre do I go?');

CREATE TABLE replies
(
    id SERIAL PRIMARY KEY,
    created_by INT REFERENCES users(id) NOT NULL,
    helping INT REFERENCES help(id) NOT NULL,
    comment VARCHAR(250) NOT NULL
);

INSERT INTO replies(created_by, helping, comment) VALUES ('1', '1', 'THis is one of those things in skyrim that the developers must have had plans to finish but never had a chance too. There are a few of these throughout the game.');

--returns all rows in the reviews table but shows all required data but the name of the game being reviewed
SELECT u.username, g.name, r.rating, r.comment 
FROM reviews r 
INNER JOIN users u ON r.created_by = u.id
INNER JOIN games g ON r.game_id = g.id;

--returns one rating, comment, and username on repeat with all the games in the database
SELECT u.username, g.name, r.rating, r.comment 
FROM reviews r INNER JOIN games g 
ON game_id = 2 
INNER JOIN users u ON r.created_by = u.id;