import React, { useEffect } from 'react'
import './leftBar.css';
import tempImage from '../../assets/posts/post1.png'
import useApi from '../../hooks/useApi';
import { getLatestNews } from '../../api';

const LeftBar = () => {

  const { data: latestNews, error, loading, fetchData: fetchNews } = useApi(getLatestNews);

  useEffect(()=>{
    fetchNews()
  },[])

  return (
    <div className='leftBar'>
      <div className='latestNews'> 
        {latestNews && latestNews.map(news => {
          return (<a key={news._id} target='_blank' href={news.url}>
              <div className='singleNews'>
                <div className='newsThumbnail'>
                  <img src={news.main_image} className='latestNewsThumbnail' />
                </div>
                <div className='newsTitle'>
                    {news.title}
                </div>
              </div>
          </a> 
        )
        })
        }
      </div>
    </div>
  )
}

export default LeftBar
