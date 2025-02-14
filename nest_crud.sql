-- Adminer 4.8.1 MySQL 8.0.41-0ubuntu0.20.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `role` enum('user','admin','noauth') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `email`, `username`, `password`, `refreshToken`, `role`) VALUES
(1,	'',	'testuser',	'$2b$10$VaPUU2Z3FY.vvRO4F1s1deSDHVcdEOOH1Kw956goMkotxFd1GHOci',	'$2b$10$bHPGszNmf0kCX1wkD9e9gOLX6K1Ewcm5AysL3Gxg8WoWID5pyM2iK',	'user'),
(2,	'',	'John Doe',	'$2b$10$CHcMLV78VkRhJS9zgK04EuqqxV5LDZEfLoGRloxrP51f2hjPFNtvq',	NULL,	'user'),
(3,	'',	'John Doe',	'$2b$10$A2Mg4bTI41PmeUVnvPGq3OJLt1xuritbjNmlQ1mLYr.mYaec3W3eu',	NULL,	'user'),
(4,	'john@example.com',	'John Doe',	'password123',	NULL,	'user');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `age`, `created_at`, `updated_at`) VALUES
(3,	'owan Doe',	'owan@example.com',	NULL,	22,	'2024-11-17 07:09:08',	'2024-11-17 12:39:08'),
(4,	'bowan Doe',	'bowan@gmail.com',	NULL,	23,	'2024-11-17 07:09:45',	'2024-11-17 12:39:45'),
(5,	'john',	'john@example.com',	NULL,	39,	'2024-11-20 06:23:41',	'2024-11-20 11:53:41');

-- 2025-02-14 08:22:23
