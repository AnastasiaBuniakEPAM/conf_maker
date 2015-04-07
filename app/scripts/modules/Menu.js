var React = require('react');
var classNames = require('classnames');
var Menu = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  toggleMenu: function() {
    return this.setState({active: !this.state.active});
  },

  menuLinkHandler: function(e) {
    e.preventDefault();
    this.toggleMenu();

    var menuHeight = document.querySelector('.menu-wrapper').offsetHeight;
    var hash = e.target.href.substr(e.target.href.indexOf('#') + 1);
    var anchor = document.getElementById(hash);
    var startY = window.pageYOffset;
    var targetY = anchor.offsetTop - menuHeight;

    scrollTo(targetY, 300);
  },

  render: function() {
    var menuCls = classNames({
      'menu--visible': this.state.active,
      'menu': true
    });
    var darkCls = classNames({
      'darkenScreen--hidden': true,
      'darkenScreen--visible': this.state.active
    });

    var itemsToRender = this.props.items.map(function(item) {
      var href = '#' + item;
      return <a href={href} key={item} className="menu__item" onClick={this.menuLinkHandler}>{item}</a>
    }.bind(this));

    return (
      <div id="menu" className="module-wrapper">
        <div className="menu-wrapper">
          <div id="cm_toggleWrapper" className="toggleWrapper">
            <div id="cm_menuToggle" className="menuToggle" onClick={this.toggleMenu}>
              <div className="menuToggle__stripe"></div>
              <div className="menuToggle__stripe"></div>
              <div className="menuToggle__stripe"></div>
            </div>
          </div>
          <nav id="cm_menuItems" className={menuCls}>
            {itemsToRender}
          </nav>
        </div>
        <div id="cm_darkenScreen" className={darkCls} onClick={this.toggleMenu}></div>
      </div>
    );
  }
});

function scrollTo(to, duration) {
  if (duration < 0) {
    return;
  }
  //This is for IE compability
  var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  var difference = to - top;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    window.scroll(0, top + perTick);
    if (top == to) {
      //this is to prevent scrolling to top
      //after animation has been done in IE
      window.scroll(0, to);
      return;
    }
    scrollTo(to, duration - 10);
  }, 10);
}

module.exports = Menu;
