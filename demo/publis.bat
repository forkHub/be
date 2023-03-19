@echo off

call publis_dasar.bat
if ERRORLEVEL 1 goto error

echo collision:
echo ==========
cd collision
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo doodle:
echo =======
cd doodle
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo drag02:
echo ======
cd drag02
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo expl:
echo =====
cd expl
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo jam:
echo ====
cd jam
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo knob:
echo =====
cd knob
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo knob02:
echo =======
cd knob02
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo orbit:
echo ======
cd orbit
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo orbit_04:
echo ==========
cd orbit_04
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo orbit_mbb:
echo ==========
cd orbit_mbb
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo orbit_oval:
echo ===========
cd orbit_oval
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo snow:
echo =====
cd snow
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo tile:
echo =====
cd tile
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo.
echo copy gambar:
echo ============
xcopy assets\*.* %STAGING%\pg\gbr /q /y
if ERRORLEVEL 1 goto error

goto end

:error
echo ERROR
echo ERROR
echo ERROR
pause
exit /b 1

:end
echo %cd%
echo demo\publish.bat selesai