/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : nitro_template

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 06/04/2025 00:34:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rel_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `rel_role_dept`;
CREATE TABLE `rel_role_dept` (
  `role_id` bigint unsigned NOT NULL,
  `dept_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`dept_id`),
  KEY `rel_role_dept_role_id_index` (`role_id`),
  KEY `rel_role_dept_dept_id_index` (`dept_id`),
  CONSTRAINT `rel_role_dept_dept_id_foreign` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rel_role_dept_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rel_role_dept
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rel_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `rel_role_menu`;
CREATE TABLE `rel_role_menu` (
  `role_id` bigint unsigned NOT NULL,
  `menu_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`menu_id`),
  KEY `rel_role_menu_role_id_index` (`role_id`),
  KEY `rel_role_menu_menu_id_index` (`menu_id`),
  CONSTRAINT `rel_role_menu_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rel_role_menu_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rel_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 1);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 2);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 3);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 4);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 5);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 6);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 7);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 8);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 9);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 10);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 11);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 13);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 14);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 15);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 16);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 17);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 18);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 19);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 20);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 21);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 22);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 23);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 24);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 25);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 26);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 27);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 28);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 29);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 30);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 31);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 32);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 33);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 34);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 35);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 36);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 37);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 38);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 39);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 40);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 41);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 42);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 43);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 44);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 45);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 46);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 47);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 48);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 49);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 50);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 51);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 52);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 53);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 54);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 55);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 56);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 57);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 58);
INSERT INTO `rel_role_menu` (`role_id`, `menu_id`) VALUES (1, 59);
COMMIT;

-- ----------------------------
-- Table structure for rel_user_dept
-- ----------------------------
DROP TABLE IF EXISTS `rel_user_dept`;
CREATE TABLE `rel_user_dept` (
  `user_id` bigint unsigned NOT NULL,
  `dept_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`dept_id`),
  KEY `rel_user_dept_user_id_index` (`user_id`),
  KEY `rel_user_dept_dept_id_index` (`dept_id`),
  CONSTRAINT `rel_user_dept_dept_id_foreign` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rel_user_dept_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rel_user_dept
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rel_user_post
-- ----------------------------
DROP TABLE IF EXISTS `rel_user_post`;
CREATE TABLE `rel_user_post` (
  `user_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `rel_user_post_user_id_index` (`user_id`),
  KEY `rel_user_post_post_id_index` (`post_id`),
  CONSTRAINT `rel_user_post_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `sys_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rel_user_post_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rel_user_post
-- ----------------------------
BEGIN;
INSERT INTO `rel_user_post` (`user_id`, `post_id`) VALUES (1, 1);
COMMIT;

-- ----------------------------
-- Table structure for rel_user_role
-- ----------------------------
DROP TABLE IF EXISTS `rel_user_role`;
CREATE TABLE `rel_user_role` (
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `rel_user_role_user_id_index` (`user_id`),
  KEY `rel_user_role_role_id_index` (`role_id`),
  CONSTRAINT `rel_user_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rel_user_role_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rel_user_role
-- ----------------------------
BEGIN;
INSERT INTO `rel_user_role` (`user_id`, `role_id`) VALUES (1, 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `config_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `config_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `config_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_builtin` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_config_config_key_unique` (`config_key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
BEGIN;
INSERT INTO `sys_config` (`id`, `config_name`, `config_key`, `config_value`, `is_builtin`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, '账号初始密码', 'sys.user.initPassword', '123456', '1', '1', NULL, NULL, '2025-04-05 16:46:39', NULL, '2025-04-05 16:46:39');
COMMIT;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint DEFAULT NULL,
  `dept_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dept_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_dept_dept_key_unique` (`dept_key`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, NULL, 'ry', '若依科技', '1', NULL, NULL, '2025-04-04 18:43:41', NULL, '2025-04-04 18:43:41');
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (2, 1, 'ry.sz', '深圳分公司', '1', NULL, NULL, '2025-04-04 18:46:47', NULL, '2025-04-04 18:46:47');
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (3, 2, 'ry.sz.develop', '研发部门', '1', NULL, NULL, '2025-04-04 18:49:40', NULL, '2025-04-04 18:49:40');
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (4, 2, 'ry.sz.market', '市场部门', '1', NULL, NULL, '2025-04-04 18:50:15', NULL, '2025-04-04 18:50:15');
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (5, 2, 'ry.sz.test', '测试部门', '1', NULL, NULL, '2025-04-04 18:50:48', NULL, '2025-04-04 18:50:48');
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (6, 2, 'ry.sz.finance', '财务部门', '1', NULL, NULL, '2025-04-04 18:51:21', NULL, '2025-04-04 18:51:21');
INSERT INTO `sys_dept` (`id`, `parent_id`, `dept_key`, `dept_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (7, 2, 'ry.sz.operation', '运维部门', '1', NULL, NULL, '2025-04-04 18:53:40', NULL, '2025-04-04 18:53:40');
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dict_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dict_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_dict_data_dict_value_unique` (`dict_value`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, '普通订单', '1', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:48:30', NULL, '2025-04-05 17:48:30');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (2, '预售订单', '2', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:48:39', NULL, '2025-04-05 17:48:39');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (3, '团购订单', '3', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:49:21', NULL, '2025-04-05 17:49:21');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (4, '秒杀订单', '4', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:49:32', NULL, '2025-04-05 17:49:32');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (5, '批发订单', '5', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:49:42', NULL, '2025-04-05 17:49:42');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (6, '服务订单', '6', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:49:53', NULL, '2025-04-05 17:49:53');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (7, '虚拟商品订单', '7', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:50:04', NULL, '2025-04-05 17:50:04');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (8, '跨境订单', '8', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:50:17', NULL, '2025-04-05 17:50:17');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (9, '定制订单', '9', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:50:28', NULL, '2025-04-05 17:50:28');
INSERT INTO `sys_dict_data` (`id`, `dict_label`, `dict_value`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (10, '试用订单', '10', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:50:37', NULL, '2025-04-05 17:50:37');
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dict_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_dict_type_dict_type_unique` (`dict_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_type` (`id`, `dict_name`, `dict_type`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, '订单状态', 'sys.order.type', '1', NULL, NULL, '2025-04-05 17:44:10', NULL, '2025-04-05 17:44:10');
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint DEFAULT NULL,
  `menu_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `menu_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `menu_type` enum('M','C','F') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_num` int NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_cache` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_frame` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_visible` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_menu_menu_key_unique` (`menu_key`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, NULL, '系统管理', 'sys.menu.system', 'M', 1, '/system', NULL, '/system/user', 'ep:setting', '1', NULL, NULL, '1', NULL, NULL, '2025-02-22 21:59:09', NULL, '2025-02-22 22:22:54');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (2, 1, '用户管理', 'sys.menu.system.user', 'C', 1, 'user', 'system/user', '', NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:01:16', NULL, '2025-02-22 22:24:05');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (3, 1, '部门管理', 'sys.menu.system.dept', 'C', 2, 'dept', 'system/dept', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:26:38', NULL, '2025-02-22 22:39:40');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (4, 1, '岗位管理', 'sys.menu.system.post', 'C', 3, 'post', 'system/post', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:27:28', NULL, '2025-02-22 22:39:55');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (5, 1, '角色管理', 'sys.menu.system.role', 'C', 4, 'role', 'system/role', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:28:04', NULL, '2025-02-22 22:40:06');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (6, 1, '字典管理', 'sys.menu.system.dictType', 'C', 5, 'dict', 'system/dict', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:30:46', NULL, '2025-02-22 22:40:33');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (7, 1, '字典数据', 'sys.menu.system.dictData', 'C', 6, 'dict/data', 'system/dict/data', NULL, NULL, '1', '0', '0', '0', NULL, NULL, '2025-02-22 22:31:38', NULL, '2025-02-22 22:41:46');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (8, 1, '菜单管理', 'sys.menu.system.menu', 'C', 7, 'menu', 'system/menu', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:32:16', NULL, '2025-02-22 22:42:04');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (9, 1, '配置管理', 'sys.menu.system.config', 'C', 8, 'config', 'system/config', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:32:45', NULL, '2025-02-22 22:42:16');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (10, 1, '角色分配用户', 'sys.menu.system.roleAuth', 'C', 9, 'role/auth', 'system/role/auth', NULL, NULL, '1', '0', '0', '0', NULL, NULL, '2025-02-22 22:43:34', NULL, '2025-02-22 22:43:34');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (11, NULL, '系统监控', 'sys.menu.monitor', 'M', 2, '/monitor', NULL, '/monitor/cache', 'ep:monitor', '1', NULL, NULL, '1', NULL, NULL, '2025-02-22 22:45:02', NULL, '2025-02-22 22:45:02');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (13, 11, '在线用户', 'sys.menu.monitor.online', 'C', 1, 'online', 'monitor/online', NULL, NULL, '1', '0', '0', '1', NULL, NULL, '2025-02-22 22:46:31', NULL, '2025-02-22 22:46:31');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (14, 2, '用户分页', 'sys.menu.system.user.findPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-22 23:01:50', NULL, '2025-02-22 23:01:50');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (15, 2, '用户新增', 'sys.menu.system.user.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-22 23:02:34', NULL, '2025-02-22 23:02:34');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (16, 2, '用户编辑', 'sys.menu.system.user.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-22 23:03:14', NULL, '2025-02-22 23:03:14');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (17, 2, '用户删除', 'sys.menu.system.user.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-22 23:03:43', NULL, '2025-02-22 23:03:43');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (18, 5, '角色分页', 'sys.menu.system.role.findPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 14:56:57', NULL, '2025-02-23 14:56:57');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (19, 5, '角色新增', 'sys.menu.system.role.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 14:57:46', NULL, '2025-02-23 14:57:46');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (20, 5, '角色编辑', 'sys.menu.system.role.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 14:58:08', NULL, '2025-02-23 14:58:08');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (21, 5, '角色删除', 'sys.menu.system.role.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 14:58:30', NULL, '2025-02-23 14:58:30');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (22, 4, '岗位分页', 'sys.menu.system.post.findPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 14:59:42', NULL, '2025-02-23 14:59:42');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (23, 4, '岗位新增', 'sys.menu.system.post.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 14:59:59', NULL, '2025-02-23 14:59:59');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (24, 4, '岗位编辑', 'sys.menu.system.post.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:00:28', NULL, '2025-02-23 15:00:28');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (25, 4, '岗位删除', 'sys.menu.system.post.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:00:47', NULL, '2025-02-23 15:00:47');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (26, 9, '配置分页', 'sys.menu.system.config.findPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:01:29', NULL, '2025-02-23 15:01:29');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (27, 9, '配置新增', 'sys.menu.system.config.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:01:49', NULL, '2025-02-23 15:01:49');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (28, 9, '配置编辑', 'sys.menu.system.config.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:02:07', NULL, '2025-02-23 15:02:07');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (29, 9, '配置删除', 'sys.menu.system.config.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:02:26', NULL, '2025-02-23 15:02:26');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (30, 3, '部门列表', 'sys.menu.system.dept.findList', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:03:27', NULL, '2025-02-23 15:03:27');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (31, 3, '部门新增', 'sys.menu.system.dept.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:03:51', NULL, '2025-02-23 15:03:51');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (32, 3, '部门编辑', 'sys.menu.system.dept.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:04:11', NULL, '2025-02-23 15:04:11');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (33, 3, '部门删除', 'sys.menu.system.dept.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:04:29', NULL, '2025-02-23 15:04:29');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (34, 6, '字典分页', 'sys.menu.system.dictType.findPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:05:57', NULL, '2025-02-23 15:05:57');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (35, 6, '字典新增', 'sys.menu.system.dictType.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:07:37', NULL, '2025-02-23 15:07:37');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (36, 6, '字典编辑', 'sys.menu.system.dictType.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:07:59', NULL, '2025-02-23 15:07:59');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (37, 6, '字典删除', 'sys.menu.system.dictType.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:08:21', NULL, '2025-02-23 15:08:21');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (38, 7, '字典数据列表', 'sys.menu.system.dictData.findList', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:09:08', NULL, '2025-02-23 15:09:08');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (39, 7, '字典数据新增', 'sys.menu.system.dictData.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:09:54', NULL, '2025-02-23 15:09:54');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (40, 7, '字典数据编辑', 'sys.menu.system.dictData.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:10:47', NULL, '2025-02-23 15:10:47');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (41, 7, '字典数据删除', 'sys.menu.system.dictData.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:11:05', NULL, '2025-02-23 15:11:05');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (42, 8, '菜单列表', 'sys.menu.system.menu.findList', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:11:50', NULL, '2025-02-23 15:11:50');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (43, 8, '菜单新增', 'sys.menu.system.menu.create', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:12:08', NULL, '2025-02-23 15:12:08');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (44, 8, '菜单编辑', 'sys.menu.system.menu.update', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:12:27', NULL, '2025-02-23 15:12:27');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (45, 8, '菜单删除', 'sys.menu.system.menu.remove', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:12:46', NULL, '2025-02-23 15:12:46');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (46, 10, '未分配用户分页', 'sys.menu.system.roleAuth.findUnallocatedUserPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:14:38', NULL, '2025-02-23 15:14:38');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (47, 10, '已分配用户分页', 'sys.menu.system.roleAuth.findAllocatedUserPage', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:14:57', NULL, '2025-02-23 15:14:57');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (48, 10, '分配用户', 'sys.menu.system.roleAuth.allocateUser', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:15:24', NULL, '2025-02-23 15:15:24');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (49, 10, '取消分配用户', 'sys.menu.system.roleAuth.unallocateUser', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:16:03', NULL, '2025-02-23 15:16:03');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (50, 1, '角色分配菜单', 'sys.menu.system.roleMenu', 'F', 10, NULL, NULL, NULL, NULL, '1', NULL, NULL, '0', NULL, NULL, '2025-02-23 17:36:40', NULL, '2025-02-23 17:36:40');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (51, 50, '分配菜单', 'sys.menu.system.roleMenu.assign', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 17:37:22', NULL, '2025-02-23 17:37:22');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (52, 50, '已分配菜单', 'sys.menu.system.roleMenu.assigned', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 17:37:49', NULL, '2025-02-23 17:37:49');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (53, 1, '岗位分配用户', 'sys.menu.system.postAuth', 'C', 11, 'post/auth', 'system/post/auth', NULL, NULL, '1', '0', '0', '0', NULL, NULL, '2025-02-22 22:43:34', NULL, '2025-04-04 20:06:59');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (54, 53, '未分配用户分页', 'sys.menu.system.postAuth.findUnallocatedUserPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:14:38', NULL, '2025-02-23 15:14:38');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (55, 53, '已分配用户分页', 'sys.menu.system.postAuth.findAllocatedUserPage', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:14:57', NULL, '2025-02-23 15:14:57');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (56, 53, '分配用户', 'sys.menu.system.postAuth.allocateUser', 'F', 3, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:15:24', NULL, '2025-02-23 15:15:24');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (57, 53, '取消分配用户', 'sys.menu.system.postAuth.unallocateUser', 'F', 4, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-02-23 15:16:03', NULL, '2025-02-23 15:16:03');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (58, 13, '在线用户分页', 'sys.menu.monitor.online.findPage', 'F', 1, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-04-05 16:42:33', NULL, '2025-04-05 16:42:33');
INSERT INTO `sys_menu` (`id`, `parent_id`, `menu_name`, `menu_key`, `menu_type`, `order_num`, `path`, `component`, `redirect`, `icon`, `is_available`, `is_cache`, `is_frame`, `is_visible`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (59, 13, '在线用户下线', 'sys.menu.monitor.online.remove', 'F', 2, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, '2025-04-05 16:43:37', NULL, '2025-04-05 16:43:37');
COMMIT;

-- ----------------------------
-- Table structure for sys_online
-- ----------------------------
DROP TABLE IF EXISTS `sys_online`;
CREATE TABLE `sys_online` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `token_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `browser` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `login_time` datetime NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_online_user_id_unique` (`user_id`),
  CONSTRAINT `sys_online_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_online
-- ----------------------------
BEGIN;
INSERT INTO `sys_online` (`id`, `token_id`, `token`, `ip`, `location`, `browser`, `os`, `login_time`, `user_id`) VALUES (4, '0df8273c-11fd-423f-91dc-47517a287b0f', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwianRpIjoiMGRmODI3M2MtMTFmZC00MjNmLTkxZGMtNDc1MTdhMjg3YjBmIiwiaWF0IjoxNzQzODI0MzIwLCJleHAiOjE3NDQ0MjkxMjB9.-k57D1Nyp7avrETYGepxBJQ6ZIGlw6pOwb-xNqxFuhA', 'UNKNOWN', 'UNKNOWN', 'Edge 134.0.0.0', 'macOS 10.15.7', '2025-04-05 11:38:40', 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_post_post_key_unique` (`post_key`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
BEGIN;
INSERT INTO `sys_post` (`id`, `post_key`, `post_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, 'ceo', '董事长', '1', NULL, NULL, '2025-04-04 19:13:09', NULL, '2025-04-04 19:13:09');
INSERT INTO `sys_post` (`id`, `post_key`, `post_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (2, 'se', '项目经理', '1', NULL, NULL, '2025-04-04 19:14:10', NULL, '2025-04-04 19:14:10');
INSERT INTO `sys_post` (`id`, `post_key`, `post_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (3, 'hr', '人力资源', '1', NULL, NULL, '2025-04-04 19:14:23', NULL, '2025-04-04 19:14:23');
INSERT INTO `sys_post` (`id`, `post_key`, `post_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (4, 'user', '普通员工', '1', NULL, NULL, '2025-04-04 19:14:36', NULL, '2025-04-04 19:14:36');
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_role_role_key_unique` (`role_key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`id`, `role_key`, `role_name`, `is_available`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, 'sys.role.admin', '管理员', '1', '系统管理员，拥有所有菜单权限', NULL, '2025-02-22 21:51:24', NULL, '2025-02-22 21:51:24');
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sex` enum('1','0','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_available` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_user_user_name_unique` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `user_name`, `nick_name`, `password`, `email`, `phone`, `sex`, `avatar`, `is_available`, `is_delete`, `remark`, `create_by`, `created_at`, `update_by`, `updated_at`) VALUES (1, 'admin', 'ruoyi', '$2y$10$HBHgHBCuHFWuTSDqMTW0T.YnvwudTFa6J6kff2OQkwZUP1XFKakha', '1361572192@qq.com', NULL, '1', NULL, '1', '1', NULL, NULL, '2024-12-15 10:29:04', NULL, '2025-04-05 20:06:26');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
