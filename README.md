# ZenBoard

Built with Electron + React + ES6 + Webpack

## Getting started

Clone from the Git repository :
```
git clone https://github.com/Zenika/zenboard.git
```

Configure your ZenBoard [as you want it](#Zenboard-configuration).

Start it in development mode (with hot reload) :
```
npm install
npm start
```

## Zenboard configuration

La configuration du dashboard est réalisée via le fichier :
```
src/config.js
```
Il définit l'ensemble des plugins à utiliser et leur position au niveau du dashboard.

> _A compléter_

## Plugins

- [x] Logo Zenika - [docs](src/plugins/ZenikaLogo/README.md)
- [ ] OpenWeather (small & big)
- [ ] News Zenika
- [ ] Planning des formations et occupation des salles
- [ ] Photos d'un répertoire GDrive ou DropBox
- [ ] Classemment ZenFifa
- [ ] Les citations zenika (et / ou Chuck Norris)
- [ ] Events à Nantes (api meetup)
- [ ] Google Traffic
- [ ] API Open data nantes ?

## TODOs

- [ ] Doc pour créer des plugins
- [ ] Intégrer LESS (Sass c'est galère sur rpi)
- [ ] Brancher codacy
- [ ] Mettre en place avec docker (voir sur rpi)
- [ ] HDMI CEC :
  * https://github.com/Pulse-Eight/libcec
  * https://www.raspberrypi.org/forums/viewtopic.php?f=29&t=70923
  * https://github.com/pmorissette/nodecec


## Install ZenBoard on Raspberry Pi

### Installing the Pi
1. [Download Raspbian](https://www.raspberrypi.org/downloads/raspbian/) (version full)
2. Flash with [Etcher](http://www.etcher.io/) or with your favorite SD card flashing process
3. Expand SD Card file system
```
sudo raspi-config
```
> Choose "Expand root partition to fill SD card" option.

4. Update & upgrade (can take few minutes)
```
sudo apt-get update
sudo apt-get upgrade
```

### Installing Zenboard

##### Install Node.js
Download & install the latest release of Node.js for ARMv7 :
```
wget https://nodejs.org/dist/v4.4.7/node-v4.4.7-linux-armv7l.tar.gz
tar -xvf node-v4.4.7-linux-armv7l.tar.gz
cd node-v4.4.7-linux-armv7l
sudo cp -R * /usr/local/
```

##### Getting ZenBoard
```
cd ~
git clone https://github.com/Zenika/zenboard.git
```

**Copy** your [configuration file](#Zenboard-configuration) into `src/config.js`

##### Installing application dependencies
```
npm install
```

##### Building the app
To avoid building app at launch (which can take few minutes on the raspberry pi), you build it once with :
```
npm run build
```
Now you can start it with :
```
npm run electron-prod
```

### For a better experience

##### Hide the mouse when inactive (optional)
```
sudo apt-get install unclutter
```
Then add `unclutter -idle 0.1 -root` to `/etc/xdg/lxsession/LXDE-pi/autostart`.

##### Disable screensaver & taskbar (optional)
Edit the following file :
```
sudo vi /home/pi/.config/lxsession/LXDE-pi/autostart
```
Comment out (with a '#') `@xscreensaver` to disable the screensaver, and `@lxpanel` to hide the taskbar.

Add the following lines to that same file :
```
@xset s off
@xset -dpms
@xset s noblank
```

##### Start ZenBoard on boot
Optionally, you can configure your Pi to start ZenBoard on boot.
In `/home/pi/`, create the file called zenboard-start.sh with the following content:
```
#!/bin/bash
export DISPLAY=:0
export XAUTHORITY=/home/pi/.Xauthority
cd /home/pi/zenboard && npm run electron-prod
```
Make the file owned by the user pi
```
chown pi:pi /home/pi/zenboard-start.sh
chmod +x /home/pi/zenboard-start.sh
```
Then, edit the file `/home/pi/.config/lxsession/LXDE-pi/autostart` and add the following line to the end: `/home/pi/zenboard-start.sh`

Reboot the Pi and you should be good to go.

## Inspired by

http://docs.smart-mirror.io/
