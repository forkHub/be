set file_js=Expl.js
set folder=expl

REM call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

xcopy web ..\..\web\demo\%folder% /s /i /y
copy .\web\js\%file_js% ..\..\web\pg\data\%file_js% /y

pause
