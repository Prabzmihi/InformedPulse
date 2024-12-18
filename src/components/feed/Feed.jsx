import React, { useEffect, useState } from 'react'
import './feed.css'
import Post from '../post/Post'
import Category from '../category/category'
import useApi from '../../hooks/useApi'
import {fetchNews} from '../../api'

const Feed = () => {

  const { data: news, error, loading, fetchData } = useApi(fetchNews);
  const [clickedCategory, setClickedCategory] = useState("");

  const onChangeCategory = (value) => {
    setClickedCategory(value);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <>Loading . . . .</>
  if(error) return <>{error}</>

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Category clickedCat={clickedCategory} onChangeCat={onChangeCategory} />

        {clickedCategory == "" && news && news.map(news => (
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
