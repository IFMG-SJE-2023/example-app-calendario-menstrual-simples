-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Maio-2023 às 05:23
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `appcalendar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `ciclo_menstruals`
--

CREATE TABLE `ciclo_menstruals` (
  `id` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_final` date DEFAULT NULL,
  `intervalo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
  `userid` int(11) DEFAULT  NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `ciclo_menstruals`
--

INSERT INTO `ciclo_menstruals` (`id`, `id_usuario`, `data_inicio`, `data_final`, `intervalo`, `createdAt`, `updatedAt`, `userid`) VALUES
(14, 1, '2023-05-17 00:00:00', '2023-05-21 00:00:00', 26, '2023-05-02 13:29:33', '2023-05-02 13:29:33', 1),
(15, 1, '2023-05-17 00:00:00', '2023-05-21 00:00:00', 26, '2023-05-02 13:29:59', '2023-05-02 13:29:59', 1),
(16, 2, '2023-05-17 00:00:00', '2023-05-21 00:00:00', 26, '2023-05-02 14:09:23', '2023-05-02 14:09:23', 2),
(17, 2, '2023-05-17 00:00:00', '2023-05-21 00:00:00', 26, '2023-05-02 14:09:34', '2023-05-02 14:09:34', 2),
(18, 3, '2023-05-17 00:00:00', '2023-05-21 00:00:00', 26, '2023-05-02 14:10:44', '2023-05-02 14:10:44', 3),
(19, 3, '2023-05-17 00:00:00', '2023-05-21 00:00:00', 26, '2023-05-02 14:10:56', '2023-05-02 14:10:56', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `relacaosexuals`
--

CREATE TABLE `relacaosexuals` (
  `id` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
  `userid` int(11) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `relacaosexuals`
--

INSERT INTO `relacaosexuals` (`id`, `id_usuario`, `data`, `createdAt`, `updatedAt`, `userid`) VALUES
(13, 2, '2023-05-05 00:00:00', '2023-05-02 18:53:13', '2023-05-02 18:53:13', 2),
(14, 2, '2023-05-06 00:00:00', '2023-05-02 18:53:52', '2023-05-02 18:53:52', 2),
(13, 1, '2023-05-05 00:00:00', '2023-05-02 18:53:13', '2023-05-02 18:53:13', 1),
(14, 1, '2023-05-06 00:00:00', '2023-05-02 18:53:52', '2023-05-02 18:53:52', 1),
(13, 3, '2023-05-05 00:00:00', '2023-05-02 18:53:13', '2023-05-02 18:53:13', 3),
(14, 3, '2023-05-06 00:00:00', '2023-05-02 18:53:52', '2023-05-02 18:53:52', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230502044125-create-user.js'),
('20230502044127-create-ciclo-menstrual.js'),
('20230502044129-create-relacao-sexual.js');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `data_nascimento` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `data_nascimento`, `createdAt`, `updatedAt`) VALUES
(1, 'Mariana', 'mariana@gmail.com', '123', '2023-05-02 03:43:46', '2023-05-02 04:46:10', '2023-05-02 04:46:10'),
(2, 'Daniel', 'daniel@gmail.com', '123', '2011-01-20 04:42:49', '2023-05-02 05:44:05', '2023-05-02 05:44:05'),
(3, 'Maria Silva', 'maria@gmail.com', '123', '2001-05-02 12:28:36', '2023-05-02 14:21:27', '2023-05-02 14:21:27');

--
-- Índices para tabelas despejadas
--


--
-- Índices para tabela `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ciclo_menstruals`
--
ALTER TABLE `ciclo_menstruals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `relacaosexuals`
--
ALTER TABLE `relacaosexuals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
