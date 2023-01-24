import { Subscribe } from "../types/Subscribe";

export const chekSubscribed = (
  subscribed: string,
  to: string,
  followersList: Array<Subscribe>
): boolean => {

  //console.log( "data"  + appUserId, UserToChekId, followersList)

  return followersList.some(
    (follow) => follow.subscribed === subscribed && follow.to === to
  );
};
