import React, { Component } from "react";
import axios from "axios";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoading: false,
      error: false,
    };
    window.onscroll = () => {
      var { error, isLoading } = this.state;
      if (error || isLoading) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.loadUser();
      }
    };
  }

  componentWillMount() {
    this.loadUser();
  }

  loadUser = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios({
          url: "https://randomuser.me/api/?results=10",
          method: "get",
          data: null,
        })
          .then(res => {
            const nextUser = res.data.results.map(user => ({
              email: user.email,
              name: Object.values(user.name).join(" "),
              photo: user.picture.medium,
              username: user.login.username,
              uuid: user.login.uuid,
            }));
            this.setState({
              user: [...this.state.user, ...nextUser],
              isLoading: false,
            });
          })
          .catch(err => console.log(err));
      }
    );
  };
  render() {
    var { user, isLoading } = this.state;
    return (
      <div>
        <h1>
          {" "}
          {user.map((user, index) => (
            <p key={index}>
              {" "}
              {index} - {user.email}{" "}
            </p>
          ))}{" "}
        </h1>{" "}
        {isLoading && <p> Loading... </p>}{" "}
      </div>
    );
  }
}
