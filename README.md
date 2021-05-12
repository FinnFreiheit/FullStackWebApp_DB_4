# Full_Stack_WebApp_DB

# Backend 

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


## Start Frontend `ng serve`
## Start Backend `node server.js`


# Backend 

eigene REST API mit Node Express. 

## Datenbank vinyl

### Tabelle `Singer`

|Singer|
|-----------|
|**SingerID**|
|FirstName|
|LastName|
|BirthYear|

## CRUD-Befehle für die Tabelle `Singer`

Methode | URL | Bedeutung
--------| ----| ---------
GET|/singers| hole alle Datensätze 
GET| /singers/11| hole den Datensatz mit der ID = 11
POST| /singers | füge einen neuen Datensatz hinzu
PUT | /singers/11 | ändere den Datensatz mit der ID = 11
DELETE| /singers/11 | lösche den Datensatz mit der ID = 11
DELETE | /singers   | lösche alle Datensätze 


# Frontend

mit Angular und Bootstrap. Alle CRUD- Operationen werden ausgeführt. 


[npm Test]: Images/runTest.png  "Run Test"
# 2533282_DB
# 2533282_DB_sem4
