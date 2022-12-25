@echo off
set file_js=orbit_04.js
set folder=orbit_04

REM call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

echo copy demo
echo =========
xcopy web ..\..\blitz_edu\demo\%folder% /s /i /y

echo copy data
echo =========
copy .\web\js\%file_js% ..\..\blitz_edu\pg\data\%file_js% /y

pause
