@echo off
set file_js=orbit_04.js
set folder=orbit_04

echo publish %folder%:
echo =================

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

echo.
echo copy demo
echo =========
xcopy web %STAGING%\demo\%folder% /s /i /y
if ERRORLEVEL 1 exit /b 1

echo.
echo copy data
echo =========
copy .\web\js\%file_js% %STAGING%\pg\data\%file_js% /y
if ERRORLEVEL 1 exit /b 1
