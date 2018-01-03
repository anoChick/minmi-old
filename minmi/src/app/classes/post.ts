export class Post {
  constructor(
    public id: number,
    public channelID: string,
    public ownerID: string,
    public body?: string
  ) {  }
}
