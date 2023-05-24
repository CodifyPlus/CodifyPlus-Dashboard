import { createStyles, Text, rem, Button } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../../common/StrictModeDroppable";
import { IconCheck, IconClockBolt } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },
  viewButton: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    borderColor:
    theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.colors.dark,
    color:
      theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.colors.dark,
  },
  viewButtonMobile: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    borderColor:
    theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.colors.dark,
    color:
      theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.colors.dark,
  },
}));

interface DndListProps {
  data: {
    status: string;
    icon: string;
    name: string;
    serviceId: string;
  }[];
}

export function AllServicesListFragment({ data }: DndListProps) {
  const { classes, cx } = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, handlers] = useListState(data);
  const datalen = data.length;
  const items = data.map((item, index) => (
    <>
      <Draggable key={item.name} index={index} draggableId={item.name}>
        {(provided, snapshot) => (
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Text className={classes.symbol}>
              {item.icon === "C" ? <IconCheck /> : <IconClockBolt />}
            </Text>
            <div>
              <Text>{item.name}</Text>
              <Text color="dimmed" size="sm">
                Status: {item.status}
              </Text>
              <Button
                component={Link}
                className={classes.viewButtonMobile}
                mt={10}
                to={`/dashboard/servicestatus/${item.serviceId}`}
                variant="outline"
                color="yellow"
                style={{ marginLeft: "auto" }}
              >
                View
              </Button>
            </div>
            <Button
              component={Link}
              className={classes.viewButton}
              to={`/dashboard/servicestatus/${item.serviceId}`}
              variant="outline"
              color="yellow"
              style={{ marginLeft: "auto" }}
            >
              View Status
            </Button>
          </div>
        )}
      </Draggable>
    </>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <StrictModeDroppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.length === 0
              ? <Text color="grey">There is nothing to show. Please check back later!</Text>
              : items}
            {provided.placeholder}
            {datalen > 3 ? <Button
                component={Link}
                mt={10}
                to={`/dashboard/all-services`}
                variant="outline"
                color="yellow"
                style={{ marginLeft: "auto" }}
              >
                View All
              </Button> : <></>}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
