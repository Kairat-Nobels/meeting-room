/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { Table, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { getRooms, Room } from '../redux/slices/roomsSlice';
import DeleteModal from '../components/deleteModal';
import RoomsModalForm from '../components/RoomsModalForm';
import { useAppDispatch } from '../hooks/hooks';

const RoomManagement = () => {
  const dispatch = useAppDispatch();
  const { rooms, loading, error } = useSelector((state: any) => state.roomsReducer);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editDoctor, setEditDoctor] = useState<Room | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Room | null>(null);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const handleEdit = (doctor: Room) => {
    setEditDoctor(doctor);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditDoctor(null);
    setShowModal(true);
  };

  return (
    <div className='adminStaff'>
      <div className='flex justify-between items-center mb-4'>
        <h3>Залы Мероприятий</h3>
        <Button appearance="primary" onClick={handleAdd}>+ Добавить Зал</Button>
      </div>

      {loading ? (
        <div className="w-full mt-8 mx-auto flex flex-col gap-4 justify-center items-center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table bordered cellBordered data={rooms} autoHeight wordWrap="break-word">
          <Table.Column width={60} align="center">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>

          <Table.Column width={100} fixed>
            <Table.HeaderCell>Фото</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <img src={rowData.img} alt="Фото" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '8px' }} />
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.Cell dataKey={"price"} />
          </Table.Column>

          <Table.Column flexGrow={3}>
            <Table.HeaderCell>Оборудование</Table.HeaderCell>
            <Table.Cell dataKey="equipment" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Количество мест</Table.HeaderCell>
            <Table.Cell dataKey="capacity" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Пллощадь</Table.HeaderCell>
            <Table.Cell dataKey="area" />
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell className='deleteBtnTable'>
              {(rowData: Room) => (
                <div className='actionButtons'>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                    <Button onClick={() => handleEdit(rowData)} appearance="subtle">
                      <MdEdit color="#1caf68" size={20} />
                    </Button>
                  </Whisper>

                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                    <Button onClick={() => setDeleteTarget(rowData)} appearance="subtle">
                      <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                    </Button>
                  </Whisper>
                </div>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      )}

      <RoomsModalForm
        open={showModal}
        onClose={() => {
          setEditDoctor(null);
          setShowModal(false);
        }}
        roomData={editDoctor}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={String(deleteTarget.id)}
          deleteFunc='deleteRoom'
        />
      )}
    </div>
  );
};

export default RoomManagement;
