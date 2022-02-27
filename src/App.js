import './App.css';
import React from 'react';
import ModalPage from './components/ModalPage';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      actors: [],
      isTheModalOn: false,
      selectedActor: []
    })
    /* 
    belong to this class
    1; this.handleModal = this.handleModal.bind(this), 
        // This binding is necessary to make `this` work in the callback
    This is a way of saving the current value of this , which is in scope during the call to the constructor, so that it can be used later when the function is called.
    */
    this.handleModal = this.handleModal.bind(this)
  }
  // componentDidMount() {
  //   const URL = 'https://api.themoviedb.org/3/person/popular?api_key=e937d2db91264759338fd811e670c0b4'
  //   // fetch(URL).them((resp) => resp.json()).then((data) => console.log(data))
  //   //send request to server . them . server responding us with text, JSON take text and create JSON obj. then . this data is object (if see in console we will see object)
  //   //.json() return a promise parsing the body text to JSON(object)
  //   fetch(URL).then((resp) => resp.json()).then((data) => this.setState({actors: data.results})).catch((err)=> console.log(err))// always add catch
  // }

  async componentDidMount() {
    const URL = 'https://api.themoviedb.org/3/person/popular?api_key=e937d2db91264759338fd811e670c0b4'
    //with async
    try {
      const resp = await fetch(URL)
      const data = await resp.json()
      this.setState({ actors: data.results })
      console.log(data, "this is async await")
    } catch (err) {
      console.log(err)
    }
    //async await more readable, and it is syntactic sugar, await is similar to then
    //instead of catch we use try and catch
  }
  toggleModal(id){
    this.setState({isTheModalOn: true})
    const selectedActor = this.state.actors.filter((actor) => actor.id === id)
    this.setState({selectedActor})
  }
  handleModal = (status) => {
    this.setState({
      isTheModalOn: status
    })
  }
  
  render() {
    const { actors } = this.state//structuring, we will use data instead this.state all time

    return (
      <>
      <div className='App'>
        <div className='movies'>
          {actors.map((actor) => {
            const { name, profile_path, known_for , id} = actor
            const details = known_for.map((film) => film.title)
            return(
            <div className='actor' onClick={()=> this.toggleModal(id)}>
              <figure>
                <img src={"https://image.tmdb.org/t/p/w185/" + profile_path} className="image-actor"/>
              </figure>
              <h1>{name}</h1>
              <p>{details.join(",")}</p>
              {/* my code */}
              {/* {known_for.map((film) => {
                const { title, original_name } = film
               return <>
               <h3>{title}</h3>
               <h3>{original_name}</h3>
               </>
              })} */}
            </div>)
          })}
        </div>
        {this.state.isTheModalOn ? <ModalPage handleModal={this.handleModal} dataActor={this.state.selectedActor}/> : null}
        {/* selectedActor pass as props */}
      </div>
      </>
    )
  }
}
export default App

  // console.log(name, "https://image.tmdb.org/t/p/w500/" + profile_path)

  