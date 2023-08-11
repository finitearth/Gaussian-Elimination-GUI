# Meeting Protokoll

**Projekt**: Gauß-Algorithmus

**Datum**: 11.08.2023

**Zeit**: 09:00-09:20 (0,33h)

**Teilnehmer**: Prof. Dr. Kirchberg (Kunde/Professor), Judith Romer, Timo Heiß (jeweils Projektteam)

## Meeting-Inhalte

Folgende Punkte wurden im Meeting besprochen:

### Aktueller Stand:
- kurzes Überfliegen der Anwendung mit Neuheiten (insbes. Design-Überarbeitung): positiver Grundeindruck
- eigenständiges und tieferes Testen der Anwendung durch den Kunden wird im Nachgang erfolgen, um nicht voreingenommen zu sein
- Budget: 2/3 bereits verbraucht
	
### Weitere Implementierung:
- Simplex muss noch implementiert werden
    - Eingabe durch den Benutzer in Simplex-Tabelle (Design ähnlich zu Gleichungssystem)
    - Eingabe im Standarformat (Minimierung der Zielfunktion, nur Gleichheitsnebenbedingungen, nur nicht-negative Variablen, rechte Seiten der Nebenbedingungen nicht-negativ)
    - "Lösen": Lösung wird durch das System berechnet (optimale Werte für die Variablen)
- Priorisierung der Kann-Anforderungen beibehalten wie im Pflichtenheft dokumentiert: Umsetzung nur wenn noch Zeit 

### Dokumentationen:
- Produktdokumentation Inhalt: Allgemeiner Aufbau (Ordnerstruktur, Dateien, etc.), Beschreibung der Anwendung (Seiten und Funktionalitäten), js-doc comments, UML-Klassendiagramm, Mockups (Oberflächenprototypen), Betriebsbedingungen, Testdokumentation
- Projektdokumentation Inhalt: Beschreibung der grundsätzlichen Methodik (Kanban), Vogehensweise beim Projektmanagement (Rollenverteilung), Zeit-/Aufwandserfassung, Roadmap, Vorgehensweise bei der Produktentwicklung, Retrospektive, Anhang: Meeting-Protokolle aus den Terminen mit dem Auftraggeber, Anhang: Pflichtenheft; + weitere Aspekte des Projektmanagements (Risikoanalyse, Projektstrukturplan)
--> Wichtiger als Kann-Kriterien erfüllen

### Abschlusspräsentation und Abnahme:
- Abschlusspräsentation am 26.09.2023 um 10:00 Uhr
    - Ort nach Wetterlage
    - ggf. Laptops um etwas zu zeigen
    - Fokus auf Projektmanagement: vorstellen und diskutieren
- Abnahmetest:
    - erfolgt eigenständig durch den Kunden
    - Schlussstand ist durch das Projektteam bis zum 18.09.2023 an den Kunden zu melden
    - wenn erfolgreicher Abnahmetest: Kunde erteilt Abnahmebestätigung

## Aktionen:
- Projektteam: 	
    - Simplex nach besprochenen Vorgaben implementieren
    - ggf. Kann-Anforderungen implementieren
    - neue Stände auf FTP-Server laden und Kunden entsprechend benachrichtigen
    - Projekt- und Produktdokumentation nach besprochenen Vorgaben erstellen
- Kunde:
    - Testen des aktuellen Standes und Rückmeldung an Projektteam

