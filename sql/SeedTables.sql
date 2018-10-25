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

--INSERT INTO [USER] VALUES ('phil@phil.net','phil','patton','phil')

INSERT INTO Topic VALUES ('17166ffa-231b-4e98-8cd2-b38eff68aee0','React'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Bootstrap'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Grunt'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Browserify'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Jquery'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','React Piano'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Razor Views'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Dotnet API'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Razor Views'),
	('17166ffa-231b-4e98-8cd2-b38eff68aee0','Bulma')

INSERT INTO ResourceType VALUES ('Project'),
	('Book')

INSERT INTO [Resource] VALUES ('17166ffa-231b-4e98-8cd2-b38eff68aee0',1, 'Project1')
	,('17166ffa-231b-4e98-8cd2-b38eff68aee0',1, 'Project2')
	,('17166ffa-231b-4e98-8cd2-b38eff68aee0',1, 'Project3')
	,('17166ffa-231b-4e98-8cd2-b38eff68aee0',2, 'Book1')
	,('17166ffa-231b-4e98-8cd2-b38eff68aee0',2, 'Book2')
	,('17166ffa-231b-4e98-8cd2-b38eff68aee0',2, 'Book3')

INSERT INTO ResourceTopic VALUES (1, 2)
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