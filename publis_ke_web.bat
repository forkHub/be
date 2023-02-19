@echo off
echo off

echo set env
============
call setenv.bat

echo copy ke web
xcopy %STAGING%\*.* ..\forkhub.github.io\blitz_edu\ /s /q /y

pause