import { Subscribe } from "../types/Subscribe";

export const chekSubscribed = (
  subscribed: string,
  to: string,
  followersList: Array<Subscribe>
): boolean => {
  return followersList.some(
    (follow) => follow.subscribed === subscribed && follow.to === to
  );
};
