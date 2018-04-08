#!/bin/sh
# Compile and install watchman on both CircleCI and Heroku

set -x
set -e

# no need to apt-get build-essential autoconf automake
# as both CircleCI and Heroku has them installed

if [ ! -e /usr/local/bin/watchman -a ! -e node_modules/.bin/watchman ]; then
    BUILD_DIR=$PWD

    cd /tmp
    git clone https://github.com/facebook/watchman.git
    cd watchman
    git checkout v4.7.0

    sudo apt-get install python-dev    

    ./autogen.sh
    ./configure --enable-statedir=/tmp
    make
    
    # install on CircleCI
    sudo make install || true
fi