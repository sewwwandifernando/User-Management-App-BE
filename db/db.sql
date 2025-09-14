/*
 Navicat Premium Dump SQL

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : user-mgt-app

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 14/09/2025 15:30:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(50) NOT NULL,
  `aboutYou` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `mobileNumber` varchar(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Users
-- ----------------------------
BEGIN;
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (1, '2025-09-13 05:40:19', '2025-09-13 05:52:15', 'Sewwandi', 'I am Sewwandi Nirushika', '2000-10-22 00:00:00', '0761059191', 'sewwandi@gmail.com', 'Sri Lanka');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (3, '2025-09-13 11:04:03', '2025-09-13 11:04:03', 'Nirushika', 'Hi, I am Nirushika', '2000-10-20 00:00:00', '0761059292', 'nirushika@gmail.com', 'England');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (4, '2025-09-13 11:04:58', '2025-09-13 11:04:58', 'Kavindu', 'Hello, I am Kavindu', '1998-04-15 00:00:00', '0771234567', 'kavindu98@gmail.com', 'Sri Lanka');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (5, '2025-09-13 11:06:11', '2025-09-13 11:06:11', 'Samantha', 'Hi, I am Samantha', '1995-09-02 00:00:00', '0712345678', 'samantha95@yahoo.com', 'Australia');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (7, '2025-09-13 11:06:55', '2025-09-13 11:06:55', 'Meera', 'Hello, I am Meera', '2001-01-12 00:00:00', '0759876543', 'meera01@gmail.com', 'Canada');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (9, '2025-09-13 11:07:23', '2025-09-13 11:07:23', 'Isabella', 'Hi, I am Isabella', '2002-05-10 00:00:00', '0701122334', 'isabella02@gmail.com', 'USA');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (13, '2025-09-13 11:09:45', '2025-09-13 11:09:45', 'Anjali', 'Hi, this is Anjali', '1993-02-28 00:00:00', '0719988776', 'anjali93@gmail.com', 'India');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (17, '2025-09-13 11:11:01', '2025-09-13 11:11:01', 'Emma', 'Hi, Emma here', '1998-12-07 00:00:00', '0754443332', 'emma98@gmail.com', 'England');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (18, '2025-09-13 11:11:16', '2025-09-14 06:15:40', 'Liam', 'Hey, I am Liam, I\'m from Australia', '2001-04-27 00:00:00', '0703344556', 'liam01@gmail.com', 'Australia');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (20, '2025-09-14 03:55:45', '2025-09-14 03:57:04', 'Olivia', 'Hi I am Olivia', '2002-09-02 00:00:00', '0761456782', 'olivia@gmail.com', 'Canada');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (21, '2025-09-14 04:15:00', '2025-09-14 04:47:29', 'Reona', 'Hi I am Reona', '2006-03-06 00:00:00', '0765976541', 'reona@gmail.com', 'Sri Lanka');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (22, '2025-09-14 04:25:14', '2025-09-14 04:27:14', 'Sanduni', 'Hi I am Sanduni I\'m from Italy', '2000-06-12 00:00:00', '0762345651', 'sanduni@gmail.com', 'Italy');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (23, '2025-09-14 04:58:01', '2025-09-14 08:06:03', 'Marian', 'Hi I am Marian', '1998-03-02 00:00:00', '0767985154', 'marian@gmail.com', 'Sri Lanka');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (24, '2025-09-14 06:13:45', '2025-09-14 06:13:45', 'Dilmi', 'Hello, I am Dilmi', '2003-09-01 00:00:00', '0776534123', 'dilmi@gmail.com', 'USA');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (25, '2025-09-14 06:15:08', '2025-09-14 06:15:08', 'Shane', 'Hi, I am Shane and I\'m from Italy', '2006-03-06 00:00:00', '+9123456512', 'shane12@gmail.com', 'Italy');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (26, '2025-09-14 06:16:49', '2025-09-14 06:16:49', 'Ravindu', 'Hi I am Ravindu', '2000-05-08 00:00:00', '0754523146', 'ravindu@gmail.com', 'Sri Lanka');
INSERT INTO `Users` (`id`, `createdAt`, `updatedAt`, `name`, `aboutYou`, `birthday`, `mobileNumber`, `email`, `country`) VALUES (27, '2025-09-14 09:17:15', '2025-09-14 09:17:15', 'Savinidi', 'Hi, I am Savindi', '2007-02-05 00:00:00', '0761057865', 'savindi@gmail.com', 'Sri Lanka');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
