import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { addNewAlbum } from "../../Redux/GeneralSlice";
import "./AddAlbums.scss";
function AddAlbums() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    album_title: "",
    artist: "",
    album_cover: null,
  });
  const handleFieldChange = (e) => {
    const temp = { ...data };
    if (e.target.type === "file") {
      temp[e.target.name] = e.target.files[0];
    } else temp[e.target.name] = e.target.value;
    setdata(temp);
  };
  const imageUpload = async () => {
    let imageUrl = "";
    let uploadData = new FormData();
    uploadData.append("title", data?.album_title);
    uploadData.append("image", data?.album_cover);
    await axios({
      method: "post",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: "Client-ID fa026d9ac0db6b3",
      },
      data: uploadData,
    })
      .then((res) => (imageUrl = res?.data?.data?.link))
      .catch((e) => console.log("error", e.message));
    return imageUrl;
  };
  const handleSubmit = async () => {
    let URL = await imageUpload();
    if (URL) {
      let formData = { ...data, album_cover: URL, id: uuidv4() };
      dispatch(addNewAlbum(formData));
      alert("Album created successfully");
      history.push("/");
    } else {
      alert("Error! PLease try again latter.");
    }
  };
  return (
    <div className="addAlbum">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 col-12 d-flex justify-contents-center">
            <label className="fileUpload">
              <input
                type="file"
                id="image"
                name="album_cover"
                hidden
                accept="image/*"
                multiple={false}
                onChange={handleFieldChange}
                style={{
                  display: "none",
                }}
              />
              <div>
                <img
                  src={
                    data?.album_cover
                      ? URL?.createObjectURL(data?.album_cover)
                      : "/noAlbumCover.png"
                  }
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                  }}
                />
              </div>
              <br />
              <div className="image__bottom">
                {data?.album_cover === null ? (
                  <span className="image_upload_text">Upload Album Cover</span>
                ) : (
                  <span className="image_upload_text">Change Album Cover</span>
                )}
              </div>
            </label>
          </div>
          <div className="col-md-6 col-12 my-md-0 my-5 d-flex justify-contents-center flex-column">
            <div className=" my-3">
              <input
                type="text"
                className="form__field"
                name="album_title"
                placeholder="Enter Album title"
                value={data?.album_title}
                onChange={handleFieldChange}
              />
              <div
                className="inputLabel bg-primary text-white text-center"
                disabled
              >
                Album title
              </div>
            </div>
            <div className="my-3">
              <input
                type="text"
                className="form__field"
                name="artist"
                placeholder="Enter Artist name"
                value={data?.artist}
                onChange={handleFieldChange}
              />
              <div
                className="inputLabel bg-primary text-white text-center"
                disabled
              >
                Artist
              </div>
            </div>
            <div className="d-flex">
              <div className="m-2 w-25" onClick={handleSubmit}>
                <button className="btn-pill">Add Album</button>
              </div>
              <div className="m-2 w-25" onClick={() => history.push("/")}>
                <button className="btn-pill">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAlbums;
