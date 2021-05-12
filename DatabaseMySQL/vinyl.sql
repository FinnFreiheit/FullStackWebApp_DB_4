-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 19. Mrz 2021 um 12:59
-- Server-Version: 8.0.21
-- PHP-Version: 7.3.24-(to be removed in future macOS)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `vinyl`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Album`
--

CREATE TABLE `Album` (
  `AlbumID` int NOT NULL,
  `Name` int NOT NULL,
  `SingerID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Singer`
--

CREATE TABLE `Singer` (
  `SingerID` int NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `BirthYear` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `Singer`
--

INSERT INTO `Singer` (`SingerID`, `LastName`, `FirstName`, `BirthYear`) VALUES
(1, 'Grönemeyer', 'Herbert', 1956),
(4, 'O\'Connor', 'Sinead', 1966),
(5, 'Young', 'Neil', 1945),
(6, 'Springsteen', 'Bruce', 1949),
(8, 'Test1', 'Test2', 1999);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Album`
--
ALTER TABLE `Album`
  ADD PRIMARY KEY (`AlbumID`),
  ADD KEY `SingerID` (`SingerID`);

--
-- Indizes für die Tabelle `Singer`
--
ALTER TABLE `Singer`
  ADD PRIMARY KEY (`SingerID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Album`
--
ALTER TABLE `Album`
  MODIFY `AlbumID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Singer`
--
ALTER TABLE `Singer`
  MODIFY `SingerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Album`
--
ALTER TABLE `Album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`SingerID`) REFERENCES `Singer` (`SingerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
