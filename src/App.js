import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class App extends Component{
  
  state={
    movies:[],
    type:'movie'
  }

  async componentDidMount(){
    let movies= await Axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=6d3c2454f54c05849d5d473da135819e`)
    console.log(movies.data, 'movies')

    this.setState({
      movies:movies.data.results
    })
  }

  onClickChange=async()=>{
    if(this.state.type==="movie"){
      let tvShows= await Axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=6d3c2454f54c05849d5d473da135819e`)
      console.log(tvShows.data, 'tvshows')

      this.setState({
        type:'tv',
        movies:tvShows.data.results
      })

      return;
    }


    if(this.state.type==="tv"){
      let tvShows= await Axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=6d3c2454f54c05849d5d473da135819e`)

      console.log('movie')
      this.setState({
        type:'movie',
        movies:tvShows.data.results
      })
      return;



    }

  }

  render(){

    let movies = null;
    let tvShows= null;

    if(this.state.movies.length>0 && this.state.type==="movie"){
      tvShows=null;
      movies= this.state.movies.map(movie=>(
        <Grid item sm={4} md={4} key={movie.id}>

          <Card >
            <CardContent>
            <img style={{height:140}} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
              <Typography gutterBottom variant="h5" component="h2">
                {movie.title}
              </Typography>

            </CardContent>
          </Card>
        </Grid>
      ))
    }

    if(this.state.movies.length>0 && this.state.type==="tv"){
      movies=null;
      tvShows= this.state.movies.map(movie=>(
        <Grid item sm={4} md={4} key={movie.id}>

          <Card >
            <CardContent>
            <img style={{height:140}} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
              <Typography gutterBottom variant="h5" component="h2">
                {movie.original_name}
              </Typography>

            </CardContent>
          </Card>
        </Grid>
      ))
    }


    return (
      <div style={{backgroundColor:'#f5f5f5'}}>
        <Grid container spacing={3}
        justify="center"
        alignItems="center"
        >
          <Grid item sm={11} md={11}>
            <Button style={{width:'100%'}} variant="contained" color="#000" onClick={this.onClickChange}> Change </Button>
          </Grid>
          {movies}
          {tvShows}
        </Grid>
      </div>
    );
  }
}

export default App;
