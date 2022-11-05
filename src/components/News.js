import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component 
{

  static defaultProps = 
  {
    country: 'in'
  }

  static propTypes = 
  {
    country : PropTypes.string.isRequired,
    category : PropTypes.string
  }

  constructor(props) 
  {
    console.log('* constructor *');

    super(props);  
    this.state = {
        articles : [],
        loading : true,
        pageSize: 12,
        page : 1,
        totalResults : 0
      }

      if(this.props.category)
      {
        document.title = this.capitalizeFirstLetter(this.props.category);
      }
      
  }
  capitalizeFirstLetter(string) 
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async getResults(page)
  {
    
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&country=${this.props.country}&pageSize=${this.state.pageSize}&page=${page}`;
 
    if(this.props.category)
    {
      url = url + `&category=${this.props.category}`;
    }

    console.log('url ',url);

    this.setState({ loading : true });      

    fetch(url)
    .then(response => response.json())
    .then((data)=> { 
      this.props.setProgress(20);
      //console.log('data',data.articles) 
      if(data.status==='ok' && data.articles && data.totalResults )
      {
        this.setState({
          articles: this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          loading : false
        });      
      }
    })
    .catch((error)=> { console.log('error', error) })
    this.props.setProgress(100);
  }


  async componentDidMount()
  {
    console.log('* componentDidMount *');
    this.getResults(this.state.page);
  }

  componentDidUpdate(prevProps,prevState)
  {
    if(prevState.category !== this.state.category)
    {
      alert('test');
    }
  }

  nextHandler = async()=>
  {
    console.log('* nextHandler *');  
    if(Math.ceil(this.state.totalResults/this.state.pageSize) >= this.state.page+1)
    {
      
      this.getResults(this.state.page+1);
      this.setState({
        page: this.state.page+1
      });
    }
    
  }
  
 
  prevHandler = async()=>
  {
    this.getResults(this.state.page-1);
    this.setState({
      page: this.state.page-1
    });
  } 


  render() 
  {
    console.log('* render *');
    return (
      <>
      <div className="container my-5">
        <h2 className="my-2">Top headlines: {this.props.category?this.capitalizeFirstLetter(this.props.category): ''} </h2>
        
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.nextHandler}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Loading/>}
        >
          <div className="row">
          {this.state.articles.map((element,index)=>
          {
            //console.log('index ',index);
            return <div key={index} className="col-md-4 my-2">
            <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} />
                    </div>
          })}
          </div>
        </InfiniteScroll>
        
      </div>
      </>
    )
  }
}
