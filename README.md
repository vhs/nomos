# Nomos

_In greek mythology, Nomos is the personified spirit of law._

This system in a way acts as the rule set for how things are governed, via membership levels and privileges.


## Development Setup


### Installation

Note: Git must be installed.


#### In Linux:


1. Install Virtualbox

> sudo apt-get install virtualbox

2. Install Vagrant. On some Linux distros, Apt has older versions that cause problems.

For x64:
> wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4_x86_64.deb

> sudo dpkg -i vagrant_1.7.4_x86_64.deb

For x86:
> wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.4_i686.deb

> sudo dpkg -i vagrant_1.7.4_i686.deb



#### In Mac or Windows:

Install Virtualbox and then Vagrant from their websites:

1. https://www.virtualbox.org/wiki/Downloads

2. https://www.vagrantup.com/downloads.html

3. Follow vendor directions for installation. Don't set up a VM just yet.


### Setup

1. In the terminal or gitshell:

> git clone git@github.com:vhs/membership-manager-pro.git

> cd membership-manager-pro

> vagrant up --provision

2. Vagrant will now download and configure Virtualbox image (~1GB)

3. On the host computer, log in to the VM using:

> vagrant ssh

This shell is now SSHed into the VM. All future commands will be in this context.

4. Set up the Nomos database structure:

> cd tools

> php migrate.php



### Use

On the host computer, navigate to http://192.168.38.10

Default credentials are **vhs** / **password**
