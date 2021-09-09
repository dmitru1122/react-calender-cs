import React, { Component } from 'react';
import moment from 'moment';

import Timeline from 'react-calendar-timeline';

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
const groupps = [
  { id: 1, title: 'group 1' },
  { id: 2, title: 'group 2' },
];

const itemms = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start: moment('01-09-2021', 'DD-MM-YYYY'),
    end: moment('10-09-2021', 'DD-MM-YYYY'),
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start: moment('08-09-2021', 'DD-MM-YYYY'),
    end: moment('09-09-2021', 'DD-MM-YYYY'),
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start: moment('09-09-2021', 'DD-MM-YYYY'),
    end: moment('12-09-2021', 'DD-MM-YYYY'),
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    // const { groups, items } = generateFakeData();
    // console.log(items);
    const items = itemms;
    const groups = groupps;
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

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? { ...item, start: edge === 'left' ? time : item.start, end: edge === 'left' ? item.end : time }
          : item,
      ),
    });

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
        fullUpdate='fal'
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
