import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardList from '../CardList/CardList';
import { fetchBoardRequest } from '../../ducks/board/actions';
import { selectBoard } from '../../ducks/board/selectors';

import './Board.scss';

function Board({ id, background, lists }) {
  const backgroundStyle =
    background.type === 'img'
      ? `url(${background.url}) no-repeat`
      : background.color;

  const boardStyle = useMemo(
    () => ({
      background: backgroundStyle,
      backgroundSize: 'cover',
    }),
    [backgroundStyle],
  );

  return (
    <div className='board' style={boardStyle}>
      <ul className='board-lists'>
        {lists.map(list => (
          <CardList key={list.id} className='board-list' {...list} />
        ))}
      </ul>
    </div>
  );
}

function BoardContainer({ id, board, fetchBoard }) {
  useEffect(() => {
    fetchBoard(id);
  }, [fetchBoard, id]);

  return board && <Board {...board} />;
}

const mapStateToProps = state => ({
  board: selectBoard(state),
});

const mapDispatchToProps = {
  fetchBoard: fetchBoardRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
