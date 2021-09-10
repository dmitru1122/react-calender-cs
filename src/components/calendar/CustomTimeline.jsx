import React, { Component } from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { createLoacalStorage, getStorageValues, refreshLocalStorage } from './CreateLocalStorageData';
// import Modal from '../modal/Modal';

// import generateFakeData from './generate-fake-data';

// console.log(moment().add(5, 'hour'));

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

createLoacalStorage();
class App extends Component {
  constructor(props) {
    super(props);
    const { items, groups } = getStorageValues();
    const defaultTimeStart = moment().startOf('month').toDate();
    const defaultTimeEnd = moment().startOf('month').add(1, 'month').toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
    };
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? { ...item, start: dragTime, end: dragTime + (item.end - item.start), group: group.id }
          : item,
      ),
    });

    console.log('Moved', itemId, dragTime, newGroupOrder);
  };

  handleClick = (itemId, time) => {
    const { items } = this.state;
    const intervalArr = [...items];
    const midnightTime = time - 10800000;
    const newItem = {
      id: items.length + 1,
      group: itemId,
      title: 'new item',
      start: midnightTime,
      end: midnightTime + 86400000,
    };

    intervalArr.push(newItem);
    this.setState(
      {
        items: intervalArr,
      },
      () => refreshLocalStorage(items),
    );
  };

  handleItemDoubleClick = (itemId) => {
    const { items } = this.state;

    this.setState(
      {
        items: items.map((item) => (item.id === itemId ? { ...item, title: 'Vocation' } : item)),
      },
      () => refreshLocalStorage(items),
    );

    console.log('Vocation', itemId);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState(
      {
        items: items.map((item) =>
          item.id === itemId
            ? { ...item, start: edge === 'left' ? time : item.start, end: edge === 'left' ? item.end : time }
            : item,
        ),
      },
      () => refreshLocalStorage(items),
    );

    console.log('Resized', itemId, time, edge);
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;
    // console.log(generateFakeData);

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        onCanvasClick={this.handleClick}
        onItemDoubleClick={this.handleItemDoubleClick}
        canChangeGroup
        itemTouchSendsClick
        stackItems
        itemHeightRatio={0.75}
        canMove
        canResize='both'
        defaultTimeStart={defaultTimeStart}
        dragSnap={86400000}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={this.handleItemMove}
        timeSteps={{ day: 1, hour: 24, month: 1, year: 1 }}
        timelineUnit='day'
        isInteractingWithItem
        onItemResize={this.handleItemResize}
      />
    );
  }
}

export default App;
