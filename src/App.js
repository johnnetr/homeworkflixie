import React, { Fragment } from 'react';
import {
  Navbar,
  NavbarBrand, InputGroup, InputGroupAddon, Card, Button, CardImg, CardTitle, CardText, CardBody, Container
} from 'reactstrap';
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import SearchBar from './components/SearchBar';

const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=b9839d30d81ad403d05f7a051e8f64e7&language=en-US&page=1';

export default class Example extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      isOpen: false,
      rawData: [],
      resultsData: [],
      filteredData: [],
      loading: true,
      searchText: '',
    };
  }

  componentWillMount() {
    this.requestData();
  };

  requestData = () => {
    fetch(url).then(res => {
      return res.json().then(data => {
        this.setState({ resultsData: data.results, filteredData: data.results, loading: false });
      })
    })
  }



  refresh = () => {
    this.setState({ loading: true });
    this.componentWillMount();
  }

filterMovies(text) {
  let moviesCopy = this.state.resultsData;
  let results = moviesCopy.filter( movie => movie.title.toLowerCase().includes(text.toLowerCase()));
  this.setState({ filteredData: results })
  }

  render() {
    if (this.state.loading === false) {

      const resultsData = this.state.filteredData;
      const ListInfo = resultsData.map((data) => {
        return <Container style={{ maxWidth: '700px' }}>
          <Card style={{ textAlign: 'center', marginBottom: '20px' }}>
            <CardBody>
              <CardImg src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
              <CardTitle style={{ padding: '20px 20px' }}>
                {data.title}
              </CardTitle>
              <CardText>{data.overview}</CardText>
            </CardBody>
          </Card>
        </Container>;

      });
      return (
        <div style={{ alignItems: 'center', alignContent: 'center' }}>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><h1 style={{ color: 'red' }}>NetFLEX</h1></NavbarBrand>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
              </InputGroupAddon>
              <SearchBar handleChange={(searchText) => this.filterMovies(searchText)} />
            </InputGroup>
            <Button style={{ marginLeft: '10px' }} onClick={this.refresh}>Refresh</Button>
          </Navbar>
          <h1 style={{ textAlign: 'center', padding: '50px 50px' }}>Now Playing</h1>
          <ul id="myUL">

            {ListInfo}

          </ul>
        </div >
      );
    }
    else {
      return (

        <div style={{ textAlign: 'center', padding: '20vw 0px' }}>
          <Dots size={100} />
        </div>
      )
    }
  }
}