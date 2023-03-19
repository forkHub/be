call setenv.bat
if ERRORLEVEL 1 goto error12

call build.bat
if ERRORLEVEL 1 goto error12

call minim.bat
if ERRORLEVEL 1 goto error12

call dist_lib.bat
if ERRORLEVEL 1 goto error12

call publis_demo.bat
if ERRORLEVEL 1 goto error12

ECHO.
echo SUCCESS
echo SUCCESS
echo SUCCESS
echo SUCCESS
echo SUCCESS
ECHO.
PAUSE
pause
pause
exit

:error12
echo error12
echo error123
echo ERRORLEVEL
pause
pause
pause