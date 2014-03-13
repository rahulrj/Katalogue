-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 24, 2014 at 12:48 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `empid` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `product_id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`product_id`, `category`) VALUES
(1, 'simulation'),
(2, 'simulation'),
(3, 'animation'),
(4, 'animation');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(100) NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `client_name`) VALUES
(1, 'accenture'),
(2, 'wipro');

-- --------------------------------------------------------

--
-- Table structure for table `client_info`
--

CREATE TABLE IF NOT EXISTS `client_info` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) DEFAULT NULL,
  `client_org` varchar(100) DEFAULT NULL,
  `client_email` varchar(100) DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT NULL,
  `request_category` varchar(45) DEFAULT NULL,
  `requested_thing` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client_products`
--

CREATE TABLE IF NOT EXISTS `client_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `client_id` (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `client_products`
--

INSERT INTO `client_products` (`id`, `product_id`, `client_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client_program`
--

CREATE TABLE IF NOT EXISTS `client_program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_id` (`program_id`),
  KEY `client_id` (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `client_program`
--

INSERT INTO `client_program` (`id`, `program_id`, `client_id`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `developers`
--

CREATE TABLE IF NOT EXISTS `developers` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `dlpr_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `logo_id` int(11) DEFAULT NULL,
  `short_description` varchar(200) DEFAULT NULL,
  `full_description` text,
  `image_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `acct_manager` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `logo_id`, `short_description`, `full_description`, `image_id`, `price`, `acct_manager`) VALUES
(1, 'res', 34, 'gghj', 'hgjhjkku', 3, '45555.00', 'nbmnm'),
(2, 'new product', 1, 'used for training of managers', 'used for training of managers', 12, '20000.00', 'rahul raja'),
(3, 'fdgf', 34, 'gfh', 'gfhgj', 67, '56666.00', 'ghg'),
(4, 'ILead', 4, 'Designed for leaders to lead', 'iLead Simulation', 20, '20000.00', 'samu'),
(12, 'Its B2B', 34, 'Hello its B2B', 'Helllo hello its its B2B B2B', 23, '23000.00', 'Varuni');

-- --------------------------------------------------------

--
-- Table structure for table `product_tags`
--

CREATE TABLE IF NOT EXISTS `product_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `product_tags`
--

