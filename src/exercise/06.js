// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'
import { ErrorBoundary} from 'react-error-boundary'

// class ErrorBoundary extends React.Component {
//   state = { error: null }
//   static getDerivedStateFromError(error) {
//     return { error }
//   }

//   render() {
//     const { error } = this.state
//     const { FallbackComponent } = this.props
//     console.log("Inside Render!!!!", error)
//     if (error) {
//       return <FallbackComponent error={error} />
//     }
//     return this.props.children
//   }



// }

function ErrorFallback ({ error, resetErrorBoundary }) {

  return (
    <div role="alert">
      There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}> Try Again</button>
    </div>

  ) 
}

function PokemonInfo({ pokemonName }) {


  const [state, setState] = React.useState({ status: pokemonName? 'pending' : 'idle', pokemon: null, error: null })

  const { status, pokemon, error } = state

  React.useEffect(() => {
    if (!pokemonName) return
    setState({ status: 'pending' })

    fetchPokemon(pokemonName).then(
      pokemonData => setState({ status: 'resolved', pokemon: pokemonData }),
      error => setState({ status: 'rejected', error }),
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a Pokemon'
  } else if (status === 'pending') {
    return (<PokemonInfoFallback name={pokemonName} />)
  } else if (status === 'resolved') {
    return (<PokemonDataView pokemon={pokemon} />)

  } else if (status === 'rejected') {
    throw error
  }

  throw new Error('This should be Impossible to get here!!!!')

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary onReset={handleReset} FallbackComponent={ErrorFallback} resetKeys={[pokemonName]} >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
