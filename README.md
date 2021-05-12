# Backend 

In der Folgenden Arbeit wurde eine eigene REST API mit Node Express erstellt. Mithilfe der API können CRUD-Befehle auf die local installierte MySQL-Datenbank `Vinyl` mit der Tabelle `Singer `ausgeführt werden. Die MySQL-Datenbank ist folgendermaßen aufgebaut. Das Backend verfügt über folgende Endpunkte. 

### Tabelle `Singer`

|Singer|
|-----------|
|**SingerID**|
|FirstName|
|LastName|
|BirthYear|

## API Endpunkte

Methode | URL | Bedeutung
--------| ----| ---------
GET|/singers| hole alle Datensätze 
GET| /singers/11| hole den Datensatz mit der ID = 11
POST| /singers | füge einen neuen Datensatz hinzu
PUT | /singers/11 | ändere den Datensatz mit der ID = 11
DELETE| /singers/11 | lösche den Datensatz mit der ID = 11
DELETE | /singers   | lösche alle Datensätze 

## Backend Starten
Um das Projekt zu Starten, muss die MySQL Datenbank lokal installiert werden. Dafür muss die Datei `DatabaseMySQL\vinyl.sql` beispielsweise über phpmyadmin importiert werden. 
Anschließend muss die `backend/config/db.config.js` mit dem eigenen Passwort angepasst werden. 

Nachdem die Datenbank installiert , und die `db.config.js` Datei angepasst wurde, kann das Backend mit dem Befehl `node server.js` über das Terminal im `backend` Verzeichnis gestartet werden. Nach einem erfolgreichem Start müsste die Ausgabe wie folgt aussehen. 

   ![backendStart][backendStart]

## Test Endpoints
 Es werden sämtliche Endpunkte des Servers getestet. Dazu wird `jest` und `supertest` verwendet. Die Tests befinden sich unter `backend\model\singer.test.js`. 
Zuerst wird ein Testdatensatz in die Datenbank geschrieben mithilfe des `POST` Endpunktes. 
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
Der Test ist erfolgreich, wenn der Statuscode dem Wert 200 entspricht. Anschließend wird getestet, ob der Datensatz in der Datenbank vorhanden ist. Dazu wird die Datenbank nach der ID des Testdatensatzes abgefragt, `GET\ID`.
```
it("GET by ID /singers", async () => {
  getByID = await request.get(`/singers/${testData.body.id}`); 
  expect(getByID.status).toEqual(200); 
  expect(getByID.body.LastName).toBe("Test1");
});
```
Der Test ist erfolgreich, wenn der Wert der Spalte `LastName` `Test1` entspricht, siehe Testdatensatz.

Nachdem erfolgreich geprüft wurde, dass sich der Datensatz in der Datenbank befindet, wird er mithilfe des `DELETE\ID` Endpunktes wider gelöscht. 
````
it("DELETE by ID /singers", async ()=>{
  // Delete TestData 
  const removedStudent = await request.delete(
    `/singers/${testData.body.id}`
  );
  expect(removedStudent.status).toEqual(200);
});
````
 Zum Abschluss werden alle Datensätze aus der Datenbank mithilfe des `GET` Endpunktes geladen. 
 Der `DELETE ALL` Endpunkt wird nicht getestet, da die Daten in der Datei noch benötigt werden. 

 ## Test durchführen 

 Um die Tests durchzuführen, muss das Backend gestartet werden. Dafür muss zum Backend-Verzeichniss navigiert werden. Im Terminal wird mithilfe des Befehls `node server.js` das Backend gestartet. Anschließend können die Tests mit dem Befehl `npm test` ausgeführt werden.    

   ![Alt-Text][npm test]



# Frontend
## Start Frontend
In dem Frontend werden die CRUD- Befehle des Backends ausgeführt. Um das Frontend zu starten, muss im Terminal des Verzeichnises `DBFULLSTACK\frontend` der Befehl `ng serve` eingegeben werden. Wichtig ist hierbei das das Backend bereits läuft. 
Nach erfolgreicher eingabe sollte die Ausgabe wie folgt aussehen. 

![ngServe][ngServe]

Die webseite kann über folgenden Link erreicht werden: [http://localhost:4200/](http://localhost:4200/).

Die Startseite der Anwendung sieht folgendermaßen aus: 
![homePage][homepage]

## Read
Wird der Link `Read` angeklickt, so wird ein `GET/Singer` API-Aufruf durchgeführt und alle Inhalte der Singer-Tabelle werden angezeigt. 
![read][read]

## Update and Read by ID
Durch ein Klick auf das `Edit` Symbol, wird ein Eingabeformular aufgerufen, das Formular enthält bereits die Werte des zu bearbeitenden Eintrags, diese werden durch ein `GET by ID` Aufruf vom Backend angefordert. 
![update][update]

## Delete
Durch ein Klick auf das Delete-Icon wird ein Delete-Formular geöffnet, nachdem bestätigen des löschens, wird der Eintrag aus der Datenbank entfernt
![delete][delete] 

## Update
wird in der oberen Navigationsleiste der `Creat` Link ausgewählt, so öffnet sich ein Eingabeformular, über welches ein Eintrag in Datenbank erstellt werden kann. 
![creat][creat]

[npm Test]: Images/runTest.png  "Run Test"
[backendStart]: Images/startServer.png "Run Backend"
[ngServe]: Images/ngServe.png "Run Frontend"
[homePage]:Images/homePage.png "HomePage"
[creat]: Images/creat.png "creat"
[delete]: Images/delete.png "delete"
[read]: Images/read.png "read"
[update]: Images/update.png "update"
