membership-manager-pro
======================

Membership management system made VHS-centric yo


Default username for the web interface is vhs / password


Development Setup
======================

===Installing===

==In Linux:==


Install Virtualbox

> sudo apt-get install virtualbox

Install Vagrant. On some Linux distros, Apt has older versions that cause problems.

For x64:
> wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4_x86_64.deb

> sudo dpkg -i vagrant_1.7.4_x86_64.deb

For x86:
> wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4_i686.deb &&

> sudo dpkg -i vagrant_1.7.4_i686.deb



==In Mac or Windows:==

Install Virtualbox and then Vagrant from their websites:
https://www.virtualbox.org/wiki/Downloads
https://www.vagrantup.com/downloads.html


===Running:===


> git clone git@github.com:vhs/membership-manager-pro.git

> cd membership-manager-pro

> vagrant up --provision

Vagrant will now download a Virtualbox image (~1GB)

Then login:
> vagrant ssh

