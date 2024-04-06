import { PropTypes } from 'prop-types';

const ThemeToggler = ({theme,  toggleTheme }) => {
    return (
      <button onClick={toggleTheme} >
        { theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode' }
      </button>
    )
}

ThemeToggler.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
}

export default ThemeToggler