INSERT INTO `product_tags` (`id`, `product_id`, `tag_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE IF NOT EXISTS `programs` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(150) DEFAULT NULL,
  `logo_id` int(11) DEFAULT NULL,
  `short_desc` varchar(500) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `acct_manager` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `program_name`, `logo_id`, `short_desc`, `description`, `price`, `acct_manager`) VALUES
(1, 'training', 1, 'used for training of managers', 'used for training of managers', '20000.00', 'rahul raja'),
(6, 'New progs', 45, 'Designed for leaders to lead', 'iLead Simulation is a compelling, real-life-like simulation that tests the leadership mettle of the user. In the simulation, the user steps into the role of a sales director of an elevator company that has created a market for itself through innovative products. The sales team selling a specific elevator product is under-performing and is no where close to achieving the target. The user has to inspire, motivate and turnaround the sales team to achieve the sales target.', '20000.00', 'samu');

-- --------------------------------------------------------

--
-- Table structure for table `program_products`
--

CREATE TABLE IF NOT EXISTS `program_products` (
  `program_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  KEY `program_id` (`program_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `program_products`
--

INSERT INTO `program_products` (`program_id`, `product_id`) VALUES
(1, 2),
(1, 3),
(6, 3),
(6, 4);

-- --------------------------------------------------------

--
-- Table structure for table `program_tags`
--

CREATE TABLE IF NOT EXISTS `program_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_id` (`program_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `program_tags`
--

INSERT INTO `program_tags` (`id`, `program_id`, `tag_id`) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 6, 1),
(4, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Manager'),
(2, 'CEO');

-- --------------------------------------------------------

--
-- Table structure for table `role_product`
--

CREATE TABLE IF NOT EXISTS `role_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `role_product`
--

INSERT INTO `role_product` (`id`, `product_id`, `role_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `role_program`
--

CREATE TABLE IF NOT EXISTS `role_program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_id` (`program_id`),
  KEY `role_id` (`role_id`),
  KEY `program_id_2` (`program_id`),
  KEY `program_id_3` (`program_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `role_program`
--

INSERT INTO `role_program` (`id`, `program_id`, `role_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 6, 2),
(4, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `skill_sets`
--

CREATE TABLE IF NOT EXISTS `skill_sets` (
  `skill_set_id` int(11) NOT NULL,
  `skill_set_name` varchar(100) NOT NULL,
  PRIMARY KEY (`skill_set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skill_sets`
--

INSERT INTO `skill_sets` (`skill_set_id`, `skill_set_name`) VALUES
(1, 'abc'),
(2, 'def');

-- --------------------------------------------------------

--
-- Table structure for table `skill_set_product`
--

CREATE TABLE IF NOT EXISTS `skill_set_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `skill_set_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `skill_set_id` (`skill_set_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `skill_set_product`
--

INSERT INTO `skill_set_product` (`id`, `product_id`, `skill_set_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `skill_set_program`
--

CREATE TABLE IF NOT EXISTS `skill_set_program` (
  `program_id` int(11) NOT NULL,
  `skill_set_id` int(11) NOT NULL,
  PRIMARY KEY (`program_id`,`skill_set_id`),
  KEY `skill_set_prog_fk_idx` (`program_id`),
  KEY `skill_set_id` (`skill_set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skill_set_program`
--

INSERT INTO `skill_set_program` (`program_id`, `skill_set_id`) VALUES
(1, 1),
(1, 2),
(6, 1),
(6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `tag_id` int(11) NOT NULL,
  `tag_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_name`) VALUES
(1, 'abc'),
(2, 'def');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials_product`
--

CREATE TABLE IF NOT EXISTS `testimonials_product` (
  `product_id` int(11) NOT NULL,
  `testimonial` text,
  KEY `testimonials_fk_idx` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials_program`
--

CREATE TABLE IF NOT EXISTS `testimonials_program` (
  `program_id` int(11) NOT NULL,
  `testimonial` text,
  KEY `testimonial_prog_fk_idx` (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_products`
--
ALTER TABLE `client_products`
  ADD CONSTRAINT `client_products_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `client_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_program`
--
ALTER TABLE `client_program`
  ADD CONSTRAINT `client_program_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `client_program_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `developers`
--
ALTER TABLE `developers`
  ADD CONSTRAINT `developers_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `product_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_tags_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `program_products`
--
ALTER TABLE `program_products`
  ADD CONSTRAINT `program_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `program_products_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `program_tags`
--
ALTER TABLE `program_tags`
  ADD CONSTRAINT `program_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `program_tags_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_product`
--
ALTER TABLE `role_product`
  ADD CONSTRAINT `role_product_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_program`
--
ALTER TABLE `role_program`
  ADD CONSTRAINT `role_program_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_program_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `skill_set_product`
--
ALTER TABLE `skill_set_product`
  ADD CONSTRAINT `skill_set_product_ibfk_3` FOREIGN KEY (`skill_set_id`) REFERENCES `skill_sets` (`skill_set_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_set_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `skill_set_program`
--
ALTER TABLE `skill_set_program`
  ADD CONSTRAINT `skill_set_program_ibfk_3` FOREIGN KEY (`skill_set_id`) REFERENCES `skill_sets` (`skill_set_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_set_program_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `testimonials_product`
--
ALTER TABLE `testimonials_product`
  ADD CONSTRAINT `testimonials_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `testimonials_program`
--
ALTER TABLE `testimonials_program`
  ADD CONSTRAINT `testimonial_prog_fk` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
