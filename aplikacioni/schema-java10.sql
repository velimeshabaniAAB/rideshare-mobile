-- Java 10: kerkesat per vend. Ekzekutohet ne Neon SQL Editor.
CREATE TABLE IF NOT EXISTS kerkesat (
  id SERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id),
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id),
  statusi TEXT NOT NULL DEFAULT 'ne_pritje' CHECK (statusi IN ('ne_pritje', 'pranuar')),
  UNIQUE (udhetim_id, udhetar_id)
);

-- Udhetimi i provës me 2 vende. SHOFERI_ID = ID-ja GitHub e shoferit nga /panel.
INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, vende, shofer_id)
VALUES ('10', 'Ferizaj', 'AAB', '08:30', 'Te biblioteka', 2, 'SHOFERI_ID')
ON CONFLICT (id) DO NOTHING;