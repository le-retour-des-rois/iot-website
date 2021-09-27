----------------------
--- Table Creation ---
----------------------
CREATE TABLE IF NOT EXISTS movies (
    title               varchar(40),
    origin_country      varchar(40)
);

-------------------------------
--- DATA insertion in table ---
-------------------------------
INSERT  INTO movies (title, origin_country)
        VALUES  ('Harry Potter', 'Great Britain'),
                ('Intouchable', 'France');