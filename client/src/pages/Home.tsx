import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'

export const Home = () => {

    const user = useAppSelector(state => state.user.user);

    return (
    <h1>{`Hello ${user?.username}`}</h1>
  )
}
