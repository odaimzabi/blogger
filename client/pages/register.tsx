import React, { useRef } from 'react'
import { useMutation } from 'urql'
import styles from '../styles/form.module.css'
import {useRouter} from 'next/router'
import { Button, Input } from '@chakra-ui/core'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { useRegisterMutation } from '../generated/generated'
interface Props {
    
}

const register = (props: Props) => {
    
    const [,register]=useRegisterMutation()
    const username=useRef<HTMLInputElement>(null)
    const password=useRef<HTMLInputElement>(null)
    const router=useRouter()

    const handleSubmit= async (e:any)=>{
        e.preventDefault()
        const values={username:username.current?.value,password:password.current?.value}
        const data= await register(values as any)
        console.log(data)
        if (data?.data?.createUser){
        router.push('/')
        }
    }
    return (
       
        <div className={styles.container}>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <Input type="text" placeholder="Username" ref={username} size="lg" variant="filled" mt={2} py={2} px={3}/>
        <Input type="text" placeholder="Password" ref={password} size="lg" variant="filled" mt={2} py={2} px={3}/>
        <Button variantColor="blue" mt={2} type="submit">Register</Button>
       </form>
     </div>
   
    )
}

export default withUrqlClient(createUrqlClient,{ssr:false})(register)
