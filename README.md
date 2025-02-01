# website-project


CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word TEXT UNIQUE NOT NULL
);

INSERT INTO words (word) VALUES
('אדום'),
('האדום'),
('אדומה'),
('אדומות'),
('אדומים'),
('ואדום');

-- SELECT * FROM words;

SELECT *
FROM words
WHERE 
    word = 'אדום' OR 
    word = CONCAT('ה', 'אדום') OR 
    word = CONCAT('ו', 'אדום') OR 
    word = REPLACE('אדום', 'ם', 'מה') OR 
    word = REPLACE('אדום', 'ם', 'מים') OR 
    word = REPLACE('אדום', 'ם', 'מות');


------------------------------------------------------------------------------------------------------------

INSERT INTO words (word) VALUES
-- ('אדום'),
-- ('האדום'),
-- ('אדומה'),
-- ('אדומות'),
-- ('אדומים'),
-- ('ואדום'),
('בית'),
('ירוק'),
('בית ירוק'),
('הבית ירוק'),
('בית הירוק'),
('הבית הירוק'),
('בתים ירוקים'),
('בתים הירוקים'),
('הבתים ירוקים'),
('הבתים הירוקים');

SELECT *
FROM words
WHERE 
    -- first word 
    (split_part(word, ' ', 1) IN ('בית', 'הבית', 'בתים', 'הבתים')) AND
    -- second word
    (split_part(word, ' ', 2) IN ('ירוק', 'הירוק', 'ירוקים', 'הירוקים') OR split_part(word, ' ', 2) IS NULL);

------------------------------------------------------------------------------------------------------------