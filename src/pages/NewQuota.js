import React,{useEffect} from 'react'
import QuoteForm from '../components/quotes/QuoteForm'
import {useHistory} from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'

function NewQuota() {
    const history = useHistory()
    const { sendRequest , status } = useHttp(addQuote)

    useEffect(()=>{
        if(status === 'completed'){
            history.push('/')
        }
    },[status, history])
    const addQuoteHanler = quoteData =>{
        sendRequest(quoteData)
        console.log(quoteData);
    }
    return (
           <QuoteForm isLoading={status === 'pending'} is onAddQuote={addQuoteHanler}/>
        
    )
}

export default NewQuota
