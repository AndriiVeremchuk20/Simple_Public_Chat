import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useMutation } from "react-query";
import { useDebounce } from "../hooks/useDebounce";
import { authServises } from "../servises/API";
import { responseSearchType } from "../types/User";
import { UserAutoCompleteCatd } from "./UserAutoCompleteCard";

const delay = 300; //delay for search

export const Search = () => {
  const [users, setUsers] = useState<responseSearchType>([]);
  const [searchText, setSearchText] = useState<string>("");

  const onSearchTextChange = useCallback((e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchText(value);
  }, []);

  const debouce = useDebounce<string>(searchText, delay);

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    authServises.searchUsers,
    {
      onSuccess: (data) => {
        console.log(data);
        setUsers(data);
        console.log(users);
      },
      onError: (error: any) => {},
    }
  );

  useEffect(() => {
    if (debouce) 
      mutate(debouce);
    else
      setUsers([]);
  }, [debouce]);

  return (
    <Box width={"60%"} mx={3} my={1}>
      <Autocomplete
        autoHighlight
        limitTags={3}
        options={users}
        getOptionLabel={(user)=>(user.username)}
        renderOption={(props, user) => <UserAutoCompleteCatd key={user._id} user={user} />}
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchText}
            onChange={onSearchTextChange}
            placeholder={"Search"}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Box>
  );
};
