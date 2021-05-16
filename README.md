# Backend 

In der vorliegenden Arbeit wurde eine eigene [REST-API](https://www.redhat.com/de/topics/api/what-is-a-rest-api) mit [Express](https://expressjs.com/de/), einem Web-Framework für [Node.js](https://nodejs.org/en/), erstellt. Mithilfe der API können sogenannte **CRUD**-Befehle (**C**reate, **R**ead, **U**pdate, **D**elete) auf der lokal installierten MySQL-Datenbank `Vinyl` mit der Tabelle `Singer `ausgeführt werden. Die MySQL-Datenbank ist folgendermaßen aufgebaut. Das Backend verfügt über folgende Endpunkte. 

### Tabelle `Singer`

|Singer|Typ|
|-----------|-----|
|**SingerID**|int|
|FirstName|varchar(255) |
|LastName|varchar(255) |
|BirthYear|int|

**SingerID** ist der Primärschlüssel und autoinkrementell, d.h. sein Wert wird für jeden neuen Eintrag automatisch erhöht, so dass die Eindeutigkeit der **SingerID** gewährleistet ist. 

### API Endpunkte

Methode | URL | Bedeutung
--------| ----| ---------
GET|/singers| hole alle Datensätze 
GET| /singers/11| hole den Datensatz mit der ID = 11
POST| /singers | füge einen neuen Datensatz hinzu
PUT | /singers/11 | ändere den Datensatz mit der ID = 11
DELETE| /singers/11 | lösche den Datensatz mit der ID = 11
DELETE | /singers   | lösche alle Datensätze 


## Backend starten

Um das Projekt zu starten, muss die MySQL Datenbank lokal installiert werden. Dafür muss die Datei `DatabaseMySQL/vinyl.sql` beispielsweise über [phpmyadmin](https://www.phpmyadmin.net/) importiert werden. Führen Sie dazu folgende Schritte aus: 

1. Öffnen Sie Ihr lokales `phpmyadmin` auf (z.B. `http://localhost/phpmyadmin/index.php`).
2. Wählen Sie im Reiter `Datenbanken` den Link `Neue Datenbank anlegen` und geben Sie als Name der Datenbank `vinyl` ein. Klicken Sie auf `Anlegen`.
3. Wählen Sie den Reiter `Importieren` und klicken Sie darin auf den Button `Datei auswählen`. Browsen Sie bis zum Projekteordner und darin in den Ordner `DatabaseMySQL`. Wählen Sie darin die Datei `vinyl.sql` aus und klicken auf `Ok`.
4. Die Tabelle `Singer` wird angelegt und enthält vier Einträge (siehe im Reiter `Anzeigen`). 

Anschließend muss die `backend/config/db.config.js` mit dem eigenen Passwort angepasst werden! Öffnen Sie dazu die Datei `backend/config/db.config.js`. Es erscheint

```
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ihrPassowrt",
    DB: "vinyl"
};
```
und unter `PASSWORD` muss Ihr Passwort eingetragen werden (sollten Sie nicht als `root` auf die Datenbank zugreifen, müssten Sie auch diesen Eintrag anpassen). 

Nachdem die Datenbank installiert und die `db.config.js` Datei angepasst wurde, kann das Backend gestartet werden. Wechseln Sie dazu im Terminal in den Projektordner `2533282_DB_sem4` und darin in das Verzwichnis `backend`:

```bash
cd 2533282_DB_sem4/backend
```

Im `backend`-Ordner geben Sie 

```bash 
npm install 
```

ein. Damit werden alle notwendigen Abhängigkeiten installiert. Sie sollten folgende Ausgabe erhalten:

```bash
removed 14 packages, and audited 609 packages in 1s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Danach geben Sie

```bash
node server.js
```

ein. Das Backend wird gestartet. Sie erhalten folgende Ausgabe: 

 ![backendStart][backendStart]


## Test der Endpoints

Es werden sämtliche Endpunkte des Servers getestet. Dazu wird `jest` und `supertest` verwendet. Die Tests befinden sich unter `backend/app/model/singers.test.js`. 

Zuerst wird getestet, ob der Endpunkt `"POST /singers"` funktioniert, d.h. ob ein Datensatz der Datenbank hinzugefügt werden kann. Dazu wird der folgende Test (siehe Zeilen `6-14` in `singers.test.js`) ausgeführt: 

```
// Creat TestData
it("POST /singers ", async () => {
  testData = await request.post('/singers').send({
    "LastName": "Test1",
    "FirstName": "Test2",
    "BirthYear": 1997
  });
  expect(testData.status).toEqual(200);
});
```

Der Test ist erfolgreich, wenn der Statuscode dem Wert `200` entspricht. Anschließend wird getestet, ob der Datensatz in der Datenbank vorhanden ist. Dazu wird die Datenbank nach der `ID` des Testdatensatzes abgefragt (`"GET by ID /singers"`).

```
it("GET by ID /singers", async () => {
  getByID = await request.get(`/singers/${testData.body.id}`); 
  expect(getByID.status).toEqual(200); 
  expect(getByID.body.LastName).toBe("Test1");
});
```
Der Test ist erfolgreich, wenn der Wert der Spalte `LastName` dem Wert `Test1` entspricht (siehe Testdatensatz `.toBe("Test1")`).

Nachdem erfolgreich geprüft wurde, dass sich der Datensatz in der Datenbank befindet, wird er mithilfe des `DELETE /singers/:id`- Endpunktes wieder gelöscht. 

```
it("DELETE by ID /singers", async ()=>{
  // Delete TestData 
  const removedStudent = await request.delete(
    `/singers/${testData.body.id}`
  );
  expect(removedStudent.status).toEqual(200);
});
```

Zum Abschluss werden alle Datensätze aus der Datenbank mithilfe des `GET /singers`-Endpunktes geladen. 
Der `DELETE ALL` Endpunkt wird nicht getestet, da die Daten in der Datei noch benötigt werden. 

## Test durchführen 

Um die Tests durchzuführen, muss das Backend gestartet sein (siehe oben `Backend starten`). Die Tests können nun mit dem Befehl `npm test` ausgeführt (im `backend`-Ordner) werden. Es erscheint folgende Ausgabe:

![Alt-Text][npm test]



# Frontend

Das Frontend visualisiert die Ansichten (*views*) der Datensätze. Es gibt Formulare, um neue Datensätze zu erstellen oder existierende Datensätze zu ändern. Außerdem ist das Löschen von einzelnen Datensätzen möglich und es gibt eine Ansicht (*view*), in der alle existierenden Datensätze in einer Tabelle aufgelistet sind. Das Frontend ist mit dem Backend per HTTP verbunden.

## Frontend starten

In dem Frontend werden die CRUD- Befehle des Backends ausgeführt. Um das Frontend zu starten, wechseln Sie im Terminal in das Verzeichnis `frontend`:

```bash
cd 2533282_DB_sem4/frontend
```

Im `frontend`-Ordner geben Sie 

```bash 
npm install 
```

ein. Damit werden alle notwendigen Abhängigkeiten installiert. Danach geben Sie

```bash
ng serve
```

ein. Wichtig ist hierbei, dass das Backend bereits läuft!

Nach erfolgreicher Eingabe sollte die Ausgabe wie folgt aussehen: 

![ngServe][ngServe]

Die Webseite kann über folgenden Link erreicht werden: [http://localhost:4200/](http://localhost:4200/).

Die Startseite der Anwendung sieht folgendermaßen aus: 
![homePage][homepage]

## Read
Wird der Link `Read` angeklickt, so wird ein `GET /singers` API-Aufruf durchgeführt und alle Inhalte der `Singer`-Tabelle werden angezeigt. 

![read][read]

## Update and Read by ID
In der Tabellen-Ansicht `All singers` erscheint neben jedem Datensatz ein `Edit`- und ein `Delete`-Symbol. Durch ein Klick auf das `Edit`-Symbol wird ein Eingabeformular aufgerufen. Das Formular enthält bereits die Werte des zu bearbeitenden Eintrags, denn diese wurden durch ein `GET by ID`-Aufruf vom Backend angefordert. 

![update][update]

In dieser Ansicht kann ein Dateneintrag geändert werden, d.h. es kann der Vor- oder der Nachname geändert werden. Durch Klick auf den `Update`-Button wird der `PUT /singers/:id`-API-Aufruf ausgeführt und der Datensatz in der Datenbank aktualisiert. 

## Delete
Durch ein Klick auf das `Delete`-Icon in der Tabellen-Ansicht `All singers` wird ein `Delete`-Formular geöffnet. Nach dem Bestätigen des Löschens, wird der Eintrag aus der Datenbank entfernt. 

![delete][delete] 

## Create
Wird in der oberen Navigationsleiste der `Create`-Link ausgewählt, so öffnet sich ein Eingabeformular, über welches ein Eintrag in Datenbank erstellt werden kann. 

![create][create]

Es wird der `POST /singers`-Endpunkt zum Erstellen des Datensatzes in der Datenbank verwendet. Dazu wird der im Formular eingebene Datensatz als JSON-Datei an das Backend geschickt. Die `SingerID` wird automatisch durch MySQl vergeben, wenn ein neuer Datensatz eingefügt wird. 


[npm Test]: Images/runTest.png  "Run Test"
[backendStart]: ./Images/startServer.png "Run Backend"
[ngServe]: Images/ngServe.png "Run Frontend"
[homePage]:Images/homePage.png "HomePage"
[create]: Images/creat.png "create"
[delete]: Images/delete.png "delete"
[read]: Images/read.png "read"
[update]: Images/update.png "update"
