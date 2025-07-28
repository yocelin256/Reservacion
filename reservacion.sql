-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-06-2025 a las 20:21:38
-- Versión del servidor: 8.0.42
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservacion`
--

CREATE TABLE `reservacion` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `invitados` varchar(50) NOT NULL,
  `tipo_evento` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `comentarios` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `reservacion`
--

INSERT INTO `reservacion` (`id`, `nombre`, `email`, `telefono`, `invitados`, `tipo_evento`, `fecha`, `hora`, `comentarios`, `fecha_registro`) VALUES
(11, 'Yocelin', 'yocelingarcia2110@gmail.com', '7443754594', '2', '', '2025-06-22', '16:23:00', 'Festejo de cumpleaños', '2025-06-21 22:23:21'),
(12, 'Aldan Adame Gallardo', 'barramun79@gmail.com', '7443754594', '2', '', '2025-06-22', '16:27:00', 'Festejo de cumpleaños', '2025-06-21 22:27:52'),
(13, 'Cristal ', '00692890@red.unid.mx', '7445328706', '2', '', '2025-06-23', '16:58:00', 'Cumpleaños', '2025-06-21 22:58:30'),
(14, 'Yocelin', 'yocelingarcia2110@gmail.com', '7443754594', '6', 'Baby Shower', '2025-06-23', '15:06:00', '', '2025-06-22 21:06:47'),
(15, 'Yoce', 'yocelingarcia2110@gmail.com', '7443754594', '3', 'XV años', '2025-06-29', '12:18:00', 'prueba', '2025-06-28 18:18:29');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservacion`
--
ALTER TABLE `reservacion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservacion`
--
ALTER TABLE `reservacion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
