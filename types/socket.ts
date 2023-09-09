export interface IMessageSocket {
  message: {
    sender: { userName: string; id: string };
    text: string;
    id: string;
    createdAt: string;
  };
  imageUri :string;
  chatId: string;
}
