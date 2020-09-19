# BITS Pilani Complaint Portal 
**Complaint Management System for BITS Pilani, Pilani Campus**

This is a much needed complaint portal for our campus - a digital solution ofr this basic need that was a long time in coming. It allows students to register their complaints on a web portal especially meant for this purpose. 
We have three sections for complaints - **individual level, hostel level, institute level.** 
All the various complaints registered by the user will be shown on a separate tab pertaining to each complaint. 
Once a user regsiters a complaints, its timestamp is recorded and then accordingly after 3 days a reminder mail shall be sent to the superintendent. For hostel level complaints a mail shall be generated after 20 days and sent to the warden. 
This shall ensure accountability among the authorities responsible for seeing to it that the complaints are looked into. 
The users will also have the ability to upvote complaints they resonate with so that these complaints move to the top of teh stack of complaints.

**For running the application on a Linux system :-** 
 - clone the repository
 - cd into the cloned folder : BITS_Pilani_Complaint_Portal
 - run the command `npm install`. 
 - run `node app.js`
 - open the chosen browser at the link - http://localhost:3000/

**Current Features :**
 - Homepage 
   https://github.com/DipanshiB/BITS_Pilani-ComplaintPortal/blob/master/Screenshots/Screenshot%20from%202020-01-29%2020-51-27.png
  - Registration Form 
   https://github.com/DipanshiB/BITS_Pilani-ComplaintPortal/blob/master/Screenshots/Screenshot%20from%202020-01-29%2020-52-10.png
  - Error Messages in case of invalid auth
   https://github.com/DipanshiB/BITS_Pilani-ComplaintPortal/blob/master/Screenshots/Screenshot%20from%202020-01-29%2020-53-21.png
 - Dashboard
   https://github.com/DipanshiB/BITS_Pilani-ComplaintPortal/blob/master/Screenshots/Screenshot%20from%202020-01-29%2021-43-45.png
 
**What hasn't yet been added :**
 - Getting access to the Student's Union database will lead to easier login for BITS students since their details like room number and hostel shall be automatically updated. 
 - Warden and Superintendent contacts shall also be updated only once we have access to that database. 

