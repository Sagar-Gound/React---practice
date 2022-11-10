import TrelloActionButton from "./TrelloActionButton";
import TrelloCard from "./TrelloCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 250px;
  padding: "6px";
  font-size: 18px;
  margin-right: 8px;
`;
const Title = styled.p`
  margin: -8px 8px;
  fontweight: 600;
  paddingbottom: 3px;
`;

const TrelloList = ({ title, cards, listID, index }) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Title><p>{title}</p></Title>
                {cards.map((card, index) => (
                  <TrelloCard
                    index={index}
                    text={card.text}
                    key={card.id}
                    id={card.id}
                  />
                ))}
                <TrelloActionButton listID={listID} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default TrelloList;
