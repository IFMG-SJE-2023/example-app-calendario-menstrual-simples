-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.38-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para appcalendar3
CREATE DATABASE IF NOT EXISTS `appcalendar3` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `appcalendar3`;

-- Copiando estrutura para tabela appcalendar3.ciclo_menstruals
CREATE TABLE IF NOT EXISTS `ciclo_menstruals` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_final` date DEFAULT NULL,
  `intervalo` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `UserId` int(11) NOT NULL,
  KEY `FK__users` (`id_usuario`),
  CONSTRAINT `FK__users` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela appcalendar3.ciclo_menstruals: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `ciclo_menstruals` DISABLE KEYS */;
INSERT INTO `ciclo_menstruals` (`id`, `id_usuario`, `data_inicio`, `data_final`, `intervalo`, `createdAt`, `updatedAt`, `UserId`) VALUES
	(0, 1, '2023-04-01', '2023-04-05', 26, '2023-05-07', '2023-05-07', 1),
	(0, 1, '2023-05-07', '2023-05-11', 26, '2023-05-07', '2023-05-07', 1);
/*!40000 ALTER TABLE `ciclo_menstruals` ENABLE KEYS */;

-- Copiando estrutura para tabela appcalendar3.relacaosexuals
CREATE TABLE IF NOT EXISTS `relacaosexuals` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  KEY `FK__users_relacao` (`id_usuario`),
  CONSTRAINT `FK__users_relacao` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela appcalendar3.relacaosexuals: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `relacaosexuals` DISABLE KEYS */;
INSERT INTO `relacaosexuals` (`id`, `id_usuario`, `UserID`, `data`, `createdAt`, `updatedAt`) VALUES
	(0, 1, 1, '2023-05-02', '2023-05-02', '2023-05-02'),
	(1, 1, 1, '2023-05-10', '2023-05-02', '2023-05-02'),
	(2, 1, 1, '2023-05-11', '2023-05-02', '2023-05-02'),
	(3, 1, 1, '2023-05-15', '2023-05-02', '2023-05-02'),
	(5, 1, 1, '2023-05-12', '2023-05-07', '2023-05-07'),
	(0, 1, 0, '0000-00-00', '2023-05-07', '2023-05-07'),
	(0, 1, 0, '2023-05-14', '2023-05-07', '2023-05-07'),
	(0, 1, 0, '2023-05-14', '2023-05-07', '2023-05-07'),
	(0, 1, 0, '2023-05-15', '2023-05-07', '2023-05-07'),
	(0, 1, 0, '2023-05-18', '2023-05-07', '2023-05-07'),
	(0, 1, 0, '2023-05-18', '2023-05-07', '2023-05-07');
/*!40000 ALTER TABLE `relacaosexuals` ENABLE KEYS */;

-- Copiando estrutura para tabela appcalendar3.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `data_nascimento` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela appcalendar3.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `data_nascimento`, `createdAt`, `updatedAt`) VALUES
	(0, 'Beltrana', 'beltrana@mail.com', '123', '2000-05-02', '2023-05-02', '2023-05-02'),
	(1, 'Fulana', 'fulana@mail.com', '123', '2023-05-01', '2023-05-07', '2023-05-07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
