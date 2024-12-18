const endpoints = {
    FETCH_NEWS: '/user/recommendations/?limit=40',
    LOGIN_USER: '/auth/login',
    LOGOUT: '/auth/logout',
    FETCH_POSTS: '/posts',
    ADD_INTEREST: '/user/add-interest',
    REMOVE_INTEREST: '/user/delete-interest',
    USER_REGISTRATION: '/user/register',
    LATEST_NEWS: '/latest_news?limit=5',
    FILTER_NEWS: '/user/news-by-category'
  };
  
  export default endpoints;