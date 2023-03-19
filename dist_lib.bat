@echo off

echo.
echo TASK: DIST MULAI
echo ================

echo.
echo copy ke demo:
echo =============
cd demo
cd
call copy.bat
if ERRORLEVEL 1 exit /b 1
cd ..
echo.

echo.
echo copy ke pg:
echo ===========
cd playground
call copy.bat 
if ERRORLEVEL 1 exit /b 1
cd ..
echo.

echo copy ke template:
echo ================
copy output\blitz.min.js template_be_ts\web\js\
if ERRORLEVEL 1 exit /b 1

copy output\blitz.d.ts template_be_ts\dts\
if ERRORLEVEL 1 exit /b 1

echo.
echo TASK: DIST SELESAI
echo ==================
pause
