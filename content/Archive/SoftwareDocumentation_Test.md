---
date: 05.05.24
---

- Okular is a powerful pdf editor with advanced searching tools
	- Able to search two term that existing in one pages (similar to Filtering by Tags)
- Best suit for direct PDF Editing (Annotation should be flatten out in order to be seen on other software)
- It doesnt fit to edit large PDF file like Book where change and update are frequent -> [ZoteroIntegration_PL](ZoteroIntegration_PL)
## Shortcuts

|                                  |                        |                                      |
|:---------------------------------|:-----------------------|:-------------------------------------|
| *Ctrl+1*: pane page/Browse       | *Alt+1*: Typewriter    | *F2*: Sidebar                        |
| *Ctrl+2*: text Selection         | *Alt+2*: Highlighter   | *F3*: Hide/Unhide Annotation Toolbar |
| *Ctrl+3*: Area of text selection | *Alt+3*: Rectangle     |                                      |
|                                  | *Alt+4*: Arrow         |                                      |
|                                  | *Alt+5*: Freehand Line |                                      |  
## Annotations
- Remove Default Annotations
- Tool > Annotation
- to add Image in PDF: using Annotation type "Stamp" (same like adding Signature).
## Workflow
- Hightlight in Gray
- Drawing, Direct Editing is allow
- Should be flatten afterward
## Setup
- Setup as Default System PDF Viewer
	- Acces to Root (see [](Nemo_DES#Set%20Thunar%20as%20default%20File%20Manager))
	- Change *application/pdf=okularApplication_pdf.desktop*
- Activate Show More Annotation Tools
- Delete Option in Button next to Text Selection
	- Create Signature
## Inverted Color
- Set Inverted Color for PDF:
	- Setting > Configure Okular > Accessibility > Change colors > Change dark light colors > "Use online tools for copy color code"
- Set hot key for Inverted Color:
	- Setting > Configure Toolbar > Configure Keyboard Shortcuts > Change colors > set "Ctrl+I"
## Darktheme 
- [](https://askubuntu.com/questions/24780/how-to-make-kde-applications-look-native-in-gnome/1044419#1044419) app like Okular
	- sudo apt install qt5-style-kvantum qt5-style-kvantum-themes
	- echo "export QT_STYLE_OVERRIDE=kvantum" >> $HOME/.profile
	- Restart PC
	- Now, open the Kvantum Manager app from the app-grid menu:
	- Click on the submenu "Change/Delete Theme"
	- Select "KvArcDark" from "Select Menu".
	- Click "Use this theme" button.
- Uninstall: `sudo apt remove qt5-style-kvantum qt5-style-kvantum-themes`
## Cons
- Okular cant open container file
- Okular darkmode very bad on rendering Highlight
- Okular can only import Annotation as Text
- Zotero can only see hightlight and Comment from Okular, Annotation like drawing and rectangle are seen after flatten
