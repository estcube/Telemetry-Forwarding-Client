# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['src\\main.py'],
             pathex=['C:\\Users\\peeter98\\Desktop\\Kool\\TVP2\\Telemetry-Forwarding-Client\\client'],
             binaries=[],
             datas=[],
             hiddenimports=['csv'],
             hookspath=[],
             runtime_hooks=['src/grafana_launcher.py'],
             excludes=['main_kaitai'],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='main',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=True )
