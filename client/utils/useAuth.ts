import { useEffect } from "react";
import { useMeQuery } from "../generated/generated";
import {useRouter} from 'next/router'

export function useAuth(){

    const [{data,fetching}]=useMeQuery()
    const router=useRouter()
    useEffect(() => {   
        if (fetching){

        }else  if (!data?.me){
            router.push('/login')
        }
    }, [fetching,data])
}