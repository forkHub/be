@echo off
echo off

echo.
echo hapus template data:
echo ====================
del template_be_js\*.* /q
del template_be_js\css\*.* /s /q
del template_be_js\gbr\*.* /s /q
del template_be_js\js\*.* /s /q

echo.
echo copy ke js:
echo ===========
xcopy template_be_ts\web\*.* template_be_js\ /s /q /i

pause
