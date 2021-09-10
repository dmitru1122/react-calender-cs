/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react'
import moment from 'moment'

import Timeline, { TimelineHeaders, SidebarHeader, DateHeader, CustomHeader } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'

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
  groupLabelKey: 'title'
}
const initGroups = [
  { id: 1, title: 'group 1' },
  { id: 2, title: 'group 2' }
]
const initItems = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start: moment('01-09-2021', 'DD-MM-YYYY'),
    end: moment('10-09-2021', 'DD-MM-YYYY')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start: moment('08-09-2021', 'DD-MM-YYYY'),
    end: moment('09-09-2021', 'DD-MM-YYYY')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start: moment('09-09-2021', 'DD-MM-YYYY'),
    end: moment('12-09-2021', 'DD-MM-YYYY')
  }
]

const StyledCalendar = () => {
  const [items, setItems] = useState(initItems)
  const [groups] = useState(initGroups)
  const defaultTimeStart = moment().startOf('month').toDate();
  const defaultTimeEnd = moment().startOf('month').add(1, 'month').toDate();

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { id: groupId } = groups[newGroupOrder]
    const newItems = items.map((item) => {
      return item.id === itemId
        ? { ...item, start: dragTime, end: dragTime + (item.end - item.start), group: groupId }
        : item
    })

    setItems(newItems)
    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  const handleItemResize = (itemId, time, edge) => {
    const newItems = items.map((item) => {
      return item.id === itemId
        ? { ...item, start: edge === 'left' ? time : item.start, end: edge === 'left' ? item.end : time }
        : item
    })
    setItems(newItems)
    console.log('Resized', itemId, time, edge)
  }

  return (
    <Timeline
      itemRenderer={({ item, itemContext, getItemProps, getResizeProps }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
        return (
          <div {...getItemProps(item.itemProps)}>
            {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

            <div className='rct-item-content' style={{ maxHeight: `${itemContext.dimensions.height}` }}>
              {`custom ${itemContext.title}`}
            </div>

            {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
          </div>
        )
      }}
      groups={groups}
      items={items}
      keys={keys}
      fullUpdate='false'
      canChangeGroup
      itemTouchSendsClick
      stackItems
      itemHeightRatio={0.75}
      canMove
      canResize='both'
      defaultTimeStart={defaultTimeStart}
      // visibleTimeStart={defaultTimeStart}
      dragSnap={86400000}
      defaultTimeEnd={defaultTimeEnd}
      // visibleTimeEnd={defaultTimeEnd}
      onItemMove={handleItemMove}
      timeSteps={{ day: 1, hour: 24, month: 1, year: 1 }}
      timelineUnit='day'
      isInteractingWithItem
      onItemResize={handleItemResize}>
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Febuary 2021</div>
          }}
        </SidebarHeader>
        <DateHeader unit='day' />
        <CustomHeader height={50} headerData={{ someData: 'data' }} unit='day'>
          {({ headerContext: { intervals }, getRootProps, getIntervalProps }) => {
            return (
              <div {...getRootProps()}>
                {intervals.map((interval) => {
                  const intervalStyle = {
                    lineHeight: '30px',
                    textAlign: 'center',
                    border: '1px solid black',
                    backgroundColor: 'white',
                    color: 'black'
                  }
                  return (
                    <div
                      role='heading'
                      aria-level='2'
                      {...getIntervalProps({
                        interval,
                        style: intervalStyle
                      })}>
                      <div className='sticky'>{interval.startTime.format('ddd')}</div>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </CustomHeader>
        {/* <DateHeader unit="asdf"/> */}
      </TimelineHeaders>
    </Timeline>
  )
}

export default StyledCalendar
