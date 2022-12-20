@echo off

set file_js=Knob02.js
set folder=knob02

REM call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%
echo.
cd ..
cd ..

echo copy demo
echo =========
xcopy web ..\..\blitz_edu\demo\%folder% /s /i /y
echo.

echo copy data
echo =========
copy .\web\js\%file_js% ..\..\blitz_edu\pg\data\%file_js% /y
echo.

pause
