--CREATE TABLE [USER] 
--CREATE TABLE TOPIC 
--CREATE TABLE USER_TOPIC 
--CREATE TABLE RESOURCE_TYPE 
--CREATE TABLE [RESOURCE] 
--CREATE TABLE RESOURCE_TOPIC 
--CREATE TABLE USER_RESOURCE 
--CREATE TABLE RESOURCE_ATTRIBUTE 
--CREATE TABLE RESOURCE_TYPE_ATTRIBUTE 
--CREATE TABLE RESOURCE_ATTRIBUTE_VALUE 

--DELETE FROM ResourceAttributeValue
--DELETE FROM ResourceTypeAttribute
--DELETE FROM ResourceAttribute
--DELETE FROM ResourceTopic
--DELETE FROM [Resource]
--DELETE FROM ResourceType
--DELETE FROM Topic

USE DeveloperLog

SELECT * FROM AspNetUsers

DECLARE @UserId varchar(100)
SET @UserId = '48ca9c8d-5575-43f4-8042-d9f2710ce87c'

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

INSERT INTO ResourceTypeAttribute VALUES (1, 3) -- rule 1 a project has a github repo
	,(2, 1) -- rule 2 a book has an ISBN
	,(2, 2) -- rule 3 a book has an Amazon Link

INSERT INTO ResourceAttributeValue VALUES (1,1,'GithubRepoProj1')
	,(1,2,'GithubRepoProj2')
	,(1,3,'GithubRepoProj3')
	,(3,4,'AmazonLinkBook1')
	,(3,5,'AmazonLinkBook2')
	,(3,6,'AmazonLinkBook3')
	,(2,4,'ISBNbook1')
	,(2,5,'ISBNbook2')
	,(2,6,'ISBNbook3')