-- Java 11: njoftimet brenda aplikacionit. Ekzekutohet ne Neon SQL Editor.

-- 1. Kerkesa tani mund te refuzohet.
ALTER TABLE kerkesat DROP CONSTRAINT IF EXISTS kerkesat_statusi_check;
ALTER TABLE kerkesat ADD CONSTRAINT kerkesat_statusi_check
  CHECK (statusi IN ('ne_pritje', 'pranuar', 'refuzuar'));

-- 2. Nje njoftim per cdo pergjigje te shoferit, i lidhur me kerkesen e vet.
CREATE TABLE IF NOT EXISTS njoftimet (
  id SERIAL PRIMARY KEY,
  perdoruesi_id TEXT NOT NULL REFERENCES profilet(github_id),
  kerkesa_id INTEGER NOT NULL UNIQUE REFERENCES kerkesat(id),
  teksti TEXT NOT NULL,
  lexuar BOOLEAN NOT NULL DEFAULT false,
  krijuar TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Udhetimi i dyte fiktiv per proven e refuzimit. SHOFERI_ID = ID GitHub e shoferit.
INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, vende, shofer_id)
VALUES ('11', 'Gjilan', 'AAB', '07:50', 'Te sheshi', 2, 'SHOFERI_ID')
ON CONFLICT (id) DO NOTHING;
