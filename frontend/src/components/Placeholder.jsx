import {
  VerticallyCentralizedContainer,
  HorizontallyCentralizedContainer,
} from '../styles/style'

const Placeholder = () => {
  return (
    <HorizontallyCentralizedContainer style={{ maxWidth: '50%', height: '100%', boxSizing: 'border-box;' }}>
      <VerticallyCentralizedContainer>
        <p>¯\_( ͡° ͜ʖ ͡°)_/¯</p>
      </VerticallyCentralizedContainer>
    </HorizontallyCentralizedContainer>

  )
}

export default Placeholder
