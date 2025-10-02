-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Paź 2025, 20:12
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `notes_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `note` varchar(400) NOT NULL,
  `date` date DEFAULT NULL,
  `editedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `notes`
--

INSERT INTO `notes` (`id`, `user_id`, `title`, `note`, `date`, `editedDate`) VALUES
(162, 1, 'sdf', 'sdferwt', NULL, '2025-07-10'),
(190, 1, 'df', 'dfffd', NULL, '2025-07-11'),
(230, 1, 'fggRAZ DWA moje moje m', 'RAZ DWA to jest tekst próbny do aplikacji zarządzanie notatelk sdf', NULL, '2025-06-21'),
(236, 1, 'ds', 'dsfsf ppd fvdsdf', NULL, '2025-07-13'),
(239, 1, 'f', 'dfg', NULL, NULL),
(240, 1, 'dfg', 'fg', NULL, NULL),
(246, 1, 'df', 'fdg', NULL, NULL),
(251, 1, 'vcb', 'vcbvbc', NULL, NULL),
(252, 1, 'XXXXXXXXXXXXXXXXXXdsfd', 'To jest tekst pRÓBNY ABY ZOBACZYĆ CZY APLIKACJA DZIAŁA POPRAWNIE dsfd s dsd s  s dsdfs sd dsfds sf s fsf f fs dsff  fsf s ', NULL, '2025-03-25'),
(258, 1, 'dfg', 'fdgrgfgfgd', NULL, NULL),
(259, 1, 'dfgdf', 'fg', NULL, '2025-03-24'),
(260, 1, 'fg', 'fgfg', NULL, NULL),
(261, 1, 'd', 'cxvcxvd', NULL, '2025-07-07'),
(262, 1, 'dfs', 'sdfsdfzx', NULL, NULL),
(263, 1, 'dsf', 'dsf', NULL, NULL),
(264, 1, 'zx', 'zxx', NULL, NULL),
(265, 1, 'teksrt X', 'XXX XX XXX XXX XXXX XX XXX XXX XXX XXX XXX  XXX X XXX XX XXXXX X X XXXX XXXXX XXX', NULL, NULL),
(266, 1, 'dfg', 'NatomiaST TEN TEKST JEST PRÓBNY KONSTANTY NOPOLITAŃ ddfdfd dfdfd', NULL, NULL),
(267, 1, 'dfg', 'fdgg', NULL, NULL),
(268, 1, 'dfg', 'fdg', NULL, NULL),
(269, 1, 'fdggfd', 'dfggfd', NULL, '2025-07-07'),
(270, 1, 'fdg', 'dfg', NULL, NULL),
(271, 1, 'gfddfg', 'fdg', NULL, NULL),
(273, 1, 'fdg', 'fdggf', NULL, NULL),
(274, 1, 'fdgfdg', 'gfd', NULL, NULL),
(275, 1, 'dfg', 'fdggf', NULL, NULL),
(276, 1, 'dfggfd', 'dfdf', NULL, NULL),
(277, 1, 'df', 'gdffgd', NULL, NULL),
(278, 1, 'fdg', 'fdg', NULL, NULL),
(281, 1, 'sdf', 'fd', NULL, NULL),
(282, 1, 'sdfssf', 'a', NULL, NULL),
(283, 1, 'afa', 'afffff', NULL, NULL),
(284, 1, 'afaf', 'afaf', NULL, NULL),
(285, 1, 'ASDAS AS AS SASSSccxcx', 'afavgfhgfhfghf gf h gf hf gf gf fg gf   fgh g  gfhf fghgf fg gf  gf f', NULL, NULL),
(288, 1, 'Bartek XXXXX XXXX MSMC', 'Film nazywa się atak lorem ipsum dolor set amet lorem ipsum do d', NULL, NULL),
(289, 1, 'sdfdsfdsfdsf sdf dfs f', 'dfsf dssdf dsf s ds dsdss dfss ffssdfsds dsdsfssf dds dss ds ds ', NULL, NULL),
(290, 1, 'Witaj świecie todjest ', 'Witaj świecie to mój pierwszy program fdg fgdf dfdfdgdf d gdgfg', NULL, NULL),
(292, 1, 'dsffdsf sdfdsfds dsfds', 'sdfdsdfsdsf sdfdsfsdfdsf sdfdsdsfdssd dsfdsdfdsfdsf   sddsdssdsddsfdsdsfsds sdssddsddsdd sdsddssd', NULL, NULL),
(293, 1, 'vxcvvcx', 'xc', NULL, NULL),
(294, 1, 'xcv', 'xcvvcx', NULL, NULL),
(295, 1, 'xcv', 'xcvcxv', NULL, NULL),
(296, 1, 'xcvxcv', 'xcvvxc', NULL, NULL),
(300, 1, 'mój 2 ', 'mój 2', NULL, NULL),
(301, 1, 'sd dsf', ' ddsf', NULL, NULL),
(302, 1, 'sdf', 'sdfdfsfd', NULL, NULL),
(303, 1, 'dsfsfd', 'fdfsdfdfs dfs d  dsf ds ds  dsdsddsf ds ', NULL, NULL),
(304, 1, 'rewds', 'dsfdsfdfs', NULL, NULL),
(305, 1, 'dsf', 'sdfdsf', NULL, NULL),
(314, 10, 'fc', 'cxvcxv', NULL, NULL),
(317, 1, 'HEY ssd HEJ HEJEH JEKJ', 'HEY HET HEJ', NULL, NULL),
(319, 10, 'Mój', 'moja, MOJA', '2024-03-12', NULL),
(323, 1, 'dsfsfd', 'dsfsd', '2025-03-22', '2025-03-25'),
(330, 8, 'df', 'dfdfdf', '2025-03-22', '2025-03-24'),
(335, 8, 'df', 'df', '2025-03-24', NULL),
(336, 8, 'fgds', 'sdgdsggsdsgds sd g dsg dssd sdg dgsgsd dsg dgsdgsdsg sdgsd ds dsdf f fd dffdggfddf dfg fd fdf dsfdsf dsdss ds sd mój mój  ', '2025-03-24', '2025-03-25'),
(337, 8, 'df', 'dfgf', '2025-03-24', '2025-03-24'),
(338, 1, 'xcvxc', 'vxv', '2025-03-24', '2025-03-24'),
(339, 1, 't', 'gfh', '2025-03-24', NULL),
(341, 1, 'sdf', 'sdffds', '2025-03-24', NULL),
(343, 1, 'cxdf', 'xbcbcsdf', '2025-03-24', '2025-03-24'),
(344, 1, 'sad', 'sdada', '2025-03-25', NULL),
(345, 1, 'Dysk m2', 'dysk m2 nvme', '2025-03-25', '2025-03-25'),
(346, 1, 'd', 'dsfd', '2025-03-25', NULL),
(347, 8, 'fdg', 'dfggf', '2025-03-25', NULL),
(348, 8, 'cxvcvx', 'cxvcxv', '2025-03-25', NULL),
(350, 8, 'cvb', 'cvbvc', '2025-03-25', NULL),
(351, 8, 'Wielkanoc dfsffds dsds', 'dfpkdkj lkmfkl mdf fdgfdgfd fdg  d gdfgfdg fdg f ddg fd fd fdgfddgdg fdfg fd fdfd fdfd ', '2025-04-21', '2025-04-21'),
(352, 8, 'dfg', 'dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', '2025-04-21', NULL),
(353, 8, '', 'hjgjhgjhjkhbkjhbkjkjbjkbkjkjjbkbjkbkjbkbkbkjjkkbkbkjbjbjjjjjjjjjjjjjjjjjjjkjbkbblllblkbklbkljhb', '2025-04-21', NULL),
(354, 1, 'hej', 'co tam nic', '2025-06-21', '2025-06-21'),
(355, 1, 'sdf', 'fd', '2025-07-10', NULL),
(356, 1, 'sdffd', 'df', '2025-07-10', NULL),
(357, 1, 'dfd', 'fsfd', '2025-07-10', NULL),
(358, 1, 'fd', 'sdffd', '2025-07-10', NULL),
(360, 14, 'cvb', 'vcbvc', '2025-07-13', NULL),
(362, 1, 'sdsdfsfsdfsdfdsfsfdsdf', 'sdfdfsdssdfdsffdsdfssfdsfdsfdsdsfdsfdssdfdsdssddsfdfsfdssdsfdsfdsdfdsdsfdsdfdsdsffdsdsffdsfdsfdsffdsdfds', '2025-07-14', NULL),
(375, 15, 'df', 'df', '2025-08-14', NULL),
(376, 15, 'df', 'dffd', '2025-08-14', NULL),
(379, 15, 'dfd', 'sfsdf', '2025-08-14', NULL),
(380, 15, 'fgfg', 'f', '2025-08-14', NULL),
(381, 15, 'fdg', 'fdggfd', '2025-08-14', NULL),
(382, 18, 'vb c', 'cvbvcb', '2025-08-14', NULL),
(383, 18, 'gfh', 'gfh', '2025-08-14', NULL),
(384, 15, 'dv', 'dfddf', '2025-08-20', NULL),
(392, 19, 'fggf', 'fgfggffgfg', '2025-08-21', '2025-08-22'),
(396, 19, 'dfhdfhgfdhhdhgdhdhdfhd', 'dfhfdhghfhgfhgfhgfhghffhgfgfhgfhgfhghfgfhgfhgfhfhfhhgfhfhfghgfhcvcvdfg fdgdg fd fd fdg fd', '2025-08-22', '2025-09-20'),
(401, 19, 'dsfsf', 'dsfsfdfdfsazsdwerwerwer w eww ew w wr ww ew  w ew w e wrwr ewr ewr rwrw w rew rew w rw ew w  ww', '2025-08-23', '2025-09-19'),
(402, 19, 'dsfdsdf', 'sfdfsdffdf', '2025-08-23', '2025-09-18'),
(404, 22, 'dfdfdf', 'dfdff', '2025-08-23', NULL),
(405, 23, 'Przykładowy tekstPrzyk', 'Przykładowy tekst Przykłądowy tekstPrzykłądowy tekstPrzykłądowy tekst', '2025-08-23', NULL),
(407, 23, 'Lorem ipsum', 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', '2025-08-23', NULL),
(408, 23, 'Lorem ipsumLorem ipsum', 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', '2025-08-23', NULL),
(409, 23, 'Lorem ipsumLorem ipsum', 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', '2025-08-23', NULL),
(410, 23, 'Lorem ipsumLorem ipsum', 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', '2025-08-23', NULL),
(411, 23, 'sd', 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', '2025-08-23', NULL),
(412, 23, 'fgfdggf', 'ffdgfdgd', '2025-08-23', NULL),
(413, 23, 'Lorem ipsumLorem ipsum', 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', '2025-08-23', NULL),
(419, 24, 'sdsd', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-24', NULL),
(420, 24, 'sdcds', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-24', NULL),
(421, 24, 'sdds', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-24', NULL),
(422, 24, 'sdds', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-24', NULL),
(423, 24, 'fsf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-24', NULL),
(424, 24, 'sds', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-24', NULL),
(425, 24, 'dsfd', 'sdfdsfdsfdsfdsdsffdssdfdsfsdfdsfsffffffffffffffffffffffffffdsfdsfdsssdfdsfdsfdsfdsdsffdssdfdsfsdfdsfsffffffffffffffffffffffffffdsfdsfdsssdfdsfdsfdsfdsdsffdssdfdsfsdfdsfsffffffffffffffffffffffffffdsfds', '2025-08-24', NULL),
(426, 24, 'dfgs', 'dsfsfdsfd', '2025-08-24', NULL),
(427, 25, 'Lorem ipsum', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-25', NULL),
(428, 25, 'DGSDGSDGGDSSGSDGSDGDSG', 'DGSDGSDGGDSSGSDGSDGDSGDGSDGSDGGDSSGSDGSDGDSGDGSDGSDGGDSSGSDGSDGDSGDGSDGSDGGDSSGSDGSDGDSGDGSDGSDGGDSSGSDGSDGDSGDGSDGSDGGDSSGSDGSDGDSG', '2025-08-25', NULL),
(429, 25, 'dfgd', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-25', NULL),
(430, 25, 'dssd', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-25', NULL),
(431, 25, 'sffs', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of t', '2025-08-25', NULL),
(432, 29, 'Lorem Ipsum', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&amp;#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley ', '2025-08-25', '2025-08-25'),
(433, 29, 'TEKST TEKST TEKST TEKS', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, wh', '2025-08-25', NULL),
(434, 29, 'TEKST TEKST', 'TEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKSTTEKST', '2025-08-25', NULL),
(435, 31, 'Tekst Tekst', 'Tekst tekst Tekst tekst Tekst tekst Tekst tekst Tekst tekst Tekst tekst Tekst tekst Tekst tekst effesf', '2025-08-25', '2025-08-25'),
(436, 31, 'TekstTekstTekstTekstT', 'TekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekstTekst', '2025-08-25', NULL),
(437, 31, 'TekstTekstTekstTekstT', 'TekstTekstTekstTekstTTekstTekstTekstTekstTTekstTekstTekstTekstTTekstTekstTekstTekstT TekstTekstTekstTekstT TekstTekstTekstTekstT', '2025-08-25', NULL),
(439, 31, 'TekstTekstTekstTekstT', 'TekstTekstTekstTekstT TekstTekstTekstTekstT TekstTekstTekstTekstT\nTekstTekstTekstTekstT', '2025-08-25', NULL),
(440, 31, 'sdfsdfs', 'sdfsdfdfssdf', '2025-08-26', '2025-08-26'),
(441, 31, 'xzczx', 'zxcxzcxzc', '2025-08-26', NULL),
(442, 32, 'sfd', 'dsfd', '2025-08-26', NULL),
(443, 19, 'rte xc', 'dfgfdcv', '2025-09-15', '2025-10-02'),
(444, 19, 'dfgdfg', 'gd', '2025-09-15', NULL),
(445, 19, 'sdfsdf', 'dsfsdf', '2025-09-20', NULL),
(446, 19, 'sdfgsdf', 'dsfsdfaf', '2025-09-20', NULL),
(447, 19, 'asf', 'asfdsff', '2025-09-20', NULL),
(448, 19, 'saf', 'fsadf', '2025-09-20', NULL),
(450, 19, 'sfdsdaf dsf', 'sadfsf ds', '2025-09-20', '2025-10-02'),
(452, 19, 'sf', 'sfdfsd', '2025-09-20', NULL),
(453, 19, 'safsdf', 'sdfsd', '2025-09-20', NULL),
(454, 19, 'sfdsdf', 'sfdsdf', '2025-09-20', NULL),
(455, 19, 'sdfsfd', 'fsdfaf', '2025-09-20', NULL),
(456, 19, 'ggf', 'dfg', '2025-09-20', NULL),
(457, 19, 'dgfdg', 'fdgdfg', '2025-09-20', NULL),
(458, 19, 'gfdgfd', 'dgfd', '2025-09-20', NULL),
(459, 19, 'dgfdgf ff', 'dgfdf ff', '2025-09-20', '2025-10-02'),
(460, 19, 'dfsg', 'dfgdf', '2025-09-20', NULL),
(461, 19, 'fdg', 'fdgfd', '2025-09-20', NULL),
(462, 19, 'dfgfd', 'fdg', '2025-09-20', NULL),
(464, 19, 'fg', 'Dzisiaj dowiedziałem się że muszę schudnąć jakieś porady na odchudzanie', '2025-09-20', '2025-09-20'),
(465, 19, 'dfggfd', 'dfgxcvcxvxc', '2025-09-20', '2025-09-20'),
(466, 19, 'Otyłość', 'Dzisiaj dowiedziałem się od lekarza, że jestem otyły imam nadciśnienie możesz coś poradzić', '2025-09-20', NULL),
(467, 19, 'choroba pięty', 'dzisiaj byłem u lekarza ponieważ boli mnie pięta od kilkunastu dni i nie wiem jak sobie poradzić z tym bólem', '2025-09-29', NULL),
(468, 33, 'tekst', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', '2025-09-30'),
(469, 33, 'tekst2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(470, 33, 'Lorem ipsumLorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(471, 33, 'tekst3', 'sdfgdsffgsfsfdsdsfdsfdsfdsfsdfdsfdsfsdfsdfdsfsdfdsfdsfdsdsfdsfdsfdsdsfdsfdfsfdsfds', '2025-09-30', NULL),
(472, 33, 'tytuł', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(473, 33, 'tytuł2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(474, 33, 'tytuł3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(475, 34, 'tekst', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', '2025-09-30'),
(476, 34, 'tekst', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(477, 34, 'tekst', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(478, 34, 'sdfsdfsfsdfsdfsdfdssds', 'dfhgdfgdfgfdgdfgdfdgfdgdfgdffdgddfgddfdfgfdgfdfdfdgdfgfdgdfdfgfdgfdggffdg', '2025-09-30', NULL),
(479, 34, 'tytuł', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(480, 34, 'tytuł2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(481, 34, 'ttytuł3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(482, 34, 'tytuł4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at placerat dui. Nullam imperdiet urna vitae odio tincidunt faucibus. Proin vulputate mi quis nibh bibendum, non pulvinar ante dict', '2025-09-30', NULL),
(483, 34, 'diagnoza', 'Dzisiaj dowiedziałem się od lekarza, że mam otyłość, podwyższony poziom cukru we krwi oraz nadciśnienie.', '2025-09-30', NULL),
(485, 19, 'sdfsdfdsfsfsfsfdsfsfss', 'Lorem Ipsum is simply dummy text of the printing and d typesetting industry. Lorem Ipsum has been the industry&amp;amp;amp;amp;amp;amp;#x27;s standard dummy text ever since the 1500s, when an unknown ', '2025-10-02', '2025-10-02'),
(486, 19, 'To jest notatka', 'Ta notatka ma na celu pokazanie czy wszystko jest wporządku z edycją tekstu. Zaraz zobaczymy czy wszystko jest dobrze, jak narazie jest wporządku Ta notatka ma na celu pokazanie czy wszystko jest wporządku z edycją tekstu. Zaraz zobaczymy czy wszystko jest dobrze, jak narazie jest wporządku Zaraz zobaczymy czy wszystko jest dobrze, jak narazie jest wporządku Zaraz zobaczymy czy wszystko jest dobrz', '2025-10-02', '2025-10-02'),
(487, 19, 'sdfd', 'ds dsfdsf', '2025-10-02', NULL),
(488, 19, 'Diagnoza', 'Dzisiaj byłem u lekarza i powiedział że mam za mało ruchu', '2025-10-02', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Bartek1', 'bartek@o2.pl', 'bartek3'),
(8, 'Bartek2', 'bartek2@o2.pl', 'bartek3'),
(10, 'Bart', 'moj@o2.pl', 'bartek3'),
(12, 'Bartek4', 'bartek3@o2.pl', 'bartek3'),
(13, 'Bartek5', 'bartek5@o2.pl', 'bartek3'),
(14, 'Bartek', 'bartek30@wp.pl', 'bartek3'),
(15, 'Bartek-hash', 'bartek_hash@o2.pl', '$2b$10$.Nx2L7.g0OlZGfSBebayz.HAvFE6BXe.BfQm08/NlTF2OZqKDIrj2'),
(16, 'Bartek-hash2', 'bartek_hash2@o2.pl', '$2b$10$QghjH8feSZV41Hss5/vsAupjuQ4.Ik9WVU68GsJ1WPWI5KR/c5lwK'),
(17, 'Bartek-3', 'bartek_hash3@o2.pl', '$2b$10$SFBkDxs8VpFIFcHSUyAKkOYRziKJfSbIKIRZeZ4Js/G3h8jxkQUF.'),
(18, 'Bartek34', 'bartek_hash4@o2.pl', '$2b$10$ZoAMFkCLW6FB.C.QVkxqe.H2cj84ijQVetC3PUCMr/6wMbGOwAdp6'),
(19, 'Bartek-6', 'bartek_hash6@o2.pl', '$2b$10$bjHzyxVswrui6zNhKQqS8OtW00U6jUoBWDiy00Bri.jTBfmrPcIlG'),
(20, 'Bartek-7', 'bartek_hash7@o2.pl', '$2b$10$.upg.HMqEvRjOUbJzg60AuOX7t1doUj0Yvt1.lWWA6TDeteIMAZVW'),
(21, 'bartek-próba', 'bartek_proba@o2.pl', '$2b$10$qmfnaOMX4xNm8cOoDVVpOe2BkZEBQcAXv5x862c7xK0sZxpMC6evS'),
(22, 'Bartek-proba2', 'bartek_hash10@o2.pl', '$2b$10$dSixX/bwqqPB23hAGBuBt.KhUl5GwEKia6V2iZqq47Ejc1TXvEF/6'),
(23, 'Bartek', 'bartek_test1@o2.pl', '$2b$10$WCb.B9kQniDW1/aECb3NxeGAz7D6Szyzu9NTTbpS/5ftQarsH82sG'),
(24, 'Bartek', 'bartek_test6@o2.pl', '$2b$10$S837N/zIA3W5yfmjWZF.c.K5pFkBzIbTwAsKjp4.MJJJUwD2efilu'),
(25, 'Bartek', 'bartek_test11@o2.pl', '$2b$10$PqRJvPNsD.6YIQ21OBRAmuXj0YDnjuRB54boFR3Wys17pvnfyPlN6'),
(32, 'Bartek', 'bartek34@o2.pl', '$2b$10$qXnyad3MBWbiPLSWNkLL2Ol1saqULGGu4SS1KMLhRtx88qJ/U0JWe'),
(34, 'Bartek', 'bartek_testy@o2.pl', '$2b$10$KHAXb3JEcs45fDMj6LyjXevSWPZIz6FimjL0wMGBZd1GDMhUzbKiK');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=489;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
