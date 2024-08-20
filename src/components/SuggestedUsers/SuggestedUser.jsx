import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';

function SuggestedUser({user, setUser}) {
    const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(user.uid);
    const authUser = useAuthStore(state => state.user);
    
    const onFollowUser = async () => {
        await handleFollowUser();
        setUser({
            ...user,
            followers: isFollowing 
            ? user.followers.filter((follower) => follower !== authUser.uid) 
            : [...user.followers, authUser.uid],
        });
        // console.log(isFollowing);
        // console.log(user);
        // console.log(authUser);
    };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} >
        <Flex alignItems={'center'} gap={2} >
            <Link to={`/${user.username}`}>
                <Avatar src={user.profilePicURL} size={'md'} />
            </Link>
            <VStack spacing={2} alignItems={'flex-start'}>
                <Link to={`/${user.username}`}>
                    <Box fontSize={12} fontWeight={'bold'} >
                        {user.fullName}
                    </Box>
                </Link>
                <Box fontSize={11} color={'gray.500'} >
                    {user.followers.length} followers
                </Box>    
            </VStack> 
        </Flex>
        {authUser.uid !== user.uid && (
            <Button fontSize={13} bg={'transparent'} p={0} h={'max-content'} fontWeight={'medium'} color={'blue.500'} cursor={'pointer'} _hover={{color: 'white'}} onClick={onFollowUser} isLoading={isUpdating}>
            {isFollowing? 'Unfollow': 'Follow'}
        </Button>
        )}
    </Flex> 
  )
}

export default SuggestedUser