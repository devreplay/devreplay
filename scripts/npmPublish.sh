#!/usr/bin/env bash

# Publishes Devreplay to NPM based on the current version in package.json
# This script must be run with yarn: "yarn run publish:local"
# A user running this script must have Palantir NPM organization credentials

set -e

rm -rf tempPublish
mkdir tempPublish

git clone https://github.com/devreplay/devreplay.git tempPublish
cd tempPublish

yarn install --pure-lockfile
yarn run verify

# courtesy of https://stackoverflow.com/a/3232082/3124288
read -r -p "Are you sure you want to publish version $npm_package_version? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
    yarn publish --tag latest
else
    echo "Publishing aborted"
fi

cd ..
rm -rf tempPublish