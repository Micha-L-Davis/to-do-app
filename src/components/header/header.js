
const Header = (props) => {

  return (
    <header>
      <h1>To Do List: {props.incomplete} items pending</h1>
    </header>
  );
}

export default Header;
