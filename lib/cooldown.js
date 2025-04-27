let data = {};

export const getCooldown = (msg, { id, time }) => {
  const liveTime = Date.now();
  if (data[id]) {
    const { start, duration } = data[id];
    const timeLeft = (start + duration) - liveTime;
    if (timeLeft > 0) {
      msg.reply(`*\`COOLDOWN @${id.split('@')[0]}\`*\n_❄️ Try again after ${(timeLeft / 1000).toFixed(1)} seconds_`, { mentions: [msg.sender] });
      return { status: 'COOLDOWN_ACTIVE' };
    } else {
      delete data[id];
    }
  }
  data[id] = {
    start: liveTime,
    duration: time * 1000
  };
  setTimeout(() => {
    delete data[id];
  }, time * 1000);
  return { status: 'COOLDOWN_SET' };
}
