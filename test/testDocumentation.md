# Testdokumentation

## Übersicht des Testcodes

### Testdatei
- **Datei:** `equationParser.test.js`
- **Ziel des Tests:** `equationParser.js`

### Testabhängigkeiten
- Klassen `Matrix` und `Fraction` aus `matrix.js`
- Klasse `Table` aus `table.js`
- `InvalidInputException` aus `exceptions.js`
- `JSDOM` aus dem "jsdom"-Paket

### Testeinrichtung

Vor jedem Testfall wird eine Reihe von Matrizen, Tabellen und einer DOM-Umgebung eingerichtet. Hier ist die Einrichtung:

1. Eine JSDOM-Umgebung wird erstellt mit zwei leeren `<div>`-Elementen (`id1` und `id2`).
2. Zwei Instanzen der Klasse `Table`, `table1` und `table2`, werden mit den `<div>`-Elementen erstellt.
3. Zwei Instanzen von Matrizen, `matrix1` und `matrix2`, werden erstellt und jeweils mit `table1` und `table2` verknüpft.
4. Beide Tabellen werden im Array `tables` gespeichert.

## Testfälle

### 1. Berechnung einfacher Gleichungen
- **Testname:** "soll eine einfache Gleichung berechnen"
- **Eingabe:** `calculate("2+3")`
- **Erwartetes Ergebnis:** Das Ergebnis sollte ein `Fraction`-Objekt darstellen, das `5/1` entspricht.

### 2. Gleichung mit Matrizen und Brüchen
- **Testname:** "soll eine Gleichung mit Matrizen und Brüchen berechnen"
- **Eingabe:** `calculate("A*B", tables)`
- **Erwartetes Ergebnis:** Das Ergebnis sollte ein `Matrix`-Objekt sein, das der Multiplikation von `matrix1` und `matrix2` entspricht.

### 3. Ausnahme bei ungültiger Eingabe
- **Testname:** "soll eine Ausnahme bei ungültiger Eingabe auslösen"
- **Eingabe:** `calculate("2+3*")`
- **Erwartetes Ergebnis:** Es sollte eine `InvalidInputException` ausgelöst werden.

### 4. Subtraktionsoperation
- **Testname:** "Subtraktion sollte funktionieren"
- **Eingabe:** `calculate("2-3")`
- **Erwartetes Ergebnis:** Das Ergebnis sollte ein `Fraction`-Objekt darstellen, das `-1/1` entspricht.

### 5. Definition von Brüchen
- **Testname:** "Definition eines Bruchs sollte funktionieren"
- **Eingabe:** `calculate("1/2")`
- **Erwartetes Ergebnis:** Das Ergebnis sollte ein `Fraction`-Objekt darstellen, das `1/2` entspricht.

### 6. Reihenfolge der Operationen mit Klammern
- **Testname:** "Reihenfolge der Operationen sollte korrekt sein, einschließlich Klammern"
- **Eingabe:** `calculate("2+(2-3)*2")`
- **Erwartetes Ergebnis:** Das Ergebnis sollte ein `Fraction`-Objekt darstellen, das `0/1` entspricht.

### 7. Kleinbuchstaben in Gleichungen
- **Testname:** "Kleinbuchstaben in Gleichungen sollten akzeptiert werden"
- **Eingabe:** `calculate("a+b", tables)`
- **Erwartetes Ergebnis:** Das Ergebnis sollte das Produkt von `matrix1` mit einem `Fraction`-Objekt `2/1` darstellen.

### 8. Berechnung der Determinante
- **Testname:** "Berechnung der Determinante sollte funktionieren"
- **Eingabe:** `calculate("|A|", tables)`
- **Erwartetes Ergebnis:** Das Ergebnis sollte ein `Fraction`-Objekt darstellen, das `0/1` entspricht.

### 9. Berechnung der Inversen
- **Testname:** "Berechnung der Inversen sollte funktionieren"
- **Eingabe:** `calculate("A^T", tables)`
- **Erwartetes Ergebnis:** Das Ergebnis sollte `matrix1` (die Transponierte von `matrix1`) sein.

## Testdurchführung

Um diese Tests auszuführen, führen Sie den Jest-Testsuite für das Modul `equationParser.js` aus. Jeder Testfall überprüft einen bestimmten Aspekt der Funktionalität zur Gleichungsparsierung und -berechnung unter Berücksichtigung verschiedener Arten von Eingaben.
