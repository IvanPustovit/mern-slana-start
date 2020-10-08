import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";
import { uploadImgToStorage, uploadUrl } from "./firebase";

const Form = () => {
  const message = useMessage();
  const { formItem, formUpdate } = useContext(AuthContext);
  const { request } = useHttp();
  const history = useHistory();

  const initialState = {
    _id: "",
    article: "",
    category: "",
    img: "",
    info: "",
    name: "",
    price: "",
    size: "",
    sizeImg: "",
    species: "",
    styleImg: "",
    MadeIn: "",
  };

  const [form, setForm] = useState(initialState);

  const uploadFile = async (e) => {
    try {
      const fileImg = e.target.files[0];
      const formData = new FormData();
      formData.append("file", fileImg);

      await uploadImgToStorage("goods", fileImg);
      const url = await uploadUrl("goods", fileImg);
      setForm({ ...form, img: url });
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitGoods = async (e) => {
    e.preventDefault();
    const newGood = {
      ...form,
    };
    const data = await request("/admin/add", "POST", newGood);
    if (data) {
      setForm(initialState);
      history.push("/admin");
    }
    formUpdate(initialState);
    message("Товар відредаговано");
  };
  useEffect(() => {
    setForm(formItem);
  }, [formItem]);

  return (
    <div>
      <form
        id="upload-container"
        method="POST"
        // action="/admin/img"
        encType="multipart/form-data"
      >
        <img id="upload-image" src={form.img} width="50px" alt={form.name} />
        <div>
          <input
            id="file-input"
            type="file"
            name="goods"
            accept="image/*"
            // multiple
            // onClick={uploadFile}
            onChange={uploadFile}
            required
          />
          {/* <label htmlFor="file-input">Виберіть файл</label> */}
          {/* <input type="submit" value="Загрузити" /> */}
        </div>
      </form>
      <form method="POST" className="new-item">
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Назва товара"
            value={form.name}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="species"
            id="species"
            placeholder="Вид товару (футболка, рушник ...)"
            value={form.species}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Розміри,(Футболки - вказуємо через кому, Рушник - дожинаХ(на)ширину)"
            value={form.size}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="info"
            id="info"
            placeholder="Короткий опис товару"
            value={form.info}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="sizeImg"
            id="sizeImg"
            placeholder="Розмір малюнка вишивки"
            value={form.sizeImg}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="styleImg"
            id="styleImg"
            placeholder="Стиль вишивки"
            value={form.styleImg}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Ціна товару"
            value={form.price}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Катeгорія товару"
            value={form.category}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="MadeIn"
            id="MadeIn"
            placeholder="Виробник товару"
            value={form.MadeIn}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="article"
            id="article"
            placeholder="Артикул"
            value={form.article}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="button-to" onClick={submitGoods}>
          Записати товар
        </button>
      </form>
    </div>
  );
};

export default Form;
