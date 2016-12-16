prevent-screenshot
=======================
Description: Sotarting as just deleting screenshots because they are hard to prevent this littleb has turned into an autodeleter that listens on a directory/directories and dele    tes all/files that match a string parse that have been added after the program started running.,

Getting started:

	npm install prevent-screenshot

Example:

	var preventSC = require('prevent-screenshot');
	
	preventSC('DIR','OS',true) //will delete all new files after start of application
	preventSC('DIR','OS','tester')//will delete files containing the word tester
	preventSC('DIR','OS',['tester','Screen Shot'] // will delete files containing the word tester or Screen Shot
	
explained: the above will listen on the directory passed in. Any time a new file is added to that directory it will do some string parsing and date comparison to decide if that new file needs to be deleted or not. <b>Only deletes files that are new after program was started.</b>

Method:

	preventSC(arg1,arg2,arg3(optional));
	
		params:
			arg1: the directory that screenshots are saved to.
			arg2: the os of the user. //darwin only current support.
			arg3: can be an array of strings , single string or boolean that will tell program to delete all new
			
		return: NONE //deletes new screenshots.	
	