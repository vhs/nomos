#!/bin/bash

echo nomos:`cat /run/secrets/adminvpn_password` | chpasswd

/usr/sbin/sshd -D
