const Logger = require('../utilities/Logger')
const log = new Logger('bgBlue', 'System')
const _ = require('lodash')
const children = require('require-all') ({dirname: __dirname + '/basicCommands', resolve: function(Children) {return new Children()}})

class baseCommand {
  constructor (options) {
    this.options = options || {}
  }
  processor (msg, bot, tag, args) {
    for (let i = 0; i < _.values(children).length; i++) {
      if (_.values(children)[i].getName() === tag) { 
        log.bcommand(msg) 
        if (_.values(children)[i].simpleCommand(msg, args) === null || _.values(children)[i].simpleCommand(msg, args) === undefined) {
          try { _.values(children)[i].command(msg, bot, tag, args) }
          catch (err) { bot.createMessage(msg.channel.id, err) ; log.error(err) }
        }
        else {
          try { bot.createMessage(msg.channel.id, _.values(children)[i].simpleCommand(msg, args)) }
          catch (err) { bot.createMessage(msg.channel.id, err) ; log.error(err) }
        }
      }
    }
  }
}

module.exports = baseCommand