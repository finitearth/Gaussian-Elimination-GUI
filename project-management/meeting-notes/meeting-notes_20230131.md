# Meeting Protokoll

**Projekt**: Gauß-Algorithmus

**Datum**: 31.01.2023

**Zeit**: 13:00-13:30 (0,5h)

**Teilnehmer**: Prof. Dr. Kirchberg (Kunde/Professor), Judith Romer, Nick Hillebrand, Tom Zehle, Timo Heiß (jeweils Projektteam)

## Meeting-Inhalte

Folgende Punkte wurden im Meeting abgesprochen:

Mockups:
Startseite:
- passt

Matrixoperationen:
- Zeilen/Spalten hinzufügen/löschen: kleine +-Buttons und Löschenbuttons daneben (beide Buttons, nicht nur einer)
- Rest: passt

Matrizenberechnungen:
- Möglichkeit eine beliebige Zahl Matrizen über Eingaben im Textfeld zu berechnen soll so übernommen werden
- Rest: passt

GL-System:
- Buttons mit Pfeil hoch und runter passt, evtl. sogar Pfeile größer machen (Text kleiner/raus)
- Zeilenoperationen umsetzen wie dargestellt mit Komboboxen
- Rest: passt

Inversenberechnung:
- Titel anpassen wie in Beispiel-EXE
- Matrix auf rechter Seite: Einheitsmatrix als Vorschlag/Standardbelegung (muss überschreibbar sein)
- 


Allgemein:
- Eingaben müssen als Bruch oder Kommazahlen möglich sein. Intern soll immer mit Bruchzahlen gerechnet werden. Im Ergebnis soll der Benutzer zwischen einer Darstellung als Brüche bzw. als Dezimalzahlen umschalten können (z.B. Radiobuttons).
- Nullfelder sollen leer gelassen werden können, was vom System als Nullen erkannt wird
- Hilfe/Bedienungsanleitungen als Pop-Up soll so übernommen werden
- UX kann noch optimiert werden (z.B. Button-Design, etc.)
- Notation: Stern für Multiplikation (allg. wie in Java), Skalarprodukt (Stern) von Kreuzprodukt (x) abgrenzen
- in Hilfe nennen: über geschicktes Verrechnen können Zeilen getauscht werden
- Zeilenoperationen, die den Lösungsraum verändern, sollen nicht zugelassen werden (Zeile mit 0 multiplizieren, nur möglich wenn Zeilentausch)
- Codequalität ist Bewertungskriterium (hinsichtlich Wartbarkeit, Erweiterbarkeit)
- Zusätzliche Dokumentation für Quellcode außerhalb des Codes (u.a. für Grundstruktur, z.B. UML) notwendig
- 

	
Prioritäten der Zusatzfunktionalitäten:
Prio 1:
- Historie für GL-System und Inversenberechung darstellen

Prio 2:
- responsives Design: Grundgrößen PC/Laptop oder Tablet sollen in jeden Fall abgedeckt werden, für andere Größen (z.B. Smartphone) ist Prio 2
- Ein-/Ausblenden der Komboboxen für die Zeilenoperationen bei GL-System und Inversenberechnung
- Tipp-Button: Komboboxen für Zeilenoperationen werden automatisch so gefüllt, dass Nullen erzeugt werden
- Übungsaufgaben nach Schwierigkeitsniveaus für GL-System und Inversenberechnung zur Verfügung stellen (3 Schwierigkeitslevel, höchsten 5x5 Matrix)

Prio 3:
- schöner Druck / PDF der Historie


## Aktionen:	
- Mockups als Bilddateien an Kunde senden
- Dokument zur Sammlung aller Anforderung soll erstellt werden (Lastenheft/Pflichtenheft)
