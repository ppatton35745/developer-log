--CREATE TABLE [USER] (
--CREATE TABLE TOPIC (
--CREATE TABLE USER_TOPIC (
--CREATE TABLE RESOURCE_TYPE (
--CREATE TABLE [RESOURCE] (
--CREATE TABLE RESOURCE_TOPIC (
--CREATE TABLE USER_RESOURCE (
--CREATE TABLE RESOURCE_ATTRIBUTE (
--CREATE TABLE RESOURCE_TYPE_ATTRIBUTE (
--CREATE TABLE RESOURCE_ATTRIBUTE_VALUE (
USE MyDevLog

INSERT INTO [USER] VALUES ('phil@phil.net','phil','patton','phil')

INSERT INTO TOPIC VALUES ('React'),
	('Bootstrap'),
	('Grunt'),
	('Browserify'),
	('Jquery'),
	('React Piano'),
	('Razor Views'),
	('Dotnet API'),
	('Razor Views'),
	('Bulma')

INSERT INTO USER_TOPIC VALUES (1, 1),
	(1,2),
	(1,3),
	(1,4),
	(1,5),
	(1,6),
	(1,7),
	(1,8),
	(1,9),
	(1,10)

INSERT INTO RESOURCE_TYPE VALUES ('Project'),
	('Book')

INSERT INTO [RESOURCE] VALUES (1, 'Project1')
	,(1, 'Project2')
	,(1, 'Project3')
	,(2, 'Book1')
	,(2, 'Book2')
	,(2, 'Book3')

INSERT INTO RESOURCE_TOPIC VALUES (1, 2)
	,(1, 5)
	,(2, 7)
	,(2, 8)
	,(3, 9)
	,(3, 10)
	,(4, 1)
	,(4, 3)
	,(5, 4)
	,(5, 6)
	,(6, 3)
	,(6, 7)

INSERT INTO USER_RESOURCE VALUES (1, 1)
	,(2, 1)
	,(3, 1)
	,(4, 1)
	,(5, 1)
	,(6, 1)

INSERT INTO RESOURCE_ATTRIBUTE VALUES ('ISBN')
	,('Amazon Link')
	,('Github Repo URL')

INSERT INTO RESOURCE_TYPE_ATTRIBUTE VALUES (1, 3)
	,(2, 1)
	,(2, 2)

INSERT INTO RESOURCE_ATTRIBUTE_VALUE VALUES (2,1,'GithubRepoProj1')
	,(2,2,'GithubRepoProj2')
	,(2,3,'GithubRepoProj3')
	,(1,4,'AmazonLinkBook1')
	,(1,5,'AmazonLinkBook2')
	,(1,6,'AmazonLinkBook3')
	,(3,4,'ISBNbook1')
	,(3,5,'ISBNbook2')
	,(3,6,'ISBNbook3')