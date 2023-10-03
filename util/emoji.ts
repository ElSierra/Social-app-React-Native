export function isEmoji(str: string): boolean {


  const emojiPattern = /\p{Emoji}/u;

  return emojiPattern.test(str) && str?.length <= 5;
}
