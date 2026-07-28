import type { CityContentMap } from './types'

// ─────────────────────────────────────────────────────────────────────────
// Berlin — Premium-SEO-Content
// Jede Kombination eigenständig geschrieben: realer Kiez-Charakter, echte
// Anker (Plätze, Straßen, Märkte), nischen-spezifische Kundenlogik.
// Café = höchste natürliche Besuchsfrequenz → Leitnische, zuerst vollständig.
// ─────────────────────────────────────────────────────────────────────────

export const berlinContent: CityContentMap = {
  cafes: {
    mitte: {
      metaTitle: 'Digitale Stempelkarte für Cafés in Berlin-Mitte | Wallet',
      metaDescription:
        'Aus Laufkundschaft am Hackeschen Markt echte Stammgäste machen: digitale Kaffee-Stempelkarte fürs Café in Mitte — Apple & Google Wallet, ohne App. 90 Tage gratis.',
      bodyHtml: `
        <h2>Das Frequenz-Problem in Mitte: viel Durchlauf, wenig Wiederkehr</h2>
        <p>Rund um Hackescher Markt, Torstraße und Rosenthaler Platz laufen täglich Tausende an deiner Theke vorbei — Touristen, Büromenschen aus den Agenturen und Startups, Shopping-Publikum. Umsatz ist selten das Problem, Bindung schon: Ein Großteil dieser Menschen kommt genau einmal. Wer in Mitte wächst, muss nicht mehr Laufkundschaft anziehen, sondern aus dem lokalen Kern — den Angestellten und Anwohnern im Umkreis von fünf Gehminuten — verlässliche Wiederkehrer machen.</p>
        <h2>Warum die Stempelkarte gerade hier greift</h2>
        <p>Kaffee ist ein Tagesritual: Wer morgens vor dem Büro am Rosenthaler Platz seinen Flat White holt, tut das potenziell 200-mal im Jahr — aber nur bei einem Laden. Genau diese Entscheidung lenkt die Karte. Beim Kauf scannt der Gast einen QR-Code, der Stempel landet automatisch in Apple Wallet oder Google Wallet. Keine Papierkarte, die im Portemonnaie zerfranst, keine App zum Installieren. Der zehnte Kaffee gratis ist in Mitte kein Rabatt-Gimmick, sondern der Grund, an deinem Laden vorbeizugehen statt an den drei Ketten dazwischen.</p>
        <p>Eingerichtet ist das in unter 24 Stunden: Karte anlegen, QR an die Theke, fertig. Du siehst im Dashboard, wie viele Karten aktiv sind und wer kurz vor der Prämie steht — die Datenbasis, die dem Büro-Stammpublikum in Mitte bisher fehlt.</p>
      `,
      faq: [
        {
          q: 'Lohnt sich das bei so viel Touristen-Laufkundschaft?',
          a: 'Gerade deshalb. Touristen kommen einmal — die Karte ist nicht für sie gedacht, sondern dafür, die Anwohner und Büroangestellten aus dem direkten Umkreis zu verlässlichen Stammgästen zu machen. Genau die sind der planbare Umsatz.',
        },
        {
          q: 'Müssen meine Gäste eine App herunterladen?',
          a: 'Nein. Die Karte liegt in der Apple oder Google Wallet, die auf jedem Smartphone vorinstalliert ist. Ein QR-Scan an der Theke genügt — kein Download, kein Account.',
        },
      ],
    },

    'prenzlauer-berg': {
      metaTitle: 'Café-Stempelkarte Prenzlauer Berg | Digital in der Wallet',
      metaDescription:
        'Kollwitzplatz, Helmholtzplatz, Kastanienallee — in der dichtesten Café-Landschaft Berlins gewinnst du mit Treue. Digitale Stempelkarte fürs Café, ohne App. 90 Tage gratis.',
      bodyHtml: `
        <h2>Dichteste Café-Konkurrenz Berlins — Treue entscheidet</h2>
        <p>Zwischen Kollwitzplatz, Helmholtzplatz und der Kastanienallee liegt Café an Café. Für deine Gäste — junge Familien, Freiberufler mit Laptop, die Brunch-Community am Wochenende — ist die Auswahl im Umkreis von 300 Metern erdrückend. Über Qualität allein hebst du dich hier kaum noch ab; alle rösten dritte Welle, alle haben Hafermilch. Was den Unterschied macht, ist ein Grund, immer wieder denselben Laden zu wählen.</p>
        <h2>Aus „irgendein Café" wird „mein Café"</h2>
        <p>Die digitale Stempelkarte verwandelt eine austauschbare Wahl in eine Gewohnheit. Der Vater, der nach dem Kita-Bringen am Helmholtzplatz seinen Cappuccino holt, sammelt bei dir — und läuft am Nachbarn vorbei, weil seine Karte hier fast voll ist. Der Stempel kommt per QR-Scan direkt in Apple oder Google Wallet, kein Papier, keine App. In einem Kiez, in dem Brunch und Kaffee zum Alltag gehören, ist die Frequenz ohnehin da; die Karte kanalisiert sie zu dir.</p>
        <p>Du behältst dabei den Überblick, welche Gäste kurz vor der Prämie stehen, und kannst gezielt eine ruhige Vormittagsstunde füllen, statt nur auf das Wochenende zu hoffen.</p>
      `,
      faq: [
        {
          q: 'Bei so vielen Cafés — kopieren das nicht sofort alle?',
          a: 'Der Vorteil liegt nicht im Konzept, sondern in der vollen Karte im Wallet deiner Gäste. Wer bei dir schon acht Stempel hat, wechselt nicht wegen einer identischen Karte nebenan. Der First-Mover-Effekt im Kiez zählt.',
        },
        {
          q: 'Passt das zur Laptop- und Freiberufler-Kundschaft?',
          a: 'Sehr gut — das ist genau die Gruppe, die mehrmals pro Woche kommt und immer das Smartphone dabeihat. Für sie ist die Wallet-Karte selbstverständlicher als jede Papierkarte.',
        },
      ],
    },

    kreuzberg: {
      metaTitle: 'Digitale Café-Stempelkarte in Berlin-Kreuzberg | Wallet',
      metaDescription:
        'Vom Bergmannkiez bis zur Oranienstraße: Stammgäste statt Zufall. Digitale Kaffee-Stempelkarte fürs Café in Kreuzberg — Apple & Google Wallet, ohne App. 90 Tage gratis.',
      bodyHtml: `
        <h2>Kreuzberg belohnt, wer den Kiez ernst nimmt</h2>
        <p>Ob im ruhigeren Bergmannkiez oder im wuseligen SO36 rund um Oranien- und Wrangelstraße — Kreuzberger Publikum ist loyal, aber es lässt sich nichts vormachen. Hier funktioniert kein aufgesetztes Marketing, sondern das Gefühl, dass ein Laden zum Viertel gehört. Zwischen Markthalle Neun, Landwehrkanal und den vielen kleinen Röstereien ist die Café-Dichte hoch und das Publikum preisbewusst — aber wer einmal Stammgast ist, bleibt es.</p>
        <h2>Ein ehrliches Treueversprechen statt Rabattschlacht</h2>
        <p>Die digitale Stempelkarte ist genau so ein ehrliches Signal: Du zahlst für jeden Besuch drauf, nicht mit Geschwätz, sondern mit einem Gratis-Kaffee beim zehnten Mal. Der Stempel landet per QR-Scan in Apple oder Google Wallet — kein Papierkärtchen, keine App-Installation, kein Datensammeln, das im Kiez ohnehin schlecht ankäme. Für die Café-Gänger, die auf dem Weg zum Kanal oder zur Markthalle bei dir haltmachen, wird aus einem netten Ort ein fester Anlaufpunkt.</p>
        <p>Eingerichtet in einem Nachmittag, monatlich kündbar — kein Knebelvertrag, was zu einem Viertel passt, das Bevormundung erkennt und meidet.</p>
      `,
      faq: [
        {
          q: 'Kommt eine Treuekarte bei der Kreuzberger Kundschaft nicht als Kommerz an?',
          a: 'Nur wenn sie sich so anfühlt. Es gibt keinen Kleingedruckten-Trick: sammeln, volle Karte, Gratis-Kaffee. Kein Account, kein Newsletter-Zwang, keine App. Das ist eher Handschlag als Kampagne.',
        },
        {
          q: 'Funktioniert das auch für einen kleinen, unabhängigen Laden?',
          a: 'Besonders da. Ketten haben ihre eigenen Apps — als Einzelcafé ist die Wallet-Stempelkarte dein Weg, dieselbe Bequemlichkeit zu bieten, ohne Entwicklungsbudget.',
        },
      ],
    },

    neukoelln: {
      metaTitle: 'Café-Stempelkarte Neukölln | Digital, ohne App',
      metaDescription:
        'Reuterkiez, Weserstraße, Schillerkiez: In Berlins schnelllebigstem Café-Viertel bindest du Gäste, bevor sie weiterziehen. Digitale Stempelkarte fürs Café. 90 Tage gratis.',
      bodyHtml: `
        <h2>Ein Kiez in Bewegung — Bindung schlägt Neugier</h2>
        <p>Im Reuterkiez und entlang der Weserstraße eröffnet und schließt kaum ein Viertel so schnell wie hier. Das Publikum ist jung, neugierig und immer auf der Suche nach dem nächsten Ort — großartig für die Eröffnungswoche, riskant für den Monat danach. Wer in Neukölln bestehen will, muss aus der Laufkundschaft, die „mal ausprobiert", Gäste machen, die wiederkommen, bevor das nächste neue Café um die Ecke aufmacht.</p>
        <h2>Die Karte als Grund, nicht weiterzuziehen</h2>
        <p>Genau das leistet die digitale Stempelkarte: Sie gibt dem jungen, mobilen Publikum einen konkreten Anlass, bei dir zu bleiben. Der Stempel wandert per QR-Scan in Apple oder Google Wallet — passt perfekt zu einer Zielgruppe, die alles übers Smartphone regelt und keine Papierkarte mit sich herumträgt. Wer im Schillerkiez wohnt und drei Cafés zur Auswahl hat, entscheidet sich für das, in dem die Karte schon halb voll ist. Aus Ausprobieren wird Routine.</p>
        <p>Du siehst im Dashboard, wie viele der Erstbesucher zu Wiederkehrern werden — die Kennzahl, die in einem so schnelllebigen Kiez über Bestand oder Aufgabe entscheidet.</p>
      `,
      faq: [
        {
          q: 'Meine Gäste probieren ständig Neues aus — hält eine Karte die überhaupt?',
          a: 'Sie verschiebt die Entscheidung zu deinen Gunsten. Eine fast volle Karte im Wallet ist ein spürbarer Grund, das gewohnte Café zu wählen, statt schon wieder etwas Neues zu testen. Genau diese Wiederholung fehlt sonst in Neukölln.',
        },
        {
          q: 'Wie schnell ist das startklar?',
          a: 'In unter 24 Stunden. Karte anlegen, QR-Code an die Theke oder aufs Fenster — mehr braucht es nicht, um noch diese Woche die ersten Stammgäste zu sammeln.',
        },
      ],
    },

    friedrichshain: {
      metaTitle: 'Digitale Café-Stempelkarte Friedrichshain | Wallet',
      metaDescription:
        'Boxhagener Platz, Simon-Dach-Straße, Studierende und Nachtschwärmer: Kaffee-Stempelkarte fürs Café in Friedrichshain, direkt in Apple & Google Wallet. 90 Tage gratis.',
      bodyHtml: `
        <h2>Studierende, Nachtleben, Wochenendbrunch — hohe Frequenz, viel Auswahl</h2>
        <p>Rund um den Boxhagener Platz, die Simon-Dach-Straße und die Warschauer Straße lebt ein junges, kaffeehungriges Publikum: Studierende zwischen Bibliothek und Café, Nachtschwärmer, die sich sonntags über den Boxi-Flohmarkt zum Brunch schleppen. Die natürliche Besuchsfrequenz ist enorm — aber die Auswahl ist es auch. Ohne einen Grund, wiederzukommen, verteilt sich diese Frequenz gleichmäßig auf die Konkurrenz.</p>
        <h2>Aus Sonntagslaune wird ein Sammelsystem</h2>
        <p>Die digitale Stempelkarte fängt diese Frequenz ein. Für die studentische Kundschaft mit schmalem Budget ist ein Gratis-Kaffee bei jedem zehnten Besuch ein echtes Argument — und der Stempel per QR-Scan in Apple oder Google Wallet passt zu einer Generation, die kein Papier, aber immer das Handy dabeihat. Wer sich nach der Nacht am Boxhagener Platz einen Kaffee holt, macht das ab jetzt bevorzugt dort, wo die Karte mitzählt.</p>
        <p>Du kannst gezielt die schwächeren Wochentage anschieben und siehst, welche Gäste kurz vor der Prämie stehen — planbarer Umsatz in einem Kiez, der sonst stark vom Wochenende lebt.</p>
      `,
      faq: [
        {
          q: 'Studierende geben wenig aus — rechnet sich das?',
          a: 'Über die Frequenz. Wer wenig pro Besuch ausgibt, aber oft kommt, ist genau der Gast, den eine Stempelkarte bindet. Zehn Besuche bei dir sind mehr wert als zehn verteilt auf die Nachbarschaft.',
        },
        {
          q: 'Kann ich damit ruhige Wochentage stärken?',
          a: 'Ja. Über das Dashboard siehst du, wer fast eine volle Karte hat, und kannst Anlässe schaffen, unter der Woche vorbeizukommen, statt nur am Wochenende.',
        },
      ],
    },

    charlottenburg: {
      metaTitle: 'Café-Stempelkarte Charlottenburg | Digital in der Wallet',
      metaDescription:
        'Savignyplatz, Kantstraße, Ku’damm: Für die qualitätsbewusste West-Berliner Stammkundschaft. Digitale Kaffee-Stempelkarte fürs Café, ohne App. 90 Tage gratis testen.',
      bodyHtml: `
        <h2>West-Berliner Kaffeehaus-Kultur trifft auf treue Stammgäste</h2>
        <p>Charlottenburg tickt anders als der junge Osten: Rund um Savignyplatz, Kantstraße und den Kurfürstendamm ist das Publikum älter, wohlhabender und qualitätsbewusst — und es hat eine gewachsene Kaffeehaus-Tradition. Diese Gäste wechseln nicht ständig; sie haben ihren Stammladen. Genau das ist die Chance: Wer hier einmal zum festen Anlaufpunkt wird, behält den Gast über Jahre.</p>
        <h2>Ein Treueprogramm, das zur Wertigkeit passt</h2>
        <p>Die digitale Stempelkarte ist kein billiges Rabattheftchen, sondern ein modernes Dankeschön an genau diese Stammkundschaft. Der Stempel landet elegant per QR-Scan in Apple oder Google Wallet — kein zerknittertes Papier, das nicht zum gepflegten Auftritt am Ku’damm passt. Für die Anwohnerin, die nach dem Einkauf an der Kantstraße ihren Kaffee genießt, ist die volle Karte ein Grund, ihrem Café treu zu bleiben, statt es mit einem neuen zu versuchen.</p>
        <p>Eingerichtet in unter 24 Stunden, DSGVO-konform und ohne dass deine Gäste eine App installieren müssen — Bequemlichkeit, die ein anspruchsvolles Publikum erwartet.</p>
      `,
      faq: [
        {
          q: 'Passt eine Stempelkarte zu einem gehobenen Café?',
          a: 'In digitaler Form ja. Statt Papier liegt eine gepflegte Karte im Wallet — ein modernes Treue-Dankeschön, das zur Wertigkeit deines Hauses passt und nicht nach Discount aussieht.',
        },
        {
          q: 'Meine Stammgäste sind nicht die jüngsten — kommen die mit der Technik klar?',
          a: 'Ja. Apple und Google Wallet sind auf jedem Smartphone vorinstalliert; ein einziger QR-Scan an der Theke genügt. Kein Account, keine App, kein Einrichten seitens des Gastes.',
        },
      ],
    },

    schoeneberg: {
      metaTitle: 'Digitale Café-Stempelkarte in Berlin-Schöneberg | Wallet',
      metaDescription:
        'Winterfeldtplatz-Markt, Akazienstraße, Nollendorfkiez: Stammgäste fürs Café in Schöneberg gewinnen. Digitale Stempelkarte in Apple & Google Wallet. 90 Tage gratis.',
      bodyHtml: `
        <h2>Ein Kiez mit festem Wochenrhythmus</h2>
        <p>Schöneberg lebt von Wiederholung: der Wochenmarkt am Winterfeldtplatz mittwochs und samstags, das Bummeln über die Akazienstraße, das gemischte, nachbarschaftliche Publikum rund um Nollendorfplatz und den Bayerischen Platz. Das sind Menschen mit Routinen — und Routinen sind das beste Fundament für Stammkundschaft. Wer den Marktbesuch mit einem Kaffee verbindet, macht das gern immer am selben Ort, wenn es einen Grund dafür gibt.</p>
        <h2>Die Karte macht die Gewohnheit sichtbar</h2>
        <p>Die digitale Stempelkarte gibt dieser Routine ein System. Wer samstags nach dem Winterfeldtmarkt bei dir seinen Cappuccino holt, sammelt — und der zehnte ist gratis. Der Stempel kommt per QR-Scan in Apple oder Google Wallet, ohne Papier und ohne App. So wird aus dem zufälligen Marktkaffee ein fester Programmpunkt, der Woche für Woche zu dir führt statt zum Café gegenüber.</p>
        <p>Du siehst, wie viele Marktgänger zu echten Stammgästen werden, und kannst deine ruhigeren Wochentage gezielt beleben — planbarer Umsatz jenseits des Marktrhythmus.</p>
      `,
      faq: [
        {
          q: 'Kann ich den Marktverkehr am Winterfeldtplatz gezielt nutzen?',
          a: 'Genau dafür ist die Karte ideal: Der Markttag bringt die Frequenz, die Stempelkarte macht daraus Wiederkehr. Aus zwei Markttagen pro Woche werden über die Zeit feste Stammgäste.',
        },
        {
          q: 'Was passiert nach den 90 Gratis-Tagen?',
          a: 'Danach kostet der Dienst ab 29 € im Monat — unter einem Euro pro Tag, monatlich kündbar. Kein Knebelvertrag, kein Risiko im Test.',
        },
      ],
    },

    wedding: {
      metaTitle: 'Café-Stempelkarte Wedding | Digital, ohne App',
      metaDescription:
        'Leopoldplatz, Sprengelkiez, „Wedding kommt“: Stammgäste im aufstrebenden Kiez binden. Digitale Kaffee-Stempelkarte fürs Café in Apple & Google Wallet. 90 Tage gratis.',
      bodyHtml: `
        <h2>„Wedding kommt" — und du kannst früh dabei sein</h2>
        <p>Rund um Leopoldplatz, den Sprengelkiez und die Müllerstraße verändert sich der Wedding spürbar: eine diverse, preisbewusste Stammbevölkerung trifft auf neu zuziehende Kreative und Familien. Die Café-Dichte ist noch niedriger als in Prenzlauer Berg oder Neukölln — ein Vorteil. Wer jetzt zum festen Kaffeepunkt im Kiez wird, besetzt eine Position, um die anderswo längst erbittert gekämpft wird.</p>
        <h2>Früh binden, bevor die Konkurrenz nachzieht</h2>
        <p>Die digitale Stempelkarte hilft, diese Position zu sichern. Für ein preisbewusstes Publikum ist ein Gratis-Kaffee bei jedem zehnten Besuch ein handfestes Argument, und der Stempel per QR-Scan in Apple oder Google Wallet funktioniert ohne App und ohne Hürde. Wer am Leopoldplatz wohnt und dir treu bleibt, weil seine Karte fast voll ist, ist genau der Stammgast, der dich trägt, wenn in ein, zwei Jahren die nächste Café-Welle rollt.</p>
        <p>Der Test kostet 90 Tage nichts — genug Zeit, um im wachsenden Kiez eine Stammkundschaft aufzubauen, bevor es teurer wird, sie zu gewinnen.</p>
      `,
      faq: [
        {
          q: 'Ist ein Treueprogramm für den Wedding nicht zu früh?',
          a: 'Im Gegenteil — Timing ist der ganze Vorteil. Solange die Café-Dichte niedrig ist, bindest du Anwohner leichter und günstiger als später, wenn mehr Wettbewerber um dieselben Gäste ringen.',
        },
        {
          q: 'Meine Gäste achten aufs Geld — ist die Karte kompliziert?',
          a: 'Nein: sammeln, volle Karte, Gratis-Kaffee. Keine App, kein Account, keine versteckten Kosten für den Gast. Der Vorteil ist sofort verständlich.',
        },
      ],
    },

    steglitz: {
      metaTitle: 'Digitale Café-Stempelkarte in Berlin-Steglitz | Wallet',
      metaDescription:
        'Schloßstraße, Familien, Alltagspublikum: verlässliche Stammgäste fürs Café in Steglitz. Digitale Stempelkarte in Apple & Google Wallet, ohne App. 90 Tage gratis.',
      bodyHtml: `
        <h2>Alltag statt Szene — Steglitz belohnt Verlässlichkeit</h2>
        <p>Steglitz ist weniger Szene, mehr Alltag: die Schloßstraße als eine der wichtigsten Einkaufsmeilen Berlins, ein Publikum aus Familien, Berufstätigen und langjährigen Anwohnern. Hier zählt nicht der neueste Trend, sondern ein Ort, auf den man sich verlässt. Das Café beim Einkaufsbummel, der Kaffee vor der S-Bahn — solche Gewohnheiten sind stabil, wenn man ihnen einen Grund gibt, sich zu wiederholen.</p>
        <h2>Ein Stammplatz zwischen Kaufhaus und S-Bahn</h2>
        <p>Die digitale Stempelkarte macht aus dem Bummel-Kaffee einen festen Stammplatz. Wer auf der Schloßstraße einkauft und regelmäßig bei dir haltmacht, sammelt Stempel, die per QR-Scan in Apple oder Google Wallet wandern — kein Papier, keine App. Für die Familie, die samstags in Steglitz unterwegs ist, ist die fast volle Karte der kleine, konkrete Grund, wieder in dein Café zu gehen statt in eines der vielen entlang der Meile.</p>
        <p>Startklar in unter 24 Stunden, DSGVO-konform und ohne Aufwand für deine Gäste — verlässlich, wie es zu Steglitz passt.</p>
      `,
      faq: [
        {
          q: 'Passt eine digitale Karte zu meinem eher bodenständigen Publikum?',
          a: 'Ja, weil sie nichts abverlangt: kein Download, kein Account. Ein QR-Scan an der Theke, der Stempel liegt in der ohnehin vorhandenen Wallet. Einfacher als jede Papierkarte, die man zu Hause vergisst.',
        },
        {
          q: 'Kann ich den Einkaufsverkehr der Schloßstraße nutzen?',
          a: 'Genau darauf zielt die Karte: Die Meile bringt die Laufkundschaft, die Stempelkarte macht daraus Wiederkehrer, die beim nächsten Bummel wieder zu dir kommen.',
        },
      ],
    },

    tempelhof: {
      metaTitle: 'Café-Stempelkarte Tempelhof | Digital in der Wallet',
      metaDescription:
        'Tempelhofer Feld, ruhige Wohnkieze, Familien: Im café-armen Tempelhof das Stammcafé werden. Digitale Stempelkarte in Apple & Google Wallet, ohne App. 90 Tage gratis.',
      bodyHtml: `
        <h2>Wenig Konkurrenz, klare Chance</h2>
        <p>Tempelhof ist geprägt vom Tempelhofer Feld und ruhigen Wohnstraßen: ein Publikum aus Familien und Anwohnern, die am Wochenende aufs Feld ziehen und unter der Woche im Kiez bleiben. Die Café-Dichte ist deutlich niedriger als in den Innenstadtbezirken — für dich heißt das: Du konkurrierst nicht mit zwanzig Läden um dieselbe Straße, sondern kannst der Stammplatz eines ganzen Wohnkiezes werden.</p>
        <h2>Vom Feld-Ausflug zum festen Anlaufpunkt</h2>
        <p>Die digitale Stempelkarte hilft, genau diese Rolle zu besetzen. Wer nach dem Spaziergang oder der Radrunde übers Tempelhofer Feld bei dir einkehrt, sammelt Stempel, die per QR-Scan direkt in Apple oder Google Wallet landen — ohne Papier, ohne App. Für Familien, die immer wieder in der Nähe sind, wird die volle Karte zum kleinen Ritual: Der Kaffee gehört zum Ausflug, und der Ausflug führt zu dir.</p>
        <p>90 Tage kostenlos, monatlich kündbar — genug Zeit, um in einem Kiez mit wenig Wettbewerb eine feste Stammkundschaft aufzubauen.</p>
      `,
      faq: [
        {
          q: 'Lohnt sich das in einem ruhigeren Wohnbezirk?',
          a: 'Besonders da. Weniger Cafés bedeuten weniger Streuung — wer bei dir sammelt, hat kaum Alternativen um die Ecke. Die Bindung an dein Café ist dadurch oft stärker als in überversorgten Innenstadtkiezen.',
        },
        {
          q: 'Wie erreiche ich die Leute vom Tempelhofer Feld?',
          a: 'Über den Wiederkehr-Anreiz. Ein QR-Code am Eingang oder auf dem Bon genügt, damit aus dem einmaligen Ausflugskaffee über die Karte ein wiederkehrender Besuch wird.',
        },
      ],
    },
  },
}
