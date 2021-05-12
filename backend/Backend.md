# Datenbank vinyl

## Tabelle `Singer`

|Singer|
|-----------|
|**SingerID**|
|FirstName|
|LastName|
|BirthYear|

# CRUD-Befehle für die Tabelle `Singer`

Methode | URL | Bedeutung
--------| ----| ---------
GET|/singers| hole alle Datensätze 
GET| /singers/11| hole den Datensatz mit der ID = 11
POST| /singers | füge einen neuen Datensatz hinzu
PUT | /singers/11 | ändere den Datensatz mit der ID = 11
DELETE| /singers/11 | lösche den Datensatz mit der ID = 11
DELETE | /singers   | lösche alle Datensätze 