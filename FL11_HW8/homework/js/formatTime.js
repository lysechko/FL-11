function formatTime(time) {
  const day = parseInt(time / (24 * 60));
  const hour = parseInt((time / 60) % 24);
  const minute = time % 60;
  return `${day} day(s) ${hour} hour(s) ${minute} minute(s).`;
}

formatTime(120);
formatTime(59);
formatTime(3601);
