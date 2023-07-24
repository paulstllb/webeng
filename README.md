# Web Engineering Abgabe

Dieses Repository enthält die Abgabe für das Web Engineering Projekt.

## Herunterladen und Installation

### Möglichkeit 1: GitHub

- Laden Sie das Repository von GitHub herunter: https://github.com/paulstllb/webeng (nicht empfohlen, nur für Codeansicht, Server nicht enthalten)

### Möglichkeit 2: ZIP-Datei

- Laden Sie die ZIP-Datei aus der finalen Abgabe herunter.

### Installation von Node.js

Stellen Sie sicher, dass Node.js auf Ihrem Computer installiert ist, damit die erforderlichen Pakete heruntergeladen werden können.

### Abhängigkeiten installieren

Führen Sie den Befehl "npm i" im Terminal aus, um alle Abhängigkeiten zu installieren.

## Server starten

Navigieren Sie im Terminal zur Server-Datei und geben Sie den Befehl "node Server.js" ein, um den Server zu starten. Eine Nachricht zeigt Ihnen an, auf welchem Port der Server läuft.

## Anwendung aufrufen

Öffnen Sie Ihren Browser und geben Sie die Adresse "http://localhost:3001" ein, um die Anwendung aufzurufen.

ODER

## Docker Installation

Folgen Sie dem Link, um die .tar-Datei herunterzuladen, und verwenden Sie den entsprechenden Schlüssel, um den Container zu entpacken. 

- Link zur .tar-Datei: https://dhbwstg-my.sharepoint.com/:u:/g/personal/inf21105_lehre_dhbw-stuttgart_de/EZI-9UfFeApAhF4BWwjqdwQBjSTUM7MO03itM1lybrfZCw?e=XoHXpQ mit Inf-Adresse öffnen

Führen Sie die folgenden Befehle aus:

- "docker load --input paulstllb-6226582.tar"
- "docker run -p 3001:3001 X"

Ersetzen Sie "X" durch den Schlüssel (X = sha256:0ed084b9723a0b05df7498296ec111e76147c1f39548f1f5bcaa1507f934372d).

Die Anwendung sollte nun aufgerufen werden, indem Sie "http://localhost:3001" im Browser eingeben.

## Bewertung

Folgende Punkte werden bewertet:
- Die Benutzung von React (3 Punkte)
- Die Anzeige von Wetterdaten (2 Punkte)
- Der Canvas für Unterschriften (1 Punkt)
- Der RSS-Feed (1 Punkt)
- Docker (1 Punkt)
- Kein natives JavaScript (1 Punkt)

Installationshilfe und Bewertungsleistung erfolgen auch über Docker. Die maximale Punktzahl beträgt 9 Punkte, was einem Projektfortschritt von 85% entspricht. Die JavaScript Übung 2 wird ebenfalls abgegeben, sodass insgesamt 100% der erreichbaren Punkte erreicht werden können.

## Pages

Eine Beschreibung der Seitenstruktur und Funktionalität finden Sie in der Datei "PAGES.md".

## API

Eine Übersicht über die verwendeten APIs finden Sie in der Datei "API.md".

## Hinweise zur Bewertung

Bitte beachten Sie die Bewertungskriterien für die einzelnen Punkte und Funktionalitäten.

Viel Erfolg mit der Abgabe!
