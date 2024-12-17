import React, { useEffect } from 'react'
import './feed.css'
import Post from '../post/Post'
import Category from '../category/category'
import useApi from '../../hooks/useApi'
import {fetchNews} from '../../api'

const Feed = () => {

  const { data: news, error, loading, fetchData } = useApi(fetchNews);

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <>Loading . . . .</>
  if(error) return <>{error}</>

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Category />

        {news && news.map(news => (
          <Post 
            key={news._id} 
            id={news._id} 
            imageURL={news.main_image} 
            text={news.summary} 
            title={news.title}
            publishedDate = {news.publication_date} 
            sentiment={news.sentiment}
            url={news.url}
            domainLogo={news.domain_logo}
            top5Similar={news.top_5_similar}
            bias={news.bias}
            isInterested={news.is_interested}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
