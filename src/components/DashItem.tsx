import { Draggable } from 'react-beautiful-dnd';
import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    item: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: theme.radius.md,
        border: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
        padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: 30,
        fontWeight: 700,
        width: 60,
    },
}));

type Props = {
    children: React.ReactNode;
    index: number;
    draggableId: string;
    show: boolean;
};

const DashItem = ({ children, index, draggableId, show }: Props) => {
    const { classes, cx } = useStyles();
    if (!show) return <></>;
    return (
        <Draggable index={index} draggableId={draggableId}>
            {(provided, snapshot) => (
                <>
                    <div
                        className={cx(classes.item, {
                            [classes.itemDragging]: snapshot.isDragging,
                        })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Text className={classes.symbol}>{draggableId}</Text>
                        <div>
                            <Text color='dimmed' size='sm'>
                                {children}
                            </Text>
                        </div>
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default DashItem;
