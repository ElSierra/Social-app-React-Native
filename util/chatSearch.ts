async function asyncFind(array: Array<any>, predicate: any) {
  for (const item of array) {
    if (await predicate(item)) {
      return item;
    }
  }
  return undefined;
}

export async function findChatById(id: string, list: Array<any>) {
  return asyncFind(list, async (chat: any) => chat.id === id);
}
