import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputVal: '',
      listGitRepos:[],
      searchVal:'',
      listSearch:[]
    };
  }
  handleInputVal = (e) =>{
     const inputVal = e.target.value
    this.setState({inputVal})
    fetch(`https://api.github.com/users/${inputVal}/repos`).then(res =>res.json()).then( res =>{
      console.log(res)
      if(res.message !=="Not Found")
      this.setState({listGitRepos:res})
    })
  }
  handleSearchVal = (e)=>{
    let listGitRepos = this.state.listGitRepos
    let filtered
    filtered=listGitRepos.filter((val,ind)=>{
      return val.name.toLowerCase().indexOf(e.target.value.toLowerCase())>=0
    })
    this.setState({listSearch:filtered,searchVal:e.target.value})
  }

  render() {
    const {inputVal,listGitRepos,searchVal,listSearch} = this.state
    return (
      <div>
      <p>Search from Github Repo</p>
       <input value={inputVal} onChange={this.handleInputVal}/>
       {listGitRepos&&listGitRepos.length>=1?<div>
        <p>Client side Filter</p>
        <input value={searchVal} onChange={this.handleSearchVal}/>
        {
          listSearch&&listSearch.map((val,ind)=>{
            return(
              <p>{val.name}</p>
            )
           
          })
        }
        </div>:""}
        {
          searchVal.trim()===""&&listGitRepos&&listGitRepos.map((val,ind)=>{
            return(
              <p>{val.name}</p>
            )
           
          })
        }
        

      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
