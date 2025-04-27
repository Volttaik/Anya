const addUserEXP = async (db, id, exp) => {
  if (!db || !id || !exp) throw new Error("All parameters are required, recieved some undefined.");
  const user = await db.get({
    dbType: "USER",
    id
  });
  const data = await db.create({
    data: {
      id,
      exp: (user.exp ?? 0) + exp
    },
    dbType: "USER",
    allowNew: true,
    allowUpdate: true
  });
  return {
    newEXP: data.exp
  }
};

const getRankByEXP = async (exp) => {
  if (!exp) throw new Error("User EXP is undefined!");
  let rank, rank_emoji, requiredEXP, nextRank, nextRank_emoji;
  const ranks = [
    { exp: 76200, name: "Legendary I", emoji: "🗿" },
    { exp: 72200, name: "Legendary II", emoji: "🗿" },
    { exp: 68200, name: "Legendary III", emoji: "🗿" },
    { exp: 64200, name: "Legendary IV", emoji: "🗿" },
    { exp: 60200, name: "Legendary V", emoji: "🗿" },
    { exp: 57700, name: "Master I", emoji: "🏆" },
    { exp: 55200, name: "Master II", emoji: "🏆" },
    { exp: 52700, name: "Master III", emoji: "🏆" },
    { exp: 50200, name: "Master IV", emoji: "🏆" },
    { exp: 47700, name: "Master V", emoji: "🏆" },
    { exp: 45700, name: "Emerald I", emoji: "🎊" },
    { exp: 43700, name: "Emerald II", emoji: "🎊" },
    { exp: 41700, name: "Emerald III", emoji: "🎊" },
    { exp: 39700, name: "Emerald IV", emoji: "🎊" },
    { exp: 37700, name: "Emerald V", emoji: "🎊" },
    { exp: 36000, name: "Ruby I", emoji: "🪩" },
    { exp: 34300, name: "Ruby II", emoji: "🪩" },
    { exp: 32600, name: "Ruby III", emoji: "🪩" },
    { exp: 30900, name: "Ruby IV", emoji: "🪩" },
    { exp: 29200, name: "Ruby V", emoji: "🪩" },
    { exp: 27700, name: "Sapphire I", emoji: "🪼" },
    { exp: 26200, name: "Sapphire II", emoji: "🪼" },
    { exp: 24700, name: "Sapphire III", emoji: "🪼" },
    { exp: 23200, name: "Sapphire IV", emoji: "🪼" },
    { exp: 21700, name: "Sapphire V", emoji: "🪼" },
    { exp: 20500, name: "Diamond I", emoji: "💎" },
    { exp: 19300, name: "Diamond II", emoji: "💎" },
    { exp: 18100, name: "Diamond III", emoji: "💎" },
    { exp: 16900, name: "Diamond IV", emoji: "💎" },
    { exp: 15700, name: "Diamond V", emoji: "💎" },
    { exp: 14500, name: "Platinum I", emoji: "☄️" },
    { exp: 13500, name: "Platinum II", emoji: "☄️" },
    { exp: 12500, name: "Platinum III", emoji: "☄️" },
    { exp: 11500, name: "Platinum IV", emoji: "☄️" },
    { exp: 10500, name: "Platinum V", emoji: "☄️" },
    { exp: 9500, name: "Gold I", emoji: "⚜️" },
    { exp: 8700, name: "Gold II", emoji: "⚜️" },
    { exp: 7900, name: "Gold III", emoji: "⚜️" },
    { exp: 7100, name: "Gold IV", emoji: "⚜️" },
    { exp: 5500, name: "Gold V", emoji: "⚜️" },
    { exp: 4900, name: "Silver I", emoji: "🥈" },
    { exp: 4300, name: "Silver II", emoji: "🥈" },
    { exp: 3700, name: "Silver III", emoji: "🥈" },
    { exp: 3100, name: "Silver IV", emoji: "🥈" },
    { exp: 2500, name: "Silver V", emoji: "🥈" },
    { exp: 2000, name: "Bronze I", emoji: "🥉" },
    { exp: 1500, name: "Bronze II", emoji: "🥉" },
    { exp: 1000, name: "Bronze III", emoji: "🥉" },
    { exp: 500, name: "Bronze IV", emoji: "🥉" },
    { exp: 0, name: "Bronze V", emoji: "🥉" },
  ];
  if (exp >= 76200) {
    let baseExp = 76200;
    let extraExp = exp - baseExp;
    if (extraExp < 5000) {
      rank = "Legendary I";
      rank_emoji = "🗿";
      requiredEXP = 76200 + 5000;
      nextRank = "Legendary 🌟";
      nextRank_emoji = "🌟";
    } else {
      let stars = Math.floor(extraExp / 5000);
      rank = `Legendary 🌟${stars > 1 ? `x${stars}` : ""}`;
      rank_emoji = null;
      requiredEXP = 76200 + ((stars + 1) * 5000);
      nextRank = `Legendary 🌟${stars + 1}`;
      nextRank_emoji = "🌟";
    }
  } else {
    for (let i = 0; i < ranks.length; i++) {
      if (exp >= ranks[i].exp) {
        rank = ranks[i].name;
        rank_emoji = ranks[i].emoji;
        requiredEXP = i > 0 ? ranks[i-1].exp : 76200;
        nextRank = i > 0 ? ranks[i-1].name : "Legendary 🌟";
        nextRank_emoji = i > 0 ? ranks[i-1].emoji : "🌟";
        break;
      }
    }
  }
  if (!rank) {
    rank = "⚠️ Unknown Rank";
    rank_emoji = "❓";
    requiredEXP = 0;
    nextRank = "Bronze V";
    nextRank_emoji = "🥉";
  }
  return {
    rank,
    rank_emoji,
    requiredEXP,
    nextRank,
    nextRank_emoji
  };
};

export default {
  addUserEXP,
  getRankByEXP
};