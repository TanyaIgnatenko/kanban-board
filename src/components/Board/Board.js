import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardList from '../CardList/CardList';
import { addListRequest, fetchBoardRequest } from '../../ducks/board/actions';
import { selectBoard } from '../../ducks/board/selectors';

import './Board.scss';
import { AddComponent } from '../AddComponent';

function Board({ id, background, lists, addList }) {
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
        <AddComponent
          className='add-list-btn'
          componentName='колонку'
          onAdd={addList.bind(null, id)}
        />
      </ul>
    </div>
  );
}

function BoardContainer({ id, board, fetchBoard, addList }) {
  useEffect(() => {
    fetchBoard(id);
  }, [fetchBoard, id]);

  return board && <Board addList={addList} {...board} />;
}

const mapStateToProps = state => ({
  board: selectBoard(state),
});

const mapDispatchToProps = {
  fetchBoard: fetchBoardRequest,
  addList: addListRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
