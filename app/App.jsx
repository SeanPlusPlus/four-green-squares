import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Modal } from 'react-bootstrap'

const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    margin: '4px 0',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    touchAction: 'none'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='md:w-96'>
      <div className='card-body'>
        <p>
          {id}
        </p>
      </div>
    </div>
  );
};

function sortByMostRecentYear(data) {
  return data.sort((a, b) => b.year - a.year);
}

const SortableVerticalList = (props) => {
  const [events] = useState(sortByMostRecentYear(props.data.slice()))
  const [items, setItems] = useState(props.data.map((el) => el.text));
  const [showModal, setShowModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    console.log('* items', items)
    console.log('* events', events)
    setShowModal(true)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>

        <Button variant="primary" className='md:w-96' onClick={handleSubmit}>
          Submit
        </Button>
      </DndContext>

      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {events.map((el, i) => (
              <li key={el.text} className='result'>
                <p className='text-muted mb-2'>
                  <small>
                    {el.year}
                  </small>
                </p>
                {el.text === items[i] && (
                  <span>
                    🟩 &nbsp; 
                  </span>
                )}
                {el.text !== items[i] && (
                  <span>
                    ❌ &nbsp; 
                  </span>
                )}
                <span>
                  {el.text}
                </span>
                <div>
                {el.text !== items[i] && (
                  <p className='text-muted float-right'>
                    <small>
                      (Your guess: { items.indexOf(el.text) + 1 })
                    </small>
                  </p>
                )}
                </div>
                { i !== 3 && (
                  <hr className='mt-8' />
                )}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRefresh}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SortableVerticalList;
