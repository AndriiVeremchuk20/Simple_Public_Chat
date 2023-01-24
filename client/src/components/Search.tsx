import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useMutation } from "react-query";
import { useDebounce } from "../hooks/useDebounce";
import { AppServises } from "../servises/API";
import { responseSearchType } from "../types/User";
import { UserAutoCompleteCatd } from "./UserAutoCompleteCard";

const delay = 300; //wait defore search

export const Search = () => {
  const [users, setUsers] = useState<responseSearchType>([]);
  const [searchText, setSearchText] = useState<string>("");

  const onSearchTextChange = useCallback((e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchText(value);
  }, []);

  const debouce = useDebounce<string>(searchText, delay);

  const { mutate } = useMutation(AppServises.searchUsers, {
    onSuccess: (data) => {
      setUsers(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (debouce) mutate(debouce);
    else setUsers([]);
  }, [debouce]);

  return (
    <Box width={"60%"} mx={3} my={1}>
      <Autocomplete
        autoHighlight
        limitTags={3}
        options={users}
        getOptionLabel={(user) => user.username}
        renderOption={(props, user) => (
          <UserAutoCompleteCatd key={user._id} user={user} />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              borderRadius: "5px",
            }}
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
