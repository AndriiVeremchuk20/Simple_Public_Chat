import { PersonAdd, PersonRemove } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { appUserAtom, subscriptionsListAtom } from "../atom";
import { AppServises } from "../servises/API";
import { User } from "../types/User";
import { chekSubscribed } from "../utils/chekSubscribed";

interface SubscribeButtonProps {
  subscribeToUserId: string;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  subscribeToUserId,
}) => {
  const [user] = useAtom(appUserAtom);
  const [subscriptions, setSubscriptions] = useAtom(subscriptionsListAtom);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const subscribeMutation = useMutation(AppServises.subscribeTo, {
    onSuccess: (data) => {
      setSubscriptions((prev) => [data, ...prev]);
      setIsSubscribed(true);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const unsubscribeMutation = useMutation(AppServises.unsubscribeTO, {
    onSuccess: (data) => {
      setSubscriptions((prev) => [
        ...prev.filter((item) => item._id !== data.id),
      ]);
      setIsSubscribed(false);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onButtonClick = useCallback(() => {
    if (isSubscribed) {
      unsubscribeMutation.mutate(subscribeToUserId);
    } else {
      subscribeMutation.mutate(subscribeToUserId);
    }
  }, [subscribeToUserId, subscriptions]);

  useEffect(() => {
    const value = chekSubscribed(
      (user as User)._id,
      subscribeToUserId,
      subscriptions
    );
    setIsSubscribed(value);
  }, []);

  return (
    <>
      {subscribeToUserId !== (user as User)._id ? (
        <Button
          sx={{ width: "40%", padding: "10px 15px" }}
          onClick={onButtonClick}
          variant={isSubscribed ? "outlined" : "contained"}
        >
          {isSubscribed ? <PersonRemove /> : <PersonAdd />}
        </Button>
      ) : null}
    </>
  );
};
