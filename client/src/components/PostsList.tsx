import { List } from '@mui/material';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { postsListAtom } from '../atom';
import { AppServises } from '../servises/API';
import { PostCard } from './PostCard';

export const PostsList = () => {

    const [posts, setPosts] = useAtom(postsListAtom);

    const {mutate, isLoading, isError} = useMutation(AppServises.getPosts, {
        onSuccess: (data)=>{
            console.log(data);
            setPosts(data);
        }, 
        onError: (error: any)=>{
            console.log(error);
        }
    });

    useEffect(()=>{
        mutate();
    }, [])

    return (
        <List>

            { !isLoading?
                posts.map(post=><PostCard key={post._id} post={post}/>):null
            }
        </List>
    )
}
