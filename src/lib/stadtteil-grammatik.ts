/**
 * Deutsche Ortsangabe für Stadtteilnamen.
 * "in Nippes", aber "in der Innenstadt/Altstadt/Neustadt/Südstadt/Stadtmitte…"
 * und "im Zentrum". Namen wie "Mitte" (Berlin), "Altona", "Hürth-Mitte"
 * bleiben ohne Artikel — dort ist "in Mitte" der übliche Sprachgebrauch.
 */
export function inStadtteil(name: string): string {
  if (name === 'Zentrum') return 'im Zentrum'
  if (/(?:stadt|stadtmitte)$/i.test(name)) return `in der ${name}`
  return `in ${name}`
}

/** Wie inStadtteil, aber mit großem Anfangsbuchstaben für Satzanfänge. */
export function InStadtteil(name: string): string {
  const s = inStadtteil(name)
  return s.charAt(0).toUpperCase() + s.slice(1)
}
