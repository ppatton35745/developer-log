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
USE DeveloperLog

DECLARE @UserId varchar(100)
SET @UserId = 'a3b7f423-9bff-4bf4-a397-d332e60d52bb'

SELECT * FROM AspNetUsers

--INSERT INTO [USER] VALUES ('phil@phil.net','phil','patton','phil')

INSERT INTO Topic VALUES (@UserId,'React'),
	(@UserId,'Bootstrap'),
	(@UserId,'Grunt'),
	(@UserId,'Browserify'),
	(@UserId,'Jquery'),
	(@UserId,'React Piano'),
	(@UserId,'Razor Views'),
	(@UserId,'Dotnet API'),
	(@UserId,'Razor Views'),
	(@UserId,'Bulma')

INSERT INTO ResourceType VALUES ('Project'),
	('Book')

INSERT INTO [Resource] VALUES (@UserId,1, 'Project1')
	,(@UserId,1, 'Project2')
	,(@UserId,1, 'Project3')
	,(@UserId,2, 'Book1')
	,(@UserId,2, 'Book2')
	,(@UserId,2, 'Book3')

	SELECT * FROM [Resource]

INSERT INTO ResourceTopic VALUES (2, 1)
	,(5, 1)
	,(7, 2)
	,(8, 2)
	,(9, 3)
	,(10, 3)
	,(1, 4)
	,(3, 4)
	,(4, 5)
	,(6, 5)
	,(3, 6)
	,(7, 6)

INSERT INTO ResourceAttribute VALUES ('ISBN')
	,('Amazon Link')
	,('Github Repo URL')

INSERT INTO ResourceTypeAttribute VALUES (1, 3)
	,(2, 1)
	,(2, 2)

INSERT INTO ResourceAttributeValue VALUES (2,1,'GithubRepoProj1')
	,(2,2,'GithubRepoProj2')
	,(2,3,'GithubRepoProj3')
	,(1,4,'AmazonLinkBook1')
	,(1,5,'AmazonLinkBook2')
	,(1,6,'AmazonLinkBook3')
	,(3,4,'ISBNbook1')
	,(3,5,'ISBNbook2')
	,(3,6,'ISBNbook3')