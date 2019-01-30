<p align="center"><a href="https://netent.com" target="_blank" rel="netent noreferrer"><img width="100" src="https://playemlive.com/wp-content/uploads/soft/netent_logo.png" alt="netent_logo logo"></a></p>

<p align="center">
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="Build Status"></a>
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg" alt="Coverage Status"></a>
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://img.shields.io/npm/dm/vue.svg" alt="Downloads"></a>
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://img.shields.io/npm/v/vue.svg" alt="Version"></a>
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat"></a>
  <br>
  <a href="https://github.com/usamahamed/SlotMachine-Frontend"><img src="https://saucelabs.com/browser-matrix/vuejs.svg" alt="Sauce Test Status"></a>
</p>

<h2 align="center">NetEnt SlotMachine Frontend </h2>
Simple slot machine game built with React in frontend and simple nodejs logic with some statistics.this is 
the frontend reposotry the backend is <a href="https://github.com/usamahamed/SlotMachine-backend">here</a>

## Introduction

### This game contain:
- Responsive design with desktop and mobile ,
- animations and sound effects,
- debuging tools,
- Reusable components 
### Tech Used:
-  React 16,
-  Webpack,
-  Sass,
-  axios

<!-- [START getstarted] -->


<!-- [START getstarted] -->

## Getting Started

### Developer Guide 

-  You must use node version 7 stable.
-  You might want to install nvm to choice node version easily.
-  To edit chance to win, edit: `TOP_FIXED_CHANCE` at `SlotConstants.js`
-  To add or remove Symbols, edit `SLOT_SYMBOL_TYPES` at `SlotConstants.js`
-  To edit spinning delay times of machine, edit `SPIN_DELAY` and `SPIN_EACH_STOP_DELAY` at `SlotConstants.js`
-  To add more rules to win, edit `PAY_TYPES` at `PayTableConstants.js`
-  To edit bet of each spin, edit `SPIN_BET` at `BalanceConstants.js`
-  To edit spin speed, edit `spinDuration` at `slot-machine.scss`

### Installation

- git clone the repository via ```git clone repository name``` and install dependances via ``` npm install ```
- start the server via ```npm run dev```
- open browser on port 8080


### User Guide 
- Click the SPIN button
- If all of the symbols are through the guide lines of the machine and the
described win happen, your balance should be updated
-  If you want to reset the game, refresh the page.
<!-- [START getstarted] -->







