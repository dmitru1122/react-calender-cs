import React, { Component } from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { createLoacalStorage, getStorageValues, refreshLocalStorage } from './CreateLocalStorageData';
import Modal from '../modal/Modal';
import itemList from '../item-title-type';

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
      isShowEditModal: false,
      isShowAddModal: false,
      addTime: 0,
      activeId: 0,
    };
  }

  itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    console.log(timelineContext);
    console.log(item);
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    let bgColor;
    let color;
    // eslint-disable-next-line no-nested-ternary
    itemList.forEach((element) => {
      if (element.value === item.title) {
        color = element.color;
        bgColor = element.backgroundColor;
      }
    });
    let backgroundColor;
    if (itemContext.selected) {
      backgroundColor = 'orange';

      if (itemContext.dragging) {
        backgroundColor = 'red';
      }
    } else {
      backgroundColor = bgColor;
    }

    // eslint-disable-next-line no-nested-ternary
    // const backgroundColor = itemContext.selected ? (itemContext.dragging ? 'red' : item.selectedBgColor) : bgColor
    const borderColor = itemContext.resizing ? 'red' : 'black';
    return (
      <div
        {...getItemProps({
          style: {
            background: backgroundColor,
            textAlign: 'center',
            color,
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1,
          },
          onMouseDown: () => {
            console.log('on item click', item);
          },
        })}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft: 3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

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
    // console.log('Moved', itemId, dragTime, newGroupOrder);
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

    // console.log('Resized', itemId, time, edge);
  };

  handleClick = (itemId, time) => {
    this.setState({ activeId: itemId });
    this.setState({ addTime: time });
    this.setState({ isShowAddModal: true });
  };

  handleAddItem = (values) => {
    const { items, activeId, addTime } = this.state;
    const intervalArr = [...items];
    const midnightTime = addTime - 10800000;
    const newItem = {
      id: items.length + 1,
      group: activeId,
      title: values.purpose,
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
    this.handleCloseModal();
  };

  handleItemDoubleClick = (itemId) => {
    this.setState({
      isShowEditModal: true,
    });
    this.setState({
      activeId: itemId,
    });

    // console.log('Vocation', itemId);
  };

  handleCloseModal = () => {
    this.setState({
      isShowEditModal: false,
      isShowAddModal: false,
    });
  };

  handleSubmitModal = (values) => {
    const { items, activeId } = this.state;

    this.setState(
      {
        items: items.map((item) => (item.id === activeId ? { ...item, title: values.purpose } : item)),
      },
      () => refreshLocalStorage(items),
    );
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd, isShowEditModal, isShowAddModal } = this.state;
    // console.log(generateFakeData);

    return (
      <>
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
          isInteractingWithItem
          itemRenderer={this.itemRenderer}
          onItemResize={this.handleItemResize}
        />
        <Modal
          type='edit'
          isShowModal={isShowEditModal}
          action={this.handleSubmitModal}
          closeAction={this.handleCloseModal}
          title='Edit label'
          description='Request was deleted'
        />
        <Modal
          type='edit'
          isShowModal={isShowAddModal}
          action={this.handleAddItem}
          closeAction={this.handleCloseModal}
          title='Select label'
          description='Request was deleted'
        />
      </>
    );
  }
}

export default App;
