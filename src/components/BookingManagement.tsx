/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { Table, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import DeleteModal from '../components/deleteModal';
import { Booking, getBookings } from '../redux/slices/bookingsSlice';
import BookingModalForm from './BookingModalForm';
import { useAppDispatch } from '../hooks/hooks';

const BookingManagement = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useSelector((state: any) => state.bookingsReducer);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  useEffect(() => {
    dispatch(getBookings());
  }, []);
  const handleEdit = (doctor: Booking) => {
    setEditBooking(doctor);
    setShowModal(true);
  };

  const filterUpcoming = () => {
    const now = new Date();

    const upcoming = bookings.filter((booking: Booking) => {
      const bookingDateTime = new Date(`${booking.date}T${booking.startTime}`);
      return bookingDateTime > now;
    });

    setFilteredBookings(upcoming);
  };

  const filterUnpaid = () => {
    const unpaid = bookings.filter((booking: Booking) => booking.status !== "оплачено");
    setFilteredBookings(unpaid);
  };

  return (
    <div className='adminStaff'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-2xl'>Управление бронированием</h3>
        <div className='flex gap-2'>
          <Button appearance="primary" onClick={() => setFilteredBookings(bookings)}>Все</Button>
          <Button appearance="primary" onClick={filterUpcoming}>Актуальные</Button>
          <Button appearance="primary" onClick={filterUnpaid}>Не оплаченные</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex w-full flex-col gap-4 items-center justify-center mx-auto mt-6">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table bordered cellBordered data={filteredBookings} autoHeight wordWrap="break-word">
          <Table.Column width={250} align="center">
            <Table.HeaderCell>Зал</Table.HeaderCell>
            <Table.Cell dataKey="roomName" />
          </Table.Column>

          <Table.Column width={200} fixed>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Телефон</Table.HeaderCell>
            <Table.Cell dataKey="phone" />
          </Table.Column>

          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Время</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <div className='flex flex-col gap-3'>
                  <p>{rowData.date}</p>
                  <p>{rowData.startTime} - {rowData.endTime}</p>
                </div>
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.Cell dataKey={"amount"} />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.Cell dataKey="status" />
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell className='deleteBtnTable'>
              {(rowData: Booking) => (
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

      <BookingModalForm
        open={showModal}
        onClose={() => {
          setEditBooking(null);
          setShowModal(false);
        }}
        bookData={editBooking}
        allBookings={bookings}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={String(deleteTarget.id)}
          deleteFunc='deleteBooking'
        />
      )}
    </div>
  );
};

export default BookingManagement;
