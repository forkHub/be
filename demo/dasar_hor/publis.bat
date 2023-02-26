@echo off

if "%BASE_DIR%"=="" (
	echo env var not set
	pause
	exit
)

set file_js=dasar_hor.js
set folder=dasar_hor

cd .\web\js
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
