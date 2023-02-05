# Gaussian-Elimination-GUI

[Projekt-Management-Erfassung](https://studdhbwravensburgde-my.sharepoint.com/:x:/g/personal/zehle_stud_dhbw-ravensburg_de/EXdnNVqxOzZCrMk2JGXxkzEBhl5z2LFMcxcc-FJXPtnsGg?e=dXEflv)

[Roadmap](https://studdhbwravensburgde-my.sharepoint.com/:x:/g/personal/zehle_stud_dhbw-ravensburg_de/EUKGem-HioxGrjMDwSRo-_IBsFOJlwYDM2RfY3tRczElTw?e=QmkJxQ)

## Aufgabenstellung
### Problemstellung:
In der linearen Algebra wird Gauß-Algorithmus beispielsweise zur Lösung linearer Gleichungssysteme, für Matrizengleichungen und zur Determinantenberechnung eingesetzt. Der Algorithmus arbeitet iterativ auf Matrizendarstellungen, an denen sich in jedem Schritt nur wenig ändert, aber viel zu schreiben ist. Dies lässt sich über eine
passende webbasierte Anwendung vereinfachen.

### Ziel des Projekts
Implementierung einer webbasierten Oberfläche, in der der Gauß-Algorithmus Schritt für Schritt eine einzugebende Matrizenberechnung löst. Die durchzuführenden Zeilenoperationen sind hierbei in jedem Schritt vom Anwender selbst bestimmbar. Die Oberfläche ist so zu gestalten, dass beim Einsatz ein Verständnis des Algorithmus geschaffen wird.

### Rahmenbedingungen
- Die Anwendung ist als Web-Anwendung umzusetzen
- HTML und JavaScript ohne ergänzende Frameworks/Bibliotheken
- Kanban im Projektmanagement

## Set-Up
In order to run the webpage, you need to allow the imports inside of the js-files. To do this you can either
- start chrome via 
```
cd C:\Program Files\Google\Chrome\Application
chrome.exe --allow-file-access-from-files
```
- install module "http-server" via `npm install http-server`; than run `http-server --cors` and open the displayed localhost page.
