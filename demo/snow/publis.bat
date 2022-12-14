@echo off
set file_js=Salju.js
set folder=snow

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
