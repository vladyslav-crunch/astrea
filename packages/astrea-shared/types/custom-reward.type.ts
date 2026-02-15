export type CustomReward = {
  _id?: string;
  userId: string;
  title: string;
  description?: string;
  coins: number;
  createdAt?: Date;
  updatedAt?: Date;
};
