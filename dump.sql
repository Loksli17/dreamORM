-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: orm
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(19) NOT NULL,
  `isKek` tinyint DEFAULT NULL,
  `number` float DEFAULT NULL,
  `text` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data`
--

LOCK TABLES `data` WRITE;
/*!40000 ALTER TABLE `data` DISABLE KEYS */;
INSERT INTO `data` VALUES (1,'title','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(2,'title1','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(3,'title2','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(4,'title3','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(5,'title4','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(6,'title5','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(7,'title6','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(8,'title7','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(9,'title8','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...'),(10,'title9','ogneniyVasyan@gmai.com','+7 (924) 109-83-57',0,322.5,'КОГДА ТО БЫЛ СЧАСТЛИВ, А СЧАСТЬЕ ТАК И УШЛО...');
/*!40000 ALTER TABLE `data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-14 23:15:37
