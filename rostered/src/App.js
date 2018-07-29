import React, { Component } from 'react';
import unirest from 'unirest';
import firebase, { auth, provider } from './firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from './logo.svg';
import Login from './components/login/login.js';
import Search from  './components/search.js';
import Header from  './components/header.js';
import Container from './components/container.js';
import Dashboard from './components/dashboard/dashboard.js';
import LeagueDashboard from './components/league/dashboard.js';
import LeagueProfile from './components/league/profile.js';
import TeamDashboard from './components/team/dashboard.js';
import PlayerDashboard from './components/player/dashboard.js';
import LoginForm from './components/login/loginform.js';
import SignupForm from './components/login/signupform.js';
import ResetPasswordEmail from './components/login/resetpasswordemail.js';
import ResetPasswordConfirm from './components/login/resetpasswordconfirm.js';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

import $ from 'jquery';
import './stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.stats,
      leagues: this.props.stats.leagues,
      scorers: [],
      results: [],
      user: null
    };
  }

  handleLoginChange(e, name, value) {
    this.setState({
      [name]: value
    });
  }

  componentDidMount()  {
    const dataBase = firebase.database().ref('data');
    dataBase.on('value', (snapshot) => {
      let stats = snapshot.val();
      this.setState({stats:stats});
    });
    // auth.onAuthStateChanged((user) => {
    //   console.log(user);
    //   if (user) {
    //     this.setState({ user });
    //   }
    // });
  }

  // componentWillMount() {
  //   this.removeAuthListener = auth.onAuthStateChanged((user) => {
  //     console.log(user);
  //     if (user) {
  //       this.setState({ user: user });
  //     } else {
  //       this.setState({ user: null });
  //     }
  //   });
  // }
  //
  // componentWillUnmount() {
  //   this.removeAuthListener();
  // }

  logData () {
    console.log(this.state.leagues[0].teams[0].rank);
  }

  searchData(e) {
    e.preventDefault();
    let results = [];
    let leagues = this.state.stats.leagues;
    let toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    function getSearchValue() {
      var searchValue = document.querySelector(".search__input").value;
      searchValue = searchValue.toLowerCase();
      return searchValue;
    }

    let inputVal = getSearchValue();

    leagues.map((league, i) => {
      let leagueIndex = i;
      if (league.name.toLowerCase().indexOf(inputVal) > -1) {
        results.push(
          {
            path: "leagues",
            category: "League",
            name: league.name,
            leagueName: league.name,
            leagueId: leagueIndex
          }
        );
      }

      league.teams.map((team, i) => {
        let teamIndex = i;
        if (team.name.toLowerCase().indexOf(inputVal) > -1) {
          results.push(
            {
              path: "teams",
              category: "Team",
              name: team.name,
              teamName: team.name,
              teamId: teamIndex,
              leagueName: league.name,
              leagueId: leagueIndex
            }
          );
        }

        team.players.map((player, i) => {
          let playerIndex = i;
          if (player.name.toLowerCase().indexOf(inputVal) > -1) {
            results.push(
              {
                path: "players",
                category: "Player",
                name: player.name,
                playerName: player.name,
                playerId: playerIndex,
                teamName: team.name,
                teamId: teamIndex,
                leagueName: league.name,
                leagueId: leagueIndex
              }
            );
          }
        });

      });

    });

    this.setState({
      results: results
    });


    $("#search-results").show();

  }

  onStatChange (stats) {
      this.setState({
        stats: stats
      });
      let data = this.state.stats;
      firebase.database().ref().set({data});
  }

  login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      this.setState({user:user});
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
  }

  logout(e) {
    // e.preventDefault();
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });
  }

  addUser(email, username, password1, password2) {
    auth.createUserWithEmailAndPassword(email, password2).
    then((result) => {
      const user = result.user;
      this.setState({user});
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
  }

  render() {
    console.log(this.state.scorers);

    return (
      <BrowserRouter>
        <Route render={({location, history, match}) => (
        <div className="App">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
          {this.state.user ?
            <div className="container">
              <Header handleLogout={(e) => this.logout(e)}/>
              <section className="content">
                <div className="search__wrapper">
                  <input type="text" className="search__input" />
                  <a href="" className="search__submit" onClick={(e) => this.searchData(e) }><span>Search</span></a>
                  <Search stats={this.props.stats} results={this.state.results}/>
                </div>
                  <Route exact path="/" render={ () => <Redirect to="/home" />} />
                  <ReactCSSTransitionGroup
                    component="div"
                    transitionName="slide"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    <Switch key={location.key} location={location}>
                      <Route path="/home" render={ () => <Dashboard stats={this.state.stats} scorers={this.state.scorers} onStatChange={(stats) => this.onStatChange(stats)} handleLogout={(e) => this.logout(e) } />} />
                      <Route path="/leagues" render={ ({match}) => <LeagueDashboard key="/leagues" stats={this.state.stats} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/teams" render={ ({match}) => <TeamDashboard stats={this.state.stats} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/players" render={ () => <PlayerDashboard stats={this.state.stats} onStatChange={(stats) => this.onStatChange(stats)} />} />
                    </Switch>
                  </ReactCSSTransitionGroup>
                </section>
            </div>
            :
            <div className="container">
              <div className="login__background">
                <Route exact path="/home" render={ () => <Redirect to="/" />} />
                <ReactCSSTransitionGroup
                  component="div"
                  transitionName="slide"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                  transitionAppear={true}
                  transitionAppearTimeout={500}>
                  <Switch key={location.key} location={location}>
                    <Route exact path="/" render={ () => <LoginForm user={this.state.user} handleLogin={(email, password) => this.login(email, password) }/>} />
                    <Route path="/signup" render={() => <SignupForm handleSignup={(email, username, password1, password2) => this.addUser(email, username, password1, password2) } />} />
                    <Route path="/resetpassword" render={() => <ResetPasswordEmail />} />
                    <Route path="/resetconfirm" render={() => <ResetPasswordConfirm />} />
                  </Switch>
                </ReactCSSTransitionGroup>
              </div>
            </div>
          }

        </div>
      )}/>
      </BrowserRouter>
    );
  }
}

export default App;
