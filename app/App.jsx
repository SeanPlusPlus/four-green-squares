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

const SortableVerticalList = (props) => {
  const [items, setItems] = React.useState(props.data.map((el) => el.text));
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
    console.log('* data', props.data)
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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
