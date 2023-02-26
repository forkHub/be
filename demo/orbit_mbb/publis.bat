@echo off
set file_js=orbit_mbb.js
set folder=orbit_mbb

REM call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

echo copy demo
echo =========
xcopy web %STAGING%\demo\%folder% /s /i /y

echo copy data
echo =========
copy .\web\js\%file_js% %STAGING%\pg\data\%file_js% /y

pause