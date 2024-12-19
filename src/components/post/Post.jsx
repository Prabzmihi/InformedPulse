import React, { useEffect, useState } from 'react'
import Bbc from '../../assets/newslogos/bbc.png'
import './post.css'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import StarIcon from '@mui/icons-material/Star';
import { formatDistanceToNow } from 'date-fns';
import useApi from '../../hooks/useApi';
import { addInterest, removeInterest } from '../../api';
import MultiColorProgressBar from '../multiColorProgressBar/MultiColorProgressBar';
import { Card, CardContent, Popover, Typography } from '@mui/material';

const Post = (props) => {

  const {
    id,
    imageURL, 
    title, 
    text, 
    publishedDate,
    sentiment,
    url,
    domainLogo,
    top5Similar,
    bias,
    isInterested,
    domain
  } = props;

  const postId = {
    news_id: id 
  }

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(()=>{
    setIsClicked(isInterested)
  },[])

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [isClicked, setIsClicked] = useState(false);
  const { 
    data: addInteractionResponse, 
    error: addInteractionError, 
    loading: addInteractionLoading, 
    fetchData: addInteractn 
  } = useApi(addInterest);

  const { 
    data: removeInteractionResponse, 
    error: removeInteractionError, 
    loading: removeInteractionLoading, 
    fetchData: removeInteractn
  } = useApi(removeInterest);

  const handleClickInteresting = () => {
    if(isInterested){
      rmvIntrst()
    }else{
      addIntrst();
    }
    setIsClicked(!isClicked)
  }

  const addIntrst = () => {
    addInteractn(postId);
  }
  const rmvIntrst = () => {
    removeInteractn(postId)
  }


  return (
    <>
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
                <img src={domainLogo} alt="" className='postProfileImage' />
                <span className="postUsername">{domain}</span>
                <span className="postedDate">{formatDistanceToNow(new Date(publishedDate), { addSuffix: true })}</span>
            </div>
            <div className="postTopRight"></div>
        </div>
        <div className="postCenter">
          <div className="justifyingArea">
          <p className='postTitle'><b>{title}</b></p> <br />
            <span className="postText">
              {text} 
            </span>
          </div>
            <br />
            Read more : <a href={url} onClick={addIntrst} target='_blank'> {url} </a>
            <img src={imageURL} alt="" className='postImage' />
        </div>
        <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          {bias && <MultiColorProgressBar value={bias?.bias_score} />}
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
            {sentiment < 0 && <SentimentVeryDissatisfiedIcon className='badFace'/>}
            {sentiment > 0 && <SentimentSatisfiedAltIcon className='happyFace' />}
            {sentiment == 0 && <SentimentSatisfiedIcon className='normal'/>}
            </div>
            <div className="postBottomRight">
                <button 
                  className={isClicked ? 'interestingBtnClicked' : 'interestingBtn'} 
                  onClick={handleClickInteresting}
                >
                    <StarIcon className='starIcon' /> Interesting 
                </button>
            </div>
        </div>
        {top5Similar && 
        <div>
            <br />
            <h3>Similar News</h3><br/>
            <div className='similarNewsContainer'>
  
              {top5Similar && top5Similar.map(similarnews => 
                (
                  <div key={similarnews._id} className='content'>
                    <img src={similarnews.main_image} className='similarNewsThumbnail' /> <br />
                    <a target='_blank' className='similarNews' href={similarnews.url}>{similarnews.title}</a> <br />
                  </div>
                )
              )}        
            </div>
            
        </div>
        
        }
        
      </div>
    </div>
    <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none", // Prevents flickering on hover
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* Detailed information content */}
        <Card sx={{ maxWidth: 900 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bias Information
            </Typography>
            <Typography variant="body2" color="text.secondary" align='justify'>
              <b>Score : </b> {bias?.bias_score}% <br /><br />
              <b>Level :</b> {bias?.bias_level} <br /><br />
              <b>Explenation :</b> {bias?.explanation_of_score} <br /><br />
              <b>Framing :</b> {bias?.framing} <br /><br />
              <b>Tone :</b> {bias?.tone} <br /><br />
              <b>Selective Details :</b> {bias?.selective_details} <br />
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </>
    
  )
}

export default Post
