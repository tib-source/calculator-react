import React from "react";

function Header(props) {
  // Changing themes

  return (
    <header class="header">
      <div class="logo">Calc</div>
      <div class="theme">
        <small>Theme</small>
        <form>
          <div class="theme1">
            <input type="radio" name="theme" value="1" id="1" />
            <label for="1">1</label>
          </div>
          <div class="theme2">
            <input type="radio" name="theme" value="2" id="2" />
            <label for="2">2</label>
          </div>
          <div class="theme3">
            <input type="radio" name="theme" value="3" id="3" />
            <label for="3">3</label>
          </div>
          <div class="slider"></div>
        </form>
      </div>
    </header>
  );
}

export default Header;
