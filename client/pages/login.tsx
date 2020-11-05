import React, { useRef } from 'react'
import styles from '../styles/form.module.css'
import {useRouter} from 'next/router'
import { withUrqlClient } from 'next-urql'
import { useLoginUserMutation} from '../generated/generated'
import { Input,Button } from "@chakra-ui/core";
import { createUrqlClient } from '../utils/createUrqlClient';
interface Props {
    
}

const login = (props: Props) => {
  const username=useRef<HTMLInputElement>(null)
  const password=useRef<HTMLInputElement>(null)
  const [,login]=useLoginUserMutation()
  const router=useRouter()
  const handleSubmit= async (e:any)=>{
    e.preventDefault()
    const values={username:username.current?.value,password:password.current?.value}
    const result =await login(values as any)
    console.log(result)
        if (result?.data?.login){ 
          router.push('/')
        }
    
  }
    return (

        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" ref={username} size="lg" variant="filled" mt={2} py={2} px={3}/>
        <Input type="text" placeholder="Password" ref={password} size="lg" variant="filled" mt={2} py={2} px={3}/>
        <Button variantColor="blue" type="submit" mt={2}>Login</Button>
        </form>
      </div>
    )
}

export default withUrqlClient(createUrqlClient,{ssr:false})(login)
