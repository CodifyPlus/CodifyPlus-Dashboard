import { createStyles, Text, rem, Button, UnstyledButton } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../../common/StrictModeDroppable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[6]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
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
    color:
      theme.colorScheme === "dark" ? theme.colors.yellow[2] : theme.colors.dark,
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
    username: string;
  }[];
}

export function AllServicesListFragment({ data }: DndListProps) {
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const { classes, cx } = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, handlers] = useListState(data);
  const items = state.map((item, index) => (
    <>
      <Draggable
        key={item.serviceId}
        index={index}
        draggableId={item.serviceId}
      >
        {(provided, snapshot) => (
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <UnstyledButton
              key={item.serviceId}
              component={Link}
              to={`/dashboard${
                currentUser.role === "ADMIN"
                  ? "/track"
                  : currentUser.role === "MODERATOR"
                  ? "/mod/track"
                  : "/servicestatus"
              }/${item.serviceId}`}
            >
              <div>
                <Text>{item.name}</Text>
                {currentUser.role !== "USER" ? (
                  <Text color="dimmed" size="sm">
                    Assigned for: {item.username}
                  </Text>
                ) : (
                  <></>
                )}
              </div>
            </UnstyledButton>
            <Button
              compact
              component={Link}
              className={classes.viewButton}
              to={`/dashboard${
                currentUser.role === "ADMIN"
                  ? "/track"
                  : currentUser.role === "MODERATOR"
                  ? "/mod/track"
                  : "/servicestatus"
              }/${item.serviceId}`}
              variant="light"
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
            {data.length === 0 ? (
              <Text color="grey">
                There is nothing to show. Please check back later!
              </Text>
            ) : (
              items
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
