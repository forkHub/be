@echo off
echo off

set file_js=jam.js
set folder=jam

echo.
cd .\web\js
echo.

echo baca-js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

echo.
echo copy demo
echo =========
xcopy web %STAGING%\demo\%folder% /s /i /y

echo.
echo copy data
echo =========
copy .\web\js\%file_js% %STAGING%\pg\data\%file_js% /y

pause
