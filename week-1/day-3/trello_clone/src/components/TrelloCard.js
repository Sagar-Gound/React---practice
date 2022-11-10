import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 5px 5px;
  width: auto;
`;

const TrelloCard = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent sx={{ padding: 1, marginBottom: -2 }}>
              <Typography variant="caption">{text}</Typography>
            </CardContent>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default TrelloCard;
