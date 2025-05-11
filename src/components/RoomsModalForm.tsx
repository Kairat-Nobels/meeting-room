/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  Uploader,
  Input,
} from "rsuite";
import { createRoom, Room, updateRoom } from "../redux/slices/roomsSlice";
import { useAppDispatch } from "../hooks/hooks";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите имя"),
  price: NumberType("Цена должна быть числом").isRequired("Укажите цену"),
  capacity: NumberType("Количество мест должно быть числом").isRequired("Укажите количество мест"),
  area: StringType().isRequired("Укажите площадь"),
  equipment: StringType().isRequired("Укажите оборудование"),
});

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<typeof Input>>(
  (props, ref) => <Input {...props} as="textarea" ref={ref as React.Ref<HTMLTextAreaElement>} />
);
Textarea.displayName = "Textarea";

interface RoomsModalFormProps {
  open: boolean;
  onClose: () => void;
  roomData: Room | null;
}

const RoomsModalForm: React.FC<RoomsModalFormProps> = ({ open, onClose, roomData }) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);
  const [formValue, setFormValue] = useState<Partial<Room>>({});
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    if (roomData) {
      setFormValue(roomData);
      setImgUrl(roomData.img || "");
    } else {
      setFormValue({});
      setImgUrl("");
    }
  }, [roomData]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const payload = { ...formValue, img: imgUrl };

    if (roomData) {
      dispatch(updateRoom({ id: Number(roomData?.id), updatedData: payload }));
    } else {
      dispatch(createRoom(payload as Room));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="md" className="doctor-modal">
      <Modal.Header>
        <Modal.Title className="text-center">{roomData ? "Редактировать зал" : "Добавить зал"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="doctor-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="img"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}

          <Uploader
            action="https://ae8f76c87525c299.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: "15px" }}
            fileListVisible={false}
            onSuccess={(res: any) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Загрузить главное фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
            value={imgUrl}
            onChange={(value) => setImgUrl(value)}
            style={{ marginTop: 10 }}
          />
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          className="doctor-modal__form "
        >
          <Form.Group>
            <Form.ControlLabel>Название:</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Цена:</Form.ControlLabel>
            <Form.Control name="price" type="number" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Количество мест:</Form.ControlLabel>
            <Form.Control name="capacity" type="number" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Площадь:</Form.ControlLabel>
            <Form.Control name="area" />
          </Form.Group>

          <Form.Group className="doctor-modal__textarea">
            <Form.ControlLabel>Оборудование (через запятую):</Form.ControlLabel>
            <Form.Control name="equipment" accepter={Textarea} rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>
          {roomData ? "Сохранить изменения" : "Добавить зал"}
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomsModalForm;
