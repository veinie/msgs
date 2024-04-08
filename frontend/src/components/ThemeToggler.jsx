import { PropTypes } from 'prop-types';
import { Button } from '../styles/style';

const ThemeToggler = ({theme,  toggleTheme }) => {
    return (
      <div className='background-div profile-element' style={{ padding: '10px' }}>
        <h3>Toggle light or dark theme</h3>
        <Button className='btn-light' onClick={toggleTheme} >
          { theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode' }
        </Button>
      </div>
    )
}

ThemeToggler.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
}

export default ThemeToggler
