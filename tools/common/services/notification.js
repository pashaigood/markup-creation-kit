const chalk = require('chalk');

class Notification {
  message(message) {
    console.log(message);
  }

  info(message) {
    this.message(chalk.blue(message));
  }

  warning(message) {
    this.message(chalk.yellow(message));
  }

  error(message) {
    this.message(chalk.red(message));
  }
}

module.exports = new Notification();
