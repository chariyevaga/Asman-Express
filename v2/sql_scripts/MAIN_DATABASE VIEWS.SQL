-- time functions
USE [LOGODB]
GO
SET
       ANSI_NULLS ON
GO
SET
       QUOTED_IDENTIFIER ON
GO
       CREATE
       OR ALTER FUNCTION [dbo].[AGO_CONVERT_TO_DATETIME](@DATE_WITHOUT_TIME DATETIME, @TIME_INT INT) RETURNS DATETIME AS BEGIN RETURN(
              ISNULL(
                     TRY_CONVERT(
                            DATETIME,
                            CONCAT(
                                   LEFT(CONVERT(DATE, @DATE_WITHOUT_TIME, 108), 11),
                                   ' ',
                                   CONVERT(
                                          VARCHAR,
                                          CONVERT(
                                                 DATETIME,
                                                 CAST(
                                                        ((@TIME_INT -(@TIME_INT % 65536)) / 65536 / 256) AS VARCHAR(2)
                                                 ) + ':' + CAST(
                                                        (
                                                               (@TIME_INT -(@TIME_INT % 65536)) / 65536 -((@TIME_INT -(@TIME_INT % 65536)) / 65536 / 256) * 256
                                                        ) AS VARCHAR(2)
                                                 ) + ':' + CAST(
                                                        (
                                                               ((@TIME_INT % 65536) -((@TIME_INT % 65536) % 256)) / 256
                                                        ) AS VARCHAR(2)
                                                 ),
                                                 101
                                          ),
                                          108
                                   )
                            )
                     ),
                     @DATE_WITHOUT_TIME
              )
       )
END
GO
       CREATE
       OR ALTER FUNCTION [dbo].[AGO_INTTODATE](@LDATE INT) RETURNS DATETIME AS BEGIN DECLARE @DATE DATETIME,
       @DD INT,
       @MM INT,
       @YYYY INT,
       @DATESTR VARCHAR(12)
SELECT
       @DD = ((@LDATE % 65536) / 256)
SELECT
       @MM = (@LDATE % 65536) % 256
SELECT
       @YYYY = (@LDATE / 65536)
SELECT
       @DATESTR = CAST(@DD AS VARCHAR(2)) + '-' + CAST(@MM AS VARCHAR(2)) + '-' + CAST(@YYYY AS VARCHAR(4))
SELECT
       @DATE = CONVERT(DATETIME, @DATESTR, 102) RETURN(@DATE)
END
GO
       CREATE
       OR ALTER FUNCTION [dbo].[AGO_INTTOTIME](@LDATE INT) RETURNS VARCHAR(12) AS BEGIN DECLARE @TIME DATETIME,
       @HH INT,
       @MM INT,
       @SS INT,
       @TIMESTR VARCHAR(12),
       @RETSTR VARCHAR(12)
SELECT
       @HH = (@LDATE -(@LDATE % 65536)) / 65536 / 256
SELECT
       @MM = (
              (@LDATE -(@LDATE % 65536)) / 65536 -((@LDATE -(@LDATE % 65536)) / 65536 / 256) * 256
       )
SELECT
       @SS = (
              ((@LDATE % 65536) -((@LDATE % 65536) % 256)) / 256
       )
SELECT
       @TIMESTR = CAST(@HH AS VARCHAR(2)) + ':' + CAST(@MM AS VARCHAR(2)) + ':' + CAST(@SS AS VARCHAR(2))
SELECT
       @TIME = CONVERT(DATETIME, @TIMESTR, 101)
SELECT
       @RETSTR = CONVERT(VARCHAR, @TIME, 108) RETURN(@RETSTR)
END
GO
       CREATE
       OR ALTER FUNCTION [dbo].[AGO_TIMETOINT](@HH INT, @MM INT, @SS INT) RETURNS INT AS BEGIN DECLARE @TIME INT
SELECT
       @TIME = (@HH * 65536 * 256 + @MM * 65536 + @SS * 256) RETURN(@TIME)
END
GO
       CREATE
       OR ALTER FUNCTION [dbo].[AGO_SPLIT](@STRING VARCHAR(MAX), @SEPERET VARCHAR(3)) RETURNS VARCHAR(MAX) AS BEGIN DECLARE @ARRAY VARCHAR(MAX) = '';

SELECT
       @ARRAY = CONCAT(@ARRAY, ',', CAST(VALUE AS INT))
FROM
       string_split(@STRING, @SEPERET)
WHERE
       value <> '' IF LEN(@ARRAY) > 0 BEGIN RETURN CONCAT('[', RIGHT(@ARRAY, LEN(@ARRAY) -1), ']')
END RETURN '[]'
END
GO