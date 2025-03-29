import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskItems,
  deleteTaskItem as deleteItemAction,
  TaskItem,
} from "./store/Task/TaskSlice";
import { RootState, AppDispatch } from "./store";
import {
  useFetchTaskItems,
  useCreateTaskItem,
  useUpdateTaskItem,
  useDeleteTaskItem,
} from "./store/Task/TaskApi";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useFetchTaskItems();
  const addItemMutation = useCreateTaskItem();
  const updateItemMutation = useUpdateTaskItem();
  const deleteItemMutation = useDeleteTaskItem();

  const [editingItem, setEditingItem] = useState<{
    _id: string;
    title: string;
    description: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [deleteID, setDeleteID] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTaskItems());
  }, [dispatch]);

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleAddItem = () => {
    setIsLoading(true);
    setLoadingButton("add");
    const newItem = { title: "New Item", description: "New Item Description" };
    toast("Create Task");

    addItemMutation.mutate(newItem, {
      // onSettled is called regardless of whether the query or mutation was successful or resulted in an error.
      // It is always called after the request has completed.
      onSettled: () => {
        setIsLoading(false);
        setLoadingButton(null);
        dispatch(fetchTaskItems());
        setEditingItem(null);
      },
    });
  };

  const handleUpdateItem = (
    _id: string,
    title: string,
    description: string
  ) => {
    setIsLoading(true);
    setLoadingButton(`update-${_id}`);
    updateItemMutation.mutate(
      { _id, title, description },
      {
        onSettled: () => {
          setIsLoading(false);
          setLoadingButton(null);
          dispatch(fetchTaskItems());
          setEditingItem(null);
        },
      }
    );
    toast("Task Updated!");
  };

  const handleDeleteItem = (_id: string) => {
    setIsLoading(true);
    setLoadingButton(`delete-${_id}`);

    // Optimistically update the UI
    // const previousItems = tasks;
    dispatch(deleteItemAction(_id));

    deleteItemMutation.mutate(_id, {
      onSettled: () => {
        setIsLoading(false);
        setLoadingButton(null);
      },
      onError: () => {
        // Revert the change if the mutation fails
        dispatch(fetchTaskItems());
      },
    });

    toast("Task Deleted!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items</h1>
      <button
        onClick={handleAddItem}
        className={styles.button}
        disabled={isLoading}
      >
        Add Item
        {loadingButton === "add" && <div className={styles.spinner}></div>}
      </button>
      <ul className={styles.list}>
        {tasks &&
          tasks.map((item: TaskItem, index:number) => (
            <li key={item._id} className={styles.listItem}>
              {editingItem && editingItem._id === item._id ? (
                <>
                  <input
                    type="text"
                     placeholder="Enter  title"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                  placeholder="Enter  description"
                    type="text"
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                    className={styles.input}
                  />
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() =>
                        handleUpdateItem(
                          item._id,
                          editingItem.title,
                          editingItem.description
                        )
                      }
                      className={styles.saveButton}
                      disabled={isLoading}
                    >
                      Save
                      {loadingButton === `update-${item._id}` && (
                        <div className={styles.spinner}></div>
                      )}
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className={styles.cancelButton}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                 {index+1}. {" "}
                  {item.title}
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => setEditingItem(item)}
                      className={styles.editButton}
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {setDeleteID(item._id);setOpen(true)}}
                      className={styles.deleteButton}
                      disabled={isLoading}
                    >
                      Delete
                      {loadingButton === `delete-${item._id}` && (
                        <div className={styles.spinner}></div>
                      )}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
      <Modal open={open} onClose={onCloseModal}>
        <div className={styles.modal}>
          <h2 className={styles.modalTitle}>
            Are you sure! you want to delete task!
          </h2>
          <div className={styles.modalView}>
            <button className={styles.cancelButton} disabled={isLoading}>
              cancel
            </button>
            <button
              onClick={() => {handleDeleteItem(deleteID);setOpen(false)}}
              className={styles.deleteButton}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;
