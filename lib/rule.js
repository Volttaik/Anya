import Cg from '../config.js';

export const verifyRule = ({ anyaGen3, msg, isMod, rule, gcAdmins, isAdmins, botAdmin }) => {
  if (typeof rule !== 'number') {
    msg.reply(`\`\`\`⚠️ Invalid Rule Number '${rule}'! Please Contact The Developer!\`\`\``);
    return { allowed: false };
  }

  const reply = (message) => ({
    msg: msg.reply(message),
    allowed: false,
  });

  switch (rule) {
    case 1:
      return isMod ? { allowed: true } : reply(Cg.msg.isMod);
      
    case 2:
    case 3:
      if (msg.isPrivate) return reply(Cg.msg.group);
      if (!isMod) return reply(Cg.msg.isMod);
      if (!isAdmins) return reply(Cg.msg.isAdmin);
      if (rule === 3 && !botAdmin) return reply(Cg.msg.isBotAdmin);
      return { allowed: true };
      
    case 4:
      return msg.isPrivate ? { allowed: true } : reply(Cg.msg.private);

    case 5:
      return msg.isPrivate ? reply(Cg.msg.group) : { allowed: true };

    case 6:
      if (!isMod) return reply(Cg.msg.isMod);
      return msg.isGroup ? { allowed: true } : reply(Cg.msg.group);

    case 7:
      if (!isMod) return reply(Cg.msg.isMod);
      return msg.isPrivate ? { allowed: true } : reply(Cg.msg.private);

    case 8:
      return msg.isChannel ? { allowed: true } : reply(Cg.msg.channel);

    default:
      msg.reply(`\`\`\`⚠️ Invalid Rule Number '${rule}'! Please Contact The Developer!\`\`\``);
      return { allowed: false };
  }
};
