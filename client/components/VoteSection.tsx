import { Flex, Box, IconButton,Text } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import { useLikeMutation, useMeQuery } from '../generated/generated'

interface Props {
    
}

 const VoteSection = ({post}:any) => {
    const [color,setColor]=useState(false)
    const [,like]=useLikeMutation()
    const [{data}]=useMeQuery()

     function fetchVotes(){
      const me =data?.me?.id
      post.Likes.map((item: { userId: string | undefined,hasLiked:boolean|undefined})=>{
        if (item.userId==me && item.hasLiked==true){
            setColor(true)
        }
      })
    }

    useEffect(()=>{
          fetchVotes()
    },[])
    return (
        <div>
            

            <Flex direction="row" mt={2}>
                <Box>
                 
                  <Flex direction="row">
                <IconButton
                  onLoad={async()=>{
                    const id =post.id
                      const res=await like({id})
                      if (res.data?.likePost?.hasLiked){
                        setColor(true)
                      }else {
                        setColor(false)
                      }
                  }}
                icon="arrow-up" aria-label="Like" ml={2}
                variantColor={color==true?"blue":undefined}

                onClick={async()=>{
                  const id=parseInt(post.id)
                    const res=await like({id})
                    if (res.data?.likePost?.hasLiked==true){
                        setColor(true)
                    }else{
                      setColor(false)
                    }
                 }}  
                
                />
                <Text ml={2} mt={1}>Like</Text>
                </Flex>
                </Box>
                <Box>
                  <Flex direction="row">
                  <IconButton icon="chat" aria-label="Comments" ml={2}/>
                  <Text ml={2} mt={1}>Comments</Text>
                  </Flex>
                </Box>
            </Flex>


        </div>
    )
}

export default VoteSection