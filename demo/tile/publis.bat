set file_js=Tile.js
set folder=tile

REM call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

echo copy demo
echo =========
xcopy %STAGING%\demo\%folder% /s /i /y

echo copy data
echo =========
copy .\web\js\%file_js% %STAGING%\pg\data\%file_js% /y

pause