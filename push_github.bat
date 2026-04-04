@echo off
chcp 65001 >nul
echo ==============================================
echo    TỰ ĐỘNG ĐẨY CODE LÊN GITHUB
echo ==============================================
echo.

"D:\Git\cmd\git.exe" add .
"D:\Git\cmd\git.exe" commit -m "Auto update UI and config: %date% %time%"
"D:\Git\cmd\git.exe" push

echo.
echo ==============================================
echo    HOÀN THÀNH! Đã lưu mọi thứ lên GitHub.
echo ==============================================
pause
