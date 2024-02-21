import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="ui pointing menu">
        <a className="active item" href="/">Home</a>
        <a className="item" href="/">Messages</a>
        <a className="item" href="/">Friends</a>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="ui hidden divider"></div>
    </div>
  );
}

export default Navbar
