import React,{useEffect} from 'react'
import {Route, useParams , Link , useRouteMatch} from 'react-router-dom'
import Comment from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import NotFound from './NotFound'
import useHttp from '../hooks/use-http'
import {getSingleQuote} from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Dummy_DATA =[
    { id: 'q1' , author:'Ahmed', text:'Learn react js is too much funn!'},
    { id: 'q2' , author:'Alrashed', text:'Learn node  and Laravel for back end!'}
]
function QuotaDetail() {
    const params = useParams()
    const match = useRouteMatch()

    const {quotedId} = params;
    // console.log(params);
    //  console.log('Quote Id :', quotedId);
    const { sendRequest, status, data: loadedQuote , error } = useHttp(getSingleQuote , true)
    useEffect(()=>{
        sendRequest(quotedId)
       
    },[sendRequest, quotedId])

    if (status === 'pending') {
        return (
          <div className='centered'>
            <LoadingSpinner />
          </div>
        );
      }
    
      if (error) {
        return <p className='centered focused'>{error}</p>;
      }

    if(!loadedQuote.text){
       return <p> No quote Found!! 🤷‍♂️🤷‍♂️ </p>
    }
    return (
        <div>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>                
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comment />
            </Route>
        </div>
    )
}

export default QuotaDetail
