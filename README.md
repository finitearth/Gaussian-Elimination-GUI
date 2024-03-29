# Gaussian-Elimination-GUI

[Testing 1](https://youtu.be/yEvrGH4f36A) [Testing 2](https://youtu.be/qif9V5AaZqc)

[Präsentation](https://1drv.ms/p/s!Ar4Q0qGkEcfwgmRMJ1Yi6dudDBnx?e=P6Fz0z)

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

## Testing
```
npm install --save-dev babel-jest @babel/core @babel/preset-env
npm i jest-environment-jsdom --save-dev
npm install jest --global

``
