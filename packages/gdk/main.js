'use strict';

module.exports = {
  load() {

  },

  unload() {

  },

  // register your ipc messages here
  messages: {
    open() {
      Editor.Panel.open('gdk');
    }
  },
};