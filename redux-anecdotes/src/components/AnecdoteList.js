import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, like }) => <div>
  <div>
    {anecdote.content}
  </div>
  <div>
    has {anecdote.votes}
    <button onClick={like}>vote</button>
  </div>
</div>

const AnecdoteList = (props) => {

  const like = (anecdote) => {
    props.voteForAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    props.setNotification(`Liked anecdote "${anecdote.content}"`, 5000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          like={() => like(anecdote)}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList


