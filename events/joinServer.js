const db = require('../db/firestore')
const scanOldMessages = require('../actions/scanOldMessages')

module.exports = async guild => {
  if (await db.hasGuild({ guildId: guild.id }))
    return console.log('Was re-added to a guild: ' + guild.name)

  console.log('Was added to a new guild: ' + guild.name)
  db.addGuild({
    guildId: guild.id,
    guildName: guild.name,
    guildOwnerId: guild.ownerID,
  })
  scanOldMessages(guild)
}
