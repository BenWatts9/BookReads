USE [master]

IF db_id('Bookreads') IS NULl
  CREATE DATABASE [Bookreads]
GO

USE [Bookreads]
GO


DROP TABLE IF EXISTS [BookStatusGroup];
DROP TABLE IF EXISTS [BookStatus];
DROP TABLE IF EXISTS [Group];
DROP TABLE IF EXISTS [Book];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Book] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Author] nvarchar(255) NOT NULL,
  [Genre] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255)
)
GO

CREATE TABLE [BookStatus] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BookId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [StartedOnDate] datetime NOT NULL,
  [FinishedOnDate] datetime NOT NULL,
  [Content] nvarchar(255),
  [Rating] int
)
GO

CREATE TABLE [Group] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [BookStatusGroup] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BookStatusId] int NOT NULL,
  [GroupId] int NOT NULL
)
GO

ALTER TABLE [BookStatus] ADD FOREIGN KEY ([BookId]) REFERENCES [Book] ([Id])
GO

ALTER TABLE [BookStatus] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Group] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [BookStatusGroup] ADD FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [BookStatusGroup] ADD FOREIGN KEY ([BookStatusId]) REFERENCES [BookStatus] ([Id]) ON DELETE CASCADE
GO
