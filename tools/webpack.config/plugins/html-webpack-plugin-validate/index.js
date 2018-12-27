const IsChanged = require('../html-webpack-plugin-is-changed');
const notification = require('common/services/notification');
const fs = require('fs');
const path = require('path');
const HTMLHint = require('htmlhint').HTMLHint;
const w3cjs = require('w3cjs');

module.exports = function({cwd} = {}) {
  const config = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.htmlhintrc')).toString()
  );

  return new IsChanged(({html}) => {
    w3cjs.validate({
      input: html,
      callback: function (error, res) {
        // HTMLHint disabled
        // const result = HTMLHint.verify(html, config);
        // console.log(result)
        const messages = res.messages.concat([]).filter(m => ['error', 'warning'/*, 'info'*/].includes(m.type));
        messages.splice(0, 3).forEach(message => {
          (notification[message.type] || notification.error).call(notification, (`${message.message}\n${message.extract.slice(0, 150)}\n`));
        });
        if (messages.length) {
          notification.error(`...\n\nand ${messages.length} more`);
        }
      }
    });
  });
};
