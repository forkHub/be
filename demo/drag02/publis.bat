@echo off

set file_js=Drag.js
set folder=drag02

REM call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

echo copy demo
echo =========
xcopy web %STAGING%\demo\%folder% /s /i /y

echo.
echo copy data
echo =========
copy .\web\js\%file_js% %STAGING%\pg\data\%file_js% /y

pause
