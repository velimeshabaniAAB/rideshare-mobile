   CREATE TABLE IF NOT EXISTS te_preferuarat (
     perdoruesi TEXT NOT NULL,
     udhetim_id TEXT NOT NULL REFERENCES udhetimet(id),
     PRIMARY KEY (perdoruesi, udhetim_id)
   );
   SELECT * FROM te_preferuarat;