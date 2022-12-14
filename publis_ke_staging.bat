@echo off

echo dist lib
echo ========
call dist_lib.bat

echo publish demo
echo ============
cd demo
call publis.bat
cd ..
echo. 

echo publish pg
echo ==========
cd playground
cd
call publis.bat
cd ..
echo. 

echo js dan definition:
echo ==================
copy output\*.* blitz_edu\output\*.*

call template.bat

pause
