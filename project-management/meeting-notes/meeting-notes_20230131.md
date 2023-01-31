# Meeting Protokoll

**Projekt**: Gauß-Algorithmus

**Datum**: 31.01.2023

**Zeit**: 13:00-13:30 (0,5h)

**Teilnehmer**: Prof. Dr. Kirchberg (Kunde/Professor), Judith Romer, Nick Hillebrand, Tom Zehle, Timo Heiß (jeweils Projektteam)

## Meeting-Inhalte

Folgende Punkte wurden im Meeting besprochen:

### Mockups:
Startseite:
- passt

Matrixoperationen:
- Zeilen/Spalten hinzufügen/löschen: kleine +-Buttons und Lösch-Buttons neben Matrix (beide Buttons, nicht nur einer)
- Rest: passt

Matrizenberechnungen:
- Möglichkeit, eine beliebige Zahl Matrizen über Eingaben im Textfeld zu berechnen, soll wie im Mockup vorgeschlagen umgesetzt werden
- Rest: passt

GL-System:
- Buttons mit Pfeil hoch und runter passt, evtl. sogar Pfeile größer machen (Text kleiner/raus)
- Zeilenoperationen umsetzen wie dargestellt mit Komboboxen (nicht Eingabezeile o.ä.)
- Rest: passt

Inversenberechnung:
- Titel anpassen wie in Beispiel-EXE
- Matrix auf rechter Seite: Einheitsmatrix als Vorschlag/Standardbelegung (muss überschreibbar sein)
- Rest: passt

Allgemein:
- Eingaben müssen als Bruch oder Kommazahlen möglich sein. Intern soll immer mit Bruchzahlen gerechnet werden. Im Ergebnis soll der Benutzer zwischen einer Darstellung als Brüche bzw. als Dezimalzahlen umschalten können (z.B. über Radiobuttons).
- Nullfelder sollen einfach leer gelassen werden können, was vom System als 0 interpretiert wird
- Hilfe/Bedienungsanleitungen als Pop-Up soll wie im Mockup präsentiert übernommen werden
- UX kann noch optimiert werden (z.B. Button-Design, etc.)
- Notation: Stern \* für Multiplikation (allg. wie in Java), Skalarprodukt (\*) von Kreuzprodukt (x) abgrenzen, Zeilen einer Matrix mit (1), (2), usw.
- in "Hilfe" darauf hinweisen, dass über geschicktes Verrechnen Zeilen getauscht werden können (z.B. bei GL-System und Inversenberechnung)
- Zeilenoperationen, die den Lösungsraum verändern, sollen nicht zugelassen werden (Zeile mit 0 multiplizieren nur möglich wenn Zeilentausch)
	
### Prioritäten der Zusatzfunktionalitäten:
Prio 1:
- Historie für GL-System und Inversenberechung darstellen (vgl. Mockup für GL-System)

Prio 2:
- responsives Design: Grundgrößen PC/Laptop oder Tablet sollen in jeden Fall abgedeckt werden, responsives Design für andere Größen (z.B. Smartphone) ist Prio 2
- Ein-/Ausblenden der Komboboxen für die Zeilenoperationen bei GL-System und Inversenberechnung
- Tipp-Button: Komboboxen für Zeilenoperationen werden automatisch so gefüllt, dass Nullen erzeugt werden (als eine Art Hilfe für den User, falls er nicht weiter weiß)
- Übungsaufgaben nach Schwierigkeitsniveaus für GL-System und Inversenberechnung zur Verfügung stellen (3 Schwierigkeitslevel, höchstens 5x5 Matrix)

Prio 3:
- schöner Druck / PDF-Export der Historie

### Sonstiges:
- Codequalität ist Bewertungskriterium (hinsichtlich Wartbarkeit, Erweiterbarkeit)
- Zusätzliche Dokumentation für Quellcode außerhalb des Codes (u.a. für Grundstruktur, z.B. UML) notwendig

## Aktionen:	
- Mockups als Bilddateien an Kunde senden
- Dokument zur Sammlung aller Anforderung soll erstellt werden (Lastenheft/Pflichtenheft)
- Allgemein: Implementierung / Umsetzung der Mockups
