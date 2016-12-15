prevent-screenshot
=======================
Description: Because preventing global hotkeys for screenshots is very hard and sometimes impossible this module will listen once started and delete all new screenshots in a give directory. <b>Mac implementation only so far</b>

Getting started:

	npm install prevent-screenshot

Example:

	var preventSC = require('prevent-screenshot');
	
	preventSC('DIR','OS',true) //will delete all new files after start of application
	preventSC('DIR','OS')//will delete new screenshots after start of application
	
explained: the above will listen on the directory passed in. Any time a new file is added to that directory it will do some string parsing and date comparison to decide if that new file needs to be deleted or not. <b>Only deletes files that are new after program was started.</b>

Method:

	preventSC(arg1,arg2,arg3(optional));
	
		params:
			arg1: the directory that screenshots are saved to.
			arg2: the os of the user. //darwin only current support.
			arg3: weither to delete files that match mac/windows screenshot parsing or delete all new files.
			
		return: NONE //deletes new screenshots.	
	